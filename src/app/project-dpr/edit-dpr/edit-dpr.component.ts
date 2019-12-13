import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ProjectDprService } from '../project-dpr.service';
import { Subscription } from 'rxjs';

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
  @ViewChild('storeUpdates', {static: false}) test: ElementRef;

  ngOnInit() {
    this.updateSubscription = this.projectDRPService.isUpdateMode.subscribe((status: boolean) => {
      this.isDataUpdating = status;
    });
  }

  private saveUpdates(value: HTMLInputElement): void {
    console.log('value: ', value);
    console.log('test: ', this.test.nativeElement.value);
    this.projectDRPService.isUpdateMode.next(false);
  }

  private cancelUpdates(): void {
    this.projectDRPService.isUpdateMode.next(false);
  }

  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
  }

}
