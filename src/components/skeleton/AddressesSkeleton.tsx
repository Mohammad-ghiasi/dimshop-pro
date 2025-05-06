import { Skeleton } from "../ui/skeleton";

export default function AddressesSkeleton() {
  return (
    <div className="space-y-4 max-h-[372px] shadow-inner overflow-y-auto">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="p-4 border-r-2 border-customgreen bor shadow-sm flex flex-col gap-y-2"
        >
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-5 w-2/4" />
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-5 w-1/2" />
        </div>
      ))}
    </div>
  );
}
