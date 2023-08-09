import React, { useEffect, useState } from 'react';
import { ScrollView,TouchableOpacity,Alert,TextInput, Pressable, KeyboardAvoidingView, Platform, Modal,Image,ActivityIndicator} from "react-native";
import { Ionicons, FontAwesome} from '@expo/vector-icons';
import { Text, View } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import { getFormatedDate } from 'react-native-modern-datepicker';
import styles from '../../../styles/StyleCreateUser.js';
import Styles2 from "../../../styles/StyleModel.js";
import  { doc , setDoc} from 'firebase/firestore'
import {getAuth, createUserWithEmailAndPassword, sendEmailVerification,fetchSignInMethodsForEmail,updateProfile}from "firebase/auth";
import {db,app,storage,FotoUp,Get} from './../Services/firebaseconfig'
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { CommonActions } from '@react-navigation/native';
import moment from 'moment';
import dayjs from 'dayjs';



/*npm install react-datepicker --save -> para usar data pick instalar o comando  */

export default function CreateUser({navigation}){

    const [date, setDate] = useState(moment().format());
    const [Modal2visibile,Setmodal2visibile] = useState(false);
    const [OpenDate, setOpenDate] = useState(false);
    const [selectedDate,setSelectStartDate] = useState();
    const [StartdDate,setStartDate] = useState('1990/5/14');

    //dados da coleção user
    const [nome,setnome] = useState(); 
    const [sobrenome,setsobrenome] = useState();
    const [username, setusername] = useState();
    const [datadenascimento, setdatadenascimento] = useState();
    const [email,setemail] = useState();
    const [passwuser,setpassuser] =useState();
    const [passwuserconf,setpassuserconf] =useState();
    const [maiorque18,SetMaiorque18] =useState(' ');

    //imagem 
    const [image, setImage] = useState();
    const[progress,setprogress] = useState(0);
    const [selecImage, setselectImage] = useState(true);
    const[getimagurl,SetGetimagurl] = useState();
    const [isLoading, setIsLoading] = useState(false);

  
    const pickImage = async () => {
        setImage(false);
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      
        console.log(result);
      
        if (!result.canceled) {
            setselectImage(result.assets[0].uri);
            console.log(selecImage);
          }
      
        Setmodal2visibile(!Modal2visibile);
        setImage(false);
      };
      
    useEffect(()=>{
        console.log('url',getimagurl)
    },[getimagurl])

    //criar um novo doc
    const newdoc = async () => {
        try {
            
            const auth = getAuth(app);
            // Acessar para verificar se o username existe para ser único
            const userCred = await createUserWithEmailAndPassword(auth, email, passwuser);
          
            if (userCred) {
               // await FotoUp(selecImage, `${userCred.user.uid}/perfil_.jpeg`);
               // let get = await Get(`${userCred.user.uid}/perfil_.jpeg`);
                //SetGetimagurl(get);
                
                await setDoc(doc(db, 'users', userCred.user.uid), {
                  nome: nome,
                  sobrenome: sobrenome,
                  username: username,
                  data: selectedDate,
                  email: email,
                  password: passwuser,
                  uriphoto: 'https://firebasestorage.googleapis.com/v0/b/bestodds-ebcd1.appspot.com/o/logo_fot.jpg?alt=media&token=7ace276b-18c0-4c05-b3ac-b2540bb427e9&_gl=1*15nsqve*_ga*MTc1NDIxMjUzOS4xNjgzNTY5NzU4*_ga_CW55HF8NVT*MTY4NjQzODQ4NC4xMDUuMS4xNjg2NDQxMDM1LjAuMC4w',
                });
                
                Alert.alert('Cadastro', 'Conta Criada Com sucesso');
              }
           
            
        }catch (error) {
    
            switch (error.code) {
                case 'auth/email-already-in-use':
                    console.log('Erro email já cadastrado no sistema:', error);
                    Alert.alert('Erro', 'O email já está cadastrado.');
                    break;
                case 'auth/wrong-password':
                    console.log('Erro senha não é suficientemente forte:', error);
                    Alert.alert('Erro', 'Senha ou email incorretos !');
                    break;
                case 'auth/invalid-email':
                    console.log('Erro email não valido:', error);
                    Alert.alert('Erro', 'Email invalido !');
                    break;
                case 'auth/internal-error':
                        console.log('Erro email não valido:', error);
                        Alert.alert('Erro', 'Senha ou Email não existe!');
                break;
                default:
                    const errorMessage = error.message;
                    Alert.alert('Erro', errorMessage);
                    console.log('Erro desconhecido:', error);
                    break;
            }
          }
          
    };
    
    

    const handlechangedataname =(text) =>{
        setnome(text);
    }
    const handlechangedatapassconfi =(text)=>{
            setpassuserconf(text);
    }

    const handlechangedatasobrenome =(text) =>{
        setsobrenome(text);
    }
    const handlechangedatausername =(text) =>{
        setusername(text);
    }
    const handlechangedatdataa =(text) =>{
        setdatadenascimento(text);
    }
    const handlechangedataemail =(text) =>{
        setemail(text);
    }
    const handlechangedatapass =(text) =>{
        setpassuser(text);
    }

    const hoje = new Date();
    const StartDate = getFormatedDate(hoje.setDate(hoje.getDate()+1), 'YYYY/MM/DD');

    const handleSignUp = ({event})  => {
        Alert.alert(
          'Confirmação',
          'Deseja realmente criar a conta?',
          [
            {
                text: 'Criar Conta ',
                onPress: async () => {
                    setIsLoading(true);
                    newdoc();
                    await new Promise((resolve) => {
                      setTimeout(resolve, 5000); 
                    });
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'MainScreen' }],
                      })
                    );
                    handleClearAllInputs();
                },
              },
            {
              text: 'Criar Conta',
              text: 'Cancel',
             
            },
           
          ],
          { cancelable: false }
        );

      };

      const handleChangeDate = (propdate) => {
        setSelectStartDate(propdate);
       
        
       
          

    }
    const handleClearAllInputs = () => {
        setImage('');
        setnome('');
        setusername('');
        setdatadenascimento('');
        setemail('');
        setpassuser('');
        setpassuserconf('');
      };

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
    useEffect(() => {
        if (maiorque18 && !OpenDate) {
          Alert.alert('Idade ', 'Atenção é preciso ser maior que 18 anos!');
        }
      }, [maiorque18, OpenDate]);


        return(
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"} 
                keyboardVerticalOffset={120}
            >
                <ScrollView style ={{width:"98%"}}>
                    <View style ={styles.quadrado}>
                        <TouchableOpacity style = {styles.back} onPress={() => navigation.goBack()}>
                          <Ionicons name="md-arrow-back" size={30} color={'#000'}></Ionicons> 
                        </TouchableOpacity>
                    </View>
                   
                    <View style ={{alignItems: 'center',alignSelf:'center',marginTop:-20}}>
                    <Image  source={{uri:selecImage}} style={{ width: 150, height: 150 ,borderRadius:80,alignSelf:'center'}}/>
                        <Pressable>
                            <TouchableOpacity style = {styles.back} onPress={()=> Setmodal2visibile(!Modal2visibile)}>
                                <Text> Selecionar foto de perfil </Text>
                            </TouchableOpacity> 
                        </Pressable>
                       
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
                                                                        style={[Styles2.conteinerbtn,{marginTop:10}]} onPress={()=>Setmodal2visibile(!Modal2visibile)}>
                                                                    <Text style={{color:'black'}}>Tirar uma foto</Text>
                                                                </Pressable>
                                                                <Pressable
                                                                        style={[Styles2.conteinerbtn,{marginTop:10}]} onPress={pickImage}>
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
                       <View style={{
                                    alignItems: 'stretch',
                                    flexDirection: 'row',                                    
                        }}>
                            
                            <View>
                            <Text>Nome: </Text>
                                <TextInput style={styles.input2} placeholder="Digite seu nome" onChangeText={handlechangedataname}/> 
                            </View>
                        
                            <View>
                            <Text>Sobrenome: </Text>
                                <TextInput style={styles.input2} placeholder="Digite seu sobrenome" onChangeText={handlechangedatasobrenome}/> 
                            </View>   
                       </View>
           
                            <View> 
                                <Text>    Username: </Text>
                                    <TextInput style={styles.input}  placeholder="Exemplo: matrix_78" onChangeText={handlechangedatausername} />
                                <Text>    Data de Nascimento: </Text>

                                <TouchableOpacity style ={styles.input} onPress={handleOnPressDate}>
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
                                
                                <Text>    E-mail: </Text>
                                    <TextInput style={styles.input}  placeholder="Exemplo: nome@gmail.com" onChangeText={handlechangedataemail}/> 
                                <Text>    Password: </Text>
                                    <TextInput secureTextEntry={true} keyboardType={'default'} style={styles.input}  placeholder="Minimo 8 caracteres" onChangeText={handlechangedatapass}/> 
                                <Text>    Confirme sua Password: </Text>
                                    <TextInput secureTextEntry={true} keyboardType={'default'} style={styles.input}  placeholder="Confirme sua Password" onChangeText={handlechangedatapassconfi}/> 
                            </View>
                       
                                <Pressable style ={styles.button}>
                                <TouchableOpacity style = {styles.back}>
                                    <Text style = {styles.textin} onPress={handleSignUp}> Registar </Text>
                                </TouchableOpacity>
                            </Pressable>
                        
                    {isLoading &&(
                        <View style={{position:'absolute',alignSelf:'center',top:420}}>
                            <ActivityIndicator size="large" color="#000" />
                        
                                <Text> Criando a Sua Conta ...</Text>
                            
                        </View>
                         )}
                            
                        
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
}
