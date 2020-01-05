import { Component, OnInit, Input } from '@angular/core';
import { ProjectMaterialInwardService, MaterialInwardsStructure } from '../project-material-inward.service';
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

  @Input() updateDataForDate: Date;
  @Input() private updateForContents: Array<{name: string, quantity: number}>;
  formData: FormGroup;
  materialDataArray: MaterialInwardsStructure[];

  ngOnInit() {
    this.materialDataArray = this.projectMaterialInwardService.getMaterials();
    this.updateForContents = this.updateForContents.flatMap(x => x);
    
    const materialDataFormArray = new FormArray([]);
    for (let i = 0; i < this.updateForContents.length; i++) {
      materialDataFormArray.push(
        new FormGroup({
          item_name: new FormControl(this.updateForContents[i].name, Validators.required),
          item_quantity: new FormControl(this.updateForContents[i].quantity, [Validators.required])
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

    const temp_var = new Date(this.updateDataForDate);
    const final_date = new Date(temp_var.getUTCFullYear() + '-' + (+temp_var.getMonth() + 1) + '-' + temp_var.getDate());
    
    this.materialDataArray = this.materialDataArray.filter((materialData) => {
      return !(
        materialData.inward_date.getDate() === final_date.getDate() &&
        materialData.inward_date.getMonth() === final_date.getMonth() &&
        materialData.inward_date.getFullYear() === final_date.getFullYear() 
      );
    });

    let tempArray: Array<{inward_date: Date, materials: {name: string, quantity: number}[]}> = [];
    let tempMaterialSubarray: Array<{name: string, quantity: number}> = [];
    for (let i = 0; i < this.formData.value.material_data.length; i++) {
      tempMaterialSubarray.push({
        name: this.formData.value.material_data[i].item_name,
        quantity: this.formData.value.material_data[i].item_quantity
      })
    }
    if (tempMaterialSubarray.length > 0) {
      tempArray.push({ inward_date: final_date, materials: tempMaterialSubarray });
    }
    this.materialDataArray = this.materialDataArray.concat(tempArray);
    this.projectMaterialInwardService.setProjectMaterialData(this.materialDataArray);
    
    this.projectMaterialInwardService.materialChange.next(this.projectMaterialInwardService.getProcessedMaterialData());
  }

  cancelUpdates(): void {
    this.projectMaterialInwardService.isUpdateMode.next(false);
  }

}
