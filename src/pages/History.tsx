import { Clock, FileCode, AlertTriangle, CheckCircle } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { useTranslation } from '@/hooks/useTranslation';

// Demo history data
const historyItems = [
  {
    id: '1',
    date: '2024-01-15 14:32',
    files: ['auth.ts', 'api.js'],
    vulnerabilities: 3,
    status: 'critical',
  },
  {
    id: '2',
    date: '2024-01-14 09:15',
    files: ['database.py'],
    vulnerabilities: 1,
    status: 'medium',
  },
  {
    id: '3',
    date: '2024-01-13 16:45',
    files: ['config.json', 'utils.ts'],
    vulnerabilities: 0,
    status: 'clean',
  },
];

export default function History() {
  const { t } = useTranslation();

  return (
    <Layout title={t.nav.history}>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">{t.nav.history}</h1>
        </div>

        <div className="space-y-4">
          {historyItems.map((item, index) => (
            <div
              key={item.id}
              className="glass-card p-5 opacity-0 animate-fade-in hover:bg-secondary/30 transition-colors cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    item.status === 'critical' ? 'bg-rose/20' :
                    item.status === 'medium' ? 'bg-amber/20' : 'bg-emerald/20'
                  }`}>
                    {item.status === 'clean' ? (
                      <CheckCircle className="w-5 h-5 text-emerald" />
                    ) : (
                      <AlertTriangle className={`w-5 h-5 ${
                        item.status === 'critical' ? 'text-rose' : 'text-amber'
                      }`} />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{item.files.join(', ')}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  item.status === 'critical' ? 'bg-rose/20 text-rose' :
                  item.status === 'medium' ? 'bg-amber/20 text-amber' : 'bg-emerald/20 text-emerald'
                }`}>
                  {item.vulnerabilities === 0 ? 'Clean' : `${item.vulnerabilities} issues`}
                </div>
              </div>
            </div>
          ))}
        </div>

        {historyItems.length === 0 && (
          <div className="glass-card p-12 text-center">
            <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No scan history</h3>
            <p className="text-muted-foreground">Your scan results will appear here</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
