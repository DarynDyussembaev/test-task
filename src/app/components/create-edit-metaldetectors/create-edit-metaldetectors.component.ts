import {Component, inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';



@Component({
  selector: 'app-create-edit-metaldetectors',
  templateUrl: './create-edit-metaldetectors.component.html',
  styleUrls: ['./create-edit-metaldetectors.component.scss']
})
export class CreateEditMetaldetectorsComponent implements OnInit {
  metalDetectorForm: FormGroup;

  types: any[] = [];
  countries: any[] = [];
  availabilities: any[] = [];

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.metalDetectorForm = this.fb.group({
      brand: [config.data.detector?.brand || '', Validators.required],
      count: [config.data.detector?.count || 0, Validators.required],
      yearIssue: [config.data.detector?.yearIssue || '', Validators.required],
      typeMetalDetectorsId: [config.data.detector?.typeMetalDetectorsId || null, Validators.required],
      countryManufactureId: [config.data.detector?.countryManufactureId || null, Validators.required],
      availabilityId: [config.data.detector?.availabilityId || null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.types = this.config.data.types || [];
    this.countries = this.config.data.countries || [];
    this.availabilities = this.config.data.availabilities || [];
  }

  onSave() {
    if (this.metalDetectorForm.valid) {
      this.ref.close(this.metalDetectorForm.value);
    }
  }

  onCancel() {
    this.ref.close();
  }
}
