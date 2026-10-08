const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game constants
const LANE_COUNT = 5; // Number of lanes for obstacles
const LANE_HEIGHT = 80; // Height of each lane
const SAFE_ZONE_HEIGHT = 80; // Height of safe zones at top and bottom
const PLAYER_SIZE = 40;
const PLAYER_SPEED = PLAYER_SIZE; // Move by one tile per key press

// Game state
let player = {
    x: canvas.width / 2 - PLAYER_SIZE / 2,
    y: canvas.height - SAFE_ZONE_HEIGHT - PLAYER_SIZE,
    size: PLAYER_SIZE
};

let obstacles = []; // Array of obstacle objects
let score = 0;
let gameOver = false;
let animationId;

// Initialize obstacles in lanes
function initObstacles() {
    obstacles = [];
    for (let lane = 0; lane < LANE_COUNT; lane++) {
        const laneY = SAFE_ZONE_HEIGHT + lane * LANE_HEIGHT;
        const laneHeight = LANE_HEIGHT;
        // Determine number of obstacles in this lane
        const obstacleCount = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < obstacleCount; i++) {
            const obstacleWidth = 60;
            const obstacleHeight = 40;
            const x = Math.random() * (canvas.width - obstacleWidth);
            const speed = (Math.random() * 2 + 1) * (Math.random() > 0.5 ? 1 : -1); // Random speed and direction
            obstacles.push({
                x,
                y: laneY + (laneHeight - obstacleHeight) / 2,
                width: obstacleWidth,
                height: obstacleHeight,
                speed,
                direction: speed > 0 ? 1 : -1
            });
        }
    }
}

// Update game state
function update() {
    if (gameOver) return;

    // Update obstacle positions
    for (const obs of obstacles) {
        obs.x += obs.speed;
        // Wrap around screen
        if (obs.direction > 0 && obs.x > canvas.width) {
            obs.x = -obs.width;
        } else if (obs.direction < 0 && obs.x < -obs.width) {
            obs.x = canvas.width;
        }
    }

    // Check for collision with obstacles
    for (const obs of obstacles) {
        if (
            player.x < obs.x + obs.width &&
            player.x + player.size > obs.x &&
            player.y < obs.y + obs.height &&
            player.y + player.size > obs.y
        ) {
            gameOver = true;
            cancelAnimationFrame(animationId);
            showGameOver();
            return;
        }
    }

    // Check if player reached top (safe zone)
    if (player.y < SAFE_ZONE_HEIGHT) {
        score++;
        // Reset player to bottom
        player.y = canvas.height - SAFE_ZONE_HEIGHT - PLAYER_SIZE;
        // Increase difficulty by adding more obstacles or increasing speed
        initObstacles();
    }

    // Draw everything
    draw();
    animationId = requestAnimationFrame(update);
}

// Draw game elements
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw safe zones (top and bottom)
    ctx.fillStyle = '#2E8B57'; // Dark green for safe grass
    ctx.fillRect(0, 0, canvas.width, SAFE_ZONE_HEIGHT);
    ctx.fillRect(0, canvas.height - SAFE_ZONE_HEIGHT, canvas.width, SAFE_ZONE_HEIGHT);

    // Draw lanes (roads)
    ctx.fillStyle = '#505050'; // Gray for roads
    for (let lane = 0; lane < LANE_COUNT; lane++) {
        const laneY = SAFE_ZONE_HEIGHT + lane * LANE_HEIGHT;
        ctx.fillRect(0, laneY, canvas.width, LANE_HEIGHT);
    }

    // Draw obstacles (cars)
    ctx.fillStyle = '#ff0000'; // Red for cars
    for (const obs of obstacles) {
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    }

    // Draw player (chicken)
    ctx.fillStyle = '#ffff00'; // Yellow for chicken
    ctx.fillRect(player.x, player.y, player.size, player.size);

    // Draw score
    ctx.fillStyle = '#000000';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);
}

// Show game over screen
function showGameOver() {
    const gameOverDiv = document.getElementById('gameOver');
    const finalScoreDiv = document.getElementById('finalScore');
    finalScoreDiv.textContent = score;
    gameOverDiv.classList.remove('hidden');
}

// Restart game
function restartGame() {
    player.x = canvas.width / 2 - PLAYER_SIZE / 2;
    player.y = canvas.height - SAFE_ZONE_HEIGHT - PLAYER_SIZE;
    score = 0;
    gameOver = false;
    initObstacles();
    const gameOverDiv = document.getElementById('gameOver');
    gameOverDiv.classList.add('hidden');
    cancelAnimationFrame(animationId);
    update();
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (gameOver) return;
    switch (e.key) {
        case 'ArrowUp':
            if (player.y - PLAYER_SPEED >= 0) {
                player.y -= PLAYER_SPEED;
            }
            break;
        case 'ArrowDown':
            if (player.y + PLAYER_SPEED <= canvas.height - player.size) {
                player.y += PLAYER_SPEED;
            }
            break;
        case 'ArrowLeft':
            if (player.x - PLAYER_SPEED >= 0) {
                player.x -= PLAYER_SPEED;
            }
            break;
        case 'ArrowRight':
            if (player.x + PLAYER_SPEED <= canvas.width - player.size) {
                player.x += PLAYER_SPEED;
            }
            break;
    }
});

// Start game
initObstacles();
update();