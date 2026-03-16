export const TEMPLATE_CATEGORIES = [
  "Exposed Files",
  "Login Pages",
  "Sensitive Directories",
  "Error Messages",
  "Network Devices",
  "Document Discovery",
  "Cloud & SaaS",
  "Vulnerable Servers",
  "Passwords & Credentials",
  "Social & People",
];

export const TEMPLATES = [
  // ── Exposed Files ──────────────────────────────────────
  {
    name: "Environment Files",
    description: "Find exposed .env files with credentials",
    category: "Exposed Files",
    operators: [
      { type: "filetype", value: "env", exclude: false },
      { type: "intext", value: "DB_PASSWORD", exclude: false },
    ],
  },
  {
    name: "SQL Database Dumps",
    description: "Find exposed SQL database dumps",
    category: "Exposed Files",
    operators: [
      { type: "filetype", value: "sql", exclude: false },
      { type: "intext", value: "INSERT INTO", exclude: false },
    ],
  },
  {
    name: "Config Files (YAML)",
    description: "Find exposed YAML config files",
    category: "Exposed Files",
    operators: [
      { type: "filetype", value: "yml", exclude: false },
      { type: "intext", value: "password", exclude: false },
    ],
  },
  {
    name: "Backup Files",
    description: "Find exposed backup archives",
    category: "Exposed Files",
    operators: [
      { type: "filetype", value: "bak", exclude: false },
      { type: "inurl", value: "backup", exclude: false },
    ],
  },
  {
    name: "Log Files",
    description: "Find exposed log files",
    category: "Exposed Files",
    operators: [
      { type: "filetype", value: "log", exclude: false },
      { type: "intext", value: "error", exclude: false },
    ],
  },
  {
    name: "Private Keys",
    description: "Find exposed private key files",
    category: "Exposed Files",
    operators: [
      { type: "filetype", value: "pem", exclude: false },
      { type: "intext", value: "PRIVATE KEY", exclude: false },
    ],
  },
  {
    name: "XML Config Files",
    description: "Find exposed XML configs with credentials",
    category: "Exposed Files",
    operators: [
      { type: "filetype", value: "xml", exclude: false },
      { type: "intext", value: "password", exclude: false },
    ],
  },
  {
    name: "SSH Config Files",
    description: "Find exposed SSH config files",
    category: "Exposed Files",
    operators: [
      { type: "filetype", value: "conf", exclude: false },
      { type: "intext", value: "IdentityFile", exclude: false },
    ],
  },
  {
    name: "Docker Compose Files",
    description: "Find exposed docker-compose files with secrets",
    category: "Exposed Files",
    operators: [
      { type: "filetype", value: "yml", exclude: false },
      { type: "intext", value: "docker-compose", exclude: false },
      { type: "intext", value: "MYSQL_ROOT_PASSWORD", exclude: false },
    ],
  },
  {
    name: "JSON Config Files",
    description: "Find exposed JSON configs with API keys",
    category: "Exposed Files",
    operators: [
      { type: "filetype", value: "json", exclude: false },
      { type: "intext", value: "api_key", exclude: false },
    ],
  },
  {
    name: "INI Config Files",
    description: "Find exposed .ini config files",
    category: "Exposed Files",
    operators: [
      { type: "filetype", value: "ini", exclude: false },
      { type: "intext", value: "passwd", exclude: false },
    ],
  },
  {
    name: "Terraform State Files",
    description: "Find exposed Terraform state with secrets",
    category: "Exposed Files",
    operators: [
      { type: "filetype", value: "tfstate", exclude: false },
      { type: "intext", value: "secret", exclude: false },
    ],
  },

  // ── Login Pages ────────────────────────────────────────
  {
    name: "Admin Login Panels",
    description: "Find admin login pages",
    category: "Login Pages",
    operators: [
      { type: "intitle", value: "admin login", exclude: false },
      { type: "inurl", value: "admin", exclude: false },
    ],
  },
  {
    name: "WordPress Login",
    description: "Find WordPress login pages",
    category: "Login Pages",
    operators: [
      { type: "inurl", value: "wp-login.php", exclude: false },
    ],
  },
  {
    name: "cPanel Login",
    description: "Find cPanel login pages",
    category: "Login Pages",
    operators: [
      { type: "intitle", value: "cPanel Login", exclude: false },
    ],
  },
  {
    name: "phpMyAdmin",
    description: "Find phpMyAdmin instances",
    category: "Login Pages",
    operators: [
      { type: "intitle", value: "phpMyAdmin", exclude: false },
      { type: "inurl", value: "phpmyadmin", exclude: false },
    ],
  },
  {
    name: "Webmail Login",
    description: "Find webmail login portals",
    category: "Login Pages",
    operators: [
      { type: "intitle", value: "Webmail Login", exclude: false },
    ],
  },
  {
    name: "Grafana Dashboards",
    description: "Find exposed Grafana dashboards",
    category: "Login Pages",
    operators: [
      { type: "intitle", value: "Grafana", exclude: false },
      { type: "inurl", value: "/login", exclude: false },
    ],
  },
  {
    name: "Kibana Dashboards",
    description: "Find exposed Kibana instances",
    category: "Login Pages",
    operators: [
      { type: "intitle", value: "Kibana", exclude: false },
      { type: "inurl", value: "app/kibana", exclude: false },
    ],
  },
  {
    name: "Jenkins Dashboard",
    description: "Find exposed Jenkins CI/CD instances",
    category: "Login Pages",
    operators: [
      { type: "intitle", value: "Dashboard [Jenkins]", exclude: false },
    ],
  },
  {
    name: "Jira Login",
    description: "Find Jira instances",
    category: "Login Pages",
    operators: [
      { type: "inurl", value: "atlassian.net", exclude: false },
      { type: "intitle", value: "Log in - Jira", exclude: false },
    ],
  },
  {
    name: "FTP Web Login",
    description: "Find web-based FTP login pages",
    category: "Login Pages",
    operators: [
      { type: "intitle", value: "FTP Login", exclude: false },
      { type: "inurl", value: "ftp", exclude: false },
    ],
  },

  // ── Sensitive Directories ──────────────────────────────
  {
    name: "Open Directories",
    description: "Find open directory listings",
    category: "Sensitive Directories",
    operators: [
      { type: "intitle", value: "index of /", exclude: false },
    ],
  },
  {
    name: "Git Repositories",
    description: "Find exposed .git directories",
    category: "Sensitive Directories",
    operators: [
      { type: "inurl", value: "/.git", exclude: false },
      { type: "intitle", value: "index of", exclude: false },
    ],
  },
  {
    name: "Backup Directories",
    description: "Find exposed backup directories",
    category: "Sensitive Directories",
    operators: [
      { type: "intitle", value: "index of /backup", exclude: false },
    ],
  },
  {
    name: "Upload Directories",
    description: "Find open upload directories",
    category: "Sensitive Directories",
    operators: [
      { type: "intitle", value: "index of /uploads", exclude: false },
    ],
  },
  {
    name: "Password Directories",
    description: "Find directories with password files",
    category: "Sensitive Directories",
    operators: [
      { type: "intitle", value: "index of /", exclude: false },
      { type: "inurl", value: "password", exclude: false },
    ],
  },
  {
    name: "Config Directories",
    description: "Find exposed /config or /conf directories",
    category: "Sensitive Directories",
    operators: [
      { type: "intitle", value: "index of /config", exclude: false },
    ],
  },
  {
    name: "Database Directories",
    description: "Find exposed /db or /database directories",
    category: "Sensitive Directories",
    operators: [
      { type: "intitle", value: "index of /db", exclude: false },
    ],
  },
  {
    name: "SVN Repositories",
    description: "Find exposed .svn directories",
    category: "Sensitive Directories",
    operators: [
      { type: "inurl", value: "/.svn", exclude: false },
      { type: "intitle", value: "index of", exclude: false },
    ],
  },
  {
    name: "WP-Content Uploads",
    description: "Find WordPress upload directories",
    category: "Sensitive Directories",
    operators: [
      { type: "intitle", value: "index of", exclude: false },
      { type: "inurl", value: "/wp-content/uploads", exclude: false },
    ],
  },
  {
    name: "CGI-Bin Directories",
    description: "Find exposed cgi-bin directories",
    category: "Sensitive Directories",
    operators: [
      { type: "intitle", value: "index of /cgi-bin", exclude: false },
    ],
  },
  {
    name: "Temp Directories",
    description: "Find exposed /tmp or /temp directories",
    category: "Sensitive Directories",
    operators: [
      { type: "intitle", value: "index of /tmp", exclude: false },
    ],
  },

  // ── Error Messages ─────────────────────────────────────
  {
    name: "SQL Errors",
    description: "Find pages with SQL error messages",
    category: "Error Messages",
    operators: [
      { type: "intext", value: "sql syntax error", exclude: false },
    ],
  },
  {
    name: "PHP Errors",
    description: "Find pages with PHP error/warning messages",
    category: "Error Messages",
    operators: [
      { type: "intext", value: "Fatal error: Uncaught", exclude: false },
      { type: "filetype", value: "php", exclude: false },
    ],
  },
  {
    name: "Stack Traces",
    description: "Find exposed stack traces",
    category: "Error Messages",
    operators: [
      { type: "intext", value: "Exception in thread", exclude: false },
    ],
  },
  {
    name: "Debug Pages",
    description: "Find Django/Laravel debug pages",
    category: "Error Messages",
    operators: [
      { type: "intitle", value: "DisallowedHost", exclude: false },
    ],
  },
  {
    name: "MySQL Errors",
    description: "Find MySQL error messages leaking info",
    category: "Error Messages",
    operators: [
      { type: "intext", value: "mysql_fetch_array()", exclude: false },
    ],
  },
  {
    name: "PostgreSQL Errors",
    description: "Find PostgreSQL error messages",
    category: "Error Messages",
    operators: [
      { type: "intext", value: "PSQLException", exclude: false },
    ],
  },
  {
    name: "ASP.NET Errors",
    description: "Find ASP.NET error pages with stack traces",
    category: "Error Messages",
    operators: [
      { type: "intitle", value: "Server Error in", exclude: false },
      { type: "intext", value: "Stack Trace", exclude: false },
    ],
  },
  {
    name: "Laravel Debug Mode",
    description: "Find Laravel apps with debug mode enabled",
    category: "Error Messages",
    operators: [
      { type: "intext", value: "Whoops! There was an error", exclude: false },
      { type: "intext", value: "Laravel", exclude: false },
    ],
  },
  {
    name: "Node.js Errors",
    description: "Find exposed Node.js error output",
    category: "Error Messages",
    operators: [
      { type: "intext", value: "TypeError: Cannot read property", exclude: false },
    ],
  },
  {
    name: "ODBC Errors",
    description: "Find ODBC connection error messages",
    category: "Error Messages",
    operators: [
      { type: "intext", value: "ODBC SQL Server Driver", exclude: false },
    ],
  },
  {
    name: "WordPress Debug",
    description: "Find WordPress sites with debug output",
    category: "Error Messages",
    operators: [
      { type: "inurl", value: "debug.log", exclude: false },
      { type: "inurl", value: "wp-content", exclude: false },
    ],
  },

  // ── Network Devices ────────────────────────────────────
  {
    name: "IP Cameras",
    description: "Find exposed IP cameras",
    category: "Network Devices",
    operators: [
      { type: "intitle", value: "Live View / - AXIS", exclude: false },
    ],
  },
  {
    name: "Network Printers",
    description: "Find network printers",
    category: "Network Devices",
    operators: [
      { type: "intitle", value: "HP LaserJet", exclude: false },
      { type: "inurl", value: ":631", exclude: false },
    ],
  },
  {
    name: "Router Config Pages",
    description: "Find exposed router config pages",
    category: "Network Devices",
    operators: [
      { type: "intitle", value: "Router Configuration", exclude: false },
      { type: "inurl", value: "setup.cgi", exclude: false },
    ],
  },
  {
    name: "Webcam Panels",
    description: "Find webcam viewer panels",
    category: "Network Devices",
    operators: [
      { type: "inurl", value: "/view/index.shtml", exclude: false },
    ],
  },
  {
    name: "DVR / NVR Systems",
    description: "Find exposed DVR/NVR recording systems",
    category: "Network Devices",
    operators: [
      { type: "intitle", value: "DVR Web Viewer", exclude: false },
    ],
  },
  {
    name: "VoIP Phones",
    description: "Find exposed VoIP phone interfaces",
    category: "Network Devices",
    operators: [
      { type: "intitle", value: "Polycom SoundPoint", exclude: false },
    ],
  },
  {
    name: "NAS Devices",
    description: "Find exposed NAS storage interfaces",
    category: "Network Devices",
    operators: [
      { type: "intitle", value: "Synology DiskStation", exclude: false },
    ],
  },
  {
    name: "SCADA/ICS Systems",
    description: "Find exposed industrial control systems",
    category: "Network Devices",
    operators: [
      { type: "intitle", value: "SCADA", exclude: false },
      { type: "intext", value: "PLC", exclude: false },
    ],
  },
  {
    name: "Raspberry Pi Web",
    description: "Find exposed Raspberry Pi web interfaces",
    category: "Network Devices",
    operators: [
      { type: "intitle", value: "Pi-hole Admin Console", exclude: false },
    ],
  },
  {
    name: "MikroTik Routers",
    description: "Find exposed MikroTik router panels",
    category: "Network Devices",
    operators: [
      { type: "intitle", value: "RouterOS", exclude: false },
      { type: "inurl", value: "webfig", exclude: false },
    ],
  },

  // ── Document Discovery ─────────────────────────────────
  {
    name: "PDF Documents",
    description: "Find PDF documents on a target domain",
    category: "Document Discovery",
    operators: [
      { type: "filetype", value: "pdf", exclude: false },
    ],
  },
  {
    name: "Excel Spreadsheets",
    description: "Find spreadsheets on a target domain",
    category: "Document Discovery",
    operators: [
      { type: "filetype", value: "xlsx", exclude: false },
    ],
  },
  {
    name: "Word Documents",
    description: "Find Word documents on a target domain",
    category: "Document Discovery",
    operators: [
      { type: "filetype", value: "docx", exclude: false },
    ],
  },
  {
    name: "Presentations",
    description: "Find PowerPoint files on a target domain",
    category: "Document Discovery",
    operators: [
      { type: "filetype", value: "pptx", exclude: false },
    ],
  },
  {
    name: "CSV Data Files",
    description: "Find exposed CSV data files",
    category: "Document Discovery",
    operators: [
      { type: "filetype", value: "csv", exclude: false },
      { type: "intext", value: "email", exclude: false },
    ],
  },
  {
    name: "Resumes / CVs",
    description: "Find resumes and CVs (useful for OSINT on people)",
    category: "Document Discovery",
    operators: [
      { type: "filetype", value: "pdf", exclude: false },
      { type: "intitle", value: "resume", exclude: false },
    ],
  },
  {
    name: "Internal Reports",
    description: "Find confidential or internal reports",
    category: "Document Discovery",
    operators: [
      { type: "filetype", value: "pdf", exclude: false },
      { type: "intext", value: "confidential", exclude: false },
    ],
  },
  {
    name: "Network Diagrams",
    description: "Find Visio network diagrams",
    category: "Document Discovery",
    operators: [
      { type: "filetype", value: "vsd", exclude: false },
      { type: "intext", value: "network", exclude: false },
    ],
  },
  {
    name: "Financial Spreadsheets",
    description: "Find spreadsheets with financial data",
    category: "Document Discovery",
    operators: [
      { type: "filetype", value: "xls", exclude: false },
      { type: "intext", value: "salary", exclude: false },
    ],
  },

  // ── Cloud & SaaS ──────────────────────────────────────
  {
    name: "Exposed S3 Buckets",
    description: "Find open Amazon S3 buckets",
    category: "Cloud & SaaS",
    operators: [
      { type: "site", value: "s3.amazonaws.com", exclude: false },
    ],
  },
  {
    name: "Azure Blob Storage",
    description: "Find open Azure blob storage containers",
    category: "Cloud & SaaS",
    operators: [
      { type: "site", value: "blob.core.windows.net", exclude: false },
    ],
  },
  {
    name: "Firebase Databases",
    description: "Find exposed Firebase realtime databases",
    category: "Cloud & SaaS",
    operators: [
      { type: "site", value: "firebaseio.com", exclude: false },
    ],
  },
  {
    name: "Google Cloud Storage",
    description: "Find open Google Cloud Storage buckets",
    category: "Cloud & SaaS",
    operators: [
      { type: "site", value: "storage.googleapis.com", exclude: false },
    ],
  },
  {
    name: "DigitalOcean Spaces",
    description: "Find open DigitalOcean Spaces buckets",
    category: "Cloud & SaaS",
    operators: [
      { type: "site", value: "digitaloceanspaces.com", exclude: false },
    ],
  },
  {
    name: "Exposed Trello Boards",
    description: "Find public Trello boards with sensitive data",
    category: "Cloud & SaaS",
    operators: [
      { type: "site", value: "trello.com", exclude: false },
      { type: "intext", value: "password", exclude: false },
    ],
  },
  {
    name: "Public Notion Pages",
    description: "Find public Notion pages with internal data",
    category: "Cloud & SaaS",
    operators: [
      { type: "site", value: "notion.site", exclude: false },
      { type: "intext", value: "internal", exclude: false },
    ],
  },
  {
    name: "Exposed Google Docs",
    description: "Find publicly shared Google Docs",
    category: "Cloud & SaaS",
    operators: [
      { type: "site", value: "docs.google.com", exclude: false },
      { type: "inurl", value: "/pub", exclude: false },
    ],
  },
  {
    name: "Exposed Google Sheets",
    description: "Find publicly shared Google Sheets",
    category: "Cloud & SaaS",
    operators: [
      { type: "site", value: "docs.google.com/spreadsheets", exclude: false },
      { type: "intext", value: "password", exclude: false },
    ],
  },
  {
    name: "Pastebin Leaks",
    description: "Find sensitive data on Pastebin",
    category: "Cloud & SaaS",
    operators: [
      { type: "site", value: "pastebin.com", exclude: false },
      { type: "intext", value: "password", exclude: false },
    ],
  },
  {
    name: "GitHub Secrets",
    description: "Find accidentally committed secrets on GitHub",
    category: "Cloud & SaaS",
    operators: [
      { type: "site", value: "github.com", exclude: false },
      { type: "intext", value: "API_SECRET", exclude: false },
    ],
  },

  // ── Vulnerable Servers ─────────────────────────────────
  {
    name: "Apache Status Page",
    description: "Find exposed Apache server-status pages",
    category: "Vulnerable Servers",
    operators: [
      { type: "intitle", value: "Apache Status", exclude: false },
      { type: "inurl", value: "server-status", exclude: false },
    ],
  },
  {
    name: "phpinfo() Pages",
    description: "Find exposed phpinfo pages leaking server details",
    category: "Vulnerable Servers",
    operators: [
      { type: "intitle", value: "phpinfo()", exclude: false },
    ],
  },
  {
    name: "Default IIS Pages",
    description: "Find default IIS installation pages",
    category: "Vulnerable Servers",
    operators: [
      { type: "intitle", value: "IIS Windows Server", exclude: false },
    ],
  },
  {
    name: "Elasticsearch Clusters",
    description: "Find exposed Elasticsearch instances",
    category: "Vulnerable Servers",
    operators: [
      { type: "intitle", value: "Elasticsearch", exclude: false },
      { type: "intext", value: "cluster_name", exclude: false },
    ],
  },
  {
    name: "MongoDB Instances",
    description: "Find exposed MongoDB web interfaces",
    category: "Vulnerable Servers",
    operators: [
      { type: "inurl", value: ":28017", exclude: false },
    ],
  },
  {
    name: "CouchDB Instances",
    description: "Find exposed CouchDB admin panels",
    category: "Vulnerable Servers",
    operators: [
      { type: "inurl", value: ":5984/_utils", exclude: false },
    ],
  },
  {
    name: "Tomcat Manager",
    description: "Find exposed Apache Tomcat manager pages",
    category: "Vulnerable Servers",
    operators: [
      { type: "intitle", value: "Apache Tomcat", exclude: false },
      { type: "inurl", value: "/manager/html", exclude: false },
    ],
  },
  {
    name: "Solr Admin",
    description: "Find exposed Apache Solr admin panels",
    category: "Vulnerable Servers",
    operators: [
      { type: "intitle", value: "Solr Admin", exclude: false },
    ],
  },
  {
    name: "Spring Boot Actuator",
    description: "Find exposed Spring Boot actuator endpoints",
    category: "Vulnerable Servers",
    operators: [
      { type: "inurl", value: "/actuator/env", exclude: false },
    ],
  },
  {
    name: "RabbitMQ Management",
    description: "Find exposed RabbitMQ management panels",
    category: "Vulnerable Servers",
    operators: [
      { type: "intitle", value: "RabbitMQ Management", exclude: false },
    ],
  },

  // ── Passwords & Credentials ────────────────────────────
  {
    name: "Password Lists",
    description: "Find exposed password text files",
    category: "Passwords & Credentials",
    operators: [
      { type: "filetype", value: "txt", exclude: false },
      { type: "intext", value: "username", exclude: false },
      { type: "intext", value: "password", exclude: false },
    ],
  },
  {
    name: "htpasswd Files",
    description: "Find exposed Apache .htpasswd files",
    category: "Passwords & Credentials",
    operators: [
      { type: "filetype", value: "htpasswd", exclude: false },
    ],
  },
  {
    name: "FTP Credentials",
    description: "Find FTP credentials in config files",
    category: "Passwords & Credentials",
    operators: [
      { type: "filetype", value: "cfg", exclude: false },
      { type: "intext", value: "ftp_password", exclude: false },
    ],
  },
  {
    name: "wp-config.php Exposed",
    description: "Find exposed WordPress config files with DB creds",
    category: "Passwords & Credentials",
    operators: [
      { type: "inurl", value: "wp-config.php", exclude: false },
      { type: "intext", value: "DB_PASSWORD", exclude: false },
    ],
  },
  {
    name: "Database Connection Strings",
    description: "Find files containing database connection strings",
    category: "Passwords & Credentials",
    operators: [
      { type: "intext", value: "connectionString", exclude: false },
      { type: "intext", value: "password", exclude: false },
      { type: "filetype", value: "config", exclude: false },
    ],
  },
  {
    name: "AWS Access Keys",
    description: "Find exposed AWS access key IDs",
    category: "Passwords & Credentials",
    operators: [
      { type: "intext", value: "AKIA", exclude: false },
      { type: "filetype", value: "txt", exclude: false },
    ],
  },
  {
    name: "SMTP Credentials",
    description: "Find files with SMTP mail server credentials",
    category: "Passwords & Credentials",
    operators: [
      { type: "intext", value: "smtp_password", exclude: false },
      { type: "filetype", value: "env", exclude: false },
    ],
  },
  {
    name: "SSH Authorized Keys",
    description: "Find exposed SSH authorized_keys files",
    category: "Passwords & Credentials",
    operators: [
      { type: "intitle", value: "index of", exclude: false },
      { type: "inurl", value: ".ssh", exclude: false },
    ],
  },
  {
    name: "KeePass Databases",
    description: "Find exposed KeePass password database files",
    category: "Passwords & Credentials",
    operators: [
      { type: "filetype", value: "kdbx", exclude: false },
    ],
  },

  // ── Social & People ────────────────────────────────────
  {
    name: "LinkedIn Profiles",
    description: "Find LinkedIn profiles for a name or company",
    category: "Social & People",
    operators: [
      { type: "site", value: "linkedin.com/in/", exclude: false },
    ],
  },
  {
    name: "GitHub Profiles",
    description: "Find GitHub profiles and repos for a person",
    category: "Social & People",
    operators: [
      { type: "site", value: "github.com", exclude: false },
    ],
  },
  {
    name: "Twitter/X Profiles",
    description: "Find Twitter/X accounts for a person or handle",
    category: "Social & People",
    operators: [
      { type: "site", value: "x.com", exclude: false },
    ],
  },
  {
    name: "Instagram Profiles",
    description: "Find Instagram profiles",
    category: "Social & People",
    operators: [
      { type: "site", value: "instagram.com", exclude: false },
    ],
  },
  {
    name: "Email Address Finder",
    description: "Find pages that mention a specific email pattern",
    category: "Social & People",
    operators: [
      { type: "intext", value: "@gmail.com", exclude: false },
    ],
  },
  {
    name: "Forum Posts",
    description: "Find forum posts by a username",
    category: "Social & People",
    operators: [
      { type: "intext", value: "posted by", exclude: false },
      { type: "inurl", value: "forum", exclude: false },
    ],
  },
  {
    name: "Public Resumes",
    description: "Find publicly posted resumes with contact info",
    category: "Social & People",
    operators: [
      { type: "filetype", value: "pdf", exclude: false },
      { type: "intext", value: "curriculum vitae", exclude: false },
    ],
  },
  {
    name: "Reddit Profiles",
    description: "Find Reddit posts by a specific user",
    category: "Social & People",
    operators: [
      { type: "site", value: "reddit.com", exclude: false },
      { type: "inurl", value: "/user/", exclude: false },
    ],
  },
];
