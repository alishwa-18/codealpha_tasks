import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  height?: number;
  weight?: number;
  birthDate?: string;
  gender?: string;
  isProfileComplete?: boolean;
  createdAt?: any;
  updatedAt?: any;
}

export async function createUserProfile(userData: Partial<UserProfile>) {
  if (!userData.uid) throw new Error('User ID is required');
  if (!userData.email) throw new Error('Email is required');
  
  try {
    const userRef = doc(db, 'users', userData.uid);
    
    // Check if profile already exists
    const existingProfile = await getDoc(userRef);
    if (existingProfile.exists()) {
      return existingProfile.data() as UserProfile;
    }
    
    const userProfile = {
      uid: userData.uid,
      email: userData.email,
      displayName: userData.displayName || '',
      photoURL: userData.photoURL || '',
      isProfileComplete: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    await setDoc(userRef, userProfile);
    return userProfile;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  if (!uid) throw new Error('User ID is required');

  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data() as UserProfile;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>): Promise<UserProfile> {
  if (!uid) throw new Error('User ID is required');

  try {
    const userRef = doc(db, 'users', uid);
    
    // Get current profile
    const currentProfile = await getDoc(userRef);
    if (!currentProfile.exists()) {
      throw new Error('Profile not found');
    }

    const updates = {
      ...data,
      updatedAt: serverTimestamp()
    };
    
    await updateDoc(userRef, updates);

    // Return updated profile
    const updatedProfile = await getDoc(userRef);
    return updatedProfile.data() as UserProfile;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}