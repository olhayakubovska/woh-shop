interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export function RangeSlider({
  min,
  max,
  step = 1,
  value,
  onChange,
}: RangeSliderProps) {
  const [from, to] = value;

  const handleFromChange = (next: number) => {
    onChange([Math.min(next, to), to]);
  };

  const handleToChange = (next: number) => {
    onChange([from, Math.max(next, from)]);
  };

  const fromPercent = ((from - min) / (max - min)) * 100;
  const toPercent = ((to - min) / (max - min)) * 100;

  return (
    <div className="relative h-4 w-full">
      <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-border" />
      <div
        className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-pink-main"
        style={{ left: `${fromPercent}%`, right: `${100 - toPercent}%` }}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={from}
        onChange={(event) => handleFromChange(Number(event.target.value))}
        className="range-slider-thumb pointer-events-none absolute top-1/2 h-1 w-full -translate-y-1/2 appearance-none bg-transparent"
        aria-label="Мінімальна ціна"
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={to}
        onChange={(event) => handleToChange(Number(event.target.value))}
        className="range-slider-thumb pointer-events-none absolute top-1/2 h-1 w-full -translate-y-1/2 appearance-none bg-transparent"
        aria-label="Максимальна ціна"
      />
    </div>
  );
}
