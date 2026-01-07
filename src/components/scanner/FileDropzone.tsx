import { useCallback, useState } from 'react';
import { Upload, File, X, AlertCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ALLOWED_EXTENSIONS = ['.py', '.js', '.ts', '.json', '.csv', '.jsx', '.tsx'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 20;

interface FileDropzoneProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  disabled?: boolean;
}

export function FileDropzone({ files, onFilesChange, disabled }: FileDropzoneProps) {
  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFiles = useCallback((newFiles: File[]): File[] => {
    const validFiles: File[] = [];
    
    for (const file of newFiles) {
      const ext = '.' + file.name.split('.').pop()?.toLowerCase();
      
      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        setError(`Invalid file type: ${file.name}`);
        continue;
      }
      
      if (file.size > MAX_FILE_SIZE) {
        setError(`File too large: ${file.name}`);
        continue;
      }
      
      if (files.length + validFiles.length >= MAX_FILES) {
        setError(`Maximum ${MAX_FILES} files allowed`);
        break;
      }
      
      validFiles.push(file);
    }
    
    return validFiles;
  }, [files.length]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      setError(null);

      if (disabled) return;

      const droppedFiles = Array.from(e.dataTransfer.files);
      const validFiles = validateFiles(droppedFiles);
      
      if (validFiles.length > 0) {
        onFilesChange([...files, ...validFiles]);
      }
    },
    [files, onFilesChange, validateFiles, disabled]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setError(null);
      const selectedFiles = Array.from(e.target.files || []);
      const validFiles = validateFiles(selectedFiles);
      
      if (validFiles.length > 0) {
        onFilesChange([...files, ...validFiles]);
      }
      
      e.target.value = '';
    },
    [files, onFilesChange, validateFiles]
  );

  const removeFile = useCallback(
    (index: number) => {
      onFilesChange(files.filter((_, i) => i !== index));
    },
    [files, onFilesChange]
  );

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    const colors: Record<string, string> = {
      py: 'text-amber',
      js: 'text-amber',
      ts: 'text-cyan',
      tsx: 'text-cyan',
      jsx: 'text-cyan',
      json: 'text-emerald',
      csv: 'text-emerald',
    };
    return colors[ext || ''] || 'text-muted-foreground';
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          'glass-card relative border-2 border-dashed transition-all duration-300 cursor-pointer',
          isDragging
            ? 'border-primary bg-primary/5 scale-[1.02]'
            : 'border-border/50 hover:border-primary/50',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input
          type="file"
          multiple
          accept={ALLOWED_EXTENSIONS.join(',')}
          onChange={handleFileInput}
          disabled={disabled}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />
        
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <div className={cn(
            'w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300',
            isDragging ? 'bg-primary/20 scale-110' : 'bg-secondary'
          )}>
            <Upload className={cn(
              'w-8 h-8 transition-colors',
              isDragging ? 'text-primary' : 'text-muted-foreground'
            )} />
          </div>
          
          <h3 className="text-lg font-semibold mb-1">{t.scanner.dropzone.title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{t.scanner.dropzone.subtitle}</p>
          <p className="text-xs text-muted-foreground">{t.scanner.dropzone.formats}</p>
          <p className="text-xs text-muted-foreground">{t.scanner.dropzone.limit}</p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-rose/10 border border-rose/30 text-rose text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {files.length} file{files.length > 1 ? 's' : ''} selected
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onFilesChange([])}
              className="text-rose hover:text-rose hover:bg-rose/10"
            >
              {t.scanner.clear}
            </Button>
          </div>
          
          <div className="grid gap-2 max-h-48 overflow-y-auto">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="glass-card flex items-center gap-3 p-3 group"
              >
                <File className={cn('w-5 h-5 flex-shrink-0', getFileIcon(file.name))} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(index)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-rose hover:text-rose hover:bg-rose/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
