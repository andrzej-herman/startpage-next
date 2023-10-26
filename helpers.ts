export function displayDate(date: Date): string {
  const m = getMonth(date.getMonth());
  return `Dzisiaj jest ${getWeekDay(date)}, ${date.getDate()} ${m} ${date.getFullYear()} roku`;
}

export function displayDate2(date: Date): string {
  const m = getMonth(date.getMonth());
  return `${getWeekDay(date)}, ${date.getDate()} ${m} ${date.getFullYear()}`;
}

export function getWeekDay(date: Date): string {
  const days = [
    "niedziela",
    "poniedziałek",
    "wtorek",
    "środa",
    "czwartek",
    "piątek",
    "sobota",
  ];
  return days[date.getDay()];
}

export function displayTime(date: Date): string {
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  return `${h}:${m}:${s}`;
}

export function isEmptyOrSpaces(str: string) {
  return str === null || str.match(/^ *$/) !== null;
}

export function getMonth(n: number): string {
  switch (n) {
    case 0:
      return "styczeń";
    case 1:
      return "luty";
    case 2:
      return "marzec";
    case 3:
      return "kwiecień";
    case 4:
      return "maj";
    case 5:
      return "czerwiec";
    case 6:
      return "lipiec";
    case 7:
      return "sierpień";
    case 8:
      return "wrzesień";
    case 9:
      return "październik";
    case 10:
      return "listopad";
    case 11:
      return "grudzień";
    default:
      return "-";
  }
}

export function getMatchType(n: number): string {
  switch (n) {
    case 1:
      return "Fortuna I Liga";
    case 2:
      return "PKO BP Ekstraklasa";
    case 3:
      return "Puchar Polski";
    case 4:
      return "mecz towarzyski";
    case 5:
      return "sparing";
    default:
      return "brak informacji";
  }
}

export function addMinutes(date: Date, minutes: number): Date {
  const result = new Date(date);
  result.setMinutes(result.getMinutes() + minutes);
  return result;
}

export interface MatchFixture {
  isActive: boolean;
  isPassed: boolean;
  headingText: string;
  date: string;
  time: string;
  name: string;
  matchType: string;
}
