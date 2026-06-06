"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  type User,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getFirebaseAuth, getFirebaseDb } from "@/lib/firebase";

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  onboarded: boolean;
  interests: string[];
  followedAuthors: { name: string; id: string }[];
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  completeOnboarding: (interests: string[], authors: { name: string; id: string }[]) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

async function fetchProfile(uid: string): Promise<UserProfile | null> {
  try {
    const snap = await getDoc(doc(getFirebaseDb(), "users", uid));
    if (snap.exists()) return snap.data() as UserProfile;
  } catch {
    // Firestore may not be configured yet
  }
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsub: (() => void) | undefined;

    try {
      const auth = getFirebaseAuth();
      unsub = onAuthStateChanged(auth, async (firebaseUser) => {
        setUser(firebaseUser);
        if (firebaseUser) {
          try {
            const p = await fetchProfile(firebaseUser.uid);
            setProfile(p);
          } catch {
            setProfile(null);
          }
        } else {
          setProfile(null);
        }
        setLoading(false);
      });
    } catch {
      setLoading(false);
    }

    return () => unsub?.();
  }, []);

  async function signUp(email: string, password: string, name: string) {
    const auth = getFirebaseAuth();
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });

    const newProfile: UserProfile = {
      uid: cred.user.uid,
      email,
      displayName: name,
      onboarded: false,
      interests: [],
      followedAuthors: [],
      createdAt: new Date().toISOString(),
    };
    await setDoc(doc(getFirebaseDb(), "users", cred.user.uid), newProfile);
    setProfile(newProfile);
  }

  async function signIn(email: string, password: string) {
    const auth = getFirebaseAuth();
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function signInWithGoogle() {
    const auth = getFirebaseAuth();
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);

    try {
      const existing = await fetchProfile(cred.user.uid);
      if (!existing) {
        const newProfile: UserProfile = {
          uid: cred.user.uid,
          email: cred.user.email ?? "",
          displayName: cred.user.displayName ?? "Researcher",
          onboarded: false,
          interests: [],
          followedAuthors: [],
          createdAt: new Date().toISOString(),
        };
        await setDoc(doc(getFirebaseDb(), "users", cred.user.uid), newProfile);
        setProfile(newProfile);
      } else {
        setProfile(existing);
      }
    } catch (e) {
      console.warn("[auth] Firestore profile save failed, continuing:", e);
      setProfile({
        uid: cred.user.uid,
        email: cred.user.email ?? "",
        displayName: cred.user.displayName ?? "Researcher",
        onboarded: false,
        interests: [],
        followedAuthors: [],
        createdAt: new Date().toISOString(),
      });
    }
  }

  async function signOut() {
    const auth = getFirebaseAuth();
    await firebaseSignOut(auth);
    setUser(null);
    setProfile(null);
  }

  async function updateUserProfile(data: Partial<UserProfile>) {
    if (!user) return;
    await updateDoc(doc(getFirebaseDb(), "users", user.uid), data);
    setProfile((prev) => (prev ? { ...prev, ...data } : null));
  }

  async function completeOnboarding(
    interests: string[],
    authors: { name: string; id: string }[]
  ) {
    if (!user) return;
    const updates: Partial<UserProfile> = {
      onboarded: true,
      interests,
      followedAuthors: authors,
    };
    await updateDoc(doc(getFirebaseDb(), "users", user.uid), updates);
    setProfile((prev) => (prev ? { ...prev, ...updates } : null));
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
        updateUserProfile,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
