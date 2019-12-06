import { Component, OnInit } from '@angular/core';
import { ProjectBgDetailsService, BankGuarnteeDataFormat } from './project-bg-details.service';

@Component({
  selector: 'app-project-bg-details',
  templateUrl: './project-bg-details.component.html',
  styleUrls: ['./project-bg-details.component.css'],
  providers: [ ProjectBgDetailsService ]
})
export class ProjectBgDetailsComponent implements OnInit {

  constructor(
    private projectBgDetailsService: ProjectBgDetailsService
  ) { }

  private bankGuarnteeData: Array<BankGuarnteeDataFormat>;
  private bankGuarnteeDataSubArray: Array<BankGuarnteeDataFormat[]>;

  ngOnInit() {
    this.bankGuarnteeData = this.projectBgDetailsService.getBankGuarnteeDetails();
    this.bankGuarnteeDataSubArray = [];
    const size = 2;
    const emptyArrayContents = ((this.bankGuarnteeData.length % size) > 0) ? (size - (this.bankGuarnteeData.length % size)) : 0;
    let counter = 0;

    for (let i = 0; i < this.bankGuarnteeData.length; i += size) {
      this.bankGuarnteeDataSubArray.push(this.bankGuarnteeData.slice(i, i + size));
      counter++;
    }
    if (emptyArrayContents > 0) {
      for (let i = 0; i < emptyArrayContents; i++) {
        this.bankGuarnteeDataSubArray[counter - 1].push({ image_url: '', title: '', contents: {
          id: -1, amount: -1, start_date: null, end_date: null }
        });
      }
    }
  }

}
