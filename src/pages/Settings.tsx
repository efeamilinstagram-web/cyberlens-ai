import { Settings as SettingsIcon, User, Bell, Shield, Palette } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { useTranslation } from '@/hooks/useTranslation';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function Settings() {
  const { t, language, setLanguage } = useTranslation();

  const settingsSections = [
    {
      icon: User,
      title: 'Profile Settings',
      description: 'Manage your account information',
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Configure alert preferences',
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Two-factor authentication and security options',
    },
    {
      icon: Palette,
      title: 'Appearance',
      description: 'Customize your experience',
    },
  ];

  return (
    <Layout title={t.nav.settings}>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <SettingsIcon className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">{t.nav.settings}</h1>
        </div>

        {/* Language Setting */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Language / Langue / اللغة</h3>
              <p className="text-sm text-muted-foreground">Select your preferred language</p>
            </div>
            <LanguageSwitcher language={language} setLanguage={setLanguage} />
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-4">
          {settingsSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div
                key={section.title}
                className="glass-card p-6 opacity-0 animate-fade-in hover:bg-secondary/30 transition-colors cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{section.title}</h3>
                    <p className="text-sm text-muted-foreground">{section.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Settings */}
        <div className="glass-card p-6 space-y-6">
          <h3 className="font-semibold">Quick Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-scan" className="flex flex-col gap-1 cursor-pointer">
                <span>Auto-scan on upload</span>
                <span className="text-sm text-muted-foreground font-normal">
                  Automatically analyze files when uploaded
                </span>
              </Label>
              <Switch id="auto-scan" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="notifications" className="flex flex-col gap-1 cursor-pointer">
                <span>Critical alerts</span>
                <span className="text-sm text-muted-foreground font-normal">
                  Receive notifications for critical vulnerabilities
                </span>
              </Label>
              <Switch id="notifications" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="detailed" className="flex flex-col gap-1 cursor-pointer">
                <span>Detailed reports</span>
                <span className="text-sm text-muted-foreground font-normal">
                  Include extended analysis in scan results
                </span>
              </Label>
              <Switch id="detailed" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
