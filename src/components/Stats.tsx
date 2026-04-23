type Props = {
  time: number; // Time elapsed in seconds
  wpm: number;  // Words per minute typing speed
};

export const Stats = ({ time, wpm }: Props) => {
  return (
    <div className="stats">
      {/* Time display with Bootstrap clock icon */}
      <div>
        <i className="bi bi-clock"></i> {time}s
      </div>

      {/* WPM display with Bootstrap lightning icon */}
      <div>
        <i className="bi bi-lightning-charge"></i> {wpm} WPM
      </div>
    </div>
  );
};