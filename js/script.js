/*
Consegna
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo 
la logica del gioco (attenzione: non bisogna copiare tutta la
 cartella dell'esercizio ma solo l'index.html, e le cartelle 
 js/ css/ con i relativi script e fogli di stile, per evitare
  problemi con l'inizializzazione di git).
Il computer deve generare 16 numeri casuali nello stesso 
range della difficoltà prescelta: le bombe. Attenzione: nella
 stessa cella può essere posizionata al massimo una bomba, 
 perciò nell’array delle bombe non potranno esserci due numeri
uguali.In seguito l'utente clicca su una cella: se il numero 
è presente nella lista dei numeri generati - abbiamo calpestato 
una bomba - la cella si colora di rosso e la partita termina.
 Altrimenti la cella cliccata si colora di azzurro e l'utente
  può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o
 quando raggiunge il numero massimo possibile di numeri 
 consentiti (ovvero quando ha rivelato tutte le celle che non
sono bombe).
Al termine della partita il software deve comunicare il 
punteggio, cioè il numero di volte che l’utente ha cliccato 
su una cella che non era una bomba.
BONUS:
Aggiungere una select accanto al bottone di generazione, che
 fornisca una scelta tra tre diversi livelli di difficoltà:
difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100,
 divise in 10 caselle per 10 righe;
difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81,
 divise in 9 caselle per 9 righe;
difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49,
 divise in 7 caselle per 7 righe;
SUPERBONUS
Quando si clicca su una bomba e finisce la partita, il 
software scopre tutte le bombe nascoste.



-creare elem per risultato a schermo
-creare var punteggio;
-creare array bomb:
    -contiene 16 indici
    -gli indici sono da 1 a livDifficoltà
    -controllare che non si ripetano
-click cella:
    -SE index cella== index contenuto in array
        -aggiungere classe bomb
        -interrompere esecuzione
        -visualizzare punteggio e messaggio sconfitta
    -ALTRIMENTI
        -aggiunglere a cella classe active
        -SE numCelle con classe active == tot -16
            -interrompere esecuzione
            -visualizzare punteggio e messaggio vittoria

SUPERBONUS: 
-quando si visualizza il punteggio si aggiunge classe bomb
 a tutte le celle contenute nell'array bomb


*/


let btnPlayEl = document.getElementById("my-btn-play");
let gridEl = document.getElementById("my-grid");
let difficult;

let finaMessageEl = document.getElementById("final-message");
let score = 0;
let bombsList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];




btnPlayEl.addEventListener("click", function (){
    gridEl.innerHTML = "";
    
    let level = document.getElementById("level").value;
    
    /*genero liv difficoltà*/
    
    if(level == 1){
        difficult = 100;
        document.getElementById("my-grid").style.width = "600px";
        
    }else if(level == 2){
        difficult = 81;
        document.getElementById("my-grid").style.width = "540px";
        
    }else if(level == 3) {
        difficult = 49;
        document.getElementById("my-grid").style.width = "420px";
    }

    /*creo le bombe*/
    let indexBombs=0;
    while(indexBombs < bombsList.length){
        let addBomb = true;
        let newBomb = randomNumberBetween(1, difficult);
        for(let i=0; i<bombsList.length; i++)
        if(newBomb==bombsList[i]){
            addBomb=false;
        }
        if(addBomb){

            bombsList[indexBombs]=newBomb;
            indexBombs++;
        }
        
    } console.log(bombsList);

    /*creo la griglia/celle*/

    for(let i=1; i<= difficult; i++){
        let newCell = createNewCellWithNumber(i);

        newCell.addEventListener("click", function() {
            newCell.classList.add("active");
            console.log(i);

            for(let j=0; j<bombsList.length; j++){
                if(i == bombsList[j]){
                    newCell.classList.remove("active");
                    newCell.classList.add("bomb");
                    
                }
            }
            
            
        })
    }
})


/*functions*/

function createNewCellWithNumber(num){
    let newCell = document.createElement("div");
    newCell.classList.add("my-cell");
    gridEl.append(newCell);
    newCell.textContent = num;

    return newCell;
}

function randomNumberBetween(min, max){
    let random = Math.floor(Math.random() * (max - min +1)) + min;
    return random;
}

