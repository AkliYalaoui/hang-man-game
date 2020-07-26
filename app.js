//set up letters
var letters = document.querySelector('.letters');
    letterChar  ="azertyuiopqsdfghjklmwxcvbn".split('');
for(char of letterChar){
  var letterSpan = document.createElement('span');
      letterSpan.setAttribute('data-type','letter');
      letterSpan.appendChild(document.createTextNode(char));
      letters.appendChild(letterSpan);
}
//set up words
var words = {
    programming:["php","javascript","go","scale","fortran","r","mysql","python"],
    movies: ["Prestige","Inception","parasite","Interstellar","Whiplash","Memento","Coco","Up"],
    people:["Albert Einstein","Hitchcock","Alexander","Cleopatra","Mahatma Gandhi"],
    countries:["Syria","Palestine","Yemen","Egypt","Bahrain","Qatar"]
};
var randomCategorie = Math.floor(Math.random()*Object.keys(words).length);
var randomWordNumber  = Math.floor(Math.random()*words[Object.keys(words)[randomCategorie]].length);

var randomword  = words[Object.keys(words)[randomCategorie]][randomWordNumber].split("");
document.querySelector('.hangman header div span').textContent = Object.keys(words)[randomCategorie];
var footer = document.querySelector('.hangman footer');
for(randLetter of randomword){
  var spanLetter = document.createElement('span');
  if(randLetter === " "){
    spanLetter.className = "has-space";
  }
  footer.appendChild(spanLetter);
}
//add event listner to document
var wrongCount = 0;
var tries = 0;
var hangmanCore = document.querySelector('.hangman-pic');
document.onclick = function(e){
  if(e.target.hasAttribute('data-type')){
    var status = false;
    e.target.classList.add('clicked');
    for(var i = 0;i < randomword.length;i++){
      if(randomword[i].toLowerCase() == e.target.textContent.toLowerCase()){
        status = true;
        tries++;
        var query = ".hangman footer span:nth-of-type("+(i+1)+")";
        document.querySelector(query).textContent = randomword[i].toLowerCase() ;
      }
    }
    if(!status){
      wrongCount++;
      var classname = 'wrong-' + wrongCount;
      hangmanCore.classList.add(classname);
      if(wrongCount === 5){
        //game over
          letters.classList.add('game-over');
          alert("Game Over , Right Word Is : " + randomword.join("") + "\n Refresh The Page To Restart The Game");
      }

    }
    //check if users won the game
    if(tries == randomword.length - 1){
      letters.classList.add('game-over');
      alert("Congrats ! ,You Guessed It Right\n The Word Is : " + randomword.join("") + "\n Refresh The Page To Restart The Game");
    }
  }
}
