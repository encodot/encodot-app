import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-card',
  templateUrl: './error-card.component.html'
})
export class ErrorCardComponent {

  @Input()
  public error: string;

}
