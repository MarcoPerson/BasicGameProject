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

const slides = document.querySelectorAll('.carousel-item');
const nextButton = document.querySelector('#next-button');
const previousButton = document.querySelector('#previous-button');
let currentSlide = 0;
let totalSlide = slides.length ;
let timerId;


function updateSlide(){
    //document.querySelector(".carousel-item-active").classList.remove("carousel-item-active");
    for(let slide of slides){
        slide.classList.remove("carousel-item-active");
        slide.classList.add("carousel-item-hidden");
    }
    slides[currentSlide].classList.add("carousel-item-active");
}

function moveToNext(){
    clearInterval(timerId);
    if (currentSlide === totalSlide - 1){
        currentSlide = 0;
    }
    else{
        currentSlide ++;
    }
    updateSlide();
    timerId = setInterval(moveToNext, 10000);
}

function moveToPrevious(){
    clearInterval(timerId);
    if (currentSlide === 0){
        currentSlide = totalSlide - 1;
    }
    else{
        currentSlide --;
    }
    updateSlide();
    timerId = setInterval(moveToNext, 10000);
}

function moveCarousel(){
    moveToNext()
}

timerId = setInterval(moveToNext, 10000);

nextButton.addEventListener('click', moveToNext);
previousButton.addEventListener('click', moveToPrevious);