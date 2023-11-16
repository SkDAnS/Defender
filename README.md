# Defender
Le jeu reprend les même règle que le jeu Defender original


Constants:

gamewidth, gameheight: Constants representing the width and height of the game area.
positionleft, positionright: Constants representing specific positions.
player: An object representing the player's character with properties such as x and y coordinates, width, height, and an HTML element reference.
Score: An HTML element representing the score.



Variables:

left, right, up, down: Variables representing the direction of the player's movement.
startTime, timerInterval: Variables for managing the game timer.
Petitalien, Moyenalien, Grandalien: Objects representing different types of aliens with associated HTML elements.
score: Variable to keep track of the player's score.
MissileVisible: A flag indicating whether a missile is currently visible.



Functions:

deplacerVaisseau(): Handles player movement based on keyboard input.
boost(): Implements a boost feature for the player's movement.
creerMissile(x, y): Creates a missile at a specified position.
DeplacerMissile(missile): Moves the missile and detects collisions with aliens.
collision(): Detects collisions between the player and aliens.
createElementalienPetit(x, y), createElementalienMoyen(x, y), createElementalienGrand(x, y): Functions to create and move different types of aliens.
SetArrierePlan(): Sets the background image and implements a parallax effect.
alien(): Calls functions to create different types of aliens.
time(): Initializes the game timer.
updateTimer(): Updates the timer display.
incrementManche(): Increments the round number.
showGameOver(), hideGameOver(): Functions to show/hide the game over screen.
stopGame(): Stops the game by clearing the timer interval.
setGame(event): Sets up the game by calling various initialization functions.



Event Listeners:

Event listeners for keyboard input to control player movement and actions.
Event listeners for the boost feature.
Event listeners for starting and restarting the game.



Overall Flow:

The game is initialized with the setGame function.
The player can control their character using the arrow keys, shoot missiles with the 'Q' key, and activate boost with the 'Z' key.
Aliens of different sizes move across the screen, and the player's goal is to shoot them to score points.
The game includes a timer, score display, and round number.
If the player collides with an alien, their lives are decremented. The game ends if the player runs out of lives.
The game over screen is displayed, and the player can restart the game.

