import Clock from "@/components/clock";
import DateDisplay from "@/components/date-display";
import Logo from "@/components/logo";
import MatchSchedule from "@/components/match-schedule";
import { ModeToggle } from "@/components/mode-toggle";
import PageLinkContainer from "@/components/page-link-container";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center  dark:bg-[#1F1F1F]">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <Logo />
        <DateDisplay />
        <Clock />
        <PageLinkContainer />
        <MatchSchedule />
        <div className="pt-4">
          <ModeToggle />
        </div>
      </div>
    </main>
  );
}
