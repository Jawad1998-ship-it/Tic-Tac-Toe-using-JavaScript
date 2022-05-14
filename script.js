const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const element = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
let circleTurn; // because const cannot be updated
const winningText = document.querySelector("[data-winning-message]");
const winningElement = document.getElementById('winningMsg');
const button = document.getElementById("restart-button");

const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

start();

button.addEventListener("click", start);


function draw()
{
    return [...element].every(cell => {
        return cell.classList.contains(X_CLASS) || // cell element does not have every method so we destrucure
        cell.classList.contains(CIRCLE_CLASS)
    })        
}

function start()
{   
    circleTurn = false
        element.forEach(cell =>{
            cell.classList.remove(X_CLASS);
            cell.classList.remove(CIRCLE_CLASS);
            cell.removeEventListener("click",handleClick);
            cell.addEventListener("click", handleClick ,{once:true});
})
    setBoard();
    winningMsg.classList.remove("show");
}

function end(draw)
{
    if(draw)
    {
        winningText.innerText = "Draw!";
    }
    else
    {
        winningText.innerText = `${circleTurn? 'O Wins' : 'X Wins' }`
    }
    winningMsg.classList.add('show')
}

function handleClick(e)
{
    const cell = e.target;
    const current = circleTurn? CIRCLE_CLASS : X_CLASS;
    setMark(cell,current);
    if(checkWin(current))
    {
        end(false);
    }
    else if(draw())
    {
        end(true);
    }
    else
    {
        swap()
        setBoard()
    }

}

function setMark(cell,current)
{
    cell.classList.add(current);
}

function swap()
{
    circleTurn = !circleTurn;
}

function setBoard()
{
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if(circleTurn)
    {
        board.classList.add(CIRCLE_CLASS);
    }
    else
    {
        board.classList.add(X_CLASS);
    }
}

function checkWin(current)
{
    return winCombinations.some(combination => {
        return combination.every(index => {
            return element[index].classList.contains(current)
        })
    })
}