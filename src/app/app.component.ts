import { Component } from '@angular/core';
import {AuthConfig, NullValidationHandler, OAuthModule, OAuthService} from "angular-oauth2-oidc";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-keycloak';

  authConfig: AuthConfig = {
    issuer: 'http://77.246.96.125:9999/realms/TestApplication',
    redirectUri: window.location.origin,
    clientId: 'login-app',
    responseType: 'code',
    scope: 'openid profile email offline_access',
    requireHttps: false,
    showDebugInformation: true
  };

  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocument().then(() => this.oauthService.tryLogin())
      .then(() => {
        this.isAdmin();
      });
  }

  public login(): void {
    this.oauthService.initImplicitFlowInternal();
  }

  logout(): void {
    this.oauthService.revokeTokenAndLogout()
  }

  isAdmin(): void {
    const token: string = <string>(this.oauthService.getAccessToken());
    let str = 'sdasda'
    const payload = token.split('.')[1]
    console.log(atob(payload))
  }
}
