import { useState, useCallback } from 'react';
import { Play, Loader2 } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { FileDropzone } from '@/components/scanner/FileDropzone';
import { NeuralAnimation } from '@/components/scanner/NeuralAnimation';
import { VulnerabilityResults, Vulnerability } from '@/components/scanner/VulnerabilityResults';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Mock analysis function - will be replaced with real AI integration
async function analyzeCode(files: File[]): Promise<Vulnerability[]> {
  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Read file contents for demo
  const vulnerabilities: Vulnerability[] = [];
  
  for (const file of files) {
    const content = await file.text();
    const lines = content.split('\n');
    
    // Simple pattern detection for demo
    lines.forEach((line, index) => {
      // SQL Injection patterns
      if (line.includes('query(') && line.includes('+') && !line.includes('parameterized')) {
        vulnerabilities.push({
          id: `${file.name}-${index}-sql`,
          severity: 'Critical',
          description: 'Potential SQL Injection vulnerability detected. User input appears to be concatenated directly into SQL query.',
          file: file.name,
          line: index + 1,
          fix: `// Use parameterized queries instead:
const result = await db.query(
  'SELECT * FROM users WHERE id = $1',
  [userId]
);`,
        });
      }
      
      // XSS patterns
      if (line.includes('innerHTML') || line.includes('dangerouslySetInnerHTML')) {
        vulnerabilities.push({
          id: `${file.name}-${index}-xss`,
          severity: 'Critical',
          description: 'Potential XSS vulnerability. Direct HTML injection can allow attackers to execute malicious scripts.',
          file: file.name,
          line: index + 1,
          fix: `// Sanitize HTML content before rendering:
import DOMPurify from 'dompurify';
const cleanHTML = DOMPurify.sanitize(userContent);`,
        });
      }
      
      // Hardcoded secrets
      if ((line.includes('api_key') || line.includes('password') || line.includes('secret')) && 
          (line.includes('=') && (line.includes('"') || line.includes("'")))) {
        vulnerabilities.push({
          id: `${file.name}-${index}-secret`,
          severity: 'Medium',
          description: 'Hardcoded credentials detected. Secrets should be stored in environment variables.',
          file: file.name,
          line: index + 1,
          fix: `// Use environment variables:
const apiKey = process.env.API_KEY;
// Or use a secrets manager`,
        });
      }
      
      // Eval usage
      if (line.includes('eval(')) {
        vulnerabilities.push({
          id: `${file.name}-${index}-eval`,
          severity: 'Critical',
          description: 'Use of eval() detected. This can execute arbitrary code and is a major security risk.',
          file: file.name,
          line: index + 1,
          fix: `// Avoid eval(). Use safer alternatives:
// For JSON parsing: JSON.parse(data)
// For math: Use a proper math library
// For dynamic functions: Use Function constructor with caution`,
        });
      }

      // Console.log with sensitive data
      if (line.includes('console.log') && (line.includes('password') || line.includes('token') || line.includes('secret'))) {
        vulnerabilities.push({
          id: `${file.name}-${index}-log`,
          severity: 'Low',
          description: 'Sensitive data may be logged. Remove debug logs before production.',
          file: file.name,
          line: index + 1,
          fix: `// Remove sensitive data from logs:
console.log('User authenticated successfully');
// Never log passwords, tokens, or secrets`,
        });
      }
    });
  }

  return vulnerabilities;
}

export default function Scanner() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<Vulnerability[] | null>(null);

  const handleScan = useCallback(async () => {
    if (files.length === 0) {
      toast({
        title: 'No files selected',
        description: 'Please upload files to scan',
        variant: 'destructive',
      });
      return;
    }

    setIsScanning(true);
    setResults(null);

    try {
      const vulnerabilities = await analyzeCode(files);
      setResults(vulnerabilities);
      
      toast({
        title: t.scanner.complete,
        description: vulnerabilities.length > 0
          ? `Found ${vulnerabilities.length} potential issues`
          : t.scanner.noVulnerabilities,
        variant: vulnerabilities.length > 0 ? 'destructive' : 'default',
      });
    } catch (error) {
      toast({
        title: t.common.error,
        description: 'Failed to analyze files',
        variant: 'destructive',
      });
    } finally {
      setIsScanning(false);
    }
  }, [files, t, toast]);

  return (
    <Layout title={t.nav.scanner}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">{t.scanner.title}</h1>
          <p className="text-muted-foreground">{t.scanner.subtitle}</p>
        </div>

        {/* Dropzone */}
        <FileDropzone
          files={files}
          onFilesChange={setFiles}
          disabled={isScanning}
        />

        {/* Scan Button */}
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={handleScan}
            disabled={files.length === 0 || isScanning}
            className="gap-2 min-w-[200px] bg-gradient-to-r from-cyan to-emerald text-primary-foreground hover:opacity-90 glow-cyan disabled:opacity-50"
          >
            {isScanning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t.scanner.analyzing}
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                {t.scanner.scan}
              </>
            )}
          </Button>
        </div>

        {/* Scanning Animation */}
        {isScanning && (
          <div className="glass-card p-8 text-center">
            <NeuralAnimation />
            <h3 className="text-lg font-semibold mt-4 gradient-text animate-pulse">
              {t.scanner.scanning}
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              {t.scanner.analyzing}
            </p>
          </div>
        )}

        {/* Results */}
        {results !== null && !isScanning && (
          <VulnerabilityResults vulnerabilities={results} />
        )}
      </div>
    </Layout>
  );
}
