"use client";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { MatchFixture } from "@/helpers";
import { useQuery } from "convex/react";
import { getMatchType, displayDate2, addMinutes } from "@/helpers";
import { Separator } from "@/components/ui/separator";

const MatchSchedule = () => {
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

  console.log(fixture?.isPassed);

  return (
    <div className="pt-8">
      <p className="text-white opacity-60 text-center font-medium text-sm tracking-tight">
        Najbliższy mecz Rycerzy Wiosny:
      </p>
      <Separator className="w-full mt-1 opacity-60" />
      {fixture !== undefined && (
        <div className="pt-4">
          {!fixture.isActive && !fixture.isPassed && (
            <div>
              <p className="text-white opacity-60 text-center text-base">
                {fixture.date}
              </p>
              <p className="text-white opacity-60 text-center text-2xl">
                {fixture.time}
              </p>
              <p className="text-white opacity-60 mt-2 text-center text-3xl font-bold">
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
              <p className="text-white opacity-60 mt-2 text-center text-3xl font-bold">
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
  );
};

export default MatchSchedule;
