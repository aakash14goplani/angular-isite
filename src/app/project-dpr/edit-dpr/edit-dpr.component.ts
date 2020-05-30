import { Component, OnInit, Input } from '@angular/core';
import { ProjectDprService } from '../project-dpr.service';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Content} from '../../services/response/fetchDprResponse';
import { GenericResponse } from '../../services/response/GenericResponse';

@Component({
  selector: 'app-edit-dpr',
  templateUrl: './edit-dpr.component.html',
  styleUrls: ['./edit-dpr.component.css']
})
export class EditDprComponent implements OnInit {

  constructor(
    private projectDRPService: ProjectDprService
  ) { }

  @Input() updateDataForDate: Date;
  @Input() private updateForContents: string[];
  formData: FormGroup;
  dprDataArray: Array<{date: Date, content: string}>;

  ngOnInit() {
    this.dprDataArray = [];

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

  deleteDprItem(index: number): void {
    (this.formData.get('dpr_data') as FormArray).removeAt(index);
  }

  addDprItem(): void {
    (this.formData.get('dpr_data') as FormArray).push(
      new FormGroup({
        dpr_item: new FormControl(null, Validators.required)
      })
    );
  }

  saveUpdates(): void {
    this.projectDRPService.isUpdateMode.next(false);

    const temp_var = new Date(this.updateDataForDate);
    const final_date = temp_var.getUTCFullYear() + '-' + (+temp_var.getMonth() + 1) + '-' + temp_var.getDate();
    let tempData : Content = {
      date: final_date,
      content: []
    }
    for (let i = 0; i < this.formData.value.dpr_data.length; i++) {
      tempData.content.push(this.formData.value.dpr_data[i].dpr_item);
    }
    /* this.dprDataArray = this.dprDataArray.filter((dprData) => {
      return !(
        dprData.date.getDate() === final_date.getDate() &&
        dprData.date.getMonth() === final_date.getMonth() &&
        dprData.date.getFullYear() === final_date.getFullYear() 
      );
    }); */
/* 
    let tempArrayForDprArray: Array<{date: Date, content: string}> = [];
    for (let i = 0; i < this.formData.value.dpr_data.length; i++) {
      tempArrayForDprArray.push({date: final_date, content: this.formData.value.dpr_data[i].dpr_item})
    } */
    /* this.dprDataArray = this.dprDataArray.concat(tempArrayForDprArray); */
    //this.projectDRPService.setProjectDPRData(this.dprDataArray);
    this.projectDRPService.saveProjectDPRData(tempData, false).subscribe((data: GenericResponse) => {
      if(data.message && data.message == "Success") {
        let dataArray: Array<Content> = this.projectDRPService.getProjectDPRData();
        for(let index=0; index<dataArray.length; index++) {
          if(dataArray[index].date === final_date) {
            dataArray[index].content = tempData.content;
            break;
          }
        }
        this.projectDRPService.setProjectDPRData(dataArray);
        this.projectDRPService.dprDataChange.next(
          this.projectDRPService.processProjectDPRData(this.projectDRPService.getProjectDPRData()));
      }
    });
  }

  cancelUpdates(): void {
    this.projectDRPService.isUpdateMode.next(false);
  }

}
