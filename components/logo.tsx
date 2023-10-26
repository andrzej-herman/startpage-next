"use client";

import { AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";

const availableMonths = [
  {
    value: "0",
    label: "styczeń",
  },
  {
    value: "1",
    label: "luty",
  },
  {
    value: "2",
    label: "marzec",
  },
  {
    value: "3",
    label: "kwiecień",
  },
  {
    value: "4",
    label: "maj",
  },
  {
    value: "5",
    label: "czerwiec",
  },
  {
    value: "6",
    label: "lipiec",
  },
  {
    value: "7",
    label: "sierpień",
  },
  {
    value: "8",
    label: "wrzesień",
  },
  {
    value: "9",
    label: "październik",
  },
  {
    value: "10",
    label: "listopad",
  },
  {
    value: "11",
    label: "grudzień",
  },
];

const availablePlaces = [
  {
    value: "1",
    label: "Stadion Króla",
  },
  {
    value: "2",
    label: "mecz wyjazdowy",
  },
];

const availableMatchTypes = [
  {
    value: "1",
    label: "Fortuna I Liga",
  },
  {
    value: "2",
    label: "PKO BP Ekstraklasa",
  },
  {
    value: "3",
    label: "Puchar Polski",
  },
  {
    value: "4",
    label: "mecz towarzyski",
  },
  {
    value: "5",
    label: "sparing",
  },
];

const Logo = () => {
  const [isHovered, setIsHovered] = useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  const [openMonth, setOpenMonth] = useState(false);
  const [openPlace, setOpenPlace] = useState(false);
  const [openMatchType, setOpenMatchType] = useState(false);

  const [opponent, setOpponent] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [place, setPlace] = useState("");
  const [matchType, setMatchType] = useState("");
  const [success, setSuccess] = useState(false);

  const create = useMutation(api.matches.create);

  const handleOpponent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpponent(e.target.value);
  };

  const handleDay = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDay(e.target.value);
  };

  const handleMonth = (value: string) => {
    setMonth(value === month ? "" : value);
  };

  const handleYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value);
  };

  const handleHour = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHour(e.target.value);
  };

  const handleMinute = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinute(e.target.value);
  };

  const handlePlace = (value: string) => {
    setPlace(value === place ? "" : value);
  };

  const handleMatchType = (value: string) => {
    setMatchType(value === matchType ? "" : value);
  };

  const saveData = async () => {
    const promise = await create({
      opponent: opponent,
      day: parseInt(day),
      month: parseInt(month),
      year: parseInt(year),
      hour: parseInt(hour),
      minute: parseInt(minute),
      place: parseInt(place),
      matchType: parseInt(matchType),
    });

    if (promise) {
      setSuccess(true);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="transition duration-300 ease-in-out cursor-pointer"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {isHovered ? (
            <Image
              src="/logo-hover.png"
              width="80"
              height="80"
              alt="Logo ŁKS Przeplatanka"
              className="transition ease-in-out duration-300"
              priority={true}
            />
          ) : (
            <Image
              src="/logo.png"
              width="80"
              height="80"
              alt="Logo ŁKS Przeplatanka"
              className="transition ease-in-out duration-300"
              priority={true}
            />
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Wprowadź następny mecz</DialogTitle>
          <DialogDescription>Wypełnij wszystkie pola</DialogDescription>
        </DialogHeader>
        <div className="pt-2">
          <Label htmlFor="opponent">Przeciwnik</Label>
          <Input id="opponent" value={opponent} onChange={handleOpponent} />
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex-[0.25]">
            <Label htmlFor="day">Dzień</Label>
            <Input id="day" value={day} onChange={handleDay} />
          </div>
          <div className="flex-[0.5]">
            <Label htmlFor="opponent">Miesiąc</Label>
            <Popover open={openMonth} onOpenChange={setOpenMonth}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openMonth}
                  className="w-full justify-between"
                >
                  {month
                    ? availableMonths.find((g) => g.value === month)?.label
                    : "Wybierz miesiąc..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Wybierz miesiąc..." />
                  <CommandEmpty>Nie znaleziono miesiąca</CommandEmpty>
                  <CommandGroup>
                    {availableMonths.map((g) => (
                      <CommandItem
                        key={g.value}
                        value={g.value}
                        onSelect={(currentValue: string) => {
                          handleMonth(currentValue);
                          setOpenMonth(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            month === g.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {g.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex-[0.25]">
            <Label htmlFor="year">Rok</Label>
            <Input id="year" value={year} onChange={handleYear} />
          </div>
        </div>

        {/* Godzina, minuta, miejsce */}

        <div className="flex items-center justify-between gap-3">
          <div className="flex-[0.25]">
            <Label htmlFor="hour">Godzina</Label>
            <Input id="hour" value={hour} onChange={handleHour} />
          </div>

          <div className="flex-[0.25]">
            <Label htmlFor="minute">Minuta</Label>
            <Input id="minute" value={minute} onChange={handleMinute} />
          </div>

          <div className="flex-[0.5]">
            <Label htmlFor="place">Miejsce</Label>
            <Popover open={openPlace} onOpenChange={setOpenPlace}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openPlace}
                  className="w-full justify-between"
                >
                  {place
                    ? availablePlaces.find((g) => g.value === place)?.label
                    : "Wybierz miejsce..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Wybierz miejsce..." />
                  <CommandEmpty>Nie znaleziono miejsca</CommandEmpty>
                  <CommandGroup>
                    {availablePlaces.map((g) => (
                      <CommandItem
                        key={g.value}
                        value={g.value}
                        onSelect={(currentValue: string) => {
                          handlePlace(currentValue);
                          setOpenPlace(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            place === g.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {g.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Rozgrywki */}

        <div className="w-full">
          <Label htmlFor="matchType">Rozgrywki</Label>
          <Popover open={openMatchType} onOpenChange={setOpenMatchType}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openMatchType}
                className="w-full justify-between"
              >
                {matchType
                  ? availableMatchTypes.find((g) => g.value === matchType)
                      ?.label
                  : "Wybierz rozgrywki..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Wybierz rozgrywki..." />
                <CommandEmpty>Nie znaleziono rozgrywek</CommandEmpty>
                <CommandGroup>
                  {availableMatchTypes.map((g) => (
                    <CommandItem
                      key={g.value}
                      value={g.value}
                      onSelect={(currentValue: string) => {
                        handleMatchType(currentValue);
                        setOpenMatchType(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          matchType === g.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {g.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {success && (
          <Alert variant="success">
            <AlertCircle className="h-4 w-4 text-green-500" />
            <AlertTitle className="text-green-500">Ok</AlertTitle>
            <AlertDescription className="text-green-500">
              Dane meczu zostały zapisane
            </AlertDescription>
          </Alert>
        )}

        <DialogFooter className="justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Zamknij
            </Button>
          </DialogClose>

          <Button type="button" onClick={saveData}>
            Zapisz mecz
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Logo;
