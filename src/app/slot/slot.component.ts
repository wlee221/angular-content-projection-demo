import { AfterContentInit, Component, HostBinding, Input, OnInit, TemplateRef } from '@angular/core';
import { AuthenticatorComponent } from '../authenticator/authenticator.component';

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
})
export class SlotComponent implements AfterContentInit {
  constructor(private authenticator: AuthenticatorComponent) {}
  @Input() name: string | undefined;
  @Input() context: Record<PropertyKey, any> | undefined;

  @HostBinding('style.display') display = 'contents';

  public overridingComponent: TemplateRef<any> | undefined;
  public isOverriden: boolean = false;

  ngAfterContentInit(): void {
    const customComponents = this.authenticator.customComponents;
    if (!customComponents || !this.name) return;
    
    const overridingComponent = customComponents[this.name];

    if (overridingComponent) {
      this.overridingComponent = overridingComponent;
      this.isOverriden = true;
    }
  }
}
