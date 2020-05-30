import { GenericResponse } from './../../services/response/GenericResponse';
import { MaterialInwardsStructure, Materials } from './../../services/request/createMaterialInwardRequest';
import { Component, OnInit } from '@angular/core';
import { ProjectMaterialInwardService } from '../project-material-inward.service';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.css']
})
export class AddMaterialComponent implements OnInit {

  constructor(
    private projectMaterialService: ProjectMaterialInwardService
  ) { }

  newProjectDate: Date = new Date();
  formData: FormGroup;

  ngOnInit() {
    const materialDataFormArray = new FormArray([]);
    // force push, so that on click add button, there should be one default text-box available
    materialDataFormArray.push(
      new FormGroup({
        item_name: new FormControl(null, Validators.required),
        item_quantity: new FormControl(null, Validators.required)
      })
    );
    this.formData = new FormGroup({
      material_data: materialDataFormArray
    });
  }

  get materialDataControlFn() {
    return (this.formData.get('material_data') as FormArray).controls;
  }

  addNewNotes(): void {
    (this.formData.get('material_data') as FormArray).push(
      new FormGroup({
        item_name: new FormControl(null, Validators.required),
        item_quantity: new FormControl(null, Validators.required)
      })
    );
  }

  cancelNewNotes(index: number): void {
    (this.formData.get('material_data') as FormArray).removeAt(index);
  }

  cancelDataAddition(): void {
    this.projectMaterialService.isAddMode.next(false);
  }

  saveDataAddition(): void {
    const final_date = this.newProjectDate.getUTCFullYear() + '-' + (+this.newProjectDate.getMonth() + 1) + '-' + this.newProjectDate.getDate();

    let tempArray: Materials[] = [];
    for (let i = 0; i < this.formData.value.material_data.length; i++) {
      tempArray.push({
        name: this.formData.value.material_data[i].item_name,
        quantity: this.formData.value.material_data[i].item_quantity
      });
    }

    let request: MaterialInwardsStructure = {
      inward_date: final_date,
      materials: tempArray
    }
    if(tempArray.length > 0) {
      this.projectMaterialService.saveProjectDPRData(request, true).subscribe((data: GenericResponse)=> {
        if(data.message === "Success") {
          this.projectMaterialService.addProjectMaterialData(request);
          this.projectMaterialService.isAddMode.next(false);
          this.projectMaterialService.materialChange.next(
            this.projectMaterialService.processMaterialData(this.projectMaterialService.getMaterials()));
        } 
      });
    }
  }

}
