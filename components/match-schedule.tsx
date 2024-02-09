"use client";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { MatchFixture, isEmptyOrSpaces } from "@/helpers";
import { useQuery } from "convex/react";
import { getMatchType, displayDate2, addMinutes } from "@/helpers";
import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import LoadingSpinner from "./loading-spinner";

const MatchSchedule = () => {
  const [text, setText] = useState("");

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const createFixture = (data: Doc<"matches">): MatchFixture | undefined => {
    const name =
      data.place === 1 ? `ŁKS - ${data.opponent}` : `${data.opponent} - ŁKS`;

    let matchminute = `${data.minute}`;
    if (data.minute < 10) {
      matchminute = `0${data.minute}`;
    }
    const time = `${data.hour}:${matchminute}`;



    const matchDate = new Date(
      data.year,
      data.month,
      data.day,
      data.hour,
      data.minute,
    );

    let isActive = false;
    let isPassed = false;

    if (matchDate > new Date()) {
      isActive = false;
      isPassed = false;
    }

    var checkDate = addMinutes(matchDate, 120);

    if (new Date() > checkDate) {
      isActive = false;
      isPassed = true;
    }

    if (new Date() >= matchDate && new Date() <= checkDate) {
      isActive = true;
      isPassed = false;
    }

    const headingText = isPassed
      ? "Nie zaplanowano jeszcze terminarza"
      : isActive
      ? "Aktualnie trwa"
      : "";

    return {
      name,
      time,
      matchType: getMatchType(data.matchType),
      isActive,
      isPassed,
      headingText,
      date: displayDate2(matchDate),
    };
  };

  let fixture: MatchFixture | undefined = undefined;
  const match = useQuery(api.matches.getNextMatch);
  if (match) {
    fixture = createFixture(match);
  }

  const openInNewTab = (e: React.FormEvent<HTMLFormElement>, text: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (isEmptyOrSpaces(text)) {
      return;
    }

    let newStr = text;
    const splitted = text.split(" ");
    if (splitted.length > 1) {
      newStr = text.replace(" ", "+");
    }

    const url = `https://www.google.pl/search?q=${newStr}`;
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div className="pt-5 min-w-[400px]">
      <Tabs defaultValue="fixture" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger className="text-xs px-4" value="fixture">
            Następny mecz ŁKS
          </TabsTrigger>
          <TabsTrigger className="text-xs px-4" value="google">
            Szukaj w Google
          </TabsTrigger>
        </TabsList>
        <TabsContent value="fixture">
          <div className="mt-4 min-h-[170px] border dark:border-white/25  border-neutral-900/20 flex items-center justify-center rounded-md">
            {match === undefined && <LoadingSpinner />}
            {fixture !== undefined && (
              <div>
                {!fixture.isActive && !fixture.isPassed && (
                  <div>
                    <p className="dark:text-white opacity-80 dark:opacity-60 font-medium dark:font-normal text-center text-sm tracking-tight">
                      {fixture.date}
                    </p>
                    <p className="dark:text-white opacity-80 dark:opacity-60 text-center text-xl font-bold tracking-tighter">
                      {fixture.time}
                    </p>
                    <p className="dark:text-white opacity-80 dark:opacity-60 mt-1 text-center text-2xl font-bold tracking-tighter">
                      {fixture.name}
                    </p>
                    <p className="dark:text-white opacity-80 dark:opacity-60 mt-1 text-center text-base tracking-tight">
                      {`(${fixture.matchType})`}
                    </p>
                  </div>
                )}
                {fixture.isPassed && !fixture.isActive && (
                  <p className="dark:text-white opacity-80 dark:opacity-60 text-base text-center">
                    {fixture.headingText}
                  </p>
                )}
                {!fixture.isPassed && fixture.isActive && (
                  <>
                    <p className="dark:text-white opacity-80 dark:opacity-60 text-base text-center">
                      {fixture.headingText}
                    </p>
                    <p className="dark:text-white opacity-80 dark:opacity-60 mt-2 text-center text-2xl font-bold">
                      {fixture.name}
                    </p>
                    <p className="dark:text-white opacity-80 dark:opacity-60 mt-1 text-center text-base">
                      {`(${fixture.matchType})`}
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="google">
          <div className="mt-4 min-h-[170px] border px-3 border-neutral-900/20 dark:border-white/25 flex items-center justify-center rounded-md">
            <div className="w-full flex flex-col items-center">
              <form
                onSubmit={(e) => openInNewTab(e, text)}
                className="flex flex-col items-center w-full px-1"
              >
                <Image
                  src="/full-google-white.png"
                  alt="Google"
                  width={80}
                  height={50}
                  className="dark:hidden"
                />
                <Image
                  src="/full-google.png"
                  alt="Google"
                  width={80}
                  height={50}
                  className="hidden dark:block"
                />
                <Input
                  placeholder="szukaj w Google ..."
                  value={text}
                  onChange={handleText}
                  className="mt-4 w-full"
                />
                <Button
                  variant="outline"
                  type="submit"
                  size="sm"
                  className="w-full mt-2"
                >
                  Szukaj
                </Button>
              </form>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MatchSchedule;
