export default function MyEventDetailAttendeesRowSkeleton() {
  return (
    <div className="grid grid-cols-4 justify-between items-center text-center border-b border-neutral-200 py-2 text-[12px] animate-pulse">
      <div className="h-3 bg-neutral-300 rounded w-24 mx-auto"></div>

      <div className="h-3 bg-neutral-300 rounded w-32 mx-auto"></div>

      <div className="flex flex-col items-center space-y-1">
        <div className="h-3 bg-neutral-300 rounded w-20"></div>
        <div className="h-3 bg-neutral-300 rounded w-16"></div>
      </div>

      <div className="h-3 bg-neutral-300 rounded w-16 mx-auto"></div>
    </div>
  );
}