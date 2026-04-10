
export default function Skeleton({
  children,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading: boolean;
}) {
  return (
    <div className="relative">
      <div className={isLoading ? "invisible" : "visible"}>{children}</div>

      {/* skeleton overlays on top, inherits same dimensions */}
      {isLoading && (
        <div className="absolute inset-0 rounded-md bg-neutral-200 animate-pulse" />
      )}
    </div>
  );
}
