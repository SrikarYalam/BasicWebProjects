const GameBoard = (() => {
    const game = new Array(9);
    const gameSquares = document.querySelectorAll(".square");
    const restartButton = document.createElement("button");

    // checks the current game board to see if anyone won
    const checkWinCondition = function(currentBoard, currentPlayer){
        return ((game[0] == currentPlayer.symbol && game[1] == currentPlayer.symbol && game[2] == currentPlayer.symbol) ||
                (game[0] == currentPlayer.symbol && game[4] == currentPlayer.symbol && game[8] == currentPlayer.symbol) ||
                (game[0] == currentPlayer.symbol && game[3] == currentPlayer.symbol && game[6] == currentPlayer.symbol) ||
                (game[1] == currentPlayer.symbol && game[4] == currentPlayer.symbol && game[7] == currentPlayer.symbol) ||
                (game[2] == currentPlayer.symbol && game[4] == currentPlayer.symbol && game[6] == currentPlayer.symbol) ||
                (game[2] == currentPlayer.symbol && game[5] == currentPlayer.symbol && game[8] == currentPlayer.symbol) ||
                (game[3] == currentPlayer.symbol && game[4] == currentPlayer.symbol && game[5] == currentPlayer.symbol) ||
                (game[6] == currentPlayer.symbol && game[7] == currentPlayer.symbol && game[8] == currentPlayer.symbol)
        );
    }

    // checks the board for a draw condition
    const checkDraw = function(){
        for (var i = 0; i < 9; i++)
        {
            if (game[i] == undefined) return false;
        }
        return true;
    }

    // Makes the bot's move
    const makeBotMove = function(currentPlayer){
        let randomMove = 0;
        do
        {
            randomMove = Math.floor(Math.random() * 9);
        }
        while (game[randomMove] == player.symbol || game[randomMove] == bot.symbol)
        displayController.updatePlayerMove(currentPlayer, gameSquares[randomMove]);
    }

    // Checks for the players move
    gameSquares.forEach(square => {
    square.addEventListener("click", () => {
        displayController.updatePlayerMove(player, square);
    });
    })

    restartButton.addEventListener("click", () => {
        console.log("restarting...");
        console.log(game);
        for (let i = 0; i < 9; i++)
        {
            gameSquares[i].textContent = "";
            game[i] = undefined;
            gameSquares[i].style.color = "black";
        }

    })

    return {game, checkWinCondition, makeBotMove, checkDraw, restartButton, gameSquares};
})();

const displayController = (() => {
    const audio = document.querySelector("audio");
    const pausePlay = document.querySelector("img");

    pausePlay.addEventListener("click", () => {
        console.log(pausePlay.src)
        if (pausePlay.src == "http://127.0.0.1:5500/pause.svg") 
        {
            pausePlay.src = "play.svg";
            audio.pause();
            console.log("pausing");
        }
        else {
            pausePlay.src = "http://127.0.0.1:5500/pause.svg";
            audio.play();
            console.log("playing");
        }
    })

    /*  UpdatePlayerMove updates the chosen players move
        @param currentPlayer, the player selected
        @param square, the square selected
     */
    const updatePlayerMove = (currentPlayer, square) =>
    {
        if (square.textContent == "X" || square.textContent == "O") return;
        console.log(GameBoard.game);
        square.textContent = currentPlayer.symbol;
        square.style.animation = 'flip 1s ease';
        square.style.backgroundColor = "gray";
        GameBoard.game[square.id-1] = currentPlayer.symbol;
        if (GameBoard.checkWinCondition(GameBoard.game, currentPlayer)){
            if (currentPlayer.id == "Player")
            {
                winScreen();
                console.log("THIS IS WHERE THE WIN SCREEN WOULD SHOW");
            }
            else if (currentPlayer.id == "Bot") {
                console.log("THIS IS WHERE LOSE SCREEN SHOWS");
                loseScreen();
            }
        }
        else if (GameBoard.checkDraw())
        {
            console.log("THIS IS WHERE THE DRAW SCREEN SHOWS");
        }
        else if (currentPlayer.id == "Player") GameBoard.makeBotMove(bot);
    }

    function winScreen() {
        for (let i = 0; i <= 2; i++)
        {
            GameBoard.gameSquares[i].style.color = "red";
            GameBoard.gameSquares[8-i].style.color = "red";
        }
        GameBoard.gameSquares[0].textContent = "Y";
        GameBoard.gameSquares[1].textContent = "O";
        GameBoard.gameSquares[2].textContent = "U";
        GameBoard.gameSquares[6].textContent = "W";
        GameBoard.gameSquares[7].textContent = "I";
        GameBoard.gameSquares[8].textContent = "N";
        GameBoard.gameSquares[4].textContent = "";
        GameBoard.restartButton.textContent = "RESTART?"
        GameBoard.gameSquares[4].appendChild(GameBoard.restartButton);
    }

    function loseScreen() {
        for (let i = 0; i <= 2; i++)
        {
            GameBoard.gameSquares[i].style.color = "red";
            GameBoard.gameSquares[8-i].style.color = "red";
        }
        GameBoard.gameSquares[0].textContent = "Y";
        GameBoard.gameSquares[1].textContent = "O";
        GameBoard.gameSquares[2].textContent = "U";
        GameBoard.gameSquares[6].textContent = "D";
        GameBoard.gameSquares[7].textContent = "I";
        GameBoard.gameSquares[8].textContent = "E";
        GameBoard.gameSquares[4].textContent = "";
        GameBoard.restartButton.textContent = "RESTART?"
        GameBoard.gameSquares[4].appendChild(GameBoard.restartButton);
    }

    function drawScreen() {
        for (let i = 0; i <= 2; i++)
        {
            GameBoard.gameSquares[i].style.color = "red";
            GameBoard.gameSquares[8-i].style.color = "red";
        }
        GameBoard.gameSquares[0].textContent = "Y";
        GameBoard.gameSquares[1].textContent = "O";
        GameBoard.gameSquares[2].textContent = "U";
        GameBoard.gameSquares[6].textContent = "T";
        GameBoard.gameSquares[7].textContent = "I";
        GameBoard.gameSquares[8].textContent = "E";
        GameBoard.gameSquares[4].textContent = "";
        GameBoard.restartButton.textContent = "RESTART?"
        GameBoard.gameSquares[4].appendChild(GameBoard.restartButton);
    }
    
    return {updatePlayerMove}
})();

const playerFactory = (id, symbol) => {
    return {id, symbol}
}

const player = playerFactory("Player", "O");
const bot = playerFactory("Bot", "X");

