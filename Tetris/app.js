const hamburger = document.querySelector(".nav-hamburger");
const navUL = document.querySelector(".nav-ul");
const gamesMenu = document.querySelector("#li-menu");
const gamesUL = document.getElementById("nav-ul-li-games")

hamburger.addEventListener("click", function(){
    navUL.classList.toggle("show");
})

gamesMenu.addEventListener("click", function(){
    gamesUL.classList.toggle("show");
})

document.addEventListener('DOMContentLoaded', () => {
    const width = 10;
    const html = document.getElementsByTagName('html')[0]
    const grid = document.querySelector('.grid');
    const ScoreDisplay = document.querySelector('#score');
    const StartBtn = document.querySelector('#start-button');
    const PauseBtn = document.querySelector('#pause-button');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    let timerId = undefined
    let scores = 0
    const colors = [
        'orange',
        'red',
        'purple',
        'green',
        'blue'
      ]

    const lTetromino = [
        [0, width, width*2, 1],
        [0, 1, 2, width+2],
        [1, width+1, width*2+1, width*2],
        [0, width, width+1, width+2]
    ]

    const zTetromino = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
    ]

    const tTetromino = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ]

    const oTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ] 

    const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ]

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

    let currentPosition = 4
    let currentRotation = 0


    let random = Math.floor(Math.random()*theTetrominoes.length)
    let current = theTetrominoes[random][currentRotation]

    function draw() {
        current.forEach(index => {
        squares[currentPosition + index].style.backgroundColor = colors[random]
        })
    }

    function undraw() {
        current.forEach(index => {
        squares[currentPosition + index].style.backgroundColor = ''

        })
    }

    function moveDown() {
        undraw()
        currentPosition += width
        draw()
        freeze()
        removeLine()
        stop()
    }

      function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
          current.forEach(index => squares[currentPosition + index].classList.add('taken'))
          random = Math.floor(Math.random() * theTetrominoes.length)
          current = theTetrominoes[random][currentRotation]
          currentPosition = 4
          stop()
        }
      }

      function moveLeft(){
          undraw()
          const isLeft = current.some(index => (currentPosition + index)%10 === 0 )
          if(!isLeft) {
              currentPosition --
          }
          if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
              currentPosition ++
          }
          draw()
      }

      function moveRight(){
        undraw()
        const isRight = current.some(index => (currentPosition + index)%10 === 9 )
        if(!isRight) {
            currentPosition ++
        }
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition --
        }
        draw()
    }

    function rotation(){
        undraw()
        currentRotationEssaie = (currentRotation+1)%4
        current = theTetrominoes[random][currentRotationEssaie]
        const isRight = current.some(index => (currentPosition + index)%10 === 9 )
        const isLeft = current.some(index => (currentPosition + index)%10 === 0 )
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            current = theTetrominoes[random][currentRotation]
        }
        else if(isRight && isLeft){
            current = theTetrominoes[random][currentRotation]
        }
        else{
            currentRotation = currentRotationEssaie
        }
        draw()
    }

    function move(event){
        if (event.keyCode === 37) {
            moveLeft()
        }else if (event.keyCode === 38) {
            rotation()
        }else if (event.keyCode === 39) {
            moveRight()
        }else if (event.keyCode === 40) {
            moveDown()
        }
    }

      function start(){
        if(timerId === undefined){
            timerId = setInterval(moveDown, 500);
            squares.forEach((div, index) => {
                if (index >= 40 && index < 240){
                    div.classList.remove("paused-grid")
                }
            })
        }
    }

    function pause(){
        if(timerId != undefined){
            clearInterval(timerId)
            timerId = undefined
            squares.forEach((div, index) => {
                if (index >= 40 && index < 240){
                    div.classList.add("paused-grid")
                }
            })
        }
    }

      function stop(){
          if(squares[44].classList.contains("taken")){
            clearInterval(timerId)
            alert("GAME OVER")
          }
      }

      function removeLine(){
          let atTheSameTime = 0
          for (let i = 3; i < 24; i++) {
              var line = squares.slice(i*10, i*10+10);
              if(line.every(index => index.classList.contains('taken'))){
                  atTheSameTime ++
                  var lineRemoved = squares.splice(i*10, 10)
                  squares.forEach(index => grid.removeChild(index))
                  lineRemoved.forEach(index => index.style.backgroundColor = '')
                  lineRemoved.forEach(index => index.classList.remove("taken"))
                  lineRemoved.forEach(index => squares.splice(40, 0, index))
                  squares.forEach(index => grid.appendChild(index))
              }
          }
          if (atTheSameTime != 0) {
            scores = scores + 10**(atTheSameTime)
            ScoreDisplay.innerHTML = ''
            ScoreDisplay.innerHTML = scores
          }
      }

    document.querySelector(".button-left").addEventListener("click", moveLeft);
    document.querySelector(".button-right").addEventListener("click", moveRight);
    document.querySelector(".button-up").addEventListener("click", rotation);
    document.querySelector(".button-down").addEventListener("click", moveDown);
    document.querySelector("#instru-button").addEventListener("click", ()=>{
        let message = "Tetris has very simple rules: you can only move the pieces in specific ways; your game is over if your pieces reach the top of the screen; and you can only remove pieces from the screen by filling all the blank space in a line. Rules give much needed structure to our play. A completely random environment offers no clue as to how to play and would be incredibly frustrating. How fortunate it is, then, that Tetris’s three rules are what shape it into such an award-winning game."    
        alert(message)
    });
    PauseBtn.addEventListener('click', pause);
    StartBtn.addEventListener('click', start);
    document.addEventListener('keyup', move);

})