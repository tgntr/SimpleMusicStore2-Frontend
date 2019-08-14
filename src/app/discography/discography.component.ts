import { Component, OnInit, Input } from '@angular/core';
import { RecordDetails } from '../_models/recordDetails';

@Component({
  selector: 'app-discography',
  templateUrl: './discography.component.html',
  styleUrls: ['./discography.component.css']
})
export class DiscographyComponent implements OnInit {

  @Input() records: RecordDetails[];
  
  constructor() { }

  ngOnInit() {
  }

}
