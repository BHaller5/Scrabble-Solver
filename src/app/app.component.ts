import { Component, ElementRef } from '@angular/core';
import {DICTIONARY} from './dictionary';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private elementRef: ElementRef) {

  }

  title = 'Word Puzzle Helper';
  
  dictionary = DICTIONARY;
  pText: string = ''; //this is the text that will be passed to child to set child's inputText property
  poText: string = ''; //this is the text received from the child 
  results = '';   //Scrambled Word Result
  unscrambleWords;
  formattedUnscrambled: string = '';
  scrabbleWords = [];
  scrabblePoints = [];
  finishedScrabble = [];
  scrabble7: string = '';
  scrabble6: string = '';
  scrabble5: string = '';
  scrabble4: string = '';
  scrabble3: string = '';
  scrabble2: string = '';

  showScramble: boolean = false;
  showUnscramble: boolean = false;    //Sets the default values of the child components to false - aka Hidden
  showScrabble: boolean = false;


  //Function called to scramble pText
  scrambleFunction() {
    var same = this.pText;
    if(this.pText !== "" && this.pText.length > 1) {         //if statement to prevent endless loop if nothing or 1 letter is entered
      while(same == this.pText) {
        var a = this.pText.split(""),
          n = a.length;
  
      for(var i = n - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));    //Selects random index values and sets them all into a new variable
          var tmp = a[i];
          a[i] = a[j];
          a[j] = tmp;
      }
      same = a.join("");    //Joins the array into a string, then compares to pText. If the values are different, sets results to the scrambled word
      }
      this.results = same;
    } else {
      this.results = "Could not scramble"
    }
}


//Function called to unscramble pText
unscrambleFunction(){
  this.unscrambleWords = new Array();
  let head = 0;
  let tail = this.dictionary.length - 1;   
  var word = this.pText; 
  while(head <= tail){
      let tempWord1 = this.dictionary[head];
      let tempWord2 = this.dictionary[tail];
      tempWord1 = tempWord1.toLowerCase();
      tempWord2 = tempWord2.toLowerCase();

      if(tempWord1.length == word.length){
          for(let i = 0; i<word.length; i++){//check dictionary[head]
              if(tempWord1.includes(word[i])){
                  tempWord1 = tempWord1.replace(word[i], "0");
                  if(i == word.length-1){
                      this.unscrambleWords.push(this.dictionary[head]);
                  }
              }
              else{break;}           
          } 
      }
      if(tempWord2.length == word.length){
          for(let i = 0; i<word.length; i++){//check dictionary[tail]
              if(tempWord2.includes(word[i])){
                  tempWord2 = tempWord2.replace(word[i], "0");
                  if(i == word.length-1){
                      this.unscrambleWords.push(this.dictionary[tail]);
                  }
              }
              else{break;}         
          }  
      } 
      head++;tail--;       
  }
  if(this.unscrambleWords.length == 0){console.log("No words found")}
  else{
    console.log(this.unscrambleWords.length + " word/s found");
    for(let i = 0; i < this.unscrambleWords.length; i++){
        console.log(this.unscrambleWords[i])
    }
  }
  this.formattedUnscrambled = this.unscrambleWords.join(" ");

  if (this.formattedUnscrambled.length <= 1) {
    this.formattedUnscrambled = "No word found";
  }
}

scrabble() {
  this.scrabbleWords = new Array();
  let head = 0;
  let tail = this.dictionary.length - 1;   
  var word = this.pText; 

  while(head <= tail){
    let tempWord1 = this.dictionary[head];
    let tempWord2 = this.dictionary[tail];
    tempWord1 = tempWord1.toLowerCase();
    tempWord2 = tempWord2.toLowerCase();
    let score = 0;

    if(tempWord1.length <= word.length){//check dictionary[head]
        for(let i = 0; i <word.length; i++){
            if(tempWord1.includes(word[i])){
                tempWord1 = tempWord1.replace(word[i], "0");
                score++;
                if(score == tempWord1.length){//all letters in temp match
                    this.scrabbleWords.push(this.dictionary[head].toLowerCase());
                    break;
                }
            }           
        } 
    }
    score = 0;
    if(tempWord2.length <= word.length){//check dictionary[tail]
        for(let i = 0; i<word.length; i++){
            if(tempWord2.includes(word[i])){
                tempWord2 = tempWord2.replace(word[i], "0");
                score++;
                if(score == tempWord2.length){
                    this.scrabbleWords.push(this.dictionary[tail].toLowerCase());
                    break;
                }
            }   
        }  
    } 
    head++;tail--; 
  }//end search 
  if(this.scrabbleWords.length == 0){console.log("No words found")}
  else{
    console.log(this.scrabbleWords.length + " word/s found");
    for(let i = 0; i < this.scrabbleWords.length; i++){
        console.log(this.scrabbleWords[i])
    }
  }
  /*this.formattedUnscrambled = this.unscrambleWords.join(" ");
  if(this.formattedUnscrambled == " ") {
    this.formattedUnscrambled = "No word found";
  }*/

  this.scrabbleWords.sort(function (a, b) {
    return a.length - b.length 
  })
  this.scrabbleWords.reverse();

  this.calculate();
  this.addNumbers();
  //this.splitScrabble()
}

//give word point
calculate(){
  this.scrabblePoints = new Array();
  for( let j = 0; j < this.scrabbleWords.length; j++) {
    //console.log("test");
    let stri = this.scrabbleWords[j];
    var str = stri.toLowerCase();
    var p = 0;
    for(let i = 0; i < str.length; i++){
      //console.log("test");
      switch(str[i]){
          case 'e': case 'a': case 'i': case 'o': case 'n': case 'r': case 't': case 'l': case 's': case 'u':
          p = p + 1;
          break;
          case 'd': case 'g':
          p = p + 2;
          break;
          case 'b': case 'c': case 'm': case 'p':
          p = p + 3;
          break;
          case 'f': case 'h': case 'v': case 'w': case 'y':
          p = p +4;
          break;
          case 'k':
          p = p + 5;
          break;
          case 'j': case 'x':
          p = p + 8;
          break;
          case 'q': case 'z':
          p = p + 10;
          break;
      }
  }
  //console.log(str);
  this.scrabblePoints.push(p);
  }
  
  
}

addNumbers() {
  var count = 0;
  this.finishedScrabble = [];
  let scrab7 = new Array();
  let scrab6 = new Array();
  let scrab5 = new Array();
  let scrab4 = new Array();
  let scrab3 = new Array();
  let scrab2 = new Array();
  this.scrabble7 = "";
  this.scrabble6 = "";
  this.scrabble5 = "";
  this.scrabble4 = "";
  this.scrabble3 = "";
  this.scrabble2 = "";

  for(let i = 0; i < this.scrabbleWords.length; i++) {
    var word = this.scrabbleWords[i];
    
    if(word.length > 6) {
      var newWord = word + "(" + this.scrabblePoints[i] + ")";
      scrab7.push(newWord);

    } else if (word.length == 6 ){
      var newWord = word + "(" + this.scrabblePoints[i] + ")";
      scrab6.push(newWord);

    } else if (word.length == 5 ){
      var newWord = word + "(" + this.scrabblePoints[i] + ")";
      scrab5.push(newWord);

    } else if (word.length == 4 ){
      var newWord = word + "(" + this.scrabblePoints[i] + ")";
      scrab4.push(newWord);

    } else if (word.length == 3 ){
      var newWord = word + "(" + this.scrabblePoints[i] + ")";
      scrab3.push(newWord);

    } else if (word.length == 2 ){
      var newWord = word + "(" + this.scrabblePoints[i] + ")";
      scrab2.push(newWord);
    }

    //var points = "(" + this.scrabblePoints[i] + ")";
    //var combined = word + points;
    //this.finishedScrabble.push(combined);
    scrab7.sort();
    scrab6.sort();
    scrab5.sort();
    scrab4.sort();
    scrab3.sort();
    scrab2.sort();
    this.scrabble7 = scrab7.join(" ");
    this.scrabble6 = scrab6.join(" ");
    this.scrabble5 = scrab5.join(" ");
    this.scrabble4 = scrab4.join(" ");
    this.scrabble3 = scrab3.join(" ");
    this.scrabble2 = scrab2.join(" ");
    if(this.scrabble7.length < 2) {
      this.scrabble7 = "n/a";
    }
    if(this.scrabble6.length < 2) {
      this.scrabble6 = "n/a";
    }
    if(this.scrabble5.length < 2) {
      this.scrabble5 = "n/a";
    }
    if(this.scrabble4.length < 2) {
      this.scrabble4 = "n/a";
    }
    if(this.scrabble3.length < 2) {
      this.scrabble3 = "n/a";
    }
    if(this.scrabble2.length < 2) {
      this.scrabble2 = "n/a";
    }
  }
  
}



  /*splitScrabble() {
    let scrab7 = new Array();
    let scrab6 = new Array();
    let scrab5 = new Array();
    let scrab4 = new Array();
    let scrab3 = new Array();
    let scrab2 = new Array();
    for( let i = 0; i < this.finishedScrabble.length; i++) {
      if(this.finishedScrabble[i].length > 9) {
        var word = this.finishedScrabble[i];
        scrab7.push(word);

      } else if (this.finishedScrabble[i].length == 6 + 3){
        var word = this.finishedScrabble[i];
        scrab6.push(word);

      } else if (this.finishedScrabble[i].length == 5 + 3){
        var word = this.finishedScrabble[i];
        scrab5.push(word);

      } else if (this.finishedScrabble[i].length == 4 + 3){
        var word = this.finishedScrabble[i];
        scrab4.push(word);

      } else if (this.finishedScrabble[i].length == 3 + 3){
        var word = this.finishedScrabble[i];
        scrab3.push(word);

      } else if (this.finishedScrabble[i].length == 2 + 3){
        var word = this.finishedScrabble[i];
        scrab2.push(word);
      }
    }
    this.scrabble7 = scrab7.join(" ");
    this.scrabble6 = scrab6.join(" ");
    this.scrabble5 = scrab5.join(" ");
    this.scrabble4 = scrab4.join(" ");
    this.scrabble3 = scrab3.join(" ");
    this.scrabble2 = scrab2.join(" ");
    if(this.scrabble7.length < 2) {
      this.scrabble7 = "n/a";
    }
    if(this.scrabble6.length < 2) {
      this.scrabble6 = "n/a";
    }
    if(this.scrabble5.length < 2) {
      this.scrabble5 = "n/a";
    }
    if(this.scrabble4.length < 2) {
      this.scrabble4 = "n/a";
    }
    if(this.scrabble3.length < 2) {
      this.scrabble3 = "n/a";
    }
    if(this.scrabble2.length < 2) {
      this.scrabble2 = "n/a";
    }

  } */


 ngAfterViewInit(){
  this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#ffe8b5';   //Changes background colour of entire project
}


}
