import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProjectDprService } from '../project-dpr.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-dpr',
  templateUrl: './edit-dpr.component.html',
  styleUrls: ['./edit-dpr.component.css']
})
export class EditDprComponent implements OnInit, OnDestroy {

  constructor(
    private projectDRPService: ProjectDprService
  ) { }

  @Input() private updateDataForDate: Date;
  @Input() private updateForContents: string[];
  private isDataUpdating: boolean = true;
  private updateSubscription: Subscription;
  private formData: FormGroup;

  ngOnInit() {
    this.updateSubscription = this.projectDRPService.isUpdateMode.subscribe((status: boolean) => {
      this.isDataUpdating = status;
    });

    const dprDataFormArray = new FormArray([]);
    for (let i = 0; i < this.updateForContents.length; i++) {
      dprDataFormArray.push(
        // error, need to wrap inside form-group: new FormControl(this.updateForContents[i], Validators.required)
        new FormGroup({
          dpr_item: new FormControl(this.updateForContents[i], Validators.required)
        })
      );
    }
    this.formData = new FormGroup({
      dpr_data: dprDataFormArray
    });
  }

  get dprDataControlFn() {
    return (this.formData.get('dpr_data') as FormArray).controls;
  }

  private deleteDprItem(index: number): void {
    (this.formData.get('dpr_data') as FormArray).removeAt(index);

    /*
      create a temp array that holds all data. remove that particular item from main aaray as well
    */
  }

  private addDprItem(): void {
    (this.formData.get('dpr_data') as FormArray).push(
      new FormGroup({
        dpr_item: new FormControl(null, Validators.required)
      })
    );
    /*
      add that item to new data as well
    */
  }

  private saveUpdates(): void {
    this.projectDRPService.isUpdateMode.next(false);
    
    const temp_var = new Date(this.updateDataForDate);
    const final_date = temp_var.getUTCFullYear() + '-' + (+temp_var.getMonth() + 1) + '-' + temp_var.getDate();
    for (let i = 0; i < this.formData.value.dpr_data.length; i++) {
      this.projectDRPService.setProjectDPRData(new Date(final_date), this.formData.value.dpr_data[i].dpr_item);
    }
    this.projectDRPService.dprDataChange.next(this.projectDRPService.getProjectDPRData());
    // emit that temp data
    // remove all the data that belongs to date = x
    // reneter new data with date = x
  }

  private cancelUpdates(): void {
    this.projectDRPService.isUpdateMode.next(false);
  }

  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
  }

}
