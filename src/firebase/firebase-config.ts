import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"


const app = initializeApp({
  apiKey: "AIzaSyBo62c_ug9NmPgy0ykEpz4EfFmSs8OayFE",
  authDomain: "bsd-schedule-teaching.firebaseapp.com",
  projectId: "bsd-schedule-teaching",
  storageBucket: "bsd-schedule-teaching.appspot.com",
  messagingSenderId: "108859722233",
  appId: "1:108859722233:web:fb5c844c57ef02e0585528",
  measurementId: "G-4DMRT10ZFS"
})

export const auth = getAuth(app)
export const storage = getStorage(app)
export const firestore = getFirestore(app)