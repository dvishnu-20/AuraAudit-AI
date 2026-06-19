import { cn, regionColor } from "@/lib/utils";

interface RegionBadgeProps {
  region: string;
  className?: string;
}

export function RegionBadge({ region, className }: RegionBadgeProps) {
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border", regionColor(region), className)}>
      {region}
    </span>
  );
}
