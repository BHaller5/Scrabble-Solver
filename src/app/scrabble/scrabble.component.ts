import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-scrabble',
  templateUrl: './scrabble.component.html',
  styleUrls: ['./scrabble.component.css']
})
export class ScrabbleComponent implements OnInit {
  
  @Input() inputText: string; //this property is bindable from parent
  @Input() scrabbleResults = [];
  @Output() scrabbleClick = new EventEmitter<void>();   //Used to hide the Scrabble component when a different button is clicked
  @Input() s7 = [];
  @Input() s6 = [];
  @Input() s5 = [];
  @Input() s4 = [];
  @Input() s3 = [];
  @Input() s2 = [];
  
  @ViewChild('childMessage') msgChild: ElementRef;
  message: string = '';

  constructor() { }

  ngOnInit() {
    
  }

  //function called when the event is triggered (like click or keyeup) in child's template

  /*sendMessage() {
    this.outputEvent.emit(this.message);
  } */

  /*sendMessage(msg: string) {
    console.log(msg);
    this.outputEvent.emit(msg);
  } */

  onKey(event: any) {
    this.message = event.target.value;
  }
  
}
