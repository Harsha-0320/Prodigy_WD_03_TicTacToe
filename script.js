document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resetBtn = document.getElementById('resetBtn');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameOver = false;

    // Function to initialize the game board
    function initBoard() {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }
    }

    // Function to handle cell click
    function handleCellClick(event) {
        const cellIndex = event.target.dataset.index;
        if (!gameOver && gameBoard[cellIndex] === '') {
            gameBoard[cellIndex] = currentPlayer;
            event.target.textContent = currentPlayer;
            if (checkWin()) {
                status.textContent = `Player ${currentPlayer} wins!`;
                gameOver = true;
            } else if (checkDraw()) {
                status.textContent = 'It\'s a draw!';
                gameOver = true;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                status.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    // Function to check for a win
    function checkWin() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        return winConditions.some(condition => {
            const [a, b, c] = condition;
            return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c];
        });
    }

    // Function to check for a draw
    function checkDraw() {
        return gameBoard.every(cell => cell !== '');
    }

    // Function to reset the game
    function resetGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameOver = false;
        board.innerHTML = '';
        status.textContent = `Player ${currentPlayer}'s turn`;
        initBoard();
    }

    // Event listener for the reset button
    resetBtn.addEventListener('click', resetGame);

    // Initialize the game board
    initBoard();
});
