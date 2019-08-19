import { Component, OnInit } from '@angular/core';
import { NewRecord } from '../_models/new-record/newRecord';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { RecordService } from '../_services/record.service';
import { validateThatFileIsMP3 } from '../_helpers/custom-validators';
import { Router } from '@angular/router';
import { BaseComponent } from '../_helpers/base.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css']
})
export class AddRecordComponent extends BaseComponent implements OnInit {

  record: NewRecord;
  form: FormGroup;
  discogsUrl: string;
  loading = false;
  submitted = false;
  previews: File[] = [];

  constructor(private formBuilder: FormBuilder, private recordService: RecordService, private router: Router) {
    super();
    this.form = this.formBuilder.group({
      discogsUrl: ['', [Validators.required, Validators.pattern("https:\/\/www\.discogs\.com\/([^\/]+\/)?((release)|(master))\/[0-9]+([^\/]+)?")]],
      price: ['', [Validators.required, Validators.min(1), Validators.pattern("[0-9]+")]],
      quantity: ['', [Validators.required, Validators.min(1), Validators.pattern("[0-9]+")]],
      previews: this.formBuilder.array([])
    });
  }

  ngOnInit() {
  }

  extractRecordInfo(): void {
    this.submitted = false;
    this.record = null;
    if (this.form.controls.discogsUrl.invalid) {
      this.loading = false;
      return;
    }

    this.loading = true;
    this.recordService.extractRecordInformation(this.discogsUrl).pipe(takeUntil(this.unsubscribe)).subscribe(recordInfo => {
      this.record = recordInfo;
      this.record.tracklist = this.record.tracklist.filter(t=>t.title);
      this.record.price = null;
      this.record.quantity = null;
      this.addTrackPreviewsForm();
      this.loading = false;
    })
  }

  addTrackPreviewsForm(): void {
    let previewsForm = this.form.get('previews') as FormArray;
    this.record.tracklist.forEach(track => {
      previewsForm.push(this.formBuilder.control('', [Validators.required, validateThatFileIsMP3()]));
    });
  }

  previewFileIsInvalid(i) {
    return this.previewsFormControls.controls[i].invalid && (this.previewsFormControls.value[i] || this.submitted);
  }

  priceIsInvalid() {
    return this.form.controls.price.invalid && (this.form.controls.price.value || this.submitted);
  }

  quantityIsInvalid() {
    return this.form.controls.quantity.invalid && (this.form.controls.quantity.value || this.submitted);
  }

  get previewsFormControls(): FormArray {
    return this.form.get('previews') as FormArray;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.record.price = this.form.controls.price.value;
    this.record.quantity = this.form.controls.quantity.value;
    console.log(this.record);
    this.recordService.addRecord(this.record).pipe(takeUntil(this.unsubscribe)).subscribe(()=> {
      this.uploadTrackPreviews();
      
    })
    //todo redirect to record page after u make the component
    

  }

  uploadTrackPreviews(): void {
    this.previews.forEach((preview, index) => {
      let file = new FormData();
      file.append('file', preview);
      this.recordService.upload(file, this.record.id+this.record.tracklist[index].title).pipe(takeUntil(this.unsubscribe)).subscribe(()=> this.router.navigate(['/']));
    });
  }

  appendTrackPreview(event, index) {
    if (this.previewsFormControls.controls[index].invalid) { 
      return;
    }
    let file = event.target.files[0];
    this.previews[index] = file;
  }
}
