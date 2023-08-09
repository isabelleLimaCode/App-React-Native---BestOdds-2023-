
import firebase from 'firebase/compat/app'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth ,initializeAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import { getDoc, getFirestore ,setDoc,query,where} from "firebase/firestore"; 
import {getStorage,getDownloadURL,uploadBytes,ref} from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyDJ9YP6GVaNQgAqlZcSFctJI5EzKBSdTrI",
  authDomain: "bestodds-ebcd1.firebaseapp.com",
  projectId: "bestodds-ebcd1",
  storageBucket: "bestodds-ebcd1.appspot.com",
  messagingSenderId: "986408205717",
  appId: "1:986408205717:web:d2545f3bb5904bff258a9c",
  measurementId: "G-2FZDQ942PR"
};


export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
const Storage = getReactNativePersistence(ReactNativeAsyncStorage);


export const FotoUp = async (image, path) => {
  try {
    const foto = await fetch(image.uri);
    if (!foto.ok) {
      throw new Error('Erro ao buscar a imagem');
    }
    const blob = await foto.blob();
    const storageRef = ref(storage, path);

    await uploadBytes(storageRef, blob, { contentType: 'image/jpeg' });

    console.log('Upload da imagem concluído com sucesso!');
  } catch (error) {
    console.log('Erro ao fazer o upload da imagem:', error);
  }
};

export const Get = async (path) => {
  let fotoUrl =
    "https://firebasestorage.googleapis.com/v0/b/bestodds-ebcd1.appspot.com/o/logo_fot.jpg?alt=media&token=7ace276b-18c0-4c05-b3ac-b2540bb427e9&_gl=1*15nsqve*_ga*MTc1NDIxMjUzOS4xNjgzNTY5NzU4*_ga_CW55HF8NVT*MTY4NjQzODQ4NC4xMDUuMS4xNjg2NDQxMDM1LjAuMC4w"
    .then((url) => {
      fotoUrl = url;
    })
    .catch((error) => {
      console.log('get',error);
    });
  return fotoUrl;
};