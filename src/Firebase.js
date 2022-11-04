// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBnk1L_frzTkzr27czirTShaZduX94cqVs",
  authDomain: "arduino-projects-4e136.firebaseapp.com",
  projectId: "arduino-projects-4e136",
  storageBucket: "arduino-projects-4e136.appspot.com",
  messagingSenderId: "591085670901",
  appId: "1:591085670901:web:8ceda5003a3d3c521690bc"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth()
const storage = getStorage()
export default getFirestore();

export function logout(){
  return signOut(auth)
}

export function signup(email, password){
  return createUserWithEmailAndPassword(auth, email, password).then(function(result){
    return result
  }).catch(function(error){
    return getError(error)
  })
}

export function login(email, password){
  return signInWithEmailAndPassword(auth, email, password).then(function(result){
    return result
  }).catch(function(error){
    return getError(error)
  })
}

export function signinGoogle(){
  return auth.signInWithPopup(new auth.GoogleAuthProvider())
}

export function updateUsername(currentUser, username){
  updateProfile(currentUser, {displayName: username})
}

export async function updatePhoto(currentUser, file){
  const fileRef = ref(storage, currentUser.uid + '.png')

  const snapshot = await uploadBytes(fileRef, file)

  const photoURL = await getDownloadURL(fileRef)

  updateProfile(currentUser, {photoURL: photoURL})
}

function getError(error){
  var string = error.code.substring(5).replaceAll('-', ' ')
  var uppercaseString = string.charAt(0).toUpperCase() + string.slice(1) + '.'
  return uppercaseString
}

// Custom hook
export function useAuth(){
  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user))
    return unsub
  })

  return currentUser;
}