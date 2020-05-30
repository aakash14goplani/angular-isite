import { GenericResponse } from './../../services/response/GenericResponse';
import { MaterialInwardsStructure, Materials } from './../../services/request/createMaterialInwardRequest';
import { Component, OnInit, Input } from '@angular/core';
import { ProjectMaterialInwardService } from '../project-material-inward.service';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-material',
  templateUrl: './update-material.component.html',
  styleUrls: ['./update-material.component.css']
})
export class UpdateMaterialComponent implements OnInit {

  constructor(
    private projectMaterialInwardService: ProjectMaterialInwardService
  ) { }

  @Input() private updateForContents: MaterialInwardsStructure;
  formData: FormGroup;
  materialDataArray: MaterialInwardsStructure[];
  updateDataForDate: string;

  ngOnInit() {
    this.materialDataArray = this.projectMaterialInwardService.getMaterials();
    this.updateDataForDate = this.updateForContents.inward_date;
    //this.updateForContents = this.updateForContents.flatMap(x => x);
    const updateArray = this.updateForContents.materials;
    const materialDataFormArray = new FormArray([]);
    for (let i = 0; i < updateArray.length; i++) {
      materialDataFormArray.push(
        new FormGroup({
          item_name: new FormControl(updateArray[i].name, Validators.required),
          item_quantity: new FormControl(updateArray[i].quantity, [Validators.required])
        })
      );
    }
    this.formData = new FormGroup({
      material_data: materialDataFormArray
    });
  }

  get materialDataControlFn() {
    return (this.formData.get('material_data') as FormArray).controls;
  }

  deleteMaterialItem(index: number): void {
    (this.formData.get('material_data') as FormArray).removeAt(index);
  }

  addMaterialItem(): void {
    (this.formData.get('material_data') as FormArray).push(
      new FormGroup({
        item_name: new FormControl(null, Validators.required),
        item_quantity: new FormControl(null, Validators.required)
      })
    );
  }

  saveUpdates(): void {
    this.projectMaterialInwardService.isUpdateMode.next(false);

    const temp_var = new Date(this.updateForContents.inward_date);
    const final_date = temp_var.getUTCFullYear() + '-' + (temp_var.getMonth() + 1) + '-' + temp_var.getDate();
    
    /* this.materialDataArray = this.materialDataArray.filter((materialData) => {
      return !(
        materialData.inward_date.getDate() === final_date.getDate() &&
        materialData.inward_date.getMonth() === final_date.getMonth() &&
        materialData.inward_date.getFullYear() === final_date.getFullYear() 
      );
    }); */

    let updatedData: MaterialInwardsStructure = {
      inward_date: final_date,
      materials: []
    };
    for (let i = 0; i < this.formData.value.material_data.length; i++) {
      updatedData.materials.push({
        name: this.formData.value.material_data[i].item_name,
        quantity: this.formData.value.material_data[i].item_quantity
      })
    }
    this.projectMaterialInwardService.saveProjectDPRData(updatedData,false).subscribe((data: GenericResponse) => {
      if(data.message === "Success") {
        let materialArray: MaterialInwardsStructure[] = this.projectMaterialInwardService.getMaterials();
        for(let index=0; index < materialArray.length; index++) {
          if(materialArray[index].inward_date === updatedData.inward_date) {
            materialArray[index].materials = updatedData.materials;
            break;
          }
        }
        this.projectMaterialInwardService.setProjectMaterialData(materialArray);
        this.projectMaterialInwardService.materialChange.next(this.projectMaterialInwardService.processMaterialData(materialArray));
      }
    });
  }

  cancelUpdates(): void {
    this.projectMaterialInwardService.isUpdateMode.next(false);
  }

}
