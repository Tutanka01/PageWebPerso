// js/canvas.js

const bgCanvas = document.getElementById('background-canvas');
let animationFrameId = null; // Pour pouvoir arrêter/redémarrer l'animation
let isCanvasEnabled = true; // Contrôle global de l'animation

if (!bgCanvas) {
    console.error("Canvas element not found!");
} else {
    const bgCtx = bgCanvas.getContext('2d');
    let frame = 0;

    function drawBackground() {
        if (!isCanvasEnabled) {
            // Si désactivé, on nettoie une dernière fois et on arrête
            if (animationFrameId) {
                 bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
            }
            animationFrameId = null; // Assure qu'on ne demande pas un autre frame
            return;
        }

        frame++;
        const width = bgCanvas.width = window.innerWidth;
        const height = bgCanvas.height = window.innerHeight;
        bgCtx.clearRect(0, 0, width, height);

        // Récupère les couleurs du thème actuel (via les variables CSS)
        const computedStyle = getComputedStyle(document.body);
        const lineColor = computedStyle.getPropertyValue('--color-border').trim() || 'rgba(0, 200, 230, 0.03)'; // Fallback
        const dotColor = computedStyle.getPropertyValue('--color-prompt').trim() || 'rgba(0, 200, 230, 0.08)'; // Fallback

        const gridSize = 45;
        const lineOpacity = 0.04; // Un peu plus visible
        const dotOpacity = 0.1;
        const dotSize = 1.5;

        // Perspective et ondulation
        const perspectiveFactor = 0.25;
        const vanishPointX = width / 2 + Math.sin(frame * 0.0005) * width * 0.08; // Mouvement plus subtil
        const vanishPointY = height * 0.4 + Math.cos(frame * 0.0007) * height * 0.05; // Point de fuite légèrement au-dessus du centre

        bgCtx.strokeStyle = lineColor.replace(/[\d\.]+\)$/g, `${lineOpacity})`); // Applique l'opacité
        bgCtx.fillStyle = dotColor.replace(/[\d\.]+\)$/g, `${dotOpacity})`); // Applique l'opacité

        const timeFactor = frame * 0.001; // Mouvement global

        for (let i = -15; i <= 15; i++) { // Plus de lignes pour couvrir plus d'écrans
             const wave = Math.sin(timeFactor + i * 0.15) * 15;
             const cosWave = Math.cos(timeFactor + i * 0.15) * 15;

             // Lignes "verticales"
             let x1 = vanishPointX + i * gridSize * (1 + perspectiveFactor) + wave;
             let y1 = 0;
             let x2 = vanishPointX + i * gridSize * (1 - perspectiveFactor) + wave; // Même wave pour cohérence
             let y2 = height;
             bgCtx.beginPath(); bgCtx.moveTo(x1, y1); bgCtx.lineTo(x2, y2); bgCtx.stroke();

             // Lignes "horizontales"
             let x3 = 0;
             let y3 = vanishPointY + i * gridSize * (1 + perspectiveFactor) + cosWave;
             let x4 = width;
             let y4 = vanishPointY + i * gridSize * (1 - perspectiveFactor) + cosWave; // Même cosWave
             bgCtx.beginPath(); bgCtx.moveTo(x3, y3); bgCtx.lineTo(x4, y4); bgCtx.stroke();
        }

        // Points scintillants (moins fréquents)
        bgCtx.globalAlpha = 1;
        for (let i = -15; i <= 15; i++) {
            for (let j = -15; j <= 15; j++) {
                 // Approximation de l'intersection (simplifié)
                 let intersectX = vanishPointX + i * gridSize;
                 let intersectY = vanishPointY + j * gridSize;

                 const flicker = Math.random();
                 if (flicker > 0.985) { // Encore moins de points
                     bgCtx.fillStyle = dotColor.replace(/[\d\.]+\)$/g, `${dotOpacity * (0.6 + Math.random() * 0.6)})`); // Opacité variable mais basée sur la couleur du thème
                     bgCtx.fillRect(intersectX - dotSize / 2, intersectY - dotSize / 2, dotSize, dotSize);
                 }
            }
        }

        // Demande le prochain frame
        animationFrameId = requestAnimationFrame(drawBackground);
    }

    function startAnimation() {
        if (!animationFrameId && isCanvasEnabled) { // Ne démarre que si arrêté et activé
            console.log("Starting canvas animation");
            animationFrameId = requestAnimationFrame(drawBackground);
        }
    }

    function stopAnimation() {
        if (animationFrameId) {
            console.log("Stopping canvas animation");
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
            // Optionnel : nettoyer le canvas immédiatement
             const bgCtx = bgCanvas.getContext('2d');
             bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
        }
    }

    // Gérer le redimensionnement
    window.addEventListener('resize', () => {
        // Le canvas est redimensionné au début de drawBackground,
        // mais si l'animation est arrêtée, on peut vouloir redimensionner quand même.
        if (!animationFrameId && isCanvasEnabled) {
            bgCanvas.width = window.innerWidth;
            bgCanvas.height = window.innerHeight;
        }
    });

    // Exposer les contrôles
    window.toggleCanvasAnimation = (enable) => {
        console.log(`Setting canvas animation to: ${enable}`);
        isCanvasEnabled = enable;
        if (enable) {
            document.body.classList.remove('no-canvas');
            startAnimation();
        } else {
            document.body.classList.add('no-canvas');
            stopAnimation();
        }
    };

    // Démarrage initial (sera appelé par main.js après chargement des settings)
    // Ne pas appeler drawBackground() ici directement.
}