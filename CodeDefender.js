// Constantes
const gamewidth = 1200;
const gameheight = 750;
const positionleft = 55;
const positionright = 1000;

// Directions
let left = false;
let right = false;
let up = false;
let down = false;

// Timer
let startTime;
let timerInterval;


// Initialisation alien
let Petitalien = {
    element: document.createElement("div"),
};

let Moyenalien = {
    element: document.createElement("div"),
};

let Grandalien = {
    element: document.createElement("div"),
};


const player = {
    x: 55,
    y: 150,
    width: 50,
    height: 50,
    element: document.getElementById("player"),
    direction: null,
};

// Score
let score = 0;
const Score = document.getElementById("score");




// Directions
function deplacerVaisseau() {
    // Récupere l'information des touches pressées
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            left = true;
        } else if (event.key === 'ArrowRight') {

            right = true;
        } else if (event.key === 'ArrowUp') {
            up = true;
        } else if (event.key === 'ArrowDown') {
            down = true;
        } else if (event.key === "q" || event.key === "Q") {
            creerMissile(player.x, player.y);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            document.getElementById('player').innerHTML = '<img src="../images/vaisseauinverser.png" height="60px">';
        }
        else if (event.key === 'ArrowLeft') {
            document.getElementById('player').innerHTML = '<img src="../images/vaisseau.png" height="60px">';
        }
    });



    document.addEventListener('keyup', (event) => {
        if (event.key === 'ArrowLeft') {
            left = false;
        } else if (event.key === 'ArrowRight') {
            right = false;
        } else if (event.key === 'ArrowUp') {
            up = false;
        } else if (event.key === 'ArrowDown') {
            down = false;
        }
    });

    // Fonction pour déplacer le player
    player.move = function (left, right, up, down) {
        if (left) {
            let maxX = 55;
            let intervalId = setInterval(() => {
                if (player.x > maxX) {
                    player.x -= 20;
                    player.element.style.left = player.x + "px";
                } else {
                    clearInterval(intervalId);
                }
            }, 15);
        }

        if (right) {
            let maxX = 1000;
            let intervalId = setInterval(() => {
                if (player.x < maxX) {
                    player.x += 20;
                    player.element.style.left = player.x + "px";
                } else {
                    clearInterval(intervalId);
                }
            }, 15);
        }

        if (up) {
            if (player.y > 1) {
                player.y -= 10;
                player.element.style.top = player.y + 'px';
            }
        }
        if (down) {
            if (player.y < gameheight - 20) {
                player.y += 10;
                player.element.style.top = player.y + 'px';
            }
        }
    };




    function update() {

        player.move(left, right, up, down);
        requestAnimationFrame(update);
    }

    update();

}


function boost() {

    const backwardLimit = positionleft;
    let forwardIntervalId = null;
    let backwardIntervalId = null;
    let isBoosting = false;
    let direction = "left";

    window.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            direction = "left";
        }
        if (event.key === "ArrowRight") {
            direction = "right";
        }
        if (event.key === "z" && !isBoosting) {
            clearInterval(backwardIntervalId);
            forwardIntervalId = setInterval(() => {
                if (
                    (direction === "left" && player.x < 155) ||
                    (direction === "right" && player.x > 900)
                ) {
                    player.x += direction === "left" ? 10 : -10;
                    player.element.style.left = player.x + "px";
                }
            }, 10);
            isBoosting = true;
        }
    });

    window.addEventListener("keyup", (event) => {
        if (event.key === "z") {
            clearInterval(forwardIntervalId);
            backwardIntervalId = setInterval(() => {
                if (
                    (direction === "left" && player.x > backwardLimit) ||
                    (direction === "right" && player.x < 1000)
                ) {
                    player.x += direction === "left" ? -10 : 10;
                    player.element.style.left = player.x + "px";
                } else if (!event.repeat) {
                    clearInterval(backwardIntervalId);
                }
            }, 10);
            isBoosting = false;
        }
    });
}

let MissileVisible = false;

function creerMissile(x, y) {
    // Utilisation d'un mouvement par pixel dans tout le programme
    if (MissileVisible) {
        return;
    }

    const missile = document.createElement("div");
    missile.classList.add("missile");

    if (player.x == 55) {
        missile.style.left = x + player.width + "px";
    }
    else if (player.x > 1000) {
        missile.style.left = x + 0 + "px";
    }

    missile.style.top = y + 21 + "px";

    document.getElementById("game").appendChild(missile);
    MissileVisible = true;

    DeplacerMissile(missile);





    setTimeout(() => {
        MissileVisible = false;
    }, 250);
}


let direction = 'right';

function DeplacerMissile(missile) {
    const moveAmount = 10;
    let timeoutId;
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {

                direction = 'right';
            }, 70);
        } else if (event.key === 'ArrowRight') {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                direction = 'left';
            }, 70);
        }
    });

    // Initialisation des hitbox
    function detectCollision(missile, alien) {
        if (alien && missile.offsetLeft >= alien.offsetLeft && missile.offsetLeft <= alien.offsetLeft + alien.offsetWidth
            && missile.offsetTop <= alien.offsetTop + alien.offsetHeight && missile.offsetTop >= alien.offsetTop) {
            return true;
        }
        return false;
    }
    const intervalId = setInterval(() => {

        if (direction === 'left') {
            missile.innerHTML = '<img src="../images/laser.png" height="30px">';
            missile.style.left = parseInt(missile.style.left) - moveAmount + "px";

        }
        else if (direction === 'right') {
            missile.innerHTML = '<img src="../images/laserbis.png" height="30px">';
            missile.style.left = parseInt(missile.style.left) + moveAmount + "px";
        }

        const gameWidth = 1200;
        if (parseInt(missile.style.left) < 0 - missile.clientWidth || parseInt(missile.style.left) > gameWidth) {
            clearInterval(intervalId);
            missile.remove();
        }



        const alienPetit = document.getElementById("alienpetit");
        const alienMoyen = document.getElementById("alienmoyen");
        const alienGrand = document.getElementById("aliengrand");

        if (detectCollision(missile, alienPetit)) {
            clearInterval(intervalId);
            missile.remove();
            alienPetit.style.display = "none";
            score += 150;
            Score.innerText = score;
        }


        if (detectCollision(missile, alienMoyen)) {
            clearInterval(intervalId);
            missile.remove();
            alienMoyen.style.display = "none";
            score += 100;
            Score.innerText = score;
        }

        if (detectCollision(missile, alienGrand)) {
            clearInterval(intervalId);
            missile.remove();
            alienGrand.style.display = "none";
            score += 50;
            Score.innerText = score;
        }




    }, 2);


}



document.body.appendChild(Petitalien.element);
document.body.appendChild(Moyenalien.element);
document.body.appendChild(Grandalien.element);








// Variable de flag pour suivre si le vaisseau a déjà touché un alien lors de la dernière collision
let alreadyHit = false;

// Fonction de détection de collision
function collision() {
    // Récupération des éléments HTML pertinents
    const vaisseau = document.getElementById("player");
    const petitAlien = document.getElementById("alienpetit");
    const moyenAlien = document.getElementById("alienmoyen");
    const grandAlien = document.getElementById("aliengrand");
    const lives = document.getElementById("lives");

    // Récupération des positions des éléments
    const vaisseauRect = vaisseau.getBoundingClientRect();
    const petitAlienRect = petitAlien.getBoundingClientRect();
    const moyenAlienRect = moyenAlien.getBoundingClientRect();
    const grandAlienRect = grandAlien.getBoundingClientRect();

    // Vérification de la collision pour chaque type d'alien
    if (
        vaisseauRect.left < petitAlienRect.right &&
        vaisseauRect.right > petitAlienRect.left &&
        vaisseauRect.top < petitAlienRect.bottom &&
        vaisseauRect.bottom > petitAlienRect.top
    ) {
        if (!alreadyHit) {
            // Réduction de la vie du vaisseau pour le petit alien
            const currentLives = parseInt(lives.textContent);
            if (currentLives >= 2) {
                lives.textContent = currentLives - 1;
                alreadyHit = true;
            } else if (currentLives < 2) {
                // Le joueur n'a plus de vies, on arrête le jeu
                setInterval(function () {
                    showGameOver();
                }, 4);

                hideGameOver();
                window.location.reload();



            }
        }
    }

    else if (
        vaisseauRect.left < moyenAlienRect.right &&
        vaisseauRect.right > moyenAlienRect.left &&
        vaisseauRect.top < moyenAlienRect.bottom &&
        vaisseauRect.bottom > moyenAlienRect.top
    ) {
        if (!alreadyHit) {
            // Réduction de la vie du vaisseau pour le moyen alien
            const currentLives = parseInt(lives.textContent);
            if (currentLives >= 2) {
                lives.textContent = currentLives - 1;
                alreadyHit = true;
            } else if (currentLives < 2) {
                // Le joueur n'a plus de vies, on arrête le jeu
                setInterval(function () {
                    showGameOver();

                }, 4);

                hideGameOver();
                window.location.reload();



            }
        }
    }


    else if (
        vaisseauRect.left < grandAlienRect.right &&
        vaisseauRect.right > grandAlienRect.left &&
        vaisseauRect.top < grandAlienRect.bottom &&
        vaisseauRect.bottom > grandAlienRect.top
    ) {
        if (!alreadyHit) {
            // Réduction de la vie du vaisseau pour le grand alien
            const currentLives = parseInt(lives.textContent);
            if (currentLives >= 2) {
                lives.textContent = currentLives - 1;
                alreadyHit = true;
            } else if (currentLives < 2) {
                setInterval(function () {

                    showGameOver();

                }, 4);

                hideGameOver();
                window.location.reload();



            }
        }
    } else {
        alreadyHit = false;
    }
}

// Exécution de la fonction de détection de collision à intervalles réguliers
setInterval(collision, 10);





// Création des aliens


function createElementalienPetit(x, y) {

    var posalienX = x;
    var posalienY = y;

    var alienElementP = document.getElementById("alienpetit");
    alienElementP.style.top = posalienY + "px";
    
    let Pos = 0;
    let speed = 7;
    
    // Générer un nombre aléatoire entre 1 et 2 pour déterminer la direction de l'alien
    const randomNum = Math.floor(Math.random() * 2) + 1;
    const direction = (randomNum === 1) ? 1 : -1;
    

    posalienX = (direction === 1) ? posalienX : 0;
    alienElementP.style.left = posalienX + "px";
    

    document.addEventListener('keydown', (event) => {
        if (event.key === 'z' || event.key === 'Z') {
            speed = 20;
        }
    });
    

    document.addEventListener('keyup', (event) => {
        if (event.key === 'z' || event.key === 'Z') {
            speed = 13;
        }
    });
    

    let intervalId = setInterval(() => {
        Pos -= speed;
        
        if (direction === 1 && posalienX > 0) {
            posalienX -= speed;
            alienElementP.style.left = posalienX + "px";
        } 
        else if (direction === -1 && posalienX < 1100) {
            posalienX += speed;
            alienElementP.style.left = posalienX + "px";
        } 
        else {
            clearInterval(intervalId);
            alienElementP.style.display = "none";
            
            // Réinitialiser la position de l'alien sur l'axe X et générer une nouvelle position aléatoire sur l'axe Y
            posalienX = (direction === 1) ? 1100 : 0;
            posalienY = Math.floor(Math.random() * (750 - 2 + 1) + 12);

            setTimeout(() => {
                alienElementP.style.display = "block";
                createElementalienPetit(posalienX, posalienY);
            }, 100);
        }
    }, 20);
}



function createElementalienMoyen(x, y) {
    var posalienX = x;
    var posalienY = y;
    var alienElementM = document.getElementById("alienmoyen");
    alienElementM.style.top = posalienY + "px";
    let Pos = 0;
    let speed = 5;
    const randomNum = Math.floor(Math.random() * 2) + 1;
    const direction = (randomNum === 1) ? 1 : -1;
    posalienX = (direction === 1) ? posalienX : 0;
    alienElementM.style.left = posalienX + "px";
    document.addEventListener('keydown', (event) => {
        if (event.key === 'z' || event.key === 'Z') {
            speed = 15;
        }
    });
    document.addEventListener('keyup', (event) => {
        if (event.key === 'z' || event.key === 'Z') {
            speed = 10;
        }
    });
    let intervalId = setInterval(() => {
        Pos -= speed;
        if (direction === 1 && posalienX > 0) {
            document.getElementById('alienmoyen').innerHTML = '<img src="../images/alien2.png" height="60px">';
            posalienX -= speed;
            alienElementM.style.left = posalienX + "px";
        } else if (direction === -1 && posalienX < 1000) {
            document.getElementById('alienmoyen').innerHTML = '<img src="../images/alienbis2.png" height="60px">';
            posalienX += speed;
            alienElementM.style.left = posalienX + "px";
        } else {
            clearInterval(intervalId);
            alienElementM.style.display = "none";
            posalienX = (direction === 1) ? 1000 : 0;
            posalienY = Math.floor(Math.random() * (750 - 2 + 1) + 12);
            setTimeout(() => {
                alienElementM.style.display = "block";
                createElementalienMoyen(posalienX, posalienY);
            }, 100);
        }
    }, 20);
}


function createElementalienGrand(x, y) {
    var posalienX = x;
    var posalienY = y;

    var alienElementG = document.getElementById("aliengrand");
    alienElementG.style.top = posalienY + "px";
    let Pos = 0;
    let speed = 3;
    const randomNum = Math.floor(Math.random() * 2) + 1;
    const direction = (randomNum === 1) ? 1 : -1;
    posalienX = (direction === 1) ? posalienX : 0;
    alienElementG.style.left = posalienX + "px";

    document.addEventListener('keydown', (event) => {
        if (event.key === 'z' || event.key === 'Z') {
            speed = 13;
        }
    });
    document.addEventListener('keyup', (event) => {
        if (event.key === 'z' || event.key === 'Z') {
            speed = 8;
        }
    });

    let intervalId = setInterval(() => {
        Pos -= speed;


        if (direction === 1 && posalienX > 0) {
            document.getElementById('aliengrand').innerHTML = '<img src="../images/alien3.png" height="200px">';
            posalienX -= speed;
            alienElementG.style.left = posalienX + "px";

        } else if (direction === -1 && posalienX < 865) {
            document.getElementById('aliengrand').innerHTML = '<img src="../images/alienbis3.png" height="200px">';
            posalienX += speed;
            alienElementG.style.left = posalienX + "px";

        } else {
            clearInterval(intervalId);
            alienElementG.style.display = "none";
            posalienX = (direction === 1) ? 865 : 0;
            posalienY = Math.floor(Math.random() * (750 - 20 + 1) + 12);
            setTimeout(() => {
                alienElementG.style.display = "block";
                createElementalienGrand(posalienX, posalienY);
            }, 100);
        }
    }, 20);
}


function SetArrierePlan() {
    document.getElementById("game").style.backgroundImage = "url('../images/fondecran.png')";
    let bgPos = 0;
    let speed = 12;

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            direction = "left";
        } else if (event.key === 'ArrowRight') {
            direction = "right"; // direction = "right"
        } else if (event.key === 'z' || event.key === 'Z') {
            speed = 15;
        }
    });
    document.addEventListener('keyup', (event) => {
        if (event.key === 'z' || event.key === 'Z') {
            speed = 5;
        }
    });
    setInterval(() => {
        if (direction === "right") {
            bgPos += speed;
        } else {
            bgPos -= speed;
        }
        document.getElementById("game").style.backgroundPosition = bgPos + "px 0";
    }, 30);

}


function alien() {
    createElementalienPetit();
    createElementalienMoyen();
    createElementalienGrand();

}



function time() {
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTimer, 1000);

}

// Cette fonction permet de mettre à jour un timer affiché sur la page
function updateTimer() {
    // On calcule le temps écoulé (en millisecondes) depuis le démarrage du timer
    const elapsedTime = new Date().getTime() - startTime;
    
    // On convertit le temps écoulé en minutes et en secondes
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    
    // On récupère l'élément du DOM ayant l'ID "timer"
    const timerElement = document.getElementById("timer");
    
    // On met à jour le contenu textuel de timerElement avec les minutes et secondes écoulées
    // On ajoute un zéro devant les minutes et secondes si elles sont inférieures à 10
    timerElement.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}



// Cette fonction permet d'incrémenter le numéro de manche affiché sur la page
function incrementManche() {

    const mancheElement = document.getElementById("manche");
    const textContent = mancheElement.textContent;
    
    // On cherche une chaîne de caractères contenant un ou plusieurs chiffres
    const match = textContent.match(/(\d+)/);
    
    // Si on trouve un tel groupe de chiffres
    if (match) {
        // On convertit la chaîne de caractères en un entier (num)
        const num = parseInt(match[0]);
        const incrementedNum = num + 1;
        
        // On remplace l'ancienne valeur numérique par la nouvelle valeur incrémentée
        const newTextContent = textContent.replace(match[0], incrementedNum);
        
        // On met à jour le contenu textuel de mancheElement avec la nouvelle valeur
        mancheElement.textContent = newTextContent;
    }
}

// Pour faire apparaître le gameover
function showGameOver() {
    const gameOver = document.getElementById("gameOver");
    gameOver.style.display = "block"; 
}

// Pour faire disparaître le gameover
function hideGameOver() {
    const gameOver = document.getElementById("gameOver");
    gameOver.style.display = "none";
}


function stopGame() {
    clearInterval(timerInterval);

}


function setGame(event) {
    setInterval(incrementManche, 300000);
    
    time();
    alien();
    deplacerVaisseau();
    SetArrierePlan();

}


const startButton = document.getElementById('start-button');
let gameStarted = false;

startButton.addEventListener('click', () => {
    if (gameStarted) {
        window.location.reload();

    } else {
        setGame();
        gameStarted = true;
    }
});


















