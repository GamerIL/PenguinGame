 // Create snowflakes
 function createSnowflakes() {
    for (let i = 0; i < 100; i++) {
        let snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.top = Math.random() * 100 + 'vh';
        snowflake.style.opacity = Math.random();
        snowflake.style.animationDuration = Math.random() * 10 + 5 + 's';
        snowflake.style.animationDelay = Math.random() * 10 + 's';
        document.body.appendChild(snowflake);
    }
}
createSnowflakes();

// Create fireworks
function createFireworks() {
    for (let i = 0; i < 10; i++) {
        let firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = Math.random() * 100 + 'vw';
        firework.style.top = Math.random() * -100 + 'vh'; // Start above the view
        firework.style.opacity = Math.random();
        firework.style.animationDuration = Math.random() * 5 + 3 + 's';
        firework.style.animationDelay = Math.random() * 5 + 's';
        document.body.appendChild(firework);

        // Remove firework after animation
        firework.addEventListener('animationend', () => {
            firework.remove();
        });
    }
}
createFireworks();