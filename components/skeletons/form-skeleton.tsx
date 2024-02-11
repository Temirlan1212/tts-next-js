import { Skeleton } from "@/components/ui/skeleton";

export function FormSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-[15px]">
      <div className="rounded-md">
        <div className="space-y-2 w-fulls border-b py-4 border-bg-muted">
          <Skeleton className="h-[40px] w-full" />
        </div>

        {[...Array(rows)].map((_, index) => (
          <div
            className={`flex items-center space-x-4 py-2 ${
              index === rows - 1 ? "" : "border-b border-bg-muted"
            }`}
            key={index}
          >
            <div className="space-y-2 w-full">
              <Skeleton className="h-4 w-full" />{" "}
              {/* Adjust width for table cells */}
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
