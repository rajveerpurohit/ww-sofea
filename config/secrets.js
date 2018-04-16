/** Important **/
/** You should not be committing this file to GitHub **/
/** Repeat: DO! NOT! COMMIT! THIS! FILE! TO! YOUR! REPO! **/
export const sessionSecret = process.env.SESSION_SECRET || 'Your Session Secret goes here';
export const google = {
  clientID: process.env.GOOGLE_CLIENTID || '62351010161-eqcnoa340ki5ekb9gvids4ksgqt9hf48.apps.googleusercontent.com',
  clientSecret: process.env.GOOGLE_SECRET || '6cKCWD75gHgzCvM4VQyR5_TU',
  callbackURL: process.env.GOOGLE_CALLBACK || '/auth/google/callback'
};

export const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID || 'UA-116277597-1';
export const GOOGLE_TAG_MANAGER_ID = process.env.GOOGLE_TAG_MANAGER_ID || 'GTM-NBZHDRN'; //  QA2 NBZHDRN  DEV MMKRDW7
