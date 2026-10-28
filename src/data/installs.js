// Install reference for each tool, keyed by tool id.
// type drives the small label shown on the row.
// Commands assume a Debian/Kali-style Linux unless noted; adjust for your distro.
export const installs = {
  nmap: { type: 'apt', cmd: 'sudo apt install -y nmap' },
  openvas: { type: 'apt', cmd: 'sudo apt install -y openvas && sudo gvm-setup' },
  nuclei: { type: 'go', cmd: 'go install github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest' },
  wireshark: { type: 'apt', cmd: 'sudo apt install -y wireshark' },
  zeek: { type: 'apt', cmd: 'sudo apt install -y zeek' },
  testssl: { type: 'git', cmd: 'git clone --depth 1 https://github.com/drwetter/testssl.sh.git' },
  masscan: { type: 'apt', cmd: 'sudo apt install -y masscan' },
  amass: { type: 'snap', cmd: 'sudo snap install amass' },
  nessus: { type: 'download', cmd: 'Download the .deb from tenable.com, then: sudo dpkg -i Nessus-*.deb' },

  burp: { type: 'apt', cmd: 'sudo apt install -y burpsuite' },
  zap: { type: 'apt', cmd: 'sudo apt install -y zaproxy' },
  httpx: { type: 'go', cmd: 'go install github.com/projectdiscovery/httpx/cmd/httpx@latest' },
  nikto: { type: 'apt', cmd: 'sudo apt install -y nikto' },
  ffuf: { type: 'go', cmd: 'go install github.com/ffuf/ffuf/v2@latest' },
  feroxbuster: { type: 'apt', cmd: 'sudo apt install -y feroxbuster' },
  sqlmap: { type: 'apt', cmd: 'sudo apt install -y sqlmap' },
  caido: { type: 'download', cmd: 'Download and extract the release from caido.io/download' },
  schemathesis: { type: 'pipx', cmd: 'pipx install schemathesis' },
  wpscan: { type: 'gem', cmd: 'sudo gem install wpscan' },
  katana: { type: 'go', cmd: 'go install github.com/projectdiscovery/katana/cmd/katana@latest' },
  wapiti: { type: 'pipx', cmd: 'pipx install wapiti3' },
  uniscan: { type: 'apt', cmd: 'sudo apt install -y uniscan' },
  w3af: { type: 'git', cmd: 'git clone https://github.com/andresriancho/w3af.git && cd w3af && ./w3af_console' },

  trivy: { type: 'script', cmd: 'curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b /usr/local/bin' },
  semgrep: { type: 'pipx', cmd: 'pipx install semgrep' },
  grype: { type: 'script', cmd: 'curl -sSfL https://raw.githubusercontent.com/anchore/grype/main/install.sh | sh -s -- -b /usr/local/bin' },
  gitleaks: { type: 'go', cmd: 'go install github.com/gitleaks/gitleaks/v8@latest' },
  checkov: { type: 'pipx', cmd: 'pipx install checkov' },
  falco: { type: 'script', cmd: 'curl -fsSL https://falco.org/repo/falcosecurity-packages.asc | sudo gpg --dearmor -o /usr/share/keyrings/falco-archive-keyring.gpg && echo \"deb [signed-by=/usr/share/keyrings/falco-archive-keyring.gpg] https://download.falco.org/packages/deb stable main\" | sudo tee /etc/apt/sources.list.d/falcosecurity.list && sudo apt update && sudo apt install -y falco' },

  scoutsuite: { type: 'pipx', cmd: 'pipx install scoutsuite' },
  cloudcustodian: { type: 'pipx', cmd: 'pipx install c7n' },
  steampipe: { type: 'script', cmd: 'sudo /bin/sh -c "$(curl -fsSL https://steampipe.io/install/steampipe.sh)"' },
  prowler: { type: 'pipx', cmd: 'pipx install prowler' },

  osquery: { type: 'apt', cmd: 'sudo apt install -y osquery' },
  velociraptor: { type: 'download', cmd: 'Download the binary from github.com/Velocidex/velociraptor/releases' },
  lynis: { type: 'apt', cmd: 'sudo apt install -y lynis' },
  clamav: { type: 'apt', cmd: 'sudo apt install -y clamav && sudo freshclam' },

  shodan: { type: 'pipx', cmd: 'pipx install shodan && shodan init YOUR_API_KEY' },
  intelowl: { type: 'docker', cmd: 'git clone https://github.com/intelowlproject/IntelOwl.git && cd IntelOwl && ./start prod up' },
  misp: { type: 'docker', cmd: 'git clone https://github.com/MISP/misp-docker.git && cd misp-docker && docker compose up -d' },
  maltego: { type: 'download', cmd: 'Download the client from maltego.com/downloads' },
  otx: { type: 'service', cmd: 'Web service — browse at otx.alienvault.com (API: pip install OTXv2)' },
  threatfox: { type: 'service', cmd: 'Web service / API — see threatfox.abuse.ch' },
  urlhaus: { type: 'service', cmd: 'Web service / API — see urlhaus.abuse.ch' },
  malwarebazaar: { type: 'service', cmd: 'Web service / API — see bazaar.abuse.ch' },
  greynoise: { type: 'pipx', cmd: 'pipx install greynoise && greynoise setup -k YOUR_API_KEY' },
  abuseipdb: { type: 'service', cmd: 'Web service / API — register at abuseipdb.com' },
  recordedfuture: { type: 'service', cmd: 'Commercial SaaS — access via recordedfuture.com' },
  threatconnect: { type: 'service', cmd: 'Commercial SaaS — access via threatconnect.com' },
  virustotal: { type: 'service', cmd: 'Web service / API — use virustotal.com (CLI: vt)' },

  metasploit: { type: 'apt', cmd: 'sudo apt install -y metasploit-framework' },
  cobaltstrike: { type: 'download', cmd: 'Licensed download from fortra.com after purchase' },
  sliver: { type: 'script', cmd: 'curl https://sliver.sh/install | sudo bash' },
  mythic: { type: 'docker', cmd: 'git clone https://github.com/its-a-feature/Mythic.git && cd Mythic && sudo ./mythic-cli start' },
  havoc: { type: 'git', cmd: 'git clone https://github.com/HavocFramework/Havoc.git && cd Havoc && make' },
  empire: { type: 'apt', cmd: 'sudo apt install -y powershell-empire' },
  adaptix: { type: 'git', cmd: 'git clone https://github.com/Adaptix-Framework/AdaptixC2.git && cd AdaptixC2 && make' },
}

// Prerequisites to install once before the per-tool commands.
export const prerequisites = [
  {
    id: 'env',
    title: 'Prepare a testing environment',
    body: 'Use a dedicated Linux VM (Kali or Ubuntu work well). Keep offensive tools off your daily machine and only test systems you are authorized to assess.',
    cmd: 'sudo apt update && sudo apt upgrade -y',
  },
  {
    id: 'build',
    title: 'Install common toolchains',
    body: 'Several tools install through Go, Python (pipx), or Docker. Set these up once, then open a new terminal so the commands below just work.',
    cmd: 'sudo apt install -y git golang pipx docker.io && pipx ensurepath',
  },
  {
    id: 'path',
    title: 'Expose Go binaries on your PATH',
    body: 'Go installs tools into ~/go/bin. Add it to your PATH so you can run them from anywhere.',
    cmd: 'echo \'export PATH=$PATH:$HOME/go/bin\' >> ~/.bashrc && source ~/.bashrc',
  },
]
