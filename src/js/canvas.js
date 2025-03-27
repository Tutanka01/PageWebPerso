// js/canvas.js

const bgCanvas = document.getElementById('background-canvas');
if (!bgCanvas) {
    console.error("Canvas element not found!");
} else {
    const bgCtx = bgCanvas.getContext('2d');
    let frame = 0;

    function drawBackground() {
        frame++;
        const width = bgCanvas.width = window.innerWidth;
        const height = bgCanvas.height = window.innerHeight;
        bgCtx.clearRect(0, 0, width, height);

        const gridSize = 45;
        const lineOpacity = 0.03; // Légèrement plus visible
        const dotOpacity = 0.08;
        const dotSize = 1.5;

        // Grille animée avec perspective simulée et légère ondulation
        const perspectiveFactor = 0.25;
        const vanishPointX = width / 2 + Math.sin(frame * 0.0005) * width * 0.1; // Point de fuite mobile
        const vanishPointY = height / 2 + Math.cos(frame * 0.0007) * height * 0.1;

        bgCtx.strokeStyle = `rgba(0, 200, 230, ${lineOpacity})`;
        bgCtx.fillStyle = `rgba(0, 200, 230, ${dotOpacity})`;

        const timeFactor = frame * 0.0008; // Mouvement global plus rapide

        for (let i = -12; i <= 12; i++) { // Plus de lignes
             // Lignes "verticales" convergeant
             let x1 = vanishPointX + i * gridSize * (1 + perspectiveFactor) + Math.sin(timeFactor + i*0.15) * 15;
             let y1 = 0;
             let x2 = vanishPointX + i * gridSize * (1 - perspectiveFactor) + Math.sin(timeFactor + i*0.15 + Math.PI) * 15;
             let y2 = height;
             bgCtx.beginPath(); bgCtx.moveTo(x1, y1); bgCtx.lineTo(x2, y2); bgCtx.stroke();

             // Lignes "horizontales" convergeant
             let x3 = 0;
             let y3 = vanishPointY + i * gridSize * (1 + perspectiveFactor) + Math.cos(timeFactor + i*0.15) * 15;
             let x4 = width;
             let y4 = vanishPointY + i * gridSize * (1 - perspectiveFactor) + Math.cos(timeFactor + i*0.15 + Math.PI) * 15;
             bgCtx.beginPath(); bgCtx.moveTo(x3, y3); bgCtx.lineTo(x4, y4); bgCtx.stroke();
        }

        // Points scintillants aux intersections (plus subtil)
        bgCtx.globalAlpha = 1; // Reset alpha for dots
        for (let i = -12; i <= 12; i++) {
            for (let j = -12; j <= 12; j++) {
                 // Calcul approximatif de l'intersection (simplifié ici)
                 let intersectX = vanishPointX + i * gridSize;
                 let intersectY = vanishPointY + j * gridSize;

                 // Ajoute un scintillement basé sur le bruit ou le hasard
                 const flicker = Math.random();
                 if (flicker > 0.97) { // Moins de points scintillants
                     bgCtx.fillStyle = `rgba(0, 234, 255, ${dotOpacity * (0.5 + Math.random() * 0.5)})`; // Opacité variable
                     bgCtx.fillRect(intersectX - dotSize / 2, intersectY - dotSize / 2, dotSize, dotSize);
                 }
            }
        }

        requestAnimationFrame(drawBackground);
    }

    // Gérer le redimensionnement
    window.addEventListener('resize', () => {
        // Le canvas est redimensionné au début de drawBackground
    });

    // Lancer l'animation initiale
    drawBackground();
}