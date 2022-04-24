function TheWinner() {
	
	var Score1 = localStorage.getItem("sc1");
	var Score2 = localStorage.getItem("sc2");
	var Score3 = localStorage.getItem("sc3");
	var Score4 = localStorage.getItem("sc4");
	const res = document.getElementById("winner");
	const ann = document.getElementById("announ");
	
	
	const Score = [Score1 , Score2 , Score3 , Score4];
	let max = [0, 0, 0, 0];
	var nbMax = 1;
	
	for (let i = 1 ; i < 4 ; i++){
		if (Score[i] > Score[max[0]] ){
			max=[i, 0, 0, 0 ];
			nbMax =1;
		} else if (Score[i]==Score[max[0]]){
			var j=1;
			while (max[j]!=0) {
				j++;
			}
			max[j]=i;
			nbMax++;
		}
	}
	if (nbMax==1){
		ann.innerText ="THE WINNER IS:"
		res.innerText = " THE PLAYER " + (max[0]+1); 
	} else {
		ann.innerText = "THE WINNERS ARE : " ;
		for (let k = 0 ; k < nbMax; k++){
			res.innerText += "  -PLAYER   " ;
			res.innerText += (max[k]+1);
			res.innerText +="-";
		}
	}
	
}

function PawChangeGrey(nb) {
	if(nb==1){
		const pawElement = document.getElementById("pawrestart");
		pawElement.src="../Image/paw2.png";
	}else{
		const pawElement = document.getElementById("pawmenu");
		pawElement.src="../Image/paw2.png";
	}
}

function PawChangeBlack(nb){
	if(nb==1){
		const pawElement = document.getElementById("pawrestart");
		pawElement.src="../Image/paw.png";
	}else{
		const pawElement = document.getElementById("pawmenu");
		pawElement.src="../Image/paw.png";
	}
 }

