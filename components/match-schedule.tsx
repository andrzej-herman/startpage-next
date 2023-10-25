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
      data.minute
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

    console.log(new Date());
    console.log(checkDate);

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
    var splitted = text.split(" ");
    if (splitted.length > 1) {
      newStr = text.replace(" ", "+");
    }

    const url = `https://www.google.pl/search?q=${newStr}`;
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div className="pt-5">
      <Tabs defaultValue="fixture" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="fixture">Następny mecz ŁKS</TabsTrigger>
          <TabsTrigger value="google">Szukaj w Google</TabsTrigger>
        </TabsList>
        <TabsContent value="fixture">
          <div className="mt-4 min-h-[170px] border border-white/25 flex items-center justify-center rounded-md">
            {fixture !== undefined && (
              <div>
                {!fixture.isActive && !fixture.isPassed && (
                  <div>
                    <p className="text-white opacity-60 text-center text-sm">
                      {fixture.date}
                    </p>
                    <p className="text-white opacity-60 text-center text-xl font-bold">
                      {fixture.time}
                    </p>
                    <p className="text-white opacity-60 mt-1 text-center text-2xl font-bold">
                      {fixture.name}
                    </p>
                    <p className="text-white opacity-60 mt-1 text-center text-base">
                      {`(${fixture.matchType})`}
                    </p>
                  </div>
                )}
                {fixture.isPassed && !fixture.isActive && (
                  <p className="text-white opacity-60 text-base text-center">
                    {fixture.headingText}
                  </p>
                )}
                {!fixture.isPassed && fixture.isActive && (
                  <>
                    <p className="text-white opacity-60 text-base text-center">
                      {fixture.headingText}
                    </p>
                    <p className="text-white opacity-60 mt-2 text-center text-2xl font-bold">
                      {fixture.name}
                    </p>
                    <p className="text-white opacity-60 mt-1 text-center text-base">
                      {`(${fixture.matchType})`}
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="google">
          <div className="mt-4 min-h-[170px] border px-3 border-white/25 flex items-center justify-center rounded-md">
            <div className="w-full flex flex-col items-center">
              <form
                onSubmit={(e) => openInNewTab(e, text)}
                className="flex flex-col items-center w-full px-1"
              >
                <Image
                  src="/full-google.png"
                  alt="Google"
                  width={80}
                  height={50}
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
