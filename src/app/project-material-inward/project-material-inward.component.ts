import { Component, OnInit } from '@angular/core';
import { ProjectMaterialInwardService, MaterialInwardsStructure } from './project-material-inward.service';

@Component({
  selector: 'app-project-material-inward',
  templateUrl: './project-material-inward.component.html',
  styleUrls: ['./project-material-inward.component.css'],
  providers: [ ProjectMaterialInwardService ]
})
export class ProjectMaterialInwardComponent implements OnInit {

  constructor(
    private projectMaterialInwardService: ProjectMaterialInwardService
  ) { }

  private materialDetailsArray: Array<MaterialInwardsStructure>;
  materialSubArray:  Array<MaterialInwardsStructure[]>;

  ngOnInit(): void {
    this.materialDetailsArray = this.projectMaterialInwardService.getMaterials();
    this.materialSubArray = [];
    const size = 2;
    const emptyArrayContents = ((this.materialDetailsArray.length % size) > 0) ? (size - (this.materialDetailsArray.length % size)) : 0;
    let counter = 0;

    for (let i = 0; i < this.materialDetailsArray.length; i += size) {
      this.materialSubArray.push(this.materialDetailsArray.slice(i, i + size));
      counter++;
    }
    if (emptyArrayContents > 0) {
      for (let i = 0; i < emptyArrayContents; i++) {
        this.materialSubArray[counter - 1].push({ inward_date: null, materials: [{ name: '', quantity: 0 }] });
      }
    }

  }

}
