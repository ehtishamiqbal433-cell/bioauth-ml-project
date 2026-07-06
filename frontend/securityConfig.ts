/**
 * Runtime Security Configuration
 * Defines the immutable identity profile for the application owner and the 
 * corresponding Firestore Security Rules to enforce access at the database layer.
 */

export const RUNTIME_AUTH_CONFIG = {
  ownerIdentityProfile: {
    role: "SUPER_ADMIN",
    uid: "usr_01J2K9AX8R",
    email: "architect@zetalyon.io",
    clearanceLevel: 5
  },
  firestoreRules: `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Base rule: Deny all by default
    match /{document=**} {
      allow read, write: if false;
    }
    
    // Architecture Docs Collection
    match /architecture_docs/{docId} {
      // Block unauthorized users at the database layer
      allow read: if request.auth != null && 
                     request.auth.token.role == 'SUPER_ADMIN' &&
                     request.auth.uid == 'usr_01J2K9AX8R';
                     
      allow write: if false; // Immutable deployment
    }
  }
}`
};
