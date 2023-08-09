import React, { useState } from "react";
import { ScrollView, TouchableOpacity,Pressable,Alert,ActivityIndicator} from "react-native";
import { Ionicons, FontAwesome} from '@expo/vector-icons';
import {  Text, View } from 'react-native';
import styles from '../../../styles/StyleDeleteAccount.js'
import { Entypo,MaterialCommunityIcons } from '@expo/vector-icons'; 
import { doc,deleteDoc} from "firebase/firestore";
import { getAuth,signOut,deleteUser} from 'firebase/auth';
import {db ,auth} from './../Services/firebaseconfig.js';
import { CommonActions } from '@react-navigation/native';
export default function DeleteAccount({ navigation}) {

    const [isLoading, setIsLoading] = useState(false);

    const deletConta = async () =>{
        setIsLoading(true);
    try{
        const auth = getAuth();
        const userId = auth.currentUser.uid;
        await deleteDoc(doc(db, 'users', userId));
        await deleteUser(auth.currentUser);
         await signOut(auth);
    } catch(error){
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
    
        const showAlert = () =>
            Alert.alert(
                'Deletar Conta',
                'Tem certeza que deseja Deletar os teus dados no aplicativo?',
                [
                {
                    text: 'Sim',
                    onPress: async () => {
                    navigation.navigate('MessageDelete');
                    deletConta();
                   /* await new Promise((resolve) => {
                        setTimeout(resolve, 2000); 
                      });*/
                    
                    Alert.alert('Conta Deletada com sucesso!');
                    },
                    style: 'cancel',
                },
                {
                    text: 'Não',
                    onPress: () => Alert.alert('Operação cancelada com sucesso!'),
                    style: 'cancel',
                },
                ],
                {
                cancelable: true,
                onDismiss: () =>
                    Alert.alert('operação cancelada por ter selecionado área externa'),
                },
            );

  return (
            <View behavior={Platform.OS == "ios" ? "padding" : "height"} >
                <ScrollView>
                    <View style ={styles.quadrado}>
                        <TouchableOpacity style = {styles.back} onPress={() => navigation.goBack()}>
                           <Ionicons name="md-arrow-back" size={30} color={'#000'}></Ionicons>
                        </TouchableOpacity>
                    </View>
                    <View style ={{alignItems: 'center', top:-100}}>
                        <FontAwesome name="user-circle-o" size={140} color="#08533C" style={styles.user} />
                       
                       <View style={{
                                    flexDirection: 'row',
                                    
                        }}>
                            <View>
                            <Text style= {styles.textH}>
                                Deseja desativar a sua conta </Text>
                                <Text style= {{flex:1, fontSize:20, color:'black' , fontWeight:'bold', alignItems:'center',top:-60,left:85}}>  em vez de excluir?</Text>
                            </View>
                        </View>
                             <View>
                             
                            <Text style={styles.subtext}>
                               <Entypo  name="eye-with-line" size={18} color="black" /> 
                                A desativação da tua conta é temporária</Text>
                            </View>
                            <View> 
                            <Text style ={{fontWeight:'bold',textAlign:'center',fontSize:18, top:-25,right:-10}}>
                                A eliminação da sua conta
                                </Text>
                                <Text style ={{fontWeight:'bold',textAlign:'center',fontSize:18,top:-20,right:-5}}>é permanente
                                <MaterialCommunityIcons name="message-alert-outline" size={25} color="black"  />
                                </Text>
                                </View>
                            <View>
                            <Text style={{justifyContent:'center',textAlign:'center',paddingBottom:50,paddingTop:8,left:5}}>
                                Os seus dados serão excluídos</Text>
                                <Text style={{justifyContent:'center',textAlign:'center',left:5,top:-40}}>permanentemente</Text>
                            </View>
                      
                        <Pressable style ={styles.button}>
                            <TouchableOpacity style = {styles.back}>
                                <Text style = {styles.textin}  onPress ={() => navigation.navigate('MessageDesativar')}> Desativar conta  </Text>
                            </TouchableOpacity>
                        </Pressable>
                        <View>
                            <Pressable>
                                <TouchableOpacity  onPress={showAlert}>
                                    <Text style={{justifyContent:'center',textAlign:'center', color: 'red'}}>
                                    Eliminar conta</Text>
                                </TouchableOpacity>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
                {isLoading &&(
              <View style={{position:'absolute',alignSelf:'center',top:420}}>
                <ActivityIndicator size="large" color="#000" />
                <Text style={{}}>Carregando...</Text>
              </View>
            )}
            </View>
  );
}