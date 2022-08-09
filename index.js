
// RIGHT JSSSSS

// gridElement
const gameGrid = document.querySelector('#game-grid')
const startButton = document.getElementById('start-game')
const nextLvl = document.getElementById('next-lvl');

// gridColumns, gridRows
const gridHeight = 10;
const gridWidth = 10;

// cells has all the grid's cells
const cells = [];
// Player first position
let currentPosition = 12;
// starting level
let levelCounter = 0;
const levels=[];

const map0 =    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                10,         14,            19,
                20,         24,   26,27, 
                30,         34,   36,37,   39,
                40,         44,            49,
                50,         54,   56,57,58,59,
                60,         64,            69,
                70,   72,73,74,75,76,77,   79,
                80,                        89,
                90,91,92,93,94,95,96,97,98,99]

const level0 = new Level(map2);

const map1 =    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                10,            15,         19,
                      22,23,               29,
                30,            35,36,      39,
                40,      43,44,            49,
                50,51,               57,58,59,
                60,         64,65,         69,
                70,                        79,
                80,   82,      85,         89,
                90,91,92,93,94,95,96,97,  ,99]

const level1 = new Level(map1);


startButton.addEventListener('click', startTheGame)

function startTheGame() {
    createTheGrid();
    startButton.remove();
    displayPlayer();
    displayKey(29);
    levels[levelCounter].displayObstacles();
    hideGrid();
   // level0.countDamage();
    nextLevel();
   
}

function restartGame(){
    cells=[];
    startTheGame();
}

//create a grid from given height and width
function createTheGrid() {
    for(let i=0; i<gridHeight * gridWidth; i++){
        const div = document.createElement('div');
        div.classList.add('cell')
        div.dataset.index = i;
        gameGrid.append(div);
        cells.push(div);
    }

}

function displayPlayer(){
    const myPosition = cells[currentPosition];
    console.log(myPosition);
    myPosition.classList.add('player')
}

document.addEventListener('keydown', (event) => {
    console.log('I pressed:', event.key);

    switch (event.key) {
        case 'ArrowUp':
            movePlayer(currentPosition - gridHeight)
            break;

        case 'ArrowDown':
            movePlayer(currentPosition + gridHeight)
            break;
        case 'ArrowLeft':
            if(currentPosition % 10 !== 0) {
                movePlayer(currentPosition -1);
            }
            break;
        case 'ArrowRight':
            if((currentPosition+1) % 10 !== 0) {
                movePlayer(currentPosition +1);
            }
            break;
    }
});


function movePlayer (newPosition) {
    if (newPosition < 0 || newPosition > 99) {
        return console.error('Invalid Move!');
    }

    if (cannotMove(newPosition)){ 
        return;
    }

    removePlayer();
    currentPosition = newPosition;
    displayPlayer();
    refreshHiddenClass();

    console.log(cells[currentPosition]);
}

function removePlayer(){
    cells[currentPosition].classList.remove('player');
}

function displayKey(position){
    cells[position].classList.add('key')
}


function hideGrid(){
    setTimeout(refreshHiddenClass, 5000);
}

function refreshHiddenClass(){
    for (let i=0; i<cells.length ; i++){
        if(cells[i].classList.contains('key')){
            continue;
        
        } else if(cells[i].classList.contains('player')){
            cells[i].classList.remove('hidden');

        } else if(!cells[i].classList.contains('hidden')){
            cells[i].classList.add('hidden');
        }
            
    }
}

class Level {
    constructor(obstacles, damage, /*enemies, exitPosition, playerPosition*/){
        this.obstacles = obstacles;
        this.damage = damage;
       // this.enemies = enemies;
       // this.playerPosition = playerPosition
       
       this.cells = cells;
       this.count=0;
    }

    displayObstacles(){
        for(let cellIndex of this.obstacles){
            cells[cellIndex].classList.add('obstacle');
        }
    }

    countDamage(){
        if(cannotMove){
            this.count+=1;
            console.log(this.count);
        }
    }
}




function cannotMove(index){
    if(cells[index].classList.contains('obstacle')){
        return true;
    }
}

function checkWin(){
    if(cells[index].classList.contains('key') && cells[index].classList.contains('player')){
        nextLvl.classList.remove('mask-on');
        console.log("WIN!!");
    }
    
}

function nextLevel(){
    checkWin();
    levelCounter++;
    nextLvl.addEventListener('click', restartGame);
}