import { useState, useCallback } from 'react';
import { Play, Loader2 } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { FileDropzone } from '@/components/scanner/FileDropzone';
import { NeuralAnimation } from '@/components/scanner/NeuralAnimation';
import { VulnerabilityResults, Vulnerability } from '@/components/scanner/VulnerabilityResults';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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
      // Read file contents
      const fileContents = await Promise.all(
        files.map(async (file) => ({
          name: file.name,
          content: await file.text(),
        }))
      );

      // Call the AI analysis edge function
      const { data, error } = await supabase.functions.invoke('analyze-code', {
        body: { files: fileContents },
      });

      if (error) {
        console.error('Analysis error:', error);
        
        // Handle specific error statuses
        if (error.message?.includes('429')) {
          toast({
            title: 'Rate Limited',
            description: 'Too many requests. Please wait a moment and try again.',
            variant: 'destructive',
          });
        } else if (error.message?.includes('402')) {
          toast({
            title: 'Usage Limit',
            description: 'AI usage limit reached. Please check your account.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: t.common.error,
            description: 'Failed to analyze files. Please try again.',
            variant: 'destructive',
          });
        }
        return;
      }

      const vulnerabilities: Vulnerability[] = data?.vulnerabilities || [];
      setResults(vulnerabilities);
      
      toast({
        title: t.scanner.complete,
        description: vulnerabilities.length > 0
          ? `Found ${vulnerabilities.length} potential issue${vulnerabilities.length > 1 ? 's' : ''}`
          : t.scanner.noVulnerabilities,
        variant: vulnerabilities.length > 0 ? 'destructive' : 'default',
      });
    } catch (error) {
      console.error('Scan error:', error);
      toast({
        title: t.common.error,
        description: 'An unexpected error occurred',
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
