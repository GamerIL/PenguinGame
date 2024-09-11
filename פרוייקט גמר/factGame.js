const canvas = document.getElementById('gameCanvas');
        const fishElement = document.getElementById('fish');
        const penguinElement = document.getElementById('penguin');
        const crabElement = document.getElementById('crab');

        let penguin = { x: 50, y: 50, width: 60, height: 60 };
        let score = 0;

        // עדכון מיקום ראשוני של הפינגווין, הדג, והסרטן
        function initPositions() {
            penguinElement.style.left = `${penguin.x}px`;
            penguinElement.style.top = `${penguin.y}px`;
            updateFishPosition();
            updateCrabPosition();
        }

        // יצירת בועות
        function createBubble() {
            let bubble = document.createElement('div');
            bubble.className = 'bubble';
            let size = Math.random() * 30 + 10; // Increased size range
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            
            // קביעת מיקום הבועה
            bubble.style.left = `${Math.random() * window.innerWidth}px`;
            bubble.style.top = `${Math.random() * window.innerHeight}px`;
            
            document.body.appendChild(bubble);
            setTimeout(() => document.body.removeChild(bubble), 5000); // Remove bubble after animation
        }

        // Create bubbles more frequently
        setInterval(createBubble, 100); // Reduced interval to create more bubbles

        function movePenguin(e) {
            switch (e.key) {
                case 'w':
                case 'W':
                    if (penguin.y > 0) penguin.y -= 10;
                    break;
                case 's':
                case 'S':
                    if (penguin.y + penguin.height < canvas.height) penguin.y += 10;
                    break;
                case 'a':
                case 'A':
                    if (penguin.x > 0) penguin.x -= 10;
                    break;
                case 'd':
                case 'D':
                    if (penguin.x + penguin.width < canvas.width) penguin.x += 10;
                    break;
            }
            penguinElement.style.left = `${penguin.x}px`;
            penguinElement.style.top = `${penguin.y}px`;
            checkCollision();
        }

        function checkCollision() {
            let fishRect = fishElement.getBoundingClientRect();
            let penguinRect = penguinElement.getBoundingClientRect();
            let crabRect = crabElement.getBoundingClientRect();

            // בדיקה אם יש התנגשות עם הדג
            if (
                penguinRect.left < fishRect.right &&
                penguinRect.right > fishRect.left &&
                penguinRect.top < fishRect.bottom &&
                penguinRect.bottom > fishRect.top
            ) {
                score++;
                document.getElementById('score').innerText = score;
                if (score >= 15) {
                    window.location.href = 'nextScreen.html'; // Transition to the next screen
                } else {
                    updateFishPosition();
                }
            }

            // בדיקה אם יש התנגשות עם הסרטן
            if (
                penguinRect.left < crabRect.right &&
                penguinRect.right > crabRect.left &&
                penguinRect.top < crabRect.bottom &&
                penguinRect.bottom > crabRect.top
            ) {
                score++;
                document.getElementById('score').innerText = score;
                if (score >= 15) {
                    window.location.href = 'nextScreen.html'; // Transition to the next screen
                } else {
                    updateCrabPosition();
                }
            }
        }

        function updateFishPosition() {
            fishElement.style.left = `${Math.random() * (canvas.width - fishElement.width)}px`;
            fishElement.style.top = `${Math.random() * (canvas.height - fishElement.height)}px`;
        }

        function updateCrabPosition() {
            crabElement.style.left = `${Math.random() * (canvas.width - crabElement.width)}px`;
            crabElement.style.top = `${Math.random() * (canvas.height - crabElement.height)}px`;
        }

        document.addEventListener('keydown', movePenguin);
        initPositions(); // Set initial positions for penguin, fish, and crab