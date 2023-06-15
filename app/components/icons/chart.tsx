const Chart = ({ value }: { value: number | null }) => {
  const percentage = value === null ? 0 : Math.round(value);

  return (
    <svg viewBox="0 0 36 36" className="stroke-emerald-300 w-28">
      <path
        className="fill-none stroke-[4] stroke-blue-50"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path
        className="fill-none stroke-[2.5] transition-all duration-300"
        strokeLinecap="round"
        strokeDasharray={`${percentage}, 100`}
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <text
        x="18"
        y="20.35"
        className="fill-slate-700 text-[.5em] stroke-0"
        textAnchor="middle"
      >
        {`${percentage}%`}
      </text>
    </svg>
  );
};

export default Chart;
