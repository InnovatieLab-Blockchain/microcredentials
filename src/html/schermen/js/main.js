function check() {

var vraag1 = document.quiz.vraag1.value;
var vraag2 = document.quiz.vraag2.value;
var vraag3 = document.quiz.vraag3.value;
var vraag4 = document.quiz.vraag4.value;
var vraag5 = document.quiz.vraag5.value;
var vraag6 = document.quiz.vraag6.value;
var vraag7 = document.quiz.vraag7.value;
var correct = 0;


  if (vraag1 == "b") {
      correct++;
  }
  if (vraag2 == "c") {
      correct++;
  }
  if (vraag3 == "d") {
      correct++;
  }
  if (vraag4 == "c") {
      correct++;
  }
  if (vraag5 == "b") {
      correct++;
  }
  if (vraag6 == "d") {
      correct++;
  }
  if (vraag7 == "a") {
       correct++;
  }

var berichten = ["Ultimate hero", "Good Job" ,"Mwoah wel aardig","Ronduit slecht"];
var antwoord = ["Je hebt " + correct + " vraag goed!", "Je hebt " + correct + " vragen goed!"];
var pictures = ["img/win.gif","img/mid.gif", "img/meh.gif", "img/loser.gif"];
var status = ["KONING","GEMIDDELD", "MATIG", "LOSER"];

var range;
if (correct < 2) {
    range = 3;
  }
if (correct > 1 && correct < 4) {
    range = 2;
  }
if (correct > 3 && correct < 7) {
    range = 1;
    }
if (correct > 6) {
    range = 0;
  }


  var optie;
  if (correct == 1) {
      optie = 0;
    }
  else {
    optie = 1;
  }



document.getElementById("after_login").style.display = "inline";
document.getElementById("after_submit").style.display = "inline";
document.getElementById("quiz").style.display = "none";
document.getElementById("bericht").innerHTML = berichten[range];
document.getElementById("status").innerHTML = status[range];
document.getElementById("number_correct").innerHTML = antwoord[optie];
document.getElementById("picture").src = pictures[range];
}
