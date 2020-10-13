import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-childcomponent',
  templateUrl: './childcomponent.component.html',
  styleUrls: ['./childcomponent.component.css']
})
export class ChildcomponentComponent implements OnInit {

  @Input() inputText: string; //this property is bindable from parent
  @Input() inputResults: string;   //This is the scrambled word accepted from the parent
  @Output() scrambleClick = new EventEmitter<void>(); //Used to hide the Scramble component when a different button is clicked


  constructor() { }

  ngOnInit() {
  }

}
