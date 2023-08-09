import React, { useEffect, useState} from "react";
import { Text, View, Image, TouchableOpacity,ScrollView,KeyboardAvoidingView,Modal,Pressable,Alert} from 'react-native';
import { Ionicons,Entypo} from '@expo/vector-icons';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {storage} from './../Services/firebaseconfig'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import styles from '../../../styles/StylesEditUser.js'
import Styles2 from "../../../styles/StyleModel.js";
import {db,FotoUp,Get} from './../Services/firebaseconfig'
import { doc, getDoc ,getDocs,setDoc,deleteDoc} from "firebase/firestore";
import { TextInput } from "react-native-gesture-handler";
import { getAuth,updateEmail,updatePassword,updateProfile} from 'firebase/auth';
import { getFormatedDate } from 'react-native-modern-datepicker';
import moment from 'moment';
import DatePicker from 'react-native-modern-datepicker';
import dayjs from 'dayjs';

// header
const ModelPerfilUser = ({ navigation }) => {
  
  const [Visibile, setVisibile] = useState(false);
  const [Modal2visibile,Setmodal2visibile] = useState(false);
  const [selecImage, setselectImage] = useState(null);

  //insert
  const[name,setName]=useState('');
  const[email,setemail]=useState('');
  const[password,setpassword]=useState('');
  const[confirmpass,setconfirmpass]=useState('');
  const[sobrenome,setSobrenome]= useState('');
  const[progress,setprogress] = useState(0);


  //data
  const [selectedDate,setSelectStartDate] = useState();
  const [OpenDate, setOpenDate] = useState(false);
  const [StartdDate,setStartDate] = useState('1990/5/14');
  const [maiorque18,SetMaiorque18] =useState(' ');






    const auth = getAuth();
  const getusuario = async () => {
    try {
      
      const user = auth.currentUser;
      if (user) {
     
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        const photoUrl = auth.currentUser.photoURL;
        setselectImage(photoUrl);
  
        if (userSnap.exists()) {
          const nomeUsuario = userSnap.data().nome;
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
    





    const hoje = new Date();
    const StartDate = getFormatedDate(hoje.setDate(hoje.getDate()+1), 'YYYY/MM/DD');  

    const handleImagechange = async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== 'granted') {
        console.log('Permissão de câmera negada');
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });
      setselectImage(result.uri);
      
    
      Setmodal2visibile(!Modal2visibile);
    };
    
  const showAlert = () =>
  Alert.alert(
    'Atualizar Conta',
    'Tem certeza que deseja atualizar os teus dados no aplicativo?',
    [
      {
        text: 'Sim',
        onPress: () => {
          updateuser();
          Alert.alert('Dados modificados com sucesso!');
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
  const opencamera = async () =>{

    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      console.log('Permissão de câmera negada');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setselectImage(result.assets[0].uri);
    }
   
    
  }

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
              setName(userData.nome);
              setSobrenome(userData.sobrenome);
              setSelectStartDate(userData.data);
              setemail(userData.email);
              setpassword(userData.password);
              setconfirmpass(userData.password);
              setselectImage(userData.uriphoto);
              
    
              console.log('Dados do documento:', userData.nome);
              console.log('Dados do documento:', userData.email);
              console.log('Dados do documento:', userData.password);
              console.log('photo url',userData.uriphoto);
              await updateProfile(auth.currentUser, { photoURL: selecImage });
            } else {
              console.log('Documento do usuário não encontrado.');
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

     const handleChangeDate = (propdate) => {
        setSelectStartDate(propdate);
     }
    
    
      const updateuser = async () =>{

        try {
          const auth = getAuth();
          if (auth.currentUser) {
            const userId = auth.currentUser.uid;
             //await FotoUp(selecImage, `${userCred.user.uid}/perfil_.jpeg`);
             // let get = await Get(`${userCred.user.uid}/perfil_.jpeg`);
            await setDoc(doc(db, 'users', userId),{
              nome: name,
              sobrenome:sobrenome,
              email: email,
              password: password,
              data:selectedDate,
              uriphoto: 'https://firebasestorage.googleapis.com/v0/b/bestodds-ebcd1.appspot.com/o/logo_fot.jpg?alt=media&token=7ace276b-18c0-4c05-b3ac-b2540bb427e9&_gl=1*15nsqve*_ga*MTc1NDIxMjUzOS4xNjgzNTY5NzU4*_ga_CW55HF8NVT*MTY4NjQzODQ4NC4xMDUuMS4xNjg2NDQxMDM1LjAuMC4w',
            });
            await updateEmail(auth.currentUser,email);
            await updatePassword(auth.currentUser,password);
            console.log('Dados do usuário atualizados com sucesso!');
          } else {
            console.log('Nenhum usuário logado.');
          }
        } catch (error) {
          console.log('Erro ao atualizar os dados do usuário:', error);
        }
      }

     

    const handleOnPressDate =() =>{
        setOpenDate(!OpenDate);
        const idade = moment().subtract(18, 'years').format('YYYY');
        const idadeselect = dayjs(selectedDate).year();
    
        if (idadeselect < idade) {
            SetMaiorque18(!maiorque18);
            console.log(maiorque18);
          } else {
            console.log(maiorque18);
          }
        
         
        
    }
        

  return (
      <KeyboardAvoidingView style={{flex:1,backgroundColor:'white',paddingHorizontal:22}} behavior={Platform.OS == "ios" ? "padding" : "height"} keyboardVerticalOffset={120}>

       

          <TouchableOpacity style={{position:'absolute',left:10,top:5}} onPress={() => navigation.goBack()}>
          <Entypo name="chevron-thin-left" size={20} color="black" />
          </TouchableOpacity>



        <View style={{ marginHorizontal:12,flexDirection:'row',justifyContent:'center'}}>
            <Text style={{fontWeight:'bold', fontSize:18}}> Edit Perfil </Text>
        </View>
        <ScrollView>
              <View style={{alignItems:'center',marginVertical:22}}>
              <TouchableOpacity onPress={()=> Setmodal2visibile(!Modal2visibile)}>
                <Image source={{uri:selecImage}} style={{height:150,width:150,borderRadius:85,borderColor:'blue'}}/>
              </TouchableOpacity>

              <View style={{position:'absolute',bottom:0,right:98,zIndex:9999}}>
                <Ionicons name="camera-reverse-sharp" size={24} color="#059669" />
              </View>
          </View>

          <View>
              <View style ={{flexDirection:'column', marginBottom:6}}>
                 
                 <Text style={{fontWeight:'bold', fontSize:14}}>Nome:</Text>
                  <View style={{height:44,width:'100%',borderColor:'#059669',borderWidth:1,borderRadius:4,marginVertical:6,justifyContent:'center',paddingLeft:8}}>
                    <TextInput 
                    value={name}
                    onChangeText={value=>setName(value)}
                    editable={true}
                    />

                  </View>
              </View>
            <View>
              <Text style={{fontWeight:'bold', fontSize:14}}>Sobrenome:</Text>
                  <View style={{height:44,width:'100%',borderColor:'#059669',borderWidth:1,borderRadius:4,marginVertical:6,justifyContent:'center',paddingLeft:8}}>
                    <TextInput 
                    value={sobrenome}
                    onChangeText={value=>setSobrenome(value)}
                    editable={true}
                    />

                  </View>
              </View>

              <View style ={{flexDirection:'column', marginBottom:6}}>
                 
                 <Text style={{fontWeight:'bold', fontSize:14}}>Email:</Text>
                  <View style={{height:44,width:'100%',borderColor:'#059669',borderWidth:1,borderRadius:4,marginVertical:6,justifyContent:'center',paddingLeft:8}}>
                    <TextInput 
                    value={email}
                    onChangeText={value=>setemail(value)}
                    editable={true}
                    />

                  </View>
              </View>
               <TouchableOpacity  style={{height:44,width:'100%',borderColor:'#059669#059669',borderWidth:1,borderRadius:4,marginVertical:6,justifyContent:'center',paddingLeft:8}} onPress={handleOnPressDate}>
                                    <Text>{selectedDate}</Text>
                                </TouchableOpacity>
                                {/* modal pickdate*/}
                                <Modal
                                    animationType='slide'
                                    transparent={true}
                                    visible={OpenDate}
                                >
                                    <View style ={{flex:1,alignContent:'center',justifyContent:'center',left:-10}}>
                                        <View style ={{margin:20,
                                                       backgroundColor:'#080516',
                                                       alignItems:'center',
                                                       justifyContent:'center',
                                                       borderRadius:20,
                                                       padding:20,
                                                       width:'95%',
                                                       shadowColor:'#000',
                                                       shadowOffset:{
                                                        width:0,height:2
                                                        },
                                                        shadowOpacity:0.25,
                                                        shadowRadius:4,
                                                        elevation:5
                                                        }}>
                                        <DatePicker
                                            mode='calendar'
                                            selected={selectedDate}
                                            date={moment().format('DD')}
                                            current={selectedDate}
                                            maximumDate={moment().format('YYYY/MM/DD')}
                                            selectorStartingYear={StartDate}
                                            onDateChange={handleChangeDate}
                                            onSelectedChange={Date => setSelectStartDate(Date)}
                                            options={{
                                                    backgroundColor : '#080516',
                                                    textHeaderColor:'#059669',
                                                    textDefaultColor:'#ffffff',
                                                    selectedTextColor:'#fff',
                                                    mainColor:'#059669',
                                                    textSecondaryColor:'#ffffff',
                                                    borderColor:'rgba(122,146,165,0.1)'     
                                            }}    
                                        />
                                        <TouchableOpacity
                                            onPress={handleOnPressDate}
                                        >
                                            <Text style ={{color:'white'}}>Submeter </Text>
                                        </TouchableOpacity>

                                        </View>
                                    </View>
                                </Modal>

              <View style ={{flexDirection:'column', marginBottom:6}}>
                 
                 <Text style={{fontWeight:'bold', fontSize:14}}>Password:</Text>
                  <View style={{height:44,width:'100%',borderColor:'#059669',borderWidth:1,borderRadius:4,marginVertical:6,justifyContent:'center',paddingLeft:8}}>
                    <TextInput 
                    value={password}
                    onChangeText={value=>setpassword(value)}
                    editable={true}
                    secureTextEntry
                    />

                  </View>
              </View>

              <View style ={{flexDirection:'column', marginBottom:6}}>
                 
                 <Text style={{fontWeight:'bold', fontSize:14}}>Confirme Password:</Text>
                  <View style={{height:44,width:'100%',borderColor:'#059669#059669',borderWidth:1,borderRadius:4,marginVertical:6,justifyContent:'center',paddingLeft:8}}>
                    <TextInput 
                    value={confirmpass}
                    onChangeText={value=>setconfirmpass(value)}
                    editable={true}
                    secureTextEntry
                    />

                  </View>
              </View>

              
          </View>

          <TouchableOpacity style={{backgroundColor:'#059669',height:44,borderRadius:6,alignItems:'center',justifyContent:'center'}} onPress={showAlert}>
          <Text>Salvar alterações</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:'#059669',height:44,borderRadius:6,alignItems:'center',justifyContent:'center', top:5}}onPress ={() => navigation.navigate('deletconta')}>
          <Text>Eliminar Conta</Text>
        </TouchableOpacity>
        </ScrollView>

           {/* Model alterar conta de perfil */}
       <View>
                                <View style = {Styles2.div}>
                                        <View style={Styles2.centeredView}>
                                                <Modal
                                                        animationType="slide"
                                                        transparent={true}
                                                        visible={Modal2visibile}
                                                        onRequestClose={() => {
                                                        Alert.alert('Modal has been closed.');
                                                        Setmodal2visibile(!Modal2visibile);
                                                    }}>
                                                    <View style={Styles2.centeredView}>
                                                            <View style={Styles2.modalView}>
                                                                <Pressable
                                                                        style={[Styles2.conteinerbtn]} onPress={()=> Setmodal2visibile(!Modal2visibile)}>
                                                                    <Text style={{color:'black'}}>Remover foto Atual</Text>
                                                                </Pressable>
                                                                <Pressable
                                                                        style={[Styles2.conteinerbtn,{marginTop:10}]} onPress={opencamera}>
                                                                    <Text style={{color:'black'}}>Tirar uma foto</Text>
                                                                </Pressable>
                                                                <Pressable
                                                                        style={[Styles2.conteinerbtn,{marginTop:10}]} onPress={handleImagechange}>
                                                                    <Text style={{color:'black'}}>Escolher na Bliblioteca</Text>
                                                                </Pressable>
                                                                <Pressable
                                                                        style={[Styles2.conteinerbtn,{marginTop:10}]} onPress={()=>Setmodal2visibile(!Modal2visibile)}>
                                                                    <Text style={{color:'black'}}> Cancelar </Text>
                                                                </Pressable>
                                                                
                                                            </View>
                                                    </View>
                                                </Modal>
                                            </View>
                                        </View>
                                </View>
                         {/*fim  Model alterar conta de perfil */}
      

      
      </KeyboardAvoidingView>
  );
};

export default ModelPerfilUser;
