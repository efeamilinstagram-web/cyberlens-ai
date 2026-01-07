import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  variant?: 'cyan' | 'emerald' | 'rose' | 'amber';
  delay?: number;
}

const variantStyles = {
  cyan: 'from-cyan/20 to-cyan/5 hover:shadow-[0_0_30px_hsl(187_92%_69%_/_0.2)]',
  emerald: 'from-emerald/20 to-emerald/5 hover:shadow-[0_0_30px_hsl(160_84%_60%_/_0.2)]',
  rose: 'from-rose/20 to-rose/5 hover:shadow-[0_0_30px_hsl(0_84%_60%_/_0.2)]',
  amber: 'from-amber/20 to-amber/5 hover:shadow-[0_0_30px_hsl(38_92%_50%_/_0.2)]',
};

const iconStyles = {
  cyan: 'text-cyan bg-cyan/20',
  emerald: 'text-emerald bg-emerald/20',
  rose: 'text-rose bg-rose/20',
  amber: 'text-amber bg-amber/20',
};

export function FeatureCard({ icon: Icon, title, description, variant = 'cyan', delay = 0 }: FeatureCardProps) {
  return (
    <div
      className={cn(
        'glass-card p-6 bg-gradient-to-br transition-all duration-500 hover:scale-[1.02] cursor-pointer',
        'opacity-0 animate-fade-in',
        variantStyles[variant]
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-4', iconStyles[variant])}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
