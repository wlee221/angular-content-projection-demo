import {
  AfterContentInit,
  Component,
  ContentChildren,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { signIn } from '../mocks';
import { SlotDirective } from '../slot.directive';
import { User } from './types';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css'],
})
export class AuthenticatorComponent implements AfterContentInit {
  @ContentChildren(SlotDirective)
  private customComponentQuery: QueryList<SlotDirective> | undefined;
  public customComponents: Record<string, TemplateRef<any>> | undefined;

  public error = '';
  public user: User | undefined = undefined;

  public handleSignIn(event: Event) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const formValues = Object.fromEntries(formData) as Record<string, string>;

    const { username, password } = formValues;

    signIn(username, password)
      .then(() => {
        this.error = '';
        this.user = { username };
      })
      .catch((error) => {
        this.error = error;
      });
  }

  ngAfterContentInit(): void {
    if (!this.customComponentQuery) return;

    const customComponents: Record<string, TemplateRef<any>> = {};
    this.customComponentQuery.forEach((slot: SlotDirective) => {
      if (slot.name) {
        customComponents[slot.name] = slot.template;
      }
    });
    this.customComponents = customComponents;
  }

  handleSignOut() {
    this.user = undefined;
  }

  get context() {
    return {
      user: this.user,
      signOut: () => this.handleSignOut(),
    };
  }
}
