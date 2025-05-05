declare module 'firebase/auth/react-native' {
  import type { Auth as FirebaseAuth, Persistence } from 'firebase/auth';
  export function initializeAuth(app: any, options?: { persistence: Persistence }): FirebaseAuth;
  export function getReactNativePersistence(storage: any): Persistence;
}
