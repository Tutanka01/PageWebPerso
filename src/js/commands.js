// js/commands.js

const skillCategories = ['infra', 'secu', 'devops', 'script', 'transverses'];
const availableThemes = ['default', 'matrix', 'amber'];
const availableSettings = ['scanlines', 'flicker', 'canvas'];

// --- Structure pour les Projets ---
const projectData = {
    // Identifiant unique (utilisé dans la commande `projets [id]`)
    'pve-ceph': {
        title: "Plateforme Virtualisation HA (Proxmox/Ceph)",
        content: `
<div class="project-entry">
  <h3>Plateforme de Virtualisation Haute Disponibilité</h3>
  <ul class="project-details">
    <li>◈ Conception et déploiement d'un cluster <strong>Proxmox VE</strong> avec stockage distribué <strong>Ceph</strong>.</li>
    <li>◈ Mise en place de la haute disponibilité pour les VMs et conteneurs critiques.</li>
    <li>◈ Automatisation de la configuration initiale et des mises à jour via <strong>Ansible</strong>.</li>
    <li>◈ Monitoring avec <strong>Prometheus/Grafana</strong>.</li>
  </ul>
</div>`
    },
    'siem-wazuh': {
        title: "SIEM Open Source (Wazuh/ELK)",
        content: `
<div class="project-entry">
  <h3>Système de Détection d'Intrusion (SIEM) Open Source</h3>
  <ul class="project-details">
    <li>◈ Déploiement et configuration de <strong>Wazuh</strong> pour la surveillance de sécurité (intégrité des fichiers, détection de rootkits, analyse de logs).</li>
    <li>◈ Intégration avec <strong>Elasticsearch/Kibana</strong> pour la visualisation et l'analyse des alertes.</li>
    <li>◈ Développement de règles de corrélation personnalisées pour détecter des scénarios d'attaque spécifiques.</li>
    <li>◈ <a href="https://github.com/Tutanka01/Wazuh-SIEM-Setup" target="_blank" rel="noopener noreferrer">[Voir sur GitHub]</a></li>
  </ul>
</div>`
    },
    'cicd-gitlab': {
        title: "Pipeline CI/CD (GitLab/Kubernetes)",
        content: `
<div class="project-entry">
  <h3>Pipeline CI/CD pour Applications Conteneurisées</h3>
  <ul class="project-details">
    <li>◈ Création de pipelines <strong>GitLab CI</strong> pour builder, tester et déployer des applications <strong>Docker</strong> sur <strong>Kubernetes</strong>.</li>
    <li>◈ Utilisation de <strong>Helm</strong> pour le packaging et la gestion des déploiements.</li>
    <li>◈ Intégration d'analyses de sécurité statiques (SAST) et de scan d'images Docker.</li>
  </ul>
</div>`
    },
    'mohterm': {
        title: "MohTerm (Ce Portfolio !)",
        content: `
<div class="project-entry">
  <h3>MohTerm (Ce Portfolio Interactif)</h3>
  <ul class="project-details">
    <li>◈ Développement d'un portfolio interactif sous forme de terminal web avec focus UX.</li>
    <li>◈ Utilisation de HTML, CSS (variables, animations, thèmes), et JavaScript (ES6 Modules, Canvas).</li>
    <li>◈ Fonctionnalités : historique, auto-complétion, thèmes, paramètres, aide structurée, projets détaillables.</li>
    <li>◈ Conteneurisé avec <strong>Docker/Nginx</strong> pour un déploiement facile.</li>
    <li>◈ <a href="https://github.com/Tutanka01/mohterm-portfolio" target="_blank" rel="noopener noreferrer">[Voir sur GitHub]</a></li>
  </ul>
</div>`
    }
    // Ajoute d'autres projets ici avec un identifiant unique
};

// --- Structure pour l'Aide ---
const helpData = {
    categories: {
        'info': "Commandes d'Information",
        'perso': "Personnalisation de l'Interface",
        'util': "Utilitaires du Terminal",
        'sys': "Surveillance Système (Simulée)", // Nouvelle catégorie
    },
    commands: {
        'aide': { category: 'util', description: "Affiche l'aide. Usage : `aide` (catégories), `aide [catégorie]`, `aide [commande]`." },
        'help': { category: 'util', aliasFor: 'aide' },
        'profil': { category: 'info', description: "Présente le profil de Mohamad El Akhal." },
        'about': { category: 'info', aliasFor: 'profil' },
        'competences': { category: 'info', description: "Explore la matrice des compétences. Usage : `competences` (catégories), `competences [catégorie]`, `competences tout`." },
        'skills': { category: 'info', aliasFor: 'competences' },
        'projets': { category: 'info', description: "Liste les projets notables ou affiche les détails. Usage : `projets` (liste), `projets [id_projet]`." },
        'projects': { category: 'info', aliasFor: 'projets' },
        'cv': { category: 'info', description: "Fournit le lien de téléchargement du CV au format PDF." },
        'resume': { category: 'info', aliasFor: 'cv' },
        'blog': { category: 'info', description: "Affiche le lien vers le blog externe Makhal.fr." },
        'contact': { category: 'info', description: "Liste les canaux de communication (LinkedIn, GitHub)." },
        'theme': { category: 'perso', description: `Change le thème visuel. Usage : \`theme\` (liste), \`theme [${availableThemes.join('|')}]\`.` },
        'settings': { category: 'perso', description: `Active/désactive des effets visuels. Usage : \`settings\` (liste), \`settings [${availableSettings.join('|')}] [on|off]\`.` },
        'banniere': { category: 'util', description: "Réaffiche l'écran d'accueil (bannière ASCII et infos système)." },
        'banner': { category: 'util', aliasFor: 'banniere' },
        'effacer': { category: 'util', description: "Nettoie l'affichage complet du terminal." },
        'clear': { category: 'util', aliasFor: 'effacer' },
        'date': { category: 'util', description: "Affiche la date et l'heure système actuelles." },
        'echo': { category: 'util', description: "Répète le texte fourni en argument. Usage : `echo [votre texte]`." },
        // Nouvelle commande HTOP
        'htop': { category: 'sys', description: "Affiche un aperçu simulé de l'utilisation des ressources système (CPU, RAM, processus)." },
        'sysmon': { category: 'sys', aliasFor: 'htop' },
    }
};

// --- Fonctions Utilitaires pour HTOP ---
const formatBytes = (bytes, decimals = 1) => {
    if (bytes === 0) return '0B';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'K', 'M', 'G', 'T', 'P'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    // Utilise toLocaleString pour potentiellement ajouter des séparateurs de milliers si nécessaire
    // mais parseFloat est plus simple ici pour juste le formatage numérique.
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomFloat = (min, max, decimals = 1) => {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
    return parseFloat(str);
}

// --- Générateurs de contenu pour HTOP ---
const generateHtopContent = () => {
    const numCpus = 12;
    const totalRamGB = 128;
    const totalSwapGB = 64; // Swap généreux aussi
    const ramUsagePercent = getRandomFloat(55, 85); // > 50% comme demandé
    const swapUsagePercent = getRandomFloat(5, 25); // Swap utilisé mais pas trop

    // CPU Bars
    let cpuBarsHtml = '';
    for (let i = 1; i <= numCpus; i++) {
        const usage = getRandomFloat(5, 95); // Fluctuation large
        let barColorVar = '--color-htop-cpu-low';
        if (usage > 75) barColorVar = '--color-htop-cpu-high';
        else if (usage > 40) barColorVar = '--color-htop-cpu-medium';

        cpuBarsHtml += `
<span class="htop-cpu-core"> <span class="htop-label">${i}</span><span class="htop-bar"><span class="htop-bar-inner" style="width: ${usage.toFixed(1)}%; background-color: var(${barColorVar});"></span></span><span class="htop-percentage">${usage.toFixed(1)}%</span></span>`;
    }

    // Memory / Swap Meters
    const usedRamBytes = (totalRamGB * 1024 * 1024 * 1024) * (ramUsagePercent / 100);
    const totalRamBytes = totalRamGB * 1024 * 1024 * 1024;
    const usedSwapBytes = (totalSwapGB * 1024 * 1024 * 1024) * (swapUsagePercent / 100);
    const totalSwapBytes = totalSwapGB * 1024 * 1024 * 1024;

    const memMeterHtml = `
<span class="htop-meter"> <span class="htop-label">Mem</span><span class="htop-bar"><span class="htop-bar-inner" style="width: ${ramUsagePercent.toFixed(1)}%; background-color: var(--color-htop-mem);"></span></span><span class="htop-text">${formatBytes(usedRamBytes)}/${formatBytes(totalRamBytes)}</span></span>`;
    const swapMeterHtml = `
<span class="htop-meter"> <span class="htop-label">Swp</span><span class="htop-bar"><span class="htop-bar-inner" style="width: ${swapUsagePercent.toFixed(1)}%; background-color: var(--color-htop-swap);"></span></span><span class="htop-text">${formatBytes(usedSwapBytes)}/${formatBytes(totalSwapBytes)}</span></span>`;

    // Summary
    const tasks = getRandomInt(250, 600);
    const running = getRandomInt(1, 5);
    const loadAvg1 = getRandomFloat(0.5, 4.0, 2);
    const loadAvg5 = getRandomFloat(0.4, loadAvg1 * 0.9, 2);
    const loadAvg15 = getRandomFloat(0.3, loadAvg5 * 0.8, 2);
    const uptimeDays = getRandomInt(1, 45);
    const uptimeHours = getRandomInt(0, 23);
    const uptimeMins = getRandomInt(0, 59);
    const uptimeSecs = getRandomInt(0, 59);

    const summaryHtml = `
<div class="htop-summary"> Tasks: <span class="value">${tasks}</span>, <span class="value">${running}</span> running | Load average: <span class="value">${loadAvg1.toFixed(2)}</span> <span class="value">${loadAvg5.toFixed(2)}</span> <span class="value">${loadAvg15.toFixed(2)}</span> | Uptime: <span class="value">${uptimeDays} days, ${String(uptimeHours).padStart(2,'0')}:${String(uptimeMins).padStart(2,'0')}:${String(uptimeSecs).padStart(2,'0')}</span></div>`;

    // Process List
    let processListHtml = `
<div class="htop-process-header"> <span class="htop-pid">PID</span><span class="htop-user">USER</span><span class="htop-pri">PRI</span><span class="htop-ni">NI</span><span class="htop-virt">VIRT</span><span class="htop-res">RES</span><span class="htop-shr">SHR</span><span class="htop-s">S</span><span class="htop-cpu">%CPU</span><span class="htop-mem">%MEM</span><span class="htop-time">TIME+</span><span class="htop-command">Command</span></div>`;

    const users = ['root', 'moh', 'www-data', 'postgres', 'docker', 'systemd+'];
    const commands = [
        '/usr/lib/systemd/systemd --switched-root --system --deserialize 31',
        '[kthreadd]',
        '[rcu_gp]', '[rcu_par_gp]', '[slub_flushwq]',
        '[kdevtmpfs]', '[netns]', '[khungtaskd]', '[oom_reaper]', '[writeback]', '[kcompactd0]',
        '[ksmd]', '[khugepaged]', '[kintegrityd]', '[kblockd]', '[blkcg_punt_bio]', '[edac-poller]',
        '[devfreq_wq]', '/usr/sbin/irqbalance --foreground', '[kworker/u32:1-events_unbound]',
        '/usr/lib/systemd/systemd-journald', '/usr/lib/systemd/systemd-udevd',
        '/usr/bin/dbus-daemon --system --address=systemd: --nofork --nopidfile --systemd-activation --syslog-only',
        '/usr/lib/systemd/systemd-logind', '/usr/bin/containerd',
        '/usr/sbin/sshd -D', '/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock',
        'nginx: master process /usr/sbin/nginx -g daemon off;', 'nginx: worker process',
        'python3 /opt/app/main.py --config /etc/app.conf',
        'node /srv/api/server.js',
        'postgres: 16/main: checkpointer', 'postgres: 16/main: background writer', 'postgres: 16/main: walwriter',
        '/bin/bash', 'htop',
        '[kworker/0:1H-kblockd]', '[kworker/1:0-events]', '[kworker/5:2-events_power_efficient]'
    ];
    const statuses = ['R', 'S', 'S', 'S', 'S', 'S', 'D', 'Z', 'T']; // R=Running, S=Sleeping, D=Disk Sleep, Z=Zombie, T=Stopped

    let pidCounter = getRandomInt(1, 1500);
    for (let i = 0; i < 20; i++) { // Show ~20 processes
        pidCounter += getRandomInt(1, 10);
        const user = users[getRandomInt(0, users.length - 1)];
        const pri = getRandomInt(15, 25);
        const ni = pri === 20 ? 0 : getRandomInt(-10, 10);
        const virtBytes = getRandomInt(50, 4000) * 1024 * 1024; // 50M - 4G
        const virt = formatBytes(virtBytes);
        const resRatio = getRandomFloat(0.1, 0.8);
        const resBytes = virtBytes * resRatio;
        const res = formatBytes(resBytes);
        const shrRatio = getRandomFloat(0.05, resRatio * 0.5);
        const shrBytes = virtBytes * shrRatio;
        const shr = formatBytes(shrBytes);
        const status = statuses[getRandomInt(0, statuses.length - 1)];
        const cpu = status === 'R' ? getRandomFloat(1.0, 25.0) : getRandomFloat(0.0, 0.5); // Higher CPU if Running
        const mem = (resBytes / totalRamBytes) * 100;
        const timeM = getRandomInt(0, 150);
        const timeS = getRandomFloat(0, 59.99, 2);
        const timeStr = `${timeM}:${String(timeS.toFixed(2)).padStart(5, '0')}`;
        const command = commands[getRandomInt(0, commands.length - 1)];
        const isHighlighted = Math.random() < 0.15; // Highlight ~15% of processes

        processListHtml += `
<div class="htop-process${isHighlighted ? ' htop-process-highlight' : ''}"> <span class="htop-pid">${pidCounter}</span><span class="htop-user">${user}</span><span class="htop-pri">${pri}</span><span class="htop-ni">${ni}</span><span class="htop-virt">${virt}</span><span class="htop-res">${res}</span><span class="htop-shr">${shr}</span><span class="htop-s">${status}</span><span class="htop-cpu">${cpu.toFixed(1)}</span><span class="htop-mem">${mem.toFixed(1)}</span><span class="htop-time">${timeStr}</span><span class="htop-command">${command}</span></div>`;
    }

    // Assemble final HTML
    return `
<div class="htop-container">
  <div class="htop-cpus">${cpuBarsHtml}</div>
  <div class="htop-meters">${memMeterHtml}${swapMeterHtml}</div>
  ${summaryHtml}
  ${processListHtml}
</div>`;
};


// --- Contenu Principal ---
const content = {
    banniere: `
<pre class="ascii-art" style="color: var(--color-prompt);">
███╗   ███╗ ███████╗ ██╗  ██╗ ███████╗ ███████╗ ███████╗ ███╗   ███╗
████╗ ████║ ██╔════╝ ██║  ██║ ██╔════╝ ██╔════╝ ██╔════╝ ████╗ ████║
██╔████╔██║ ███████╗ ███████║ ███████╗ ███████╗ ███████╗ ██╔████╔██║
██║╚██╔╝██║ ╚════██║ ██╔══██║ ╚════██║ ╚════██║ ╚════██║ ██║╚██╔╝██║
██║ ╚═╝ ██║ ███████║ ██║  ██║ ███████║ ███████║ ███████║ ██║ ╚═╝ ██║
╚═╝     ╚═╝ ╚══════╝ ╚═╝  ╚═╝ ╚══════╝ ╚══════╝ ╚══════╝ ╚═╝     ╚═╝
</pre>
<span class="line-system">MohTerm Interface v1.1 // Noyau d'Expertise : Mohamad El Akhal</span>
<span class="line-system">Statut : <span class="line-success">Opérationnel</span> // Heure Système : <span id="system-time">${new Date().toLocaleTimeString('fr-FR')}</span></span>
<span class="line-output">Accès Racine confirmé. Interface prête.</span>
<span class="line-output">Entrez '<span class="line-highlight">aide</span>' pour explorer les commandes disponibles.</span>
<div class="separator"></div>
`,
    // --- Fonctions pour générer l'aide ---
    aide: {
        // `aide` (sans args)
        renderCategories: () => `
<div class="help-header">
  <span class="line-header">Manuel d'Interaction MohTerm v1.1</span>
  <span class="line-output">Utilisez <span class="line-highlight">aide [catégorie]</span> ou <span class="line-highlight">aide [commande]</span> pour plus de détails.</span>
  <span class="line-output">Les catégories et commandes essentielles sont cliquables.</span>
</div>
<div class="help-categories-list clickable-list">
  ${Object.entries(helpData.categories).map(([key, title]) =>
    // Utilise data-attributes pour le clic
    `<span data-command-prefix="aide" data-command-value="${key}">◈ ${title} (${key})</span>`
  ).join('')}
</div>
<span class="line-output">Commandes essentielles :</span>
<div class="help-section">
  ${['aide', 'profil', 'competences', 'projets', 'cv', 'contact', 'htop', 'effacer'] // Ajout de htop aux essentiels
    .map(cmdName => content.aide.renderCommandHelp(cmdName, true)) // true pour format court
    .join('')}
</div>
<span class="line-system">Astuce : Utilisez [Tab] pour l'auto-complétion et [↑]/[↓] pour l'historique.</span>
`,
        // `aide [categorie]`
        renderCategoryHelp: (categoryKey) => {
            const categoryTitle = helpData.categories[categoryKey];
            if (!categoryTitle) return content.aide.renderNotFoundError(categoryKey);

            const commandsInCategory = Object.entries(helpData.commands)
                .filter(([name, data]) => data.category === categoryKey && !data.aliasFor) // Affiche seulement les commandes principales de la catégorie
                .map(([name, data]) => content.aide.renderCommandHelp(name)); // Format long par défaut

            return `
<span class="help-category-title">${categoryTitle}</span>
<div class="help-section">
  ${commandsInCategory.join('') || '<span class="line-system">(Aucune commande principale dans cette catégorie)</span>'}
</div>
<span class="line-system">Utilisez \`aide [commande]\` pour plus de détails sur une commande spécifique.</span>`;
        },
        // `aide [commande]` ou rendu court/long
        renderCommandHelp: (commandName, short = false) => {
            let cmdData = helpData.commands[commandName];
            if (!cmdData) return ''; // Ne rien afficher si commande inconnue dans ce contexte

            // Gérer les alias
            const originalName = cmdData.aliasFor ? cmdData.aliasFor : commandName;
            if (cmdData.aliasFor) {
                cmdData = helpData.commands[originalName];
                 if (!cmdData) return ''; // Sécurité
            }

            const aliases = Object.entries(helpData.commands)
                              .filter(([name, data]) => data.aliasFor === originalName)
                              .map(([name]) => name);
            // Crée la partie commande, cliquable pour obtenir l'aide détaillée si en mode court
            const commandPartHTML = [originalName, ...aliases]
                .map(c => `<span class="line-prompt" ${short ? `data-command-prefix="aide" data-command-value="${originalName}"` : ''}>${c}</span>`)
                .join(' / ');

            if (short) {
                 // Format court pour la liste essentielle
                 return `<div class="help-entry"><span class="help-command">${commandPartHTML}</span> <span class="help-description">${cmdData.description.split('.')[0]}.</span></div>`;
            } else {
                 // Format standard (description complète)
                 return `<div class="help-entry"><span class="help-command">${commandPartHTML}</span> <span class="help-description">${cmdData.description}</span></div>`;
            }
        },
        // Erreur si catégorie/commande inconnue
        renderNotFoundError: (term) => `
<span class="line-error">Terme d'aide inconnu : '${term}'</span>
<span class="line-output">Utilisez <span class="line-highlight">aide</span> pour voir les catégories disponibles.</span>`
    },

    // --- Profil ---
    profil: `
<span class="line-header">Profil Opérateur // Mohamad El Akhal // Architecte & Spécialiste Cyber/Infra</span>
<span class="line-output">Ma mission : concevoir, automatiser et sécuriser les infrastructures numériques critiques. Je transforme la complexité en systèmes <span class="line-highlight">fiables</span>, <span class="line-highlight">évolutifs</span> et <span class="line-highlight">résistants</span> aux menaces modernes.</span>

<span class="line-output">Expertise Technique Clé :</span>
  <span class="line-output">◈ Administration avancée des systèmes <strong>Linux</strong> (Debian, Ubuntu, Fedora) et <strong>Windows Server</strong>.</span>
  <span class="line-output">◈ Conception et gestion de plateformes de virtualisation robustes (<strong>Proxmox</strong>, <strong>Ceph</strong>).</span>
  <span class="line-output">◈ Orchestration de conteneurs à grande échelle avec <strong>Kubernetes</strong> et <strong>Docker</strong>.</span>
  <span class="line-output">◈ Automatisation systématique via Infrastructure as Code (<strong>Ansible</strong>).</span>

<span class="line-output">Focus Cybersécurité :</span>
  <span class="line-output">◈ Implémentation de stratégies de défense en profondeur (Pare-feu <strong>Stormshield</strong>, Segmentation Réseau).</span>
  <span class="line-output">◈ Détection proactive et réponse aux incidents via <strong>SIEM</strong> (<strong>Wazuh</strong>, <strong>ELK Stack</strong>).</span>
  <span class="line-output">◈ Hardening système, analyse de vulnérabilités, et compréhension des techniques d'attaque/défense (évasion).</span>
  <span class="line-output">◈ Accompagnement à la conformité et aux bonnes pratiques (<strong>ISO27001</strong>).</span>

<span class="line-output">Philosophie : Partage & amélioration continue. Contributeur sur <a href="https://makhal.fr" target="_blank" rel="noopener noreferrer">Makhal.fr</a>, visant à démocratiser l'expertise technique.</span>
`,

    // --- Compétences ---
    competences: {
        categories: `
<span class="line-header">Matrice des Compétences // Catégories</span>
<span class="line-output">Explorez une catégorie pour afficher les détails :</span>
<span class="line-prompt">competences [nom_de_la_categorie]</span>
<span class="line-output">Catégories disponibles (cliquables ou via commande) :</span>
<div class="skills-categories-list clickable-list">
  ${skillCategories.map(cat => `<span data-command-prefix="competences" data-command-value="${cat}">◈ ${cat}</span>`).join('')}
</div>
<span class="line-system">Utilisez 'competences tout' pour l'affichage complet.</span>`,
        tout: ``, // Sera généré dynamiquement plus bas
        infra: `
<div class="skill-category"><h3>Infrastructure & Systèmes</h3><ul class="skill-list">
<li>Administration experte <strong>Linux</strong> (Debian, Ubuntu, Fedora) & <strong>Windows Server</strong> : Optimisation, Sécurisation, Dépannage avancé.</li>
<li>Conception & Gestion de clusters <strong>Proxmox</strong> : Virtualisation KVM/QEMU, Haute Disponibilité, Stockage distribué <strong>Ceph</strong> optimisé.</li>
<li>Déploiement & Administration de stockage objet S3 compatible <strong>MinIO</strong> : Scalabilité, Résilience et Sécurité des données.</li>
<li>Gestion & Optimisation de bases de données relationnelles (<strong>MySQL</strong>, <strong>PostgreSQL</strong>) : Performance, Sauvegarde, Réplication.</li>
<li>Configuration & Maintenance de serveurs mail sécurisés (<strong>Postfix</strong>, DKIM, SPF, DMARC) : Délivrabilité et Protection anti-spam.</li>
</ul></div>`,
        secu: `
<div class="skill-category"><h3>Réseaux & Cybersécurité</h3><ul class="skill-list">
<li>Expertise Pare-feu <strong>Stormshield</strong> : Configuration avancée (Filtrage applicatif, IPS, VPN IPSec/SSL), Analyse de logs, Haute Disponibilité.</li>
<li>Architecture Réseau Sécurisée : Conception Zero Trust (micro-segmentation), DMZ, Contrôle d'accès réseau (NAC - bases).</li>
<li>Déploiement & Exploitation <strong>SIEM</strong> : <strong>Wazuh</strong> (EDR/FIM/SCA), <strong>ELK Stack</strong> (Elasticsearch, Logstash, Kibana), <strong>Graylog</strong> pour la centralisation et l'analyse de logs de sécurité.</li>
<li>Threat Hunting & Corrélation d'événements pour la détection proactive d'incidents.</li>
<li>Audit & Accompagnement à la conformité <strong>ISO27001</strong> : Analyse de risques (EBIOS RM), Plan de traitement, Politiques de sécurité (PSSI).</li>
<li>Analyse de Vulnérabilités (Nessus, OpenVAS) & compréhension des techniques de Pentesting. Maîtrise des concepts d'<strong>évasion de sandbox</strong> et d'anti-analyse.</li>
<li>Mise en place & Gestion de VPN sécurisés : <strong>OpenVPN</strong>, <strong>WireGuard</strong> avec gestion centralisée des accès.</li>
</ul></div>`,
        devops: `
<div class="skill-category"><h3>DevOps & Automatisation</h3><ul class="skill-list">
<li>Maîtrise de l'Infrastructure as Code (IaC) avec <strong>Ansible</strong> : Développement de Playbooks idempotents, Rôles réutilisables, gestion des secrets (Vault).</li>
<li>Orchestration de conteneurs <strong>Docker</strong> & <strong>Kubernetes</strong> : Conception de clusters résilients (y compris bare-metal), Déploiement via Helm/Kustomize, Sécurisation (RBAC, Network Policies), Service Mesh (Istio - bases).</li>
<li>Implémentation de pipelines <strong>CI/CD</strong> robustes : Intégration et Déploiement Continus avec <strong>Jenkins</strong> (Pipeline as Code), <strong>GitLab CI</strong>, <strong>GitHub Actions</strong>.</li>
<li>Monitoring & Observabilité : Stacks <strong>Prometheus</strong> & <strong>Grafana</strong> (Tableaux de bord, Alerting), Logging centralisé (Loki, EFK).</li>
<li>Gestion de configuration et automatisation des déploiements applicatifs.</li>
</ul></div>`,
        script: `
<div class="skill-category"><h3>Scripting & Développement</h3><ul class="skill-list">
<li>Scripting système avancé en <strong>Bash</strong> : Automatisation de tâches complexes, manipulation de fichiers, gestion des processus.</li>
<li>Développement <strong>Python</strong> : Création d'outils CLI (Argparse, Click), scripts d'automatisation (APIs Cloud/Proxmox), traitement de données.</li>
<li>Intégration et consommation d'<strong>APIs REST</strong> : Utilisation de librairies (requests), gestion de l'authentification (Tokens, OAuth).</li>
<li>Bonnes pratiques de développement sécurisé (OWASP Top 10, SAST - bases).</li>
<li>(Notions de Go pour l'outillage système).</li>
</ul></div>`,
        transverses: `
<div class="skill-category"><h3>Compétences Transverses & Savoir-être</h3><ul class="skill-list">
<li><strong>Résolution de problèmes complexes</strong> : Approche analytique, diagnostic 'root cause', investigation approfondie.</li>
<li>Capacité d'<strong>analyse</strong>, de synthèse et rédaction de documentation technique claire.</li>
<li><strong>Pédagogie</strong> & Vulgarisation : Aptitude à expliquer des concepts techniques complexes.</li>
<li><strong>Autonomie</strong>, initiative et veille technologique constante (menaces, solutions).</li>
<li>Esprit d'équipe, collaboration et communication adaptée (technique/non-technique).</li>
<li>Partage actif de connaissances via le <strong>Blog Makhal.fr</strong>.</li>
</ul></div>`,
    },

    // --- CV ---
    cv: `
<span class="line-header">Curriculum Vitae</span>
<span class="line-output">Téléchargez la version complète de mon CV au format PDF :</span>
<span class="line-output"><a href="cv/MohamadElAkhal_CV.pdf" target="_blank" download="MohamadElAkhal_CV.pdf">◈ MohamadElAkhal_CV.pdf</a></span>
<span class="line-system">(Assurez-vous que le fichier se trouve dans le dossier 'cv' à la racine du site)</span>
`,

    // --- Blog ---
    blog: `
<span class="line-header">Portail Externe // Makhal.fr</span>
<span class="line-output">Lien direct vers le hub de connaissances techniques de Mohamad El Akhal :</span>
<span class="line-output"><a href="https://makhal.fr" target="_blank" rel="noopener noreferrer">https://makhal.fr</a></span>
<span class="line-output">Explorez des articles, tutoriels et analyses sur la cybersécurité, l'infrastructure et le DevOps.</span>
`,

    // --- Contact ---
    contact: `
<span class="line-header">Canaux de Communication</span>
<span class="line-output">Pour discuter d'opportunités, de projets ou simplement échanger :</span>
  <span class="line-output">◈ LinkedIn : <a href="https://www.linkedin.com/in/mohamad-el-akhal-8b8319221/" target="_blank" rel="noopener noreferrer">Profil Mohamad El Akhal</a></span>
  <span class="line-output">◈ GitHub   : <a href="https://github.com/Tutanka01" target="_blank" rel="noopener noreferrer">Projets & Contributions (Tutanka01)</a></span>
<span class="line-warning">La discrétion est assurée pour les contacts professionnels.</span>
`,

    // --- Fonctions pour générer les projets ---
    projets: {
        // `projets` (sans args)
        renderList: () => `
<span class="line-header">Projets Notables</span>
<span class="line-output">Cliquez sur un titre ou utilisez <span class="line-highlight">projets [id]</span> pour voir les détails.</span>
<div class="project-list clickable-list">
  ${Object.entries(projectData).map(([id, project]) => `
    <div class="project-list-item">
      <span class="project-id">[${id}]</span>
      <span class="project-title" data-command-prefix="projets" data-command-value="${id}">${project.title}</span>
    </div>
  `).join('')}
</div>`,
        // `projets [id]`
        renderDetail: (projectId) => {
            const project = projectData[projectId.toLowerCase()]; // Assure la correspondance insensible à la casse
            if (!project) {
                return `<span class="line-error">Projet avec l'identifiant '${projectId}' non trouvé.</span>\n${content.projets.renderList()}`; // Affiche la liste en cas d'erreur
            }
            return `<div class="project-detail-output">${project.content}</div>`;
        }
    },

    // --- Thème ---
    theme: (themeName, success) => {
        if (success) {
            return `<span class="line-success">Thème '${themeName}' appliqué.</span>`;
        } else {
            return `<span class="line-error">Thème '${themeName}' inconnu.</span>\n<span class="line-system">Thèmes disponibles : ${availableThemes.join(', ')}.</span>`;
        }
    },
    themeList: () => `
<span class="line-header">Thèmes Visuels</span>
<span class="line-output">Choisissez un thème :</span>
<span class="line-prompt">theme [nom_theme]</span>
<div class="theme-list clickable-list">
  ${availableThemes.map(t => `<span data-command-prefix="theme" data-command-value="${t}">◈ ${t}</span>`).join('')}
</div>
`,

    // --- Settings ---
    settings: (setting, state, success) => {
        if (success) {
             return `<span class="line-success">Paramètre '${setting}' mis à '${state}'.</span>`;
        } else if (state === null) { // Si on demande juste le statut actuel
             return `<span class="line-output">Usage: settings [${availableSettings.join('|')}] [on|off]</span>`;
        } else {
             return `<span class="line-error">Paramètre ou état invalide.</span>\n<span class="line-output">Usage: settings [${availableSettings.join('|')}] [on|off]</span>`;
        }
    },
    settingsList: () => `
<span class="line-header">Paramètres Visuels</span>
<span class="line-output">Activez ou désactivez des effets :</span>
<span class="line-prompt">settings [nom_param] [on|off]</span>
<div class="settings-list clickable-list">
  ${availableSettings.map(s => `<span data-command-prefix="settings" data-command-value="${s}">◈ ${s}</span>`).join('')}
</div>
`,

    // --- HTOP ---
    htop: generateHtopContent, // La fonction est appelée à chaque fois pour générer le contenu

    // --- Utilitaires ---
    inconnu: (cmd) => `<span class="line-error">Accès refusé : Commande '<span class="line-highlight">${cmd}</span>' inconnue.</span>\n<span class="line-output">Consulter '<span class="line-highlight">aide</span>'.</span>`,
    echo: (text) => `<span class="line-output">${text || '<span class="line-system">(vide)</span>'}</span>`,
    date: () => `<span class="line-output">${new Date().toLocaleString('fr-FR', { dateStyle: 'full', timeStyle: 'medium' })}</span>`,
};

// Génère le contenu 'tout' pour les compétences
content.competences.tout = skillCategories
    .map(k => content.competences[k])
    .join('<div class="separator" style="opacity:0.2; margin: 1.8em 0;"></div>');

// Exporte tout ce qui est nécessaire pour main.js
export { content, skillCategories, availableThemes, availableSettings, helpData, projectData };