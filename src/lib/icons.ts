import {
  Wrench,
  TrendingUp,
  SlidersHorizontal,
  ScrollText,
  Workflow,
  Compass,
  ShieldCheck,
  Eye,
  Gauge,
  CircleDollarSign,
  Footprints,
  type LucideIcon,
} from "lucide-react";

export const iconRegistry: Record<string, LucideIcon> = {
  Wrench,
  TrendingUp,
  SlidersHorizontal,
  ScrollText,
  Workflow,
  Compass,
  ShieldCheck,
  Eye,
  Gauge,
  CircleDollarSign,
  Footprints,
};

export function getIcon(name: string): LucideIcon {
  return iconRegistry[name] ?? Compass;
}
