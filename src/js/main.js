// js/main.js
import { content, skillCategories, availableThemes, availableSettings, helpData, projectData } from './commands.js';

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const terminalContainer = document.getElementById('terminal-container');
    const output = document.getElementById('terminal-output');
    const inputLine = document.getElementById('input-line');
    const input = document.getElementById('terminal-input');
    const promptElement = document.querySelector('.prompt');
    const cursor = document.querySelector('.cursor');

    // --- State ---
    let commandHistory = [];
    let historyIndex = -1;
    let isProcessing = false;
    let currentCommand = ''; // Garde la valeur de l'input avant l'historique/tab

    // --- Command Definitions & Aliases ---
    // Utilise helpData pour construire la liste des commandes et alias
    const baseCommands = Object.keys(helpData.commands).filter(cmd => !helpData.commands[cmd].aliasFor);
    const commandAliases = Object.entries(helpData.commands)
                               .filter(([name, data]) => data.aliasFor)
                               .reduce((acc, [name, data]) => { acc[name] = data.aliasFor; return acc; }, {});
    const availableCommands = Object.keys(helpData.commands); // Toutes commandes et alias pour l'autocomplétion

    // --- Settings & Theme Persistence ---
    const settingsKey = 'mohterm_settings';
    const themeKey = 'mohterm_theme';
    let currentSettings = {
        scanlines: true,
        flicker: true,
        canvas: true,
    };
    let currentTheme = 'default';

    function loadSettings() {
        try {
            const saved = localStorage.getItem(settingsKey);
            if (saved) {
                const parsed = JSON.parse(saved);
                // Merge saved settings with defaults, ensuring all keys exist
                currentSettings = { ...currentSettings, ...parsed };
            }
        } catch (e) {
            console.error("Failed to load settings from localStorage:", e);
        }
        applySettings(); // Apply loaded or default settings
    }

    function saveSettings() {
        try {
            localStorage.setItem(settingsKey, JSON.stringify(currentSettings));
        } catch (e) {
            console.error("Failed to save settings to localStorage:", e);
        }
    }

    function applySettings() {
        document.body.classList.toggle('no-scanlines', !currentSettings.scanlines);
        document.body.classList.toggle('no-flicker', !currentSettings.flicker);
        // Ensure the canvas toggle function exists before calling it
        if (window.toggleCanvasAnimation) {
             window.toggleCanvasAnimation(currentSettings.canvas);
        } else {
             console.warn("toggleCanvasAnimation function not found on window.");
        }
    }

    function loadTheme() {
        try {
            const savedTheme = localStorage.getItem(themeKey);
            if (savedTheme && availableThemes.includes(savedTheme)) {
                currentTheme = savedTheme;
            }
        } catch (e) {
            console.error("Failed to load theme from localStorage:", e);
        }
        applyTheme(currentTheme); // Apply loaded or default theme
    }

    function saveTheme() {
        try {
            localStorage.setItem(themeKey, currentTheme);
        } catch (e) {
            console.error("Failed to save theme to localStorage:", e);
        }
    }

    function applyTheme(themeName) {
        // Remove existing theme classes
        availableThemes.forEach(t => document.body.classList.remove(`theme-${t}`));
        // Add the new theme class if it's not the default
        if (themeName !== 'default') {
             document.body.classList.add(`theme-${themeName}`);
        }
        currentTheme = themeName;
    }

    // --- Fonctions Utilitaires ---
    function addOutput(htmlContent, isInputEcho = false) {
        const line = document.createElement('div');
        line.classList.add('terminal-line');
        if (isInputEcho) {
            line.classList.add('line-input-echo');
            // Pas d'animation pour l'écho de l'input
            line.style.animation = 'none';
            line.style.opacity = '1';
            line.style.transform = 'none';
        } else {
            // Petite variation dans le délai d'apparition pour un effet moins mécanique
            line.style.animationDelay = `${Math.random() * 0.05}s`;
        }
        line.innerHTML = htmlContent; // Attention: S'assurer que le contenu est sûr si généré dynamiquement
        output.appendChild(line);
        scrollToBottom();

        // --- Gestion des Clics (Utilise les data-attributes) ---
        // Attache les écouteurs aux nouveaux éléments cliquables dans la ligne ajoutée
        line.querySelectorAll('[data-command-prefix]').forEach(span => {
            span.addEventListener('click', () => handleSpanClick(span));
        });
    }

    // Fonction générique pour gérer les clics sur les spans avec data-attributes
    function handleSpanClick(spanElement) {
        if (isProcessing) return;
        const prefix = spanElement.dataset.commandPrefix;
        const value = spanElement.dataset.commandValue;
        let cmd = `${prefix} ${value}`;

        // Cas où l'on exécute directement la commande au clic
        const executeDirectlyOnClick = [
            'aide', // Cliquer sur une catégorie d'aide ou une commande essentielle
            'projets' // Cliquer sur un titre de projet
        ];

        if (executeDirectlyOnClick.includes(prefix)) {
             // Si c'est 'aide' et la valeur est une catégorie ou une commande valide
             if (prefix === 'aide' && (helpData.categories[value] || helpData.commands[value])) {
                 processCommand(cmd);
                 input.value = ''; // Vide l'input après exécution
                 return; // Sortir
             }
             // Si c'est 'projets' et la valeur est un ID de projet valide
             if (prefix === 'projets' && projectData[value]) {
                 processCommand(cmd);
                 input.value = ''; // Vide l'input après exécution
                 return; // Sortir
             }
        }

        // Cas spécial pour settings: on veut juste pré-remplir pour ajouter on/off
        if (prefix === 'settings' && availableSettings.includes(value)) {
             cmd += ' '; // Ajoute un espace pour que l'utilisateur tape on/off
        }

        // Pré-remplit l'input pour les autres cas (compétences, theme, settings partiel)
        input.value = cmd;
        input.focus();
        // Déplace le curseur à la fin
        input.setSelectionRange(input.value.length, input.value.length);
    }


    // Effet machine à écrire (Typewriter) asynchrone
    async function typewriterEffect(element, text, speed = 15) {
        return new Promise(async (resolve) => {
            element.innerHTML = '';
            let buffer = '';
            let inTag = false;
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                if (char === '<') inTag = true;
                if (inTag) {
                    buffer += char;
                } else {
                    element.innerHTML += char; // Append char if not in tag
                }
                if (char === '>') {
                    inTag = false;
                    element.innerHTML += buffer; // Append buffered tag content
                    buffer = '';
                }
                if (!inTag && char !== ' ' && char !== '\n') { // Only pause for non-space/non-newline visible characters
                    scrollToBottom();
                    // Adjust speed dynamically? Could be complex. Keep it simple for now.
                    await new Promise(res => setTimeout(res, speed));
                }
            }
             scrollToBottom(); // Ensure scroll after completion
            resolve(); // Resolve the promise when done
        });
    }

    function displayContent(htmlContent) { addOutput(htmlContent); }
    function displayError(message) { addOutput(`<span class="line-error">${message}</span>`); }
    function scrollToBottom() {
        // setTimeout léger pour laisser le DOM se mettre à jour avant de scroller
        setTimeout(() => { output.scrollTop = output.scrollHeight; }, 50);
    }
    function updateTime() {
        const el = document.getElementById('system-time');
        if (el) el.textContent = new Date().toLocaleTimeString('fr-FR');
    }
    setInterval(updateTime, 1000); // Met à jour l'heure chaque seconde
    function clearTerminal() { output.innerHTML = ''; }

    // --- Traitement des Commandes ---
    async function processCommand(command) {
        // Ignore si déjà en traitement ou si la commande est vide/undefined
        if (isProcessing || !command) {
             // Si juste vide mais pas en traitement, ajoute une ligne vide pour simuler le prompt
             if (!isProcessing && command !== undefined) {
                 addOutput(`<span class="prompt">${promptElement.textContent}</span><span class="command"></span>`, true);
             }
             return;
         }
        isProcessing = true; input.disabled = true; cursor.style.display = 'none'; // Désactive l'input pendant le traitement

        const commandTrimmed = command.trim();
        const args = commandTrimmed.split(' ').filter(arg => arg !== ''); // Sépare et retire les espaces vides
        const cmdLower = args[0].toLowerCase();
        const rest = args.slice(1).join(' '); // Le reste des arguments en une chaîne
        const arg1 = args[1]?.toLowerCase(); // Premier argument
        const arg2 = args[2]?.toLowerCase(); // Deuxième argument

        // Affiche la commande entrée par l'utilisateur (echo)
        addOutput(`<span class="prompt">${promptElement.textContent}</span><span class="command">${commandTrimmed}</span>`, true);

        // Ajoute à l'historique si différent de la dernière commande
        if (commandTrimmed && commandTrimmed !== commandHistory[commandHistory.length - 1]) {
            commandHistory.push(commandTrimmed);
            if (commandHistory.length > 100) commandHistory.shift(); // Limite l'historique
        }
        historyIndex = commandHistory.length; // Réinitialise l'index de l'historique

        // Résout les alias
        const effectiveCmd = commandAliases[cmdLower] || cmdLower;

        // Simulation d'un léger temps de traitement
        await new Promise(resolve => setTimeout(resolve, 80 + Math.random() * 120));

        try {
            // --- Switch principal des commandes ---
            switch (effectiveCmd) {
                // --- Commande AIDE (Nouvelle Logique) ---
                case 'aide':
                    if (!arg1) {
                        displayContent(content.aide.renderCategories()); // Affiche catégories + essentiels
                    } else if (helpData.categories[arg1]) {
                        displayContent(content.aide.renderCategoryHelp(arg1)); // Aide pour une catégorie
                    } else if (helpData.commands[arg1]) {
                        // Si l'argument est une commande (ou un alias), affiche l'aide détaillée
                        displayContent(content.aide.renderCommandHelp(arg1));
                    } else {
                        displayContent(content.aide.renderNotFoundError(arg1)); // Terme inconnu
                    }
                    break;

                // --- Commande PROJETS (Nouvelle Logique) ---
                case 'projets':
                    if (!arg1) {
                        displayContent(content.projets.renderList()); // Affiche la liste des projets
                    } else {
                        displayContent(content.projets.renderDetail(arg1)); // Affiche le détail du projet ou erreur
                    }
                    break;

                // --- Autres Commandes ---
                case 'profil': displayContent(content.profil); break;
                case 'competences':
                    if (!arg1) { displayContent(content.competences.categories); }
                    else if (arg1 === 'tout' || arg1 === 'all') { displayContent(content.competences.tout); }
                    else if (skillCategories.includes(arg1)) { displayContent(content.competences[arg1]); }
                    else { displayError(`Catégorie '${arg1}' inconnue.`); displayContent(content.competences.categories); }
                    break;
                case 'cv': displayContent(content.cv); break;
                case 'blog': displayContent(content.blog); break;
                case 'contact': displayContent(content.contact); break;
                case 'banniere': displayContent(content.banniere); updateTime(); break;
                case 'effacer': clearTerminal(); break;
                case 'date': addOutput(content.date()); break;
                case 'echo': addOutput(content.echo(rest)); break;
                case 'theme':
                    if (!arg1) { displayContent(content.themeList()); }
                    else if (availableThemes.includes(arg1)) { applyTheme(arg1); saveTheme(); addOutput(content.theme(arg1, true)); }
                    else { addOutput(content.theme(arg1, false)); }
                    break;
                case 'settings':
                    if (!arg1) { displayContent(content.settingsList()); }
                    else if (availableSettings.includes(arg1)) {
                         if (arg2 === 'on' || arg2 === 'off') {
                            const newState = arg2 === 'on';
                            currentSettings[arg1] = newState;
                            applySettings();
                            saveSettings();
                            addOutput(content.settings(arg1, arg2, true));
                         } else {
                             // Affiche l'état actuel si juste 'settings [nom]'
                             const currentState = currentSettings[arg1] ? 'on' : 'off';
                             addOutput(`<span class="line-output">Paramètre '${arg1}' est actuellement '${currentState}'.</span>`);
                             addOutput(content.settings(arg1, null, false)); // Affiche l'usage correct
                         }
                    } else {
                        addOutput(content.settings(arg1, arg2, false)); // Erreur si setting inconnu
                    }
                    break;
                case '': break; // Ne rien faire si commande vide (déjà géré au début)
                default: addOutput(content.inconnu(commandTrimmed)); break; // Commande inconnue
            }
        } catch (error) {
            console.error("Erreur pendant processCommand:", error);
            displayError("Une erreur interne est survenue lors du traitement de la commande.");
        } finally {
            // Réactive l'input et le curseur, remet le focus
            input.disabled = false;
            cursor.style.display = 'inline-block';
            isProcessing = false;
            input.focus();
            scrollToBottom(); // S'assure que l'output est scrollé en bas après traitement
        }
    }

    // --- Gestion Input, Historique & Tab ---
    input.addEventListener('keydown', (e) => {
        if (isProcessing) { e.preventDefault(); return; } // Bloque si une commande est en cours

        const currentInput = input.value;

        switch (e.key) {
            case 'Enter':
                e.preventDefault();
                currentCommand = ''; // Reset currentCommand after execution attempt
                processCommand(currentInput);
                input.value = ''; // Vide l'input
                break;

            case 'ArrowUp':
                e.preventDefault();
                if (historyIndex > 0) {
                    if (historyIndex === commandHistory.length) {
                        currentCommand = currentInput; // Sauvegarde la commande actuelle avant de naviguer
                    }
                    historyIndex--;
                    input.value = commandHistory[historyIndex];
                    input.setSelectionRange(input.value.length, input.value.length); // Curseur à la fin
                }
                break;

            case 'ArrowDown':
                e.preventDefault();
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    input.value = commandHistory[historyIndex];
                    input.setSelectionRange(input.value.length, input.value.length); // Curseur à la fin
                } else {
                    // Retour à la commande initialement tapée (ou vide)
                    historyIndex = commandHistory.length;
                    input.value = currentCommand;
                    input.setSelectionRange(input.value.length, input.value.length); // Curseur à la fin
                }
                break;

            case 'Tab':
                e.preventDefault();
                handleTabCompletion(currentInput);
                break;

            case 'Escape': // Efface l'input actuel
                 e.preventDefault();
                 input.value = '';
                 currentCommand = '';
                 historyIndex = commandHistory.length; // Reset history navigation context
                 break;

            default:
                 // Si on tape autre chose, on quitte le mode historique visuellement
                 // (mais historyIndex reste prêt pour ArrowUp/Down)
                 break;
        }
    });

    function handleTabCompletion(currentInput) {
        const inputLower = currentInput.toLowerCase();
        // Trouve la dernière partie après un espace pour la complétion
        const lastSpaceIndex = inputLower.lastIndexOf(' ');
        const partToComplete = lastSpaceIndex === -1 ? inputLower : inputLower.substring(lastSpaceIndex + 1);
        const baseInput = lastSpaceIndex === -1 ? "" : currentInput.substring(0, lastSpaceIndex + 1);

        const parts = inputLower.split(' ').filter(p => p !== ''); // Sépare et filtre les vides
        const commandPart = parts[0] || '';
        const effectiveCmd = commandAliases[commandPart] || commandPart;
        const argIndex = parts.length - (currentInput.endsWith(' ') ? 0 : 1); // Index de l'argument qu'on essaie de compléter

        let potentialCompletions = [];

        // 1. Compléter la commande elle-même
        if (argIndex === 0) {
            potentialCompletions = availableCommands.filter(cmd => cmd.startsWith(partToComplete));
        }
        // 2. Compléter les arguments
        else if (argIndex === 1) {
            if (effectiveCmd === 'aide') {
                potentialCompletions = [...Object.keys(helpData.categories), ...availableCommands].filter(term => term.startsWith(partToComplete));
            } else if (effectiveCmd === 'competences') {
                potentialCompletions = [...skillCategories, 'tout'].filter(cat => cat.startsWith(partToComplete));
            } else if (effectiveCmd === 'projets') {
                potentialCompletions = Object.keys(projectData).filter(id => id.startsWith(partToComplete));
            } else if (effectiveCmd === 'theme') {
                potentialCompletions = availableThemes.filter(th => th.startsWith(partToComplete));
            } else if (effectiveCmd === 'settings') {
                potentialCompletions = availableSettings.filter(s => s.startsWith(partToComplete));
            }
        }
         // 3. Compléter 'on'/'off' pour settings
         else if (argIndex === 2 && effectiveCmd === 'settings') {
             const settingArg = parts[1];
             if (availableSettings.includes(settingArg)) {
                 potentialCompletions = ['on', 'off'].filter(state => state.startsWith(partToComplete));
             }
         }

        // --- Logique d'application de la complétion ---
        if (potentialCompletions.length === 1) {
            // Complète si une seule correspondance, ajoute un espace si c'est une commande complète
            const suffix = (argIndex === 0 && !currentInput.includes(' ')) ? ' ' : ''; // Ajoute espace après commande complétée
            input.value = baseInput + potentialCompletions[0] + suffix;
            currentCommand = input.value; // Update state used by arrows
        } else if (potentialCompletions.length > 1) {
            // Trouve le plus long préfixe commun
            let prefix = potentialCompletions[0];
            for (let i = 1; i < potentialCompletions.length; i++) {
                while (!potentialCompletions[i].startsWith(prefix) && prefix.length > 0) {
                    prefix = prefix.slice(0, -1);
                }
            }

            if (prefix.length > partToComplete.length) {
                // Si le préfixe commun est plus long que ce qui est tapé, complète jusqu'au préfixe
                input.value = baseInput + prefix;
                currentCommand = input.value; // Update state
            } else {
                // Sinon (ou si préfixe = input), liste les options
                addOutput(`<span class="prompt">${promptElement.textContent}</span><span class="command">${currentInput}</span>`, true);
                addOutput(`<span class="line-system">${potentialCompletions.join('   ')}</span>`);
            }
        }
    }


    // Focus sur l'input si on clique dans le terminal (mais pas sur un lien ou span cliquable)
    terminalContainer.addEventListener('click', (e) => {
        // Vérifie si la cible ou un de ses parents proches est un lien ou un span avec data-attribute
        if (!e.target.closest('a, [data-command-prefix]') && !isProcessing) {
             input.focus();
        }
    });

    // --- Séquence de Boot ---
    async function bootSequence() {
        isProcessing = true; // Bloque l'input pendant le boot
        inputLine.style.visibility = 'hidden'; // Cache la ligne d'input

        const bootLines = [
             { text: "Activation Interface MohTerm v1.1...", speed: 25, class: 'line-system' },
             { text: "Analyse Noyau d'Expertise : Mohamad El Akhal...", speed: 30, class: 'line-system' },
             { text: "Chargement Modules CyberSec.............[<span class='line-success'>OK</span>]", speed: 15, class: 'line-system' },
             { text: "Initialisation Protocoles DevOps.........[<span class='line-success'>OK</span>]", speed: 15, class: 'line-system' },
             { text: "Calibration Grille Quantique Visuelle..[<span class='line-success'>OK</span>]", speed: 20, class: 'line-system' },
             { text: "Vérification Intégrité Racine..........[<span class='line-highlight'>TERMINÉE</span>]", speed: 30, class: 'line-system' },
             { text: "Accès Racine Autorisé.", speed: 40, class: 'line-success' },
        ];

        // Affiche les lignes de boot avec effet typewriter
        for (const line of bootLines) {
            const lineEl = document.createElement('div');
            lineEl.classList.add('terminal-line', line.class || 'line-system');
            lineEl.style.opacity = 1; // Rendu visible immédiatement pour l'effet
            output.appendChild(lineEl);
            await typewriterEffect(lineEl, line.text, line.speed);
            await new Promise(resolve => setTimeout(resolve, 60)); // Petite pause entre les lignes
        }

        // Affiche la bannière après le boot
        displayContent(content.banniere);
        updateTime(); // Met à jour l'heure dans la bannière

        // Rend la ligne d'input visible et fonctionnelle
        inputLine.style.visibility = 'visible';
        input.disabled = false;
        cursor.style.display = 'inline-block';
        isProcessing = false;
        input.focus();
        scrollToBottom();
    }

    // --- Initialisation ---
    loadSettings(); // Charger et appliquer les paramètres AVANT le boot
    loadTheme();    // Charger et appliquer le thème AVANT le boot
    bootSequence(); // Démarrer la séquence de boot
});