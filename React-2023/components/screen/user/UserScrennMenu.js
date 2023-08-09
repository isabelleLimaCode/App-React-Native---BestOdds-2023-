import React, { useState ,useEffect} from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import {db,auth} from './../Services/firebaseconfig'
import { doc, getDoc} from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';

export function UserScreen({ navigation }) {
  const [name, setName] = useState(' ');
  const [imageuser,setimageuser]= useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [visibli,setvisibli]=useState(false);

  const getusuario = async () => {
    try {
      
      const user = auth.currentUser;
      if (user) {
     
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        const photo = user.photoURL;
        //setimageuser(photo);
  
        if (userSnap.exists()) {
          const nomeUsuario = userSnap.data().nome;
          const fotourl = userSnap.data().uriphoto;
          setName(nomeUsuario);
          setimageuser(fotourl);
          console.log('nome na variavel');
          console.log(name);
          console.log('Nome do usuário:', nomeUsuario);
        } else {
          console.log('Documento do usuário não encontrado no Firestore.');
        }
      } else {
        console.log('Nenhum usuário autenticado.');
      }
    } catch (error) {
      console.log('Erro ao consultar o nome do usuário:', error);
    }
  };
  getusuario();

  const handleResetNavigation = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      console.log('Usuário deslogado com sucesso.');
    } catch (error) {
      console.log('Erro ao fazer logout do usuário:', error);
    }
  
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'MainScreen' }]
        })
      );
    }, 3000);
  };
     //puxar dados 
     useEffect(() => {
      const auth = getAuth();
    
      const dadosuser = async () => {
        try {
          if (auth.currentUser) {
            const userId = auth.currentUser.uid;
            const userDocRef = doc(db, 'users', userId);
            const userDocSnap = await getDoc(userDocRef);
    
            if (userDocSnap.exists()) {
              const userData = userDocSnap.data();
              setimageuser(userData.userphoto);
            }
            
          } else {
            console.log('Nenhum usuário logado.');
          }
        } catch (error) {
          console.log('Erro ao puxar os documentos da coleção:', error);
        }
      };
    
      console.log("teste");
      console.log(auth);
      dadosuser();
    }, []);

  return (
    <>
      <StatusBar backgroundColor={'gray'} />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ width: '100%' }}>
          <Image style={{ height: 228, width: '100%' }} source={require('./../../../assets/Felgueiras_Campos_Futebol_Banner.jpg')} />
        </View>

        <View style={{ flex: 1, alignItems: 'center',marginTop:-70 }}>
          <Image source={{uri:imageuser}} style={{height:150,width:150,borderRadius:85,borderColor:'blue'}}/>
        {visibli && (
             <FontAwesome name="user-circle" size={150} color="black" style={{ height: 155, width: 155, borderRadius: 999, borderColor: '#059669', borderWidth: 2, marginTop: -80 }} />
        )} 
          <Text
            style={{
              fontWeight: 'normal',
              fontSize: 28,
              marginVertical: 8
            }}
          >{name}</Text>
        </View>

        <View style={{ justifyContent: 'space-around', flexDirection: 'row', marginBottom: 120 }}>
          <TouchableOpacity style={{ backgroundColor: '#059669', height: 50, borderRadius: 6, alignItems: 'center', justifyContent: 'center', width: 150 }}
            onPress={() => navigation.navigate('Modal')}>
            <Text>Editar Conta</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ backgroundColor: '#059669', height: 50, borderRadius: 6, alignItems: 'center', justifyContent: 'center', width: 150 }} onPress={handleResetNavigation}>
              <Text>Logout</Text>
          </TouchableOpacity>
         
        </View>

        {isLoading &&(
              <View style={{position:'absolute',alignSelf:'center',top:420}}>
                <ActivityIndicator size="large" color="#000" />
                <Text style={{}}>Carregando...</Text>
              </View>
            )}

        
      </SafeAreaView>
    
    </>
  );
}

