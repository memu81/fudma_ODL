type StepProgressProps = {
  percentage: number;
};

export function StepProgress({ percentage }: StepProgressProps) {
  const bounded = Math.max(0, Math.min(100, percentage));
  return (
    <div aria-label="Application progress">
      <p className="muted">Profile completion: {bounded}%</p>
      <div
        className="progress"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={bounded}
      >
        <div style={{ width: `${bounded}%` }} />
      </div>
    </div>
  );
}
