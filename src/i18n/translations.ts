export type Language = 'en' | 'fr' | 'ar';

export const translations = {
  en: {
    // Navigation
    nav: {
      dashboard: 'Dashboard',
      scanner: 'AI Scanner',
      history: 'History',
      settings: 'Settings',
    },
    // Header
    header: {
      title: 'CyberLens AI',
      subtitle: 'Security Intelligence Platform',
      profile: 'Profile',
      logout: 'Logout',
    },
    // Dashboard
    dashboard: {
      welcome: 'Welcome to CyberLens AI',
      description: 'Your intelligent cybersecurity companion powered by advanced AI analysis',
      getStarted: 'Start Scanning',
      features: {
        realtime: {
          title: 'Real-time AI Auditing',
          description: 'Continuous security monitoring with instant threat detection using advanced neural networks',
        },
        zeroTrust: {
          title: 'Zero-Trust Data Integrity',
          description: 'Verify every access request and validate data integrity at every layer',
        },
        remediation: {
          title: 'Automated Remediation',
          description: 'AI-powered fix suggestions with one-click implementation for rapid response',
        },
        multiLang: {
          title: 'Multi-Language Support',
          description: 'Analyze code in Python, JavaScript, TypeScript, and more with precision',
        },
      },
    },
    // Scanner
    scanner: {
      title: 'AI Security Scanner',
      subtitle: 'Upload your code files for comprehensive vulnerability analysis',
      dropzone: {
        title: 'Drag & Drop Files Here',
        subtitle: 'or click to browse',
        formats: 'Supported: .py, .js, .ts, .json, .csv',
        limit: 'Max 10MB per file, up to 20 files',
      },
      scanning: 'Neural Network Scanning',
      analyzing: 'Analyzing code patterns...',
      complete: 'Scan Complete',
      noVulnerabilities: 'No vulnerabilities detected',
      vulnerabilities: 'Vulnerabilities Found',
      clear: 'Clear Files',
      scan: 'Start Analysis',
      remove: 'Remove',
    },
    // Results
    results: {
      severity: 'Severity',
      location: 'Location',
      line: 'Line',
      description: 'Description',
      fix: 'Recommended Fix',
      low: 'Low',
      medium: 'Medium',
      critical: 'Critical',
    },
    // Common
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      retry: 'Retry',
      cancel: 'Cancel',
      save: 'Save',
      close: 'Close',
    },
  },
  fr: {
    // Navigation
    nav: {
      dashboard: 'Tableau de bord',
      scanner: 'Scanner IA',
      history: 'Historique',
      settings: 'Paramètres',
    },
    // Header
    header: {
      title: 'CyberLens AI',
      subtitle: 'Plateforme d\'Intelligence Sécuritaire',
      profile: 'Profil',
      logout: 'Déconnexion',
    },
    // Dashboard
    dashboard: {
      welcome: 'Bienvenue sur CyberLens AI',
      description: 'Votre compagnon intelligent en cybersécurité alimenté par l\'analyse IA avancée',
      getStarted: 'Commencer l\'analyse',
      features: {
        realtime: {
          title: 'Audit IA en Temps Réel',
          description: 'Surveillance continue de la sécurité avec détection instantanée des menaces',
        },
        zeroTrust: {
          title: 'Intégrité Zero-Trust',
          description: 'Vérifiez chaque demande d\'accès et validez l\'intégrité des données',
        },
        remediation: {
          title: 'Remédiation Automatisée',
          description: 'Suggestions de correctifs alimentées par l\'IA avec mise en œuvre en un clic',
        },
        multiLang: {
          title: 'Support Multi-Langages',
          description: 'Analysez le code en Python, JavaScript, TypeScript et plus encore',
        },
      },
    },
    // Scanner
    scanner: {
      title: 'Scanner de Sécurité IA',
      subtitle: 'Téléchargez vos fichiers de code pour une analyse complète',
      dropzone: {
        title: 'Glissez-déposez vos fichiers ici',
        subtitle: 'ou cliquez pour parcourir',
        formats: 'Formats: .py, .js, .ts, .json, .csv',
        limit: 'Max 10Mo par fichier, jusqu\'à 20 fichiers',
      },
      scanning: 'Analyse Réseau Neuronal',
      analyzing: 'Analyse des modèles de code...',
      complete: 'Analyse Terminée',
      noVulnerabilities: 'Aucune vulnérabilité détectée',
      vulnerabilities: 'Vulnérabilités Détectées',
      clear: 'Effacer les fichiers',
      scan: 'Lancer l\'analyse',
      remove: 'Supprimer',
    },
    // Results
    results: {
      severity: 'Sévérité',
      location: 'Emplacement',
      line: 'Ligne',
      description: 'Description',
      fix: 'Correction Recommandée',
      low: 'Faible',
      medium: 'Moyen',
      critical: 'Critique',
    },
    // Common
    common: {
      loading: 'Chargement...',
      error: 'Une erreur s\'est produite',
      retry: 'Réessayer',
      cancel: 'Annuler',
      save: 'Enregistrer',
      close: 'Fermer',
    },
  },
  ar: {
    // Navigation
    nav: {
      dashboard: 'لوحة التحكم',
      scanner: 'الماسح الذكي',
      history: 'السجل',
      settings: 'الإعدادات',
    },
    // Header
    header: {
      title: 'CyberLens AI',
      subtitle: 'منصة الذكاء الأمني',
      profile: 'الملف الشخصي',
      logout: 'تسجيل الخروج',
    },
    // Dashboard
    dashboard: {
      welcome: 'مرحباً بك في CyberLens AI',
      description: 'رفيقك الذكي في الأمن السيبراني مدعوم بتحليل الذكاء الاصطناعي المتقدم',
      getStarted: 'ابدأ المسح',
      features: {
        realtime: {
          title: 'تدقيق ذكي فوري',
          description: 'مراقبة أمنية مستمرة مع كشف فوري للتهديدات باستخدام الشبكات العصبية',
        },
        zeroTrust: {
          title: 'سلامة البيانات بلا ثقة',
          description: 'تحقق من كل طلب وصول وتحقق من سلامة البيانات في كل طبقة',
        },
        remediation: {
          title: 'معالجة تلقائية',
          description: 'اقتراحات إصلاح مدعومة بالذكاء الاصطناعي مع تنفيذ بنقرة واحدة',
        },
        multiLang: {
          title: 'دعم متعدد اللغات',
          description: 'تحليل الكود بـ Python و JavaScript و TypeScript وأكثر بدقة عالية',
        },
      },
    },
    // Scanner
    scanner: {
      title: 'الماسح الأمني الذكي',
      subtitle: 'قم بتحميل ملفات الكود الخاصة بك لتحليل شامل',
      dropzone: {
        title: 'اسحب وأفلت الملفات هنا',
        subtitle: 'أو انقر للتصفح',
        formats: 'مدعوم: .py, .js, .ts, .json, .csv',
        limit: 'الحد الأقصى 10 ميجابايت لكل ملف، حتى 20 ملف',
      },
      scanning: 'مسح الشبكة العصبية',
      analyzing: 'تحليل أنماط الكود...',
      complete: 'اكتمل المسح',
      noVulnerabilities: 'لم يتم اكتشاف أي ثغرات',
      vulnerabilities: 'الثغرات المكتشفة',
      clear: 'مسح الملفات',
      scan: 'بدء التحليل',
      remove: 'إزالة',
    },
    // Results
    results: {
      severity: 'الخطورة',
      location: 'الموقع',
      line: 'السطر',
      description: 'الوصف',
      fix: 'الإصلاح الموصى به',
      low: 'منخفض',
      medium: 'متوسط',
      critical: 'حرج',
    },
    // Common
    common: {
      loading: 'جاري التحميل...',
      error: 'حدث خطأ',
      retry: 'إعادة المحاولة',
      cancel: 'إلغاء',
      save: 'حفظ',
      close: 'إغلاق',
    },
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
