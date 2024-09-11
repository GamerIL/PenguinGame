const penguin = document.getElementById('penguin');
        const nest = document.getElementById('nest');
        const pauseButton = document.getElementById('pause-button');
        const trampoline = document.getElementById('trampoline');
        const obstacles = [
            document.getElementById('obstacle1'),
            document.getElementById('obstacle2'),
            document.getElementById('obstacle3'),
            document.getElementById('obstacle4'),
            document.getElementById('obstacle5'),
            document.getElementById('obstacle6'),
            document.getElementById('obstacle7'),
            document.getElementById('obstacle8'),
            document.getElementById('obstacle9')
        ];

        let penguinPos = { x: 50, y: 50 };
        let speed = 4; // Speed of automatic movement
        let gravity = 0.7;
        let jumpStrength = 16.5; // Regular jump strength
        let trampolineJumpStrength = 15; // Increased jump strength for trampoline
        let velocityY = 0;
        let velocityX = 0; // Horizontal velocity for trampoline effect
        let isJumping = false;
        let offsetX = 0; // Horizontal offset for scrolling
        let isPaused = false;

        function movePenguin() {
            if (isPaused) return;

            // Move the penguin forward
            penguinPos.x += speed + velocityX;

            // Apply gravity
            if (penguinPos.y > 50 || velocityY > 0) {
                penguinPos.y += velocityY;
                velocityY -= gravity; // Apply gravity effect

                if (penguinPos.y <= 50) { // Ensure penguin lands on the ground
                    penguinPos.y = 50;
                    velocityY = 0;
                    isJumping = false; // Allow jumping again after landing
                    velocityX = 0; // Reset horizontal velocity after landing
                }
            }

            penguin.style.left = `${penguinPos.x}px`;
            penguin.style.bottom = `${penguinPos.y}px`;
        }

        function detectCollision() {
            if (isPaused) return;

            const penguinRect = penguin.getBoundingClientRect();
            const nestRect = nest.getBoundingClientRect();
            const trampolineRect = trampoline.getBoundingClientRect();

            // Check collision with the nest
            if (
                penguinRect.left < nestRect.right &&
                penguinRect.right > nestRect.left &&
                penguinRect.top < nestRect.bottom &&
                penguinRect.bottom > nestRect.top
            ) {
                window.location.href = "game-ended.html"; // Redirect to the new page
                return;
            }

            // Check collision with the trampoline
            if (
                penguinRect.left < trampolineRect.right &&
                penguinRect.right > trampolineRect.left &&
                penguinRect.top < trampolineRect.bottom &&
                penguinRect.bottom > trampolineRect.top
            ) {
                velocityY = trampolineJumpStrength; // Increase jump strength when hitting trampoline
                velocityX = 5; // Move right when hitting trampoline
            }

            // Check collision with obstacles
            for (let obstacle of obstacles) {
                const obstacleRect = obstacle.getBoundingClientRect();
                if (
                    penguinRect.left < obstacleRect.right &&
                    penguinRect.right > obstacleRect.left &&
                    penguinRect.top < obstacleRect.bottom &&
                    penguinRect.bottom > obstacleRect.top
                ) {
                    resetGame();
                    return;
                }
            }

            // If the penguin falls off the screen, reset the game
            if (penguinPos.y < 0) {
                resetGame();
            }
        }

        function scrollScreen() {
            if (isPaused) return;

            // Scroll the screen as the penguin progresses
            offsetX = penguinPos.x - window.innerWidth / 4; // Set scroll to match penguin's position
            document.querySelector('.game-container').style.transform = `translateX(-${offsetX}px)`;

            // Show nest only after some obstacles are passed
            if (penguinPos.x > 3000) { // Adjust this value to control when the nest appears
                nest.style.display = 'block';
            }
        }

        function jump() {
            if (!isJumping && !isPaused) {
                velocityY = jumpStrength;
                isJumping = true;
            }
        }

        function resetGame() {
            penguinPos = { x: 50, y: 50 }; // Reset starting position
            offsetX = 0; // Reset horizontal offset
            penguin.style.left = `${penguinPos.x}px`;
            penguin.style.bottom = `${penguinPos.y}px`;
            document.querySelector('.game-container').style.transform = `translateX(0)`;
            nest.style.display = 'none'; // Hide the nest on reset
            isJumping = false; // Reset jump state
            isPaused = false; // Unpause if needed
            pauseButton.textContent = 'Pause Game'; // Reset button text
        }

        function togglePause() {
            isPaused = !isPaused;
            pauseButton.textContent = isPaused ? 'Resume Game' : 'Pause Game';
        }

        // Jump with the space key, pause/resume with 'P' or 'R'
        document.addEventListener('keydown', (event) => {
            if (event.key === ' ' && !isPaused) {
                jump();
            } else if (event.key.toLowerCase() === 'p') {
                togglePause();
            } else if (event.key.toLowerCase() === 'r' && isPaused) {
                togglePause();
            }
        });

        pauseButton.addEventListener('click', togglePause);

        // Main game loop
        function gameLoop() {
            movePenguin();
            detectCollision();
            scrollScreen();
            requestAnimationFrame(gameLoop);
        }

        gameLoop(); // Start the game loop