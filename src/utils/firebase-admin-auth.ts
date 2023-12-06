import * as admin from 'firebase-admin';
import * as jsonfile from 'jsonfile';

const serviceAccount = jsonfile.readFileSync(`./secrets/service-account-firebase-admin.json`);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const firebaseAdminAuth = admin.auth();
