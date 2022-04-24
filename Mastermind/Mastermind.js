
document.addEventListener('DOMContentLoaded', () => {
    var Couleurselect = "white";
    var CellInterfaceselect = ["Interface36","Interface37","Interface38","Interface39"];
    var CellIndicesselect = ["Indices36","Indices37","Indices38","Indices39"];
    var Ligneact= 10;
    var Couleurspossibles= ["Red","Blue","Green","Yellow","Violet","Orange"];
    var Gagner=false;


    var couleurs = {
        "rgb(0, 128, 0)": "Green",
        "rgb(255, 255, 0)": "Yellow",
        "rgb(255, 0, 0)": "Red",
        "rgb(0, 0, 255)": "Blue",
        "rgb(238, 130, 238)": "Violet",
        "rgb(255, 165, 0)": "Orange"
    }

    //Créer les Cellules
    for(let i=0; i<40; i++){
        let cell = "<div class=\"cellule\" id=Interface"+i+"></div>";
        $(".Interface").append(cell);
    }
    for(let i=0; i<40; i++){
        let cell = "<div class=\"celluleIndice\" id=Indices"+i+"></div>";
        $(".Indices").append(cell);
    }

    //Attribuer les couleurs
    $(".Couleur").each(function(){
        let coul = $(this).attr("id");
        $(this).css("background-color", coul);
    });
    $(".Couleur").click(function(){
        let color =$(this).attr("id");
        Couleurselect = color;
        $(".Couleurselectionne").css("background-color", color);
    });
    $(".cellule").click(function(){
        var id = $(this).attr("id");

        if(Valide(id)){
            $(this).css("background-color", Couleurselect);
        }
    });


    function ChangerdeLignes(){
        Ligneact -= 1;
        var x = 4 ;

        CellInterfaceselect =[
            "Interface" + (Ligneact*x-4),
            "Interface" + (Ligneact*x-3),
            "Interface" + (Ligneact*x-2),
            "Interface" + (Ligneact*x-1)
        ];
        CellIndicesselect =[
            "Indices" + (Ligneact*x-4),
            "Indices" + (Ligneact*x-3),
            "Indices" + (Ligneact*x-2),
            "Indices" + (Ligneact*x-1)
        ];
    }

    function Valide(id){
        if(CellInterfaceselect.includes(id) && Gagner === false) {
            return true;
        }

        return false;
    }



    var code = [
        Couleurspossibles[Math.floor(Math.random()*6)], 
        Couleurspossibles[Math.floor(Math.random()*6)],
        Couleurspossibles[Math.floor(Math.random()*6)],
        Couleurspossibles[Math.floor(Math.random()*6)]
    ];

    console.log(code);

    var Coul1,Coul2,Coul3,Coul4 ;

    function Verification(){
        if(code[0] === Coul1 && code[1] === Coul2 && 
            code[2] === Coul3 && code[3] === Coul4) {
            Gagner= true;
            alert("Bravo, tu as trouvé la bonne réponse");
            $("#secretColor1").css("background-color", code[0]);
            $("#secretColor2").css("background-color", code[1]);
            $("#secretColor3").css("background-color", code[2]);
            $("#secretColor4").css("background-color", code[3]);
        }
        return Gagner;
    }
    
    //En appuyant valider, passage à la ligne suivante si faux, plus donner indices
    $(".Valider").click(function(){
        DonnerIndices();
        Verification();
        ChangerdeLignes();
    });

    //Pour remplir les Indices de façon aléatoire
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

    function DonnerIndices(){
        let cell1 = $("#"+CellInterfaceselect[0]);
        let cell2 = $("#"+CellInterfaceselect[1]);
        let cell3 = $("#"+CellInterfaceselect[2]);
        let cell4 = $("#"+CellInterfaceselect[3]);

        Coul1 =couleurs[cell1.css("background-color")];
        Coul2 =couleurs[cell2.css("background-color")];
        Coul3 =couleurs[cell3.css("background-color")];
        Coul4 =couleurs[cell4.css("background-color")];

        let Ind1 = $("#"+CellIndicesselect[0]);
        let Ind2 = $("#"+CellIndicesselect[1]);
        let Ind3 = $("#"+CellIndicesselect[2]);
        let Ind4 = $("#"+CellIndicesselect[3]);

        let Indices= [Ind1,Ind2,Ind3,Ind4];

        //Indices à remplir
        let TabInd = [] ;
        // Cellules regardés
        let TabCell = [] ;
        // Copie du tab code couleur 
        let TabCode = [...code] ;

        let nb = [1,2,3,4];

        nb= shuffle(nb)

        //Le cas: Bonne position bonne couleur
        if(code[0] === Coul1){
            TabInd.push(nb[0]);

            let ind = TabCode.indexOf(Coul1);
            if(ind> -1) {
                TabCode.splice(ind, 1) ;
            }
            //Rajouter à la tab la cell regardé
            TabCell.push(1);

            //Remplir l'indice 
            Indices[nb[0]-1].css("background-color", "red");
        }
        if(code[1] === Coul2){
            TabInd.push(nb[1]);

            let ind = TabCode.indexOf(Coul2);
            if(ind> -1) {
                TabCode.splice(ind, 1) ;
            }

            TabCell.push(2);

            Indices[nb[1]-1].css("background-color", "red");
        }
        if(code[2] === Coul3){
            TabInd.push(nb[2]);

            let ind = TabCode.indexOf(Coul3);
            if(ind> -1) {
                TabCode.splice(ind, 1) ;
            }

            TabCell.push(3);

            Indices[nb[2]-1].css("background-color", "red");
        }
        if(code[3] === Coul4){
            TabInd.push(nb[3]);

            let ind = TabCode.indexOf(Coul4);
            if(ind> -1) {
                TabCode.splice(ind, 1) ;
            }

            TabCell.push(4);

            Indices[nb[3]-1].css("background-color", "red");
        }

        //Cas: Bonne couleur pas bonne place
        if(TabCode.includes(Coul1) && !TabCell.includes(1)) {
            TabInd.push(nb[0]);

            Indices[nb[0]-1].css("background-color","white");
        }
        if(TabCode.includes(Coul2) && !TabCell.includes(2)) {
            TabInd.push(nb[1]);

            Indices[nb[1]-1].css("background-color","white");
        }
        if(TabCode.includes(Coul3) && !TabCell.includes(3)) {

            TabInd.push(nb[2]);

            Indices[nb[2]-1].css("background-color","white");
        }
        if(TabCode.includes(Coul4) && !TabCell.includes(4)) {
            TabInd.push(nb[3]);

            Indices[nb[3]-1].css("background-color","white");
        }

    }
    

    //Pour le menu //
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
    // Pour le menu//
});