import { Component } from '@angular/core';
import { signIn } from '../mocks';
import { User } from './types';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css'],
})
export class AuthenticatorComponent {
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
        alert('success!')
      })
      .catch((error) => {
        this.error = error;
      });
  }
}
