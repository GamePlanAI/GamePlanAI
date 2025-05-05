// Fix AuthProvider declaration and return structure
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth'; 
import { auth } from '../../firebaseConfig';


type AuthContextType = {
  user: any;
  initializing: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  resetPassword: (email: string) => Promise<void>;
  resendVerification: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export { AuthContext }; // Fix for "not exported" errors

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [initializing, setInitializing] = useState(true);

  // Add dummy functions for now to avoid undefined errors
  const signIn = async () => {};
    const signUp = async (email: string, password: string) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        return userCredential;
      };
  const resetPassword = async () => {};
  const resendVerification = async () => {};
  const signOut = async () => {};

  useEffect(() => {
    setInitializing(false); // Simulate auth listener finishing
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, initializing, signIn, signUp, resetPassword, resendVerification, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};