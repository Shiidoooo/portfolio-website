// Fixed decorative backdrop: a fading dot grid and slow-drifting aurora glows.
export function BackgroundFX() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-(--z-background) overflow-hidden">
      <div className="dot-grid absolute inset-0" />
      <div className="aurora-blob -top-40 -left-32 h-[32rem] w-[32rem] bg-accent/25" />
      <div className="aurora-blob top-1/3 -right-40 h-[28rem] w-[28rem] bg-teal/20 [animation-delay:-8s]" />
      <div className="aurora-blob -bottom-48 left-1/4 h-[26rem] w-[26rem] bg-[#4c6b1f]/30 [animation-delay:-15s]" />
    </div>
  );
}
