// js/main.js
import { content, skillCategories } from './commands.js'; // Importe le contenu

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
    let currentCommand = '';
    // Liste des commandes disponibles (sans flux/feed)
    const availableCommands = ['aide', 'profil', 'competences', 'blog', 'contact', 'banniere', 'effacer', 'date', 'echo', 'help', 'about', 'skills', 'clear', 'banner'];

    // --- Fonctions Utilitaires ---
    function addOutput(htmlContent, isInputEcho = false) {
        const line = document.createElement('div');
        line.classList.add('terminal-line');
        if (isInputEcho) {
            line.classList.add('line-input-echo');
            line.style.animation = 'none';
        } else {
            line.style.animationDelay = `${Math.random() * 0.06}s`;
        }
        line.innerHTML = htmlContent;
        output.appendChild(line);
        scrollToBottom();

        // Ajoute listeners pour catégories cliquables
        if (!isInputEcho && htmlContent.includes('skills-categories-list')) {
            line.querySelectorAll('.skills-categories-list span').forEach(span => {
                span.onclick = () => {
                    if (isProcessing) return; // Empêche clic pendant traitement
                    const category = span.textContent.replace('◈ ', '').trim();
                    const cmd = `competences ${category}`;
                    input.value = cmd; // Affiche la commande simulée
                    processCommand(cmd);
                    input.value = ''; // Efface après traitement
                };
            });
        }
    }

    async function typewriterEffect(element, text, speed = 12) {
        // isProcessing est géré par l'appelant
        input.disabled = true; cursor.style.display = 'none';
        element.innerHTML = '';
        let buffer = '';
        let inTag = false;
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (char === '<') inTag = true;
            if (inTag) buffer += char; else element.innerHTML += char;
            if (char === '>') { inTag = false; element.innerHTML += buffer; buffer = ''; }
            if (!inTag) { scrollToBottom(); await new Promise(resolve => setTimeout(resolve, speed)); }
        }
        // Ne réactive pas l'input ici, c'est géré par l'appelant
    }

    function displayContent(htmlContent) { addOutput(htmlContent); }
    function displayLoading(message) { addOutput(`<span class="line-system">${message} <span class="loading-indicator">.</span></span>`); } // Gardé si besoin futur
    function displayError(message) { addOutput(`<span class="line-error">${message}</span>`); }
    function scrollToBottom() { setTimeout(() => { output.scrollTop = output.scrollHeight; }, 60); }
    function updateTime() { const el = document.getElementById('system-time'); if (el) el.textContent = new Date().toLocaleTimeString('fr-FR'); }
    setInterval(updateTime, 1000);
    function clearTerminal() { output.innerHTML = ''; }

    // --- Fonction fetchAndDisplayRSS SUPPRIMÉE ---

    // --- Traitement Commandes ---
    async function processCommand(command) {
        if (isProcessing) return;
        isProcessing = true; input.disabled = true; cursor.style.display = 'none';
        const commandTrimmed = command.trim();
        const args = commandTrimmed.split(' ');
        const cmdLower = args[0].toLowerCase();
        const rest = args.slice(1).join(' ');

        addOutput(`<span class="prompt">${promptElement.textContent}</span><span class="command">${commandTrimmed}</span>`, true);

        if (commandTrimmed && commandTrimmed !== commandHistory[commandHistory.length - 1]) {
            commandHistory.push(commandTrimmed);
            if (commandHistory.length > 50) commandHistory.shift();
        }
        historyIndex = commandHistory.length;

        const commandAliases = { help: 'aide', about: 'profil', skills: 'competences', banner: 'banniere', clear: 'effacer' /* feed: 'flux' supprimé */ };
        const effectiveCmd = commandAliases[cmdLower] || cmdLower;

        await new Promise(resolve => setTimeout(resolve, 70 + Math.random() * 110)); // Temps de traitement légèrement augmenté

        try {
            switch (effectiveCmd) {
                case 'aide': displayContent(content.aide); break;
                case 'profil': displayContent(content.profil); break;
                case 'competences':
                    const category = args[1]?.toLowerCase();
                    if (category === 'tout' || category === 'all') { displayContent(content.competences.tout); }
                    else if (category && content.competences[category]) { displayContent(content.competences[category]); }
                    else if (category) { displayError(`Catégorie '${category}' inconnue. Options: ${skillCategories.join(', ')}, tout.`); displayContent(content.competences.categories); }
                    else { displayContent(content.competences.categories); }
                    break;
                case 'blog': displayContent(content.blog); break;
                case 'contact': displayContent(content.contact); break;
                case 'banniere': displayContent(content.banniere); updateTime(); break;
                case 'effacer': clearTerminal(); break;
                case 'date': addOutput(content.date()); break;
                case 'echo': addOutput(content.echo(rest)); break;
                // case 'flux': SUPPRIMÉ
                case '': break;
                default: addOutput(content.inconnu(commandTrimmed)); break;
            }
        } catch (error) {
            console.error("Erreur pendant processCommand:", error);
            displayError("Une erreur interne est survenue lors du traitement de la commande.");
        } finally {
            input.disabled = false; cursor.style.display = 'inline-block'; isProcessing = false; input.focus(); scrollToBottom();
        }
    }

    // --- Gestion Input & Tab ---
    input.addEventListener('keydown', (e) => {
        if (isProcessing) { e.preventDefault(); return; }
        currentCommand = input.value;

        if (e.key === 'Enter') { e.preventDefault(); processCommand(currentCommand); input.value = ''; currentCommand = ''; }
        else if (e.key === 'ArrowUp') { e.preventDefault(); if (historyIndex > 0) { historyIndex--; input.value = commandHistory[historyIndex]; currentCommand = input.value; input.setSelectionRange(input.value.length, input.value.length); } }
        else if (e.key === 'ArrowDown') { e.preventDefault(); if (historyIndex < commandHistory.length - 1) { historyIndex++; input.value = commandHistory[historyIndex]; currentCommand = input.value; input.setSelectionRange(input.value.length, input.value.length); } else { historyIndex = commandHistory.length; input.value = ''; currentCommand = ''; } }
        else if (e.key === 'Tab') {
            e.preventDefault();
            const currentInput = input.value.toLowerCase();
            const possibleCommands = availableCommands.filter(cmd => cmd.startsWith(currentInput));
            if (possibleCommands.length === 1) { input.value = possibleCommands[0]; currentCommand = input.value; }
            else if (possibleCommands.length > 1) {
                addOutput(`<span class="prompt">${promptElement.textContent}</span><span class="command">${input.value}</span>`, true);
                addOutput(`<span class="line-system">${possibleCommands.join('   ')}</span>`);
            }
        }
        else if (e.key === 'Escape') { input.value = ''; currentCommand = ''; }
    });

    terminalContainer.addEventListener('click', (e) => { if (e.target.tagName !== 'A' && !isProcessing) input.focus(); });

    // --- Boot Sequence ---
    async function bootSequence() {
        isProcessing = true;
        const bootLines = [
             { text: "Activation Interface NEXUS v2.1...", speed: 25, class: 'line-system' },
             { text: "Analyse Matricielle du Noyau d'Expertise : Mohamad El Akhal...", speed: 35, class: 'line-system' },
             { text: "Chargement Modules Sécurité Avancée.......[<span class='line-success'>OK</span>]", speed: 15, class: 'line-system' },
             { text: "Initialisation Protocoles DevOps...........[<span class='line-success'>OK</span>]", speed: 15, class: 'line-system' },
             { text: "Calibration Flux de Données Quantiques.....[<span class='line-success'>OK</span>]", speed: 20, class: 'line-system' },
             { text: "Vérification Intégrité Système.............[<span class='line-highlight'>TERMINÉE</span>]", speed: 30, class: 'line-system' },
             { text: "Accès Racine Autorisé.", speed: 50, class: 'line-system' },
        ];
        inputLine.style.visibility = 'hidden';
        for (const line of bootLines) {
            const lineEl = document.createElement('div');
            lineEl.classList.add('terminal-line', line.class || 'line-system');
            lineEl.style.opacity = 1;
            output.appendChild(lineEl);
            await typewriterEffect(lineEl, line.text, line.speed);
            await new Promise(resolve => setTimeout(resolve, 80)); // Pause un peu plus longue
        }
        displayContent(content.banniere); updateTime();
        inputLine.style.visibility = 'visible';
        input.disabled = false; cursor.style.display = 'inline-block'; isProcessing = false; input.focus(); scrollToBottom();
    }

    // --- Init ---
    bootSequence();

    // Expose la fonction pour l'appel depuis le HTML (catégories cliquables)
    window.executeCommand = (cmd) => {
        if (isProcessing) return;
        input.value = cmd;
        processCommand(cmd);
        input.value = '';
    };
});