const restart_btn = document.getElementById('restart-btn');
const dark_panel = document.getElementById('dark-panel');
const panel = document.getElementById('panel');
let restart_panel = document.createElement('div');
restart_panel.classList.add('restart-panel');
let restart_text = document.createElement('h2');
restart_text.classList.add('heading-l');
restart_text.textContent = 'RESTART GAME?';
let answer_buttons = document.createElement('div');
answer_buttons.classList.add('answer-buttons', 'flex');
let cancel_btn = document.createElement('button');
cancel_btn.classList.add('secondary-button', 'heading-xs', 'quit');
cancel_btn.textContent = 'NO, CANCEL';
let re_btn = document.createElement('button');
re_btn.textContent = 'YES, RESTART';
re_btn.classList.add('orange-button', 'heading-xs', 'next');
answer_buttons.appendChild(cancel_btn);
answer_buttons.appendChild(re_btn);
restart_panel.appendChild(restart_text);
restart_panel.appendChild(answer_buttons);
panel.appendChild(restart_panel);
///////////////////////////////////////////
let answer = document.createElement('div');
answer.classList.add('answer');
win_answer = document.createElement('p');
win_answer.classList.add('win-answer', 'heading-xs');
win_answer.textContent = 'OH NO, YOU LOST…';
let round = document.createElement('div');
round.classList.add('round', 'flex');
let round_img = document.createElement('img');
// round_img.src = './assets/icon-o.svg';
let take_round = document.createElement('p');
take_round.classList.add('take-round', 'heading-l');
take_round.textContent = 'TAKES THE ROUND';
answer_buttons = document.createElement('div');
answer_buttons.classList.add('answer-buttons', 'flex');
let quit_btn = document.createElement('button');
quit_btn.classList.add('secondary-button', 'heading-xs', 'quit');
quit_btn.textContent = 'QUIT';
let next_btn = document.createElement('button');
next_btn.classList.add('orange-button', 'heading-xs', 'next');
next_btn.textContent = 'NEXT ROUND';
round.appendChild(round_img);
round.appendChild(take_round);
answer_buttons.appendChild(quit_btn);
answer_buttons.appendChild(next_btn);
answer.append(win_answer, round, answer_buttons);
answer.appendChild(win_answer);
answer.appendChild(round);
answer.appendChild(answer_buttons);
panel.appendChild(answer);
//////////////////////////////////////////
const menu_container = document.querySelector('.menu-container');
const game_container = document.querySelector('.game-container');
let game_item = document.querySelectorAll('.game-item');
let you_score = document.getElementById('you-score');
let you_score_num = 0;
let cpu_score = document.getElementById('cpu-score');
let cpu_score_num = 0;
let tie_score = document.getElementById('tie-score');
let tie_score_num = 0;
let currentPlayer = 'x';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;
const winVariants =
    [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
let xo_image = document.createElement('img');
const cpu_btn = document.querySelector('.cpu');
const amigo_btn = document.querySelector('.player');
const buttons = document.querySelectorAll(".button");
const x_btn = document.querySelector('#X-btn');
const o_btn = document.querySelector('#O-btn');
let turn_element = document.querySelector('.turn-btn');
let turn_image = document.createElement('img');
let drawAnnounced = false;
function handleGame(event) {
    if (gameOver) return;
    const index = event.target.dataset.index;
    if (gameBoard[index] === '') {
        gameBoard[index] = currentPlayer;
        if (currentPlayer === 'x') {
            xo_image.src = './assets/icon-x.svg';
            turn_image.src = './assets/O.png';
            event.target.innerHTML = `<img src="${xo_image.src}">`;
            turn_element.innerHTML = `<img src="${turn_image.src}">TURN`;
        }
        else {
            xo_image.src = './assets/icon-o.svg';
            turn_image.src = './assets/X.svg';
            event.target.innerHTML = `<img src="${xo_image.src}">`;
            turn_element.innerHTML = `<img src="${turn_image.src}">TURN`;
        }
        checkWin();
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    }
}
function checkWin() {
    for (let i = 0; i < winVariants.length; i++) {
        const variant = winVariants[i];
        if (gameBoard[variant[0]] === gameBoard[variant[1]] && gameBoard[variant[1]] === gameBoard[variant[2]] && gameBoard[variant[0]] !== '') {
            gameOver = true;
            announceWinner(gameBoard[variant[0]]);
            return;
        }
        if (!gameBoard.includes('') && !winVariants.some(variant => variant.every(index => gameBoard[index] !== '' && gameBoard[index] === gameBoard[variant[0]]))) {
            gameOver = true;
            announceDraw();
            drawAnnounced = true;
        }
    }
}
function announceWinner(winner) {
    onPanel();
    answer.style.display = 'block';
    if (winner == 'x') {
        round_img.src = './assets/icon-x.svg';
        take_round.style.color = '#31C3BD';
        win_answer.textContent = `PLAYER 1 WINS!`;
        
        win_answer.style.display = 'block';
        round_img.style.display = 'block';
        take_round.style.display = 'block';
        take_round.textContent = `TAKES THE ROUND`;
        const winningItems = getWinningItems(winner);
        winningItems.forEach((item) => {
            item.style.backgroundColor = '#65E9E4';
        });
        you_score_num++;
        you_score.innerHTML = you_score_num;
    }
    else {
        win_answer.textContent = `PLAYER 2 WINS!`;
        round_img.src = './assets/icon-o.svg';
        take_round.style.color = '#F2B137';
        win_answer.style.display = 'block';
        round_img.style.display = 'block';
        take_round.style.display = 'block';
        take_round.textContent = `TAKES THE ROUND`;
        const winningItems = getWinningItems(winner);
        winningItems.forEach((item) => {
            item.style.backgroundColor = '#FFC860';
        });
        cpu_score_num++;
        cpu_score.innerHTML = cpu_score_num;
    }
}
function getWinningItems(winner) {
    const winningItems = [];
    for (let i = 0; i < winVariants.length; i++) {
        const variant = winVariants[i];
        if (gameBoard[variant[0]] === gameBoard[variant[1]] && gameBoard[variant[1]] === gameBoard[variant[2]] && gameBoard[variant[0]] === winner) {
            winningItems.push(game_item[variant[0]]);
            winningItems.push(game_item[variant[1]]);
            winningItems.push(game_item[variant[2]]);
        }
    }
    return winningItems;
}
function announceDraw() {
    onPanel();
    answer.style.display = 'block';
    take_round.style.display = 'block';
    win_answer.style.display = 'none';
    round_img.style.display = 'none';
    take_round.style.textAlign = 'center';
    take_round.style.width = '100%';
    take_round.style.color = '#A8BFC9';
    take_round.textContent = `ROUND TIED`;
    tie_score_num += 1/8;
    tie_score.innerHTML = tie_score_num;
}
amigo_btn.addEventListener('click', onstartGame);
cpu_btn.addEventListener('click', onstartGame);
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        buttons.forEach((btn) => btn.classList.remove('active-btn'));
        button.classList.add('active-btn');
        if (x_btn.classList.contains('active-btn')) {
            x_btn.querySelector('img').src = './assets/X.png';
            o_btn.querySelector('img').src = './assets/O.png';
        }
        else {
            o_btn.querySelector('img').src = './assets/O.svg';
            x_btn.querySelector('img').src = './assets/X.svg';
        }
    });
});

restart_btn.addEventListener('click', onRestartButton);
cancel_btn.addEventListener('click', forNone);
quit_btn.addEventListener('click', function () {
    location.reload();
});
function onRestartButton() {
    onPanel();
    restart_panel.style.display = 'block';
}
function restartGame() {
    nextRound();
    tie_score_num = 0;
    tie_score.innerHTML = tie_score_num;
    cpu_score_num = 0;
    cpu_score.innerHTML = cpu_score_num;;
    you_score_num = 0;
    you_score.innerHTML = you_score_num;
}

function onPanel() {
    dark_panel.style.display = 'block';
    panel.style.display = 'block';
    console.log("onPanel-function works");
}
next_btn.addEventListener('click', nextRound);
re_btn.addEventListener('click', restartGame);
function nextRound() {
    forNone();
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    currentPlayer = 'x';
    game_item.forEach((item) => {
        item.style.backgroundColor = '';
    });
    answer.style.display = 'none';
    win_answer.style.display = 'none';
    round_img.style.display = 'none';
    take_round.style.display = 'none';
    game_item.forEach((item) => {
        item.innerHTML = '';
    });
}
amigo_btn.addEventListener('click', function () {
    onstartGame();
    game_item.forEach((gameItem) => {
        gameItem.addEventListener('click', handleGame);
    });
    game_item.forEach((gameItem) => {
        gameItem.addEventListener('mouseover', function () {
            const index = gameItem.dataset.index;
            if (gameBoard[index] === '' && !gameItem.querySelector('img')) {
                if (currentPlayer === 'x') {
                    xo_image.src = './assets/icon-x-outline.svg';
                    gameItem.appendChild(xo_image.cloneNode(true));
                } else {
                    xo_image.src = './assets/icon-o-outline.svg';
                    gameItem.appendChild(xo_image.cloneNode(true));
                }
            }
        });
        gameItem.addEventListener('mouseleave', function () {
            const index = gameItem.dataset.index;
            if (gameBoard[index] === '') {
                gameItem.innerHTML = '';
            }
        });
    });
});
cpu_btn.addEventListener('click', onstartGame);
function onstartGame() {
    game_container.style.display = 'block';
    menu_container.style.display = 'none';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    console.log("onstartGame-function works");
}
function forNone() {
    dark_panel.style.display = 'none';
    panel.style.display = 'none';
    answer.style.display = 'none';
    restart_panel.style.display = 'none';
    console.log("forNone-function works");
}