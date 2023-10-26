import Spinner from "./spinner";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Spinner size="lg" />
      <p className="text-xs opacity-60">Ładowanie danych z Flashscore</p>
    </div>
  );
};

export default LoadingSpinner;
