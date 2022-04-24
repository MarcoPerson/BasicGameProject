document.addEventListener('DOMContentLoaded', () => {
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

    const grid = document.querySelector('.grid');
    let largeur = 10;
    let listeCarreaux = [];
    let nombreBombes = 20;
    let isGameOver = false;
    let flags = 0;
    let winLoseBoard = document.querySelector(".winLoseBoard");
    let remainingFlags = document.querySelector(".flagRestant");
    let restart = document.querySelector(".restart");
    restart.addEventListener("click", () => {
        location.reload();
    });

    let close = document.querySelector(".close");
    close.addEventListener("click", () => {
        winLoseBoard.classList.remove("showLoseWinBoard");
    });

    //Creer mon tableau
    function creerTableau(){

        const tableauBombes = Array(nombreBombes).fill('bomb');
        const tableauVides = Array(largeur*largeur - nombreBombes).fill('valid');
        const tableauGeneral = tableauVides.concat(tableauBombes);
        const melangeTableau = tableauGeneral.sort(() => Math.random() - 0.5);

        for(let i = 0; i < largeur*largeur; i++){
            const carreau = document.createElement('div');
            carreau.setAttribute('id', i);
            carreau.classList.add(melangeTableau[i]);
            grid.appendChild(carreau);
            listeCarreaux.push(carreau);

            carreau.addEventListener('click', function(e){
                click(carreau);
            });

            carreau.oncontextmenu = function(e){
                e.preventDefault();
                ajouterFlag(carreau);
            }
        }


        for(let i = 0; i < listeCarreaux.length; i++){
            let total = 0;
            const estAgauche = i % largeur === 0;
            const estAdroite = i % largeur === largeur - 1;

            if(listeCarreaux[i].classList.contains('valid')){
                if(i>0 && !estAgauche && listeCarreaux[i-1].classList.contains('bomb')){
                    total ++;
                }
                if(i>9 && !estAdroite && listeCarreaux[i+1 - largeur].classList.contains('bomb')){
                    total ++;
                }
                if(i>10 && listeCarreaux[i - largeur].classList.contains('bomb')){
                    total ++;
                }
                if(i>11 && !estAgauche && listeCarreaux[i-1 -largeur].classList.contains('bomb')){
                    total ++;
                }
                if(i<98 && !estAdroite && listeCarreaux[i+1].classList.contains('bomb')){
                    total ++;
                }
                if(i<90 && !estAgauche && listeCarreaux[i-1+largeur].classList.contains('bomb')){
                    total ++;
                }
                if(i<88 && !estAdroite && listeCarreaux[i+1+largeur].classList.contains('bomb')){
                    total ++;
                }
                if(i<89 && listeCarreaux[i+largeur].classList.contains('bomb')){
                    total ++;
                }

                listeCarreaux[i].setAttribute('data', total);
            }
        }
    }

    creerTableau();


    function ajouterFlag(carreau){
        if(isGameOver) return;
        if (!carreau.classList.contains('checked') && (flags < nombreBombes)){
            if(!carreau.classList.contains('flag')){
                carreau.classList.add('flag');
                flags ++;
                remainingFlags.firstChild.nextSibling.firstChild.nodeValue = 20 - flags;
                verifierAgagner();
            } else{
                carreau.classList.remove("flag");
                flags --;
                remainingFlags.firstChild.nextSibling.firstChild.nodeValue = 20 - flags;
            }

        }
    }

    function click(carreau){
        let idCourant = carreau.id;
        if(isGameOver) return;
        if(carreau.classList.contains('checked') || carreau.classList.contains('flag')) return;
        if(carreau.classList.contains('bomb')){
            gameOver();
        } else{
            let total = carreau.getAttribute('data');
            if(total != 0){
                carreau.classList.add('checked');
                carreau.innerHTML = total;
                return
            }
            verifierCarreau(carreau, idCourant);
            carreau.classList.add('checked');
        }
    }


    function verifierCarreau(carreau, idCourant){
        const isLeftEdge = (idCourant % largeur === 0);
        const isRightEdge = (idCourant % largeur === largeur - 1);

        setTimeout(() => {
            if(idCourant > 0 && !isLeftEdge){
                const newId = listeCarreaux[parseInt(idCourant) - 1].id;
                const newcarreau = document.getElementById(newId);
                click(newcarreau);
            }
            if(idCourant > 9 && !isRightEdge){
                const newId = listeCarreaux[parseInt(idCourant) + 1 - largeur].id;
                const newcarreau = document.getElementById(newId);
                click(newcarreau);
            }
            if(idCourant > 10){
                const newId = listeCarreaux[parseInt(idCourant) - largeur].id;
                const newcarreau = document.getElementById(newId);
                click(newcarreau);
            }
            if(idCourant > 11 && !isLeftEdge){
                const newId = listeCarreaux[parseInt(idCourant) - 1 - largeur].id;
                const newcarreau = document.getElementById(newId);
                click(newcarreau);
            }
            if(idCourant < 98 && !isRightEdge){
                const newId = listeCarreaux[parseInt(idCourant) + 1].id;
                const newcarreau = document.getElementById(newId);
                click(newcarreau);
            }
            if(idCourant < 90 && !isLeftEdge){
                const newId = listeCarreaux[parseInt(idCourant) - 1 + largeur].id;
                const newcarreau = document.getElementById(newId);
                click(newcarreau);
            }
            if(idCourant < 88 && !isRightEdge){
                const newId = listeCarreaux[parseInt(idCourant) + 1 + largeur].id;
                const newcarreau = document.getElementById(newId);
                click(newcarreau);
            }
            if(idCourant < 89){
                const newId = listeCarreaux[parseInt(idCourant) + largeur].id;
                const newcarreau = document.getElementById(newId);
                click(newcarreau);
            }

        }, 10);
    }

    function gameOver(carreau){
        isGameOver = true;

        listeCarreaux.forEach(carreau => {
            if(carreau.classList.contains('bomb')){
                carreau.classList.add('bomb2');
            }
        });

        winLoseBoard.firstChild.nextSibling.innerHTML = "YOU LOSE :)";
        winLoseBoard.classList.add("showLoseWinBoard");
    }


    function verifierAgagner(){
        let matches = 0;
        for(let i = 0; i < listeCarreaux.length; i ++){
            if(listeCarreaux[i].classList.contains('flag') && listeCarreaux[i].classList.contains('bomb')){
                matches ++;
            }
        }
        if(matches === nombreBombes){
            isGameOver = true;
            winLoseBoard.firstChild.nextSibling.innerHTML = "YOU WIIIIIN !!!";
            winLoseBoard.classList.add("showLoseWinBoard");
        }
    }
});



