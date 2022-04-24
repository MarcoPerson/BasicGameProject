
function recupererValeurs(adresseDuSite, nomDeLaCaseARecuperer){
	let chaineDesDonnees = adresseDuSite.search.substring(1);
	let tableauDesDonnees = chaineDesDonnees.split("&");

	for(let i = 0; i < tableauDesDonnees.length; i++){
		var elementI = tableauDesDonnees[i].split("=");
		if(elementI[0] == nomDeLaCaseARecuperer){
			return elementI[1];
		}
	}
}
function Decrementer(){
	const timerElement = document.getElementById("temps");
	const RandomElement = document.getElementById("rand");
	const StateElement = document.getElementById("state");
	const Fish_Image = document.getElementById('myImage');
	
	

	var time = timerElement.innerText;
		
	if (time>0){
		time = time -1
		timerElement.innerText = time ;
		StateElement.innerText = "GAME'S ON" ;
		if ((time%2)==0){
			RandomElement.innerText = Math.round(Math.random());
			if (RandomElement.innerText == 1){
				Fish_Image.src='../Image/poisson.png';
			} else {
				Fish_Image.src='../Image/squelette.png';
			}
		}
	} else if (time ==0){
		clearInterval(x);
		resultSender();
	}
	
}

function resultSender() {
	const Score1 = document.getElementById('Score1').innerText;
	const Score2 = document.getElementById('Score2').innerText;
	const Score3 = document.getElementById('Score3').innerText;
	const Score4 = document.getElementById('Score4').innerText;
	
	localStorage.setItem("sc1",Score1);
	localStorage.setItem("sc2",Score2);
	localStorage.setItem("sc3",Score3);
	localStorage.setItem("sc4",Score4);
	window.location.replace("../Door/indexend.html");
}

window.addEventListener("keydown", checkKeyPress, false);
function checkKeyPress(winner){
	
	const Score1 = document.getElementById('Score1');
	const Score2 = document.getElementById('Score2');
	const Score3 = document.getElementById('Score3');
	const Score4 = document.getElementById('Score4');
	const fish = document.getElementById('rand');
	const players = document.getElementById('nbPlayers');
	
	
	
	let randFish = fish.innerText;
	let Joueurs = players.innerText;
	
	if(winner.key == "a" ){
		if( randFish == 1 ) {
			Score1.innerText++;
			Plateau();
		} else if ( randFish == 0) {
			Score1.innerText--;
			Plateau();
		}
	}else if(winner.key == "p"){
		if( randFish == 1 ) {
			Score2.innerText++;
			Plateau();
		} else if ( randFish == 0) {
			Score2.innerText--;
			Plateau();
		}
	}else if(winner.key == "w" && ((Joueurs == 3)||(Joueurs == 4))){
		if( randFish == 1 ) {
			Score3.innerText++;
			Plateau();
		} else if (randFish == 0) {
			Score3.innerText--;
			Plateau();
		}
	}else if(winner.key == "n" && Joueurs == 4){
		if( randFish == 1 ) {
			Score4.innerText++;
			Plateau();
		} else if ( randFish == 0) {
			Score4.innerText--;
			Plateau();
		}
	}
}

function Plateau() {
	const fish = document.getElementById('rand');
	const Fish_Image = document.getElementById('myImage');
	
	fish.innerText = 2;
	Fish_Image.src='../Image/plateau.png';
}

function PawChangeGrey() {
	const pawElement = document.getElementById("paw");
	 pawElement.src="../Image/paw2.png";
}

function PawChangeBlack(){
	const pawElement = document.getElementById("paw");
	 pawElement.src="../Image/paw.png";
 }
