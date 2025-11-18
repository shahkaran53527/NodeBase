import { cn } from "@/lib/utils";

interface EntityListProps<T> {
  items?: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  getKey?: (item: T, index: number) => string;
  emptyView?: React.ReactNode;
  classname?: string;
}

export function EntityList<T>({
  items,
  renderItem,
  getKey,
  emptyView,
  classname,
}: EntityListProps<T>) {
  if (items?.length === 0 && emptyView) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <div className="max-w-sm mx-auto">{emptyView}</div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-y-4", classname)}>
      {items?.map((item, index) => (
        <div key={getKey ? getKey(item, index) : index}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}
