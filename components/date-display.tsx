import { displayDate } from "@/helpers";

const DateDisplay = () => {
  return (
    <div className="flex items-center justify-center pt-6">
      <p className="text-white opacity-60 text-center text-sm tracking-tight">
        {displayDate(new Date())}
      </p>
    </div>
  );
};

export default DateDisplay;
