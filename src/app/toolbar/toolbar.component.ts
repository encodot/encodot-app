import { Component } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: [ './toolbar.component.scss' ]
})
export class ToolbarComponent {

  public readonly showTestLinks = !environment.production;

}
