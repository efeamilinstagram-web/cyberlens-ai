import { Link } from 'react-router-dom';
import { Zap, Shield, Wrench, Code2, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { FeatureCard } from '@/components/dashboard/FeatureCard';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Zap,
      titleKey: 'realtime' as const,
      variant: 'cyan' as const,
    },
    {
      icon: Shield,
      titleKey: 'zeroTrust' as const,
      variant: 'emerald' as const,
    },
    {
      icon: Wrench,
      titleKey: 'remediation' as const,
      variant: 'rose' as const,
    },
    {
      icon: Code2,
      titleKey: 'multiLang' as const,
      variant: 'amber' as const,
    },
  ];

  return (
    <Layout title={t.nav.dashboard}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="glass-card p-8 lg:p-12 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald/20 rounded-full blur-3xl" />
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              <span>AI-Powered Security</span>
            </div>
            
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">
              <span className="gradient-text">{t.dashboard.welcome}</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              {t.dashboard.description}
            </p>
            
            <Link to="/scanner">
              <Button size="lg" className="bg-gradient-to-r from-cyan to-emerald text-primary-foreground hover:opacity-90 gap-2 glow-cyan">
                {t.dashboard.getStarted}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.titleKey}
              icon={feature.icon}
              title={t.dashboard.features[feature.titleKey].title}
              description={t.dashboard.features[feature.titleKey].description}
              variant={feature.variant}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Stats/Info Bar */}
        <div className="glass-card p-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl lg:text-3xl font-bold gradient-text">99.9%</div>
              <div className="text-sm text-muted-foreground mt-1">Detection Rate</div>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-bold text-emerald">{'<'}1s</div>
              <div className="text-sm text-muted-foreground mt-1">Scan Speed</div>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-bold text-amber">50+</div>
              <div className="text-sm text-muted-foreground mt-1">Vulnerability Types</div>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-bold text-rose">24/7</div>
              <div className="text-sm text-muted-foreground mt-1">AI Monitoring</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
