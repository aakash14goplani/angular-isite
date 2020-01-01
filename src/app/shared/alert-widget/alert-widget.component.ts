import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert-widget',
  templateUrl: './alert-widget.component.html',
  styleUrls: ['./alert-widget.component.css']
})
export class AlertWidgetComponent implements OnInit {

  constructor() { }

  @Input() message: string = '';
  @Output() closePopUp = new EventEmitter<void>();

  ngOnInit() {
  }

  closeAlertBox(): void {
    this.closePopUp.emit();
  }

}
