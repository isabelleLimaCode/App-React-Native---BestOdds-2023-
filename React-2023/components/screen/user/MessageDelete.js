import React, { useEffect, useState } from "react";
import { Image,ActivityIndicator} from "react-native";
import {  Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { signOut} from 'firebase/auth';
import {auth} from './../Services/firebaseconfig.js';
import { CommonActions } from '@react-navigation/native';
export default function MessageDelete({ navigation}) {



  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
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
      }, 10000);
    };
    handleResetNavigation();
  },[]);
 

  return (
            <View behavior={Platform.OS == "ios" ? "padding" : "height"} style = {{flex:1, backgroundColor:'#ffff', alignItems:'center', justifyContent:'center'}}>
              <Text style= {{  fontWeight: "bold", fontSize: 29 }}>
                Foi bom ter-te aqui </Text>
              <Image style={{ height: 290, width: 290}} source={require('./../../../assets/Foto_Eliminar_conta.gif')} />
              <Text style= {{  fontWeight: "bold", fontSize: 22 }}>
              Esperamos voltar a ver-te um dia </Text>
              <Text/>
          <MaterialCommunityIcons  name="emoticon-cry-outline" size={100} color="black" />
          {isLoading &&(
                <View style={{position:'absolute',alignSelf:'center',top:420}}>
                  <ActivityIndicator size="large" color="#000" />
                  <Text style={{}}>Carregando...</Text>
                </View>
              )}
  </View>  
    );
  }