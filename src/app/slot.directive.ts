import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appSlot]',
})
export class SlotDirective {
  constructor(public template: TemplateRef<any>) {}
  public name: string | undefined;

  @Input() set appSlot(component: string) {
    this.name = component;
  }
}
