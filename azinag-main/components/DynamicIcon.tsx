import {
  Code,
  Smartphone,
  Globe,
  Settings,
  Link as LinkIcon,
  BarChart,
  RefreshCw,
  Receipt,
  Users,
  TrendingUp,
  ShoppingCart,
  ClipboardList,
  Factory,
  CreditCard,
  Pill,
  Package,
  Home,
  Database,
  Briefcase,
  Monitor,
  Apple,
  // Using generic terms since custom ones might not exist directly
  HardDrive,
  Workflow,
  Lock,
  Calendar,
  LogOut,
  Headphones,
  MessageCircle,
  Puzzle,
  Building,
  Activity,
  Zap,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  LayoutDashboard,
  LucideProps
} from 'lucide-react';
import { createElement } from 'react';

const icons: Record<string, React.FC<LucideProps>> = {
  Code,
  Smartphone,
  Globe,
  Settings,
  Link: LinkIcon,
  BarChart,
  RefreshCw,
  Receipt,
  Users,
  TrendingUp,
  ShoppingCart,
  ClipboardList,
  Factory,
  CreditCard,
  Pill,
  Package,
  Home,
  Database,
  Briefcase,
  Monitor,
  Apple,
  HardDrive,
  Workflow,
  Lock,
  Calendar,
  LogOut,
  Headphones,
  MessageCircle,
  Puzzle,
  Building,
  Activity,
  Zap,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  LayoutDashboard
};

interface DynamicIconProps extends LucideProps {
  name: string;
}

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const Icon = icons[name];
  if (!Icon) return <Code {...props} />; // Fallback
  return <Icon {...props} />;
}
