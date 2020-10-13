import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-unscramble',
  templateUrl: './unscramble.component.html',
  styleUrls: ['./unscramble.component.css']
})
export class UnscrambleComponent implements OnInit {

  @Input() inputText: string; //this property is bindable from parent
  @Input() unscrambleResults = [];
  @Output() unscrambleClick = new EventEmitter<void>();  //Used to hide the Unscramble component when a different button is clicked

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
