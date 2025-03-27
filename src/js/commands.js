// js/commands.js

// Catégories de compétences pour l'aide et la validation
const skillCategories = ['infra', 'secu', 'devops', 'script', 'transverses'];

// Contenu textuel des commandes (FR)
const content = {
    banniere: `
<pre class="ascii-art" style="color: var(--color-prompt);">
███╗   ███╗ █████╗ ██╗  ██╗██╗  ██╗ █████╗ ██╗     
████╗ ████║██╔══██╗██║ ██╔╝██║  ██║██╔══██╗██║     
██╔████╔██║███████║█████╔╝ ███████║███████║██║     
██║╚██╔╝██║██╔══██║██╔═██╗ ██╔══██║██╔══██║██║     
██║ ╚═╝ ██║██║  ██║██║  ██╗██║  ██║██║  ██║███████╗
╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝
</pre>
<span class="line-system">NEXUS Interface v2.1 // Noyau d'Expertise : Mohamad El Akhal</span>
<span class="line-system">Statut : <span class="line-success">Opérationnel</span> // Heure Système : <span id="system-time">${new Date().toLocaleTimeString('fr-FR')}</span></span>
<span class="line-output">Accès Racine confirmé. Interface prête.</span>
<span class="line-output">Entrez '<span class="line-highlight">aide</span>' pour explorer les commandes disponibles.</span>
<div class="separator"></div>
`,
    aide: `
<span class="line-header">Manuel d'Interaction NEXUS v2.1</span>
<span class="line-output">Commandes principales :</span>
  <span class="line-prompt">aide</span> / <span class="line-prompt">help</span>         Affiche ce manuel.
  <span class="line-prompt">profil</span> / <span class="line-prompt">about</span>        Présente le profil de Mohamad El Akhal.
  <span class="line-prompt">competences</span> [cat]    Explore la matrice des compétences.
                 <span class="line-system">Options: ${skillCategories.join(', ')}, tout</span>
  <span class="line-prompt">blog</span>             Lien vers le portail externe Makhal.fr.
  <span class="line-prompt">contact</span>          Liste les canaux de communication.

<span class="line-output">Commandes utilitaires :</span>
  <span class="line-prompt">banniere</span> / <span class="line-prompt">banner</span>     Réaffiche l'écran d'accueil.
  <span class="line-prompt">effacer</span> / <span class="line-prompt">clear</span>      Nettoie l'affichage du terminal.
  <span class="line-prompt">date</span>             Affiche la date et l'heure système.
  <span class="line-prompt">echo [texte]</span>     Répète le texte fourni.

<span class="line-system">Astuce : Utilisez la touche [Tab] pour l'auto-complétion. Les flèches [↑]/[↓] naviguent dans l'historique.</span>
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
        categories: `
<span class="line-header">Matrice des Compétences // Catégories</span>
<span class="line-output">Explorez une catégorie pour afficher les détails :</span>
<span class="line-prompt">competences [nom_de_la_categorie]</span>

<span class="line-output">Catégories disponibles (cliquables ou via commande) :</span>
<div class="skills-categories-list">
  ${skillCategories.map(cat => `<span onclick="executeCommand('competences ${cat}')">◈ ${cat}</span>`).join('')}
</div>
<span class="line-system">Utilisez 'competences tout' pour l'affichage complet.</span>
`,
        tout: ``, // Sera généré dynamiquement
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
<li>Orchestration de conteneurs <strong>Docker</strong> & <strong>Kubernetes</strong> : Conception de clusters résilients (y compris bare-metal sans kubeadm), Déploiement via Helm/Kustomize, Sécurisation (RBAC, PodSecurityPolicies/Admission), Service Mesh (Istio - bases).</li>
<li>Implémentation de pipelines <strong>CI/CD</strong> robustes : Intégration et Déploiement Continus avec <strong>Jenkins</strong> (Pipeline as Code), <strong>GitLab CI</strong>, <strong>GitHub Actions</strong>.</li>
<li>Monitoring & Observabilité : Stacks <strong>Prometheus</strong> & <strong>Grafana</strong> (Tableaux de bord, Alerting), Tracing distribué (Jaeger - concepts), Logging centralisé (Loki).</li>
<li>Gestion de configuration et automatisation des déploiements applicatifs.</li>
</ul></div>`,
        script: `
<div class="skill-category"><h3>Scripting & Développement</h3><ul class="skill-list">
<li>Scripting système avancé en <strong>Bash</strong> : Automatisation de tâches complexes, manipulation de fichiers, gestion des processus.</li>
<li>Développement <strong>Python</strong> : Création d'outils CLI performants (Argparse, Click), scripts d'automatisation d'infrastructure (interaction avec APIs Cloud/Proxmox), traitement de données.</li>
<li>Intégration et consommation d'<strong>APIs REST</strong> : Utilisation de librairies (requests), gestion de l'authentification (OAuth, Tokens).</li>
<li>Sensibilisation forte aux bonnes pratiques de développement sécurisé (principes OWASP Top 10, analyse statique - SAST).</li>
<li>(Notions de Go pour l'outillage système).</li>
</ul></div>`,
        transverses: `
<div class="skill-category"><h3>Compétences Transverses & Savoir-être</h3><ul class="skill-list">
<li><strong>Résolution de problèmes complexes</strong> : Approche analytique structurée, diagnostic 'root cause', capacité à investiguer en profondeur.</li>
<li>Excellente capacité d'<strong>analyse</strong> technique, de synthèse et rédaction de documentation claire et concise.</li>
<li><strong>Pédagogie</strong> & Vulgarisation : Aptitude à transmettre des connaissances techniques, animation d'ateliers (potentiel).</li>
<li><strong>Autonomie</strong>, forte initiative et veille technologique permanente sur les nouvelles menaces et solutions.</li>
<li>Esprit d'équipe, collaboration efficace et communication adaptée à différents interlocuteurs (techniques/non-techniques).</li>
<li>Création et partage actif de connaissances via le <strong>Blog Makhal.fr</strong>.</li>
</ul></div>`,
    },
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
  <span class="line-output">◈ GitHub   : <a href="https://github.com/Tutanka01" target="_blank" rel="noopener noreferrer">Projets & Contributions</a></span>
<span class="line-warning">La discrétion est assurée.</span>
`,
    // Pas de section 'flux' ici
    inconnu: (cmd) => `<span class="line-error">Accès refusé : Commande '${cmd}' inconnue. Consulter '<span class="line-highlight">aide</span>'.</span>`,
    echo: (text) => `<span class="line-output">${text || '<span class="line-system">(vide)</span>'}</span>`,
    date: () => `<span class="line-output">${new Date().toLocaleString('fr-FR', { dateStyle: 'full', timeStyle: 'medium' })}</span>`,
};

// Génère le contenu 'tout' pour les compétences
content.competences.tout = skillCategories
    .map(k => content.competences[k])
    .join('<div class="separator" style="opacity:0.2; margin: 1.8em 0;"></div>');

// Exporte le contenu et les catégories pour main.js
export { content, skillCategories };