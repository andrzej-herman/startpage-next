import { displayDate } from "@/helpers";

const DateDisplay = () => {
  return (
    <div className="flex items-center justify-center pt-10">
      <p className="text-white opacity-70 text-center tracking-tight">
        {displayDate(new Date())}
      </p>
      ;
    </div>
  );
};

export default DateDisplay;
