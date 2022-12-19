import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-logout-button',
  template: `
   <button
      style="width: 5rem"
      class="logout-button"
      nz-button
      nzType="primary"
      nzDanger
      class="button__logout" (click)="handleLogout()"
    >
      Log Out
    </button>
  `,
})
export class LogoutButtonComponent {
  constructor(
    private auth: AuthService,
    @Inject(DOCUMENT) private doc: Document,
  ) { }

  handleLogout(): void {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }
}