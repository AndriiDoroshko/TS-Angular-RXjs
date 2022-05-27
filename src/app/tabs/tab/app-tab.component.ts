import {Component, Input} from "@angular/core";
@Component({
  selector: 'my-tab',
  templateUrl: './app-tab.component.html'
})
export class TabComponent {
  @Input('tabTitle')
  title!: string;
  @Input() active = false;
  @Input() isCloseable = false;
  @Input() template: any;
  @Input() dataContext: any;
}
