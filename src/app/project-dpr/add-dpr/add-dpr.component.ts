import { Component, OnInit } from '@angular/core';
import { ProjectDprService } from '../project-dpr.service';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { FetchDprResponse, Content} from '../../services/response/fetchDprResponse';
import { GenericResponse } from '../../services/response/GenericResponse';

@Component({
  selector: 'app-add-dpr',
  templateUrl: './add-dpr.component.html',
  styleUrls: ['./add-dpr.component.css']
})
export class AddDprComponent implements OnInit {

  constructor(
    private projectDPRService: ProjectDprService
  ) { }

  newProjectDate: Date = new Date();
  formData: FormGroup;

  ngOnInit() {
    const dprDataFormArray = new FormArray([]);
    // force push, so that on click add button, there should be one default text-box available
    dprDataFormArray.push(
      new FormGroup({
        dpr_item: new FormControl(null, Validators.required)
      })
    );
    this.formData = new FormGroup({
      dpr_data: dprDataFormArray
    });
  }

  get dprDataControlFn() {
    return (this.formData.get('dpr_data') as FormArray).controls;
  }

  addNewNotes(): void {
    (this.formData.get('dpr_data') as FormArray).push(
      new FormGroup({
        dpr_item: new FormControl(null, Validators.required)
      })
    );
  }

  cancelNewNotes(index: number): void {
    (this.formData.get('dpr_data') as FormArray).removeAt(index);
  }

  saveDataAddition(): void {
    const final_date = this.newProjectDate.getUTCFullYear() + '-' + (this.newProjectDate.getMonth() + 1)  + '-' + this.newProjectDate.getDate();
    let tempData : Content = {
      date: final_date,
      content: []
    }
    for (let i = 0; i < this.formData.value.dpr_data.length; i++) {
      tempData.content.push(this.formData.value.dpr_data[i].dpr_item);
    }
    this.projectDPRService.saveProjectDPRData(tempData, true).subscribe((data: GenericResponse) => {
      if(data.message === "Success") {
        this.projectDPRService.addProjectDPRData(tempData);
        this.projectDPRService.isAddMode.next(false);
        this.projectDPRService.dprDataChange.next(
          this.projectDPRService.processProjectDPRData(this.projectDPRService.getProjectDPRData()));
      } 
      // write failure logic, add a toast message
    });
  
  }

  cancelDataAddition(): void {
    this.projectDPRService.isAddMode.next(false);
  }

}
