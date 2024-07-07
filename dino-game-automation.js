(function() {
    // Helper function to simulate key press
    function simulateKeyPress(keyCode) {
        var event = new KeyboardEvent('keydown', {bubbles: true, cancelable: true, keyCode: keyCode});
        document.dispatchEvent(event);
    }

    // Helper function to simulate key release
    function simulateKeyRelease(keyCode) {
        var event = new KeyboardEvent('keyup', {bubbles: true, cancelable: true, keyCode: keyCode});
        document.dispatchEvent(event);
    }

    // Main function to automate jumping and ducking
    function autoControl() {
        var tRex = Runner.instance_.tRex;
        var obstacles = Runner.instance_.horizon.obstacles;

        if (obstacles.length > 0) {
            var obstacle = obstacles[0];
            var obstacleXPos = obstacle.xPos;
            var obstacleWidth = obstacle.width;
            var obstacleYPos = obstacle.yPos;
            var dinoXPos = tRex.xPos + tRex.config.WIDTH / 2;
            var dinoSpeed = Runner.instance_.currentSpeed;

            // Adjust the threshold distance for jumping based on Dino's speed
            var distanceThreshold = dinoSpeed * 15;

            // Conditions for jumping and ducking
            var shouldJump = (obstacleXPos < dinoXPos + distanceThreshold) && (obstacleYPos > 75);
            var shouldDuck = (obstacleXPos < dinoXPos + distanceThreshold) && (obstacleYPos <= 75);

            if (shouldJump && !tRex.jumping) {
                simulateKeyPress(32); // 32 is the keyCode for space to jump
            }

            if (shouldDuck && !tRex.ducking) {
                simulateKeyPress(40); // 40 is the keyCode for down arrow to duck
                tRex.ducking = true; // Set ducking state to true
                // Release the down arrow key after a short duration
                setTimeout(() => {
                    simulateKeyRelease(40);
                    tRex.ducking = false;
                }, 300); // Increased duration to handle higher speed
            }
        }

        requestAnimationFrame(autoControl);
    }

    // Start the game
    Runner.instance_.playIntro();
    simulateKeyPress(32); // Start the game by pressing space

    // Start the automation
    requestAnimationFrame(autoControl);
})();
