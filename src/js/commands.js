// js/commands.js

// Catégories de compétences pour l'aide et la validation
const skillCategories = ['infra', 'secu', 'devops', 'script', 'transverses'];
const availableThemes = ['default', 'matrix', 'amber'];
const availableSettings = ['scanlines', 'flicker', 'canvas'];

// Contenu textuel des commandes (FR) - Mis à jour avec MohTerm et nouvelles commandes
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
<span class="line-system">MohTerm Interface v1.0 // Noyau d'Expertise : Mohamad El Akhal</span>
<span class="line-system">Statut : <span class="line-success">Opérationnel</span> // Heure Système : <span id="system-time">${new Date().toLocaleTimeString('fr-FR')}</span></span>
<span class="line-output">Accès Racine confirmé. Interface prête.</span>
<span class="line-output">Entrez '<span class="line-highlight">aide</span>' pour explorer les commandes disponibles.</span>
<div class="separator"></div>
`,
    aide: `
<span class="line-header">Manuel d'Interaction MohTerm v1.0</span>

<div class="help-section">
  <span class="line-output">Commandes principales :</span>
  <div class="help-entry"><span class="help-command">aide / help</span>         <span class="help-description">Affiche ce manuel.</span></div>
  <div class="help-entry"><span class="help-command">profil / about</span>        <span class="help-description">Présente le profil de Mohamad El Akhal.</span></div>
  <div class="help-entry"><span class="help-command">competences [cat]</span> <span class="help-description">Explore la matrice des compétences.
                 <span class="line-system">Options: ${skillCategories.join(', ')}, tout</span></span></div>
  <div class="help-entry"><span class="help-command">projets / projects</span>    <span class="help-description">Liste les projets notables.</span></div>
  <div class="help-entry"><span class="help-command">cv / resume</span>         <span class="help-description">Lien de téléchargement du CV.</span></div>
  <div class="help-entry"><span class="help-command">blog</span>                <span class="help-description">Lien vers le portail externe Makhal.fr.</span></div>
  <div class="help-entry"><span class="help-command">contact</span>             <span class="help-description">Liste les canaux de communication.</span></div>
</div>

<div class="help-section">
  <span class="line-output">Commandes de personnalisation :</span>
  <div class="help-entry"><span class="help-command">theme [nom]</span>       <span class="help-description">Change le thème visuel.
                 <span class="line-system">Options: ${availableThemes.join(', ')}</span></span></div>
  <div class="help-entry"><span class="help-command">settings [opt] [on|off]</span> <span class="help-description">Active/désactive des effets visuels.
                 <span class="line-system">Options: ${availableSettings.join(', ')}</span></span></div>
</div>

<div class="help-section">
  <span class="line-output">Commandes utilitaires :</span>
  <div class="help-entry"><span class="help-command">banniere / banner</span>   <span class="help-description">Réaffiche l'écran d'accueil.</span></div>
  <div class="help-entry"><span class="help-command">effacer / clear</span>     <span class="help-description">Nettoie l'affichage du terminal.</span></div>
  <div class="help-entry"><span class="help-command">date</span>                <span class="help-description">Affiche la date et l'heure système.</span></div>
  <div class="help-entry"><span class="help-command">echo [texte]</span>        <span class="help-description">Répète le texte fourni.</span></div>
</div>

<span class="line-system">Astuce : Utilisez [Tab] pour l'auto-complétion et [↑]/[↓] pour l'historique.</span>
`,
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
    competences: {
        // Retrait des onclick ici
        categories: `
<span class="line-header">Matrice des Compétences // Catégories</span>
<span class="line-output">Explorez une catégorie pour afficher les détails :</span>
<span class="line-prompt">competences [nom_de_la_categorie]</span>

<span class="line-output">Catégories disponibles (cliquables ou via commande) :</span>
<div class="skills-categories-list">
  ${skillCategories.map(cat => `<span>◈ ${cat}</span>`).join('')}
</div>
<span class="line-system">Utilisez 'competences tout' pour l'affichage complet.</span>
`,
        tout: ``, // Généré dynamiquement
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
    projets: `
<span class="line-header">Projets Notables</span>
<span class="line-output">Quelques exemples de réalisations et contributions :</span>

<div class="projects-output">
  <div class="project-entry">
    <h3>Plateforme de Virtualisation Haute Disponibilité</h3>
    <ul class="project-details">
      <li>◈ Conception et déploiement d'un cluster <strong>Proxmox VE</strong> avec stockage distribué <strong>Ceph</strong>.</li>
      <li>◈ Mise en place de la haute disponibilité pour les VMs et conteneurs critiques.</li>
      <li>◈ Automatisation de la configuration initiale et des mises à jour via <strong>Ansible</strong>.</li>
      <li>◈ Monitoring avec <strong>Prometheus/Grafana</strong>.</li>
    </ul>
  </div>

  <div class="project-entry">
    <h3>Système de Détection d'Intrusion (SIEM) Open Source</h3>
    <ul class="project-details">
      <li>◈ Déploiement et configuration de <strong>Wazuh</strong> pour la surveillance de sécurité (intégrité des fichiers, détection de rootkits, analyse de logs).</li>
      <li>◈ Intégration avec <strong>Elasticsearch/Kibana</strong> pour la visualisation et l'analyse des alertes.</li>
      <li>◈ Développement de règles de corrélation personnalisées pour détecter des scénarios d'attaque spécifiques.</li>
      <li>◈ <a href="#" target="_blank" rel="noopener noreferrer">[Lien GitHub/Article de Blog si applicable]</a></li>
    </ul>
  </div>

   <div class="project-entry">
    <h3>Pipeline CI/CD pour Applications Conteneurisées</h3>
    <ul class="project-details">
      <li>◈ Création de pipelines <strong>GitLab CI</strong> pour builder, tester et déployer des applications <strong>Docker</strong> sur <strong>Kubernetes</strong>.</li>
      <li>◈ Utilisation de <strong>Helm</strong> pour le packaging et la gestion des déploiements.</li>
      <li>◈ Intégration d'analyses de sécurité statiques (SAST) et de scan d'images Docker.</li>
    </ul>
  </div>

   <div class="project-entry">
    <h3>MohTerm (Ce Portfolio !)</h3>
    <ul class="project-details">
      <li>◈ Développement d'un portfolio interactif sous forme de terminal web.</li>
      <li>◈ Utilisation de HTML, CSS (variables, animations), et JavaScript (ES6 Modules, Canvas).</li>
      <li>◈ Fonctionnalités : historique, auto-complétion, thèmes, paramètres.</li>
      <li>◈ Conteneurisé avec <strong>Docker/Nginx</strong> pour un déploiement facile.</li>
      <li>◈ <a href="https://github.com/Tutanka01/..." target="_blank" rel="noopener noreferrer">[Lien GitHub du projet]</a></li>
    </ul>
  </div>
</div>
`,
    cv: `
<span class="line-header">Curriculum Vitae</span>
<span class="line-output">Téléchargez la version complète de mon CV au format PDF :</span>
<span class="line-output"><a href="cv/MohamadElAkhal_CV.pdf" target="_blank" download="MohamadElAkhal_CV.pdf">◈ MohamadElAkhal_CV.pdf</a></span>
<span class="line-system">(Assurez-vous que le fichier se trouve dans le dossier 'cv' à la racine du projet)</span>
`,
    blog: `
<span class="line-header">Portail Externe // Makhal.fr</span>
<span class="line-output">Lien direct vers le hub de connaissances techniques de Mohamad El Akhal :</span>
<span class="line-output"><a href="https://makhal.fr" target="_blank" rel="noopener noreferrer">https://makhal.fr</a></span>
<span class="line-output">Explorez des articles, tutoriels et analyses sur la cybersécurité, l'infrastructure et le DevOps.</span>
`,
    contact: `
<span class="line-header">Canaux de Communication</span>
<span class="line-output">Pour discuter d'opportunités, de projets ou simplement échanger :</span>
  <span class="line-output">◈ LinkedIn : <a href="https://www.linkedin.com/in/mohamad-el-akhal-8b8319221/" target="_blank" rel="noopener noreferrer">Profil Mohamad El Akhal</a></span>
  <span class="line-output">◈ GitHub   : <a href="https://github.com/Tutanka01" target="_blank" rel="noopener noreferrer">Projets & Contributions (Tutanka01)</a></span>
<span class="line-warning">La discrétion est assurée pour les contacts professionnels.</span>
`,
    theme: (themeName, success) => {
        if (success) {
            return `<span class="line-success">Thème '${themeName}' appliqué.</span>`;
        } else {
            return `<span class="line-error">Thème '${themeName}' inconnu.</span>\n<span class="line-system">Thèmes disponibles : ${availableThemes.join(', ')}.</span>`;
        }
    },
    settings: (setting, state, success) => {
        if (success) {
             return `<span class="line-success">Paramètre '${setting}' mis à '${state}'.</span>`;
        } else if (state === null) { // Si on demande juste le statut actuel (non implémenté ici, mais possible)
             return `<span class="line-output">Usage: settings [${availableSettings.join('|')}] [on|off]</span>`;
        } else {
             return `<span class="line-error">Paramètre ou état invalide.</span>\n<span class="line-output">Usage: settings [${availableSettings.join('|')}] [on|off]</span>`;
        }
    },
    settingsList: () => `
<span class="line-header">Paramètres Visuels</span>
<span class="line-output">Activez ou désactivez des effets :</span>
<span class="line-prompt">settings [nom_param] [on|off]</span>
<div class="settings-list">
  ${availableSettings.map(s => `<span>◈ ${s}</span>`).join('')}
</div>
`,
   themeList: () => `
<span class="line-header">Thèmes Visuels</span>
<span class="line-output">Choisissez un thème :</span>
<span class="line-prompt">theme [nom_theme]</span>
<div class="theme-list">
  ${availableThemes.map(t => `<span>◈ ${t}</span>`).join('')}
</div>
`,
    inconnu: (cmd) => `<span class="line-error">Accès refusé : Commande '<span class="line-highlight">${cmd}</span>' inconnue.</span>\n<span class="line-output">Consulter '<span class="line-highlight">aide</span>'.</span>`,
    echo: (text) => `<span class="line-output">${text || '<span class="line-system">(vide)</span>'}</span>`,
    date: () => `<span class="line-output">${new Date().toLocaleString('fr-FR', { dateStyle: 'full', timeStyle: 'medium' })}</span>`,
};

// Génère le contenu 'tout' pour les compétences
content.competences.tout = skillCategories
    .map(k => content.competences[k])
    .join('<div class="separator" style="opacity:0.2; margin: 1.8em 0;"></div>');

// Exporte tout ce qui est nécessaire pour main.js
export { content, skillCategories, availableThemes, availableSettings };