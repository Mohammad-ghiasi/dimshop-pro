import { Skeleton } from "../ui/skeleton";

export default function UserInfoSkeleton() {
  return (
    <div className="space-y-6">
      {/* Skeleton for profile image */}
      <div className="flex justify-center">
        <Skeleton className="w-44 h-44 rounded-full" />
      </div>

      {/* Skeleton for form fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10" />
          </div>
        ))}
      </div>

      {/* Skeleton for submit button */}
      <div className="flex justify-center pt-5">
        <Skeleton className="h-10 w-[100%] md:w-[50%]" />
      </div>
    </div>
  );
}
