import { Component, OnInit, Input } from '@angular/core';
import { RecordDetails } from '../_models/recordDetails';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  @Input() record: RecordDetails;
  @Input() size;
  constructor() { }

  ngOnInit() {
  }

}
