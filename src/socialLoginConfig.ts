import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider,
    FacebookLoginProvider
  } from 'angularx-social-login';

let config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider("922089048687-q1ds0p4s5v1mk3vtqhvveeus3ufqef2j.apps.googleusercontent.com")
    },
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider("2461054537284854")
    }
  ]);
  
  export function authServiceConfig() {
    return config;
  }
  