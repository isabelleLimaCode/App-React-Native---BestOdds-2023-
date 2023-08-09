import React, { useEffect, useState} from "react";
import { ScrollView, TouchableOpacity,TextInput, Alert,ActivityIndicator} from "react-native";
import {  Text, View } from 'react-native';
import { Ionicons, FontAwesome} from '@expo/vector-icons'; 
import styles from '../../../styles/StyleCreateUser.js'
import { query, collection, where, getDocs, updateDoc, doc ,getDoc} from 'firebase/firestore';
import {db} from './../Services/firebaseconfig'
import { CommonActions } from '@react-navigation/native';
import { updatePassword,signInWithEmailAndPassword,signOut,getAuth,reauthenticateWithCredential,EmailAuthProvider} from 'firebase/auth';
export default function PasswordReset ({navigation,route}) {

    const { resetpass } = route.params;
    const[password,setpassword]=useState('');
    const[confirmpass,setconfirmpass]=useState('');
    const[anteriorpass,setanteiropass]=useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [userid,setuserid] = useState();
    
    useEffect(()=>{
        console.log('emailreset',resetpass);
    },[])
  
    const updatePasswordAndReset = async () => {
      try {
        setIsLoading2(true);
        const auth = getAuth();
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', resetpass));
        const querySnapshot = await getDocs(q);
    
        if (!querySnapshot.empty && password === confirmpass) {
          const userDoc = querySnapshot.docs[0];
          const userId = userDoc.id;
    
          const userDocRef = doc(db, 'users', userId);
          const userSnapshot = await getDoc(userDocRef);
    
          try {
            if (userSnapshot.exists()) {
              const user = userSnapshot.data();
    
              console.log('user', user.email);
              console.log('passwordantiga', user.password);
    
    
              await signInWithEmailAndPassword(auth, user.email, user.password);
              await new Promise((resolve) => {
                setTimeout(resolve, 2000); 
              });
              await auth.currentUser.reload();
              await updatePassword(auth.currentUser, password);
    
              console.log('Senha atualizada com sucesso!');
              await signOut(auth);
              console.log('Logout realizado com sucesso!');
            } else {
              console.log('Usuário não encontrado');
            }
          } catch (error) {
            console.log('Erro ao atualizar a senha:', error);
          }
    
    
          // Atualizar a senha no Firestore
          await updateDoc(userDocRef, {
            password: password,
          });
        }
    
        console.log('Password Atualizada com Sucesso!');
        Alert.alert(
          'Sucesso',
          'Password Atualizada com Sucesso!',
          [
            {
              text: 'OK',
              onPress: async() => {
                setIsLoading2(false);
                setIsLoading(true);
                await new Promise((resolve) => {
                  setTimeout(resolve, 5000); 
                });
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'MainScreen' }],
                  })
                );
              },
            },
          ],
          { cancelable: false }
        );
      } catch (error) {
        console.log('Erro ao atualizar o campo:', error);
      }
    };
    
    
    
   
    
        return (
            <View behavior={Platform.OS == "ios" ? "padding" : "height"} >
                <ScrollView>
                    <View style ={styles.quadrado}>
                        <TouchableOpacity style = {styles.back}>
                           <Ionicons name="md-arrow-back" size={30} color={'#000'}></Ionicons>
                        </TouchableOpacity>
                    </View>
                    <View style ={{alignItems: 'center'}}>
                        <FontAwesome name="user-circle-o" size={140} color="#000" style={styles.user} />
                                              
                       <View style={{
                                    alignItems: 'stretch',
                                    flexDirection: 'row'          
                        }}>  
                       </View>
           
                            <View>     
                                <Text>    Nova Password: </Text>
                                    <TextInput secureTextEntry={true} keyboardType={'default'} style={styles.input}  placeholder="Minimo 8 caracteres" onChangeText={value=>setpassword(value)}/> 
                                <Text>    Confirme sua nova Password: </Text>
                                    <TextInput secureTextEntry={true} keyboardType={'default'} style={styles.input}  placeholder="Confirme sua Password"onChangeText={value=>setconfirmpass(value)}/> 
                            </View>
                      
                       
                            <TouchableOpacity style = {styles.button}  onPress={updatePasswordAndReset}>
                                <Text style = {styles.textin} > Redefinir Password </Text>
                            </TouchableOpacity>
                        </View>
                </ScrollView>
                {isLoading &&(
              <View style={{position:'absolute',alignSelf:'center',top:420}}>
                <ActivityIndicator size="large" color="#000" />
               
                    <Text>Redirecionado para Home...</Text>
                
              </View>
            )}

          {isLoading2 &&(
              <View style={{position:'absolute',alignSelf:'center',top:420}}>
                <ActivityIndicator size="large" color="#000" />
               
                <Text> Alterando Password ...</Text>
                
              </View>
            )}


            </View>
        )
 }
