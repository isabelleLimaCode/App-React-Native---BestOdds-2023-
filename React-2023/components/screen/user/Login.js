import React, { useEffect, useState,useContext} from "react";
import { Text, View,ScrollView,TouchableOpacity ,Pressable,TextInput,Image,Alert,Modal,KeyboardAvoidingView,Dimensions,ActivityIndicator} from 'react-native';
import { Fontisto } from '@expo/vector-icons'; 
import styles from '../../../styles/StylesLogin'
import changeStyle from '../../../styles/Styles'


//signinwithpopup -> para abrir a janela de autenticação do google
import {GoogleAuthProvider,signInWithPopup,signInWithEmailAndPassword, getAuth,onAuthStateChanged} from 'firebase/auth';
import {db,auth} from './../Services/firebaseconfig'
import { doc, getDoc,collection, query, where, getDocs } from 'firebase/firestore';







export default function Login({navigation,route}) {

 

    function handleGoogleSing ()  {
        const google  = new GoogleAuthProvider();
        signInWithPopup(auth,google)
        .then((result)=> {
            console.log(result);
        })
        .catch((error)=> {
            console.log(error);
        });
    }

    const [pass, setpass] = useState(true);
    const [teste,setteste] = useState('');
    const [username, setusername] = useState();
    const [passwuser,setpassuser] =useState();
    const [signin, setsignin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  
    //para o reset pass
    const[resetpass, setresetpass] = useState(route.params?.resetpass);
   
    if (signin == true && (username !='admin@admin.com' || passwuser != '123456789')){
        navigation.navigate('Home');
       
    }else if((username =='admin@admin.com' || passwuser == '123456789') && signin == true){
        navigation.navigate('admin');
    }


    const handlechangedatausername =(text) =>{
        setusername(text);
    }
     const handlechangedatapass =(text) =>{
        setpassuser(text);
    }
    const deviceWidth = Dimensions.get("window").width;
       
 /*
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            console.log('Firebase carregado. Usuário autenticado:', user);
            setsignin(true);
          } else {
            console.log('Firebase carregado. Nenhum usuário autenticado.');
            setsignin(false);
          }
        });
      
        
        return () => unsubscribe();
      }, []);*/
   
    
    const checkdoc = async () =>{

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              console.log('Firebase carregado. Usuário autenticado:', user);
              setsignin(true);
            } else {
              console.log('Firebase carregado. Nenhum usuário autenticado.');
              setsignin(false);
            }
          });

        if(username !='admin@admin.com' || passwuser != '123456789' )
        {
            setIsLoading(true);
            try {

           
                console.log(username);
                const auth = getAuth();
                const userCred = await signInWithEmailAndPassword(auth, username, passwuser);
                await new Promise((resolve) => {
                    setTimeout(resolve, 2000); 
                  });
                  await auth.currentUser.reload();
                  const userRef = doc(db, 'users', auth.currentUser.uid);
                  const userSnap = await getDoc(userRef);

                  if (userSnap.exists()) {
                    const nomeUsuario = userSnap.data().nome;
                    console.log('Nome do usuário:', nomeUsuario);
                    setIsLoading(false);
                   
                  } else {
                    console.log('Documento do usuário não encontrado no Firestore.');
                  }
                  
              } catch (error) {
    
                switch (error.code) {

                    case 'auth/email-already-in-use':
                        setIsLoading(false);
                        console.log('Erro email já cadastrado no sistema:', error);
                        Alert.alert('Erro', 'O email já está cadastrado.');
                        break;
                    case 'auth/wrong-password':
                        setIsLoading(false);
                        console.log('Erro senha não é suficientemente forte:', error);
                        Alert.alert('Erro', 'Senha ou email incorretos !');
                        break;
                    case 'auth/invalid-email':
                        setIsLoading(false);
                        console.log('Erro email não valido:', error);
                        Alert.alert('Erro', 'Email invalido !');
                        break;
                    case 'auth/internal-error':
                        setIsLoading(false);
                            console.log('Erro email não valido:', error);
                            Alert.alert('Erro', 'Senha ou Email não existe!');
                    break;
                    case 'auth/too-many-requests':
                        setIsLoading(false);
                        console.log('Erro execesso de tentativas:', error);
                        Alert.alert('Muitas tentativas', 'Esta conta sera Temporariamente desativada por varias tentaivas!');
                        break;
                    default:
                        setIsLoading(false);
                        const errorMessage = error.message;
                        Alert.alert('Erro', errorMessage);
                        console.log('Erro desconhecido:', error);
                        break;
                }
              }
        }else{
            setIsLoading(true);
            const auth = getAuth();
            const userCred = await signInWithEmailAndPassword(auth, username, passwuser);
            await new Promise((resolve) => {
                setTimeout(resolve, 2000); 
              });
                setIsLoading(false);
        }
       
        };

       
    



    const [modalVisible, setModalVisible, ] = useState(false); 
    const [modalPass, setModalPass, ] = useState(false); //alterado modalPass nova constante s

    const StatePress = async () => {
        setModalVisible(!modalVisible);
        const auth = getAuth();
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', username));
        const querySnapshot = await getDocs(q);
        console.log('querySnapshot', querySnapshot);
      
        if (querySnapshot.docs.length > 0) {
          navigation.navigate('ResetPass', { resetpass: username });
        } else {
          Alert.alert('Erro', 'Email inválido. Verifique suas credenciais.');
        }
      };
      
      
  return (
    
    <View style={{backgroundColor:'#FFF', height: '100%'}} behavior={Platform.OS == "ios" ? "padding" : "height"} >
      <View>
                <ScrollView>
           
                    <View style ={{alignItems: 'center'}}>
                        {/* Forms cadastro */}
                       
                       <View/>
                       <View>
                       <Text style= {styles.header}>Login</Text>
                        <Text style= {styles.header2}>
                        Bem-vindo novamente! 
                        <Text>Entre com as suas credenciais de acesso à sua conta.</Text></Text>
                        
                       </View>
                                
                            
                            <View>                    
                                <Text>    E-mail: </Text>
                                    <TextInput  style={styles.input}  placeholder="Exemplo@gmail.com"  onChangeText={handlechangedatausername}/> 


                                <KeyboardAvoidingView  behavior={Platform.OS == "ios" ? "padding" : "height"} 
                                        style = {styles.div}>
                                    <KeyboardAvoidingView
                                        style={styles.centeredView}
                                        >
                                        
                                            <Modal
                                                animationType="slide"
                                                transparent={true}
                                                deviceWidth={deviceWidth}
                                                visible={modalVisible}
                                                onRequestClose={() => {
                                                Alert.alert('Modal has been closed.');
                                                setModalVisible(!modalVisible);
                                                }}>
                                                <View style={styles.centeredView}>
                                                
                                                <View style={styles.modalView}>
                                                <Image style={{width:130,height:130,marginBottom:10,alignSelf:'center'}} source={require('./../../../assets/Ligas/forgot-password.png')}/> 
                                                    <Text style={{fontWeight:'bold',marginBottom:10,textAlign:'center'}}>Esqueceu Sua Password ? </Text>
                                                    <TextInput style={[styles.input,{backgroundColor:'black',color:'white'}]} placeholder="Digite seu Email" placeholderTextColor="#fff" onChangeText={handlechangedatausername}/> 
                                                    <Pressable
                                                    style={[styles.conteinerbtn,{backgroundColor:'#059669'}]}
                                                    onPress={StatePress}>
                                                    <Text style={{color:'white'}}>Enviar Redefinição</Text>
                                                    </Pressable>
                                                    <Pressable
                                                    style={[styles.conteinerbtn,{backgroundColor:'#059669',marginTop:5}]}
                                                    onPress={() => setModalVisible(!modalVisible)}>
                                                    <Text style={{color:'white', width:120,textAlign:'center'}}>Cancelar</Text>
                                                    </Pressable>
                                                </View>
                                                </View>
                                            </Modal>
                                            {/*Segundo alert criado com a nova constante */}
                                            <Modal
                                                animationType="slide"
                                                transparent={true}
                                                visible={modalPass}
                                                onRequestClose={() => {
                                                Alert.alert('Modal has been closed.');
                                                setModalPass(!modalPass);
                                                }}>
                                                <View style={styles.centeredView}>
                                                <View style={styles.modalView}>
                                                    <Text style={{fontWeight: "bold"}}>
                                                    Pedido de Redefinição de password</Text>
                                                    <Text/>
                                                    <Text style={{justifycontent: "center", alignItems: "center"}}>
                                                        Verifique o email cadastrado
                                                        no nome do usuário!</Text>
                                                    <Pressable
                                                    style={styles.conteinerbtn}
                                                    onPress={() => setModalPass(!modalPass)}>
                                                    <Text style={{color:'white'}}>Sair</Text>
                                                    </Pressable>
                                                </View>
                                                </View>
                                            </Modal> 
                                    </KeyboardAvoidingView>
                                </KeyboardAvoidingView>
                                <View style={{
                                    justifyContent:'space-between',
                                    flexDirection: 'row',}}>
                                        <View style ={{left:'50%'}}>
                                        <Text>Password:</Text>
                                    </View>
                                    <View>
                                    
                                    <Pressable
                                                style={{right:'10%'}}
                                                onPress={() => setModalVisible(true)}>
                                                <Text style ={{color:'#059669'}}>Esqueceu sua Password</Text>
                                    </Pressable>

                                    </View>
                               
                                </View>                                                
                                    <TextInput 
                                        type='text'
                                        secureTextEntry={true}  
                                        keyboardType={'default'} 
                                        style={[styles.input, pass === false ? styles.inputIncorrect : null]} 
                                        placeholder="Introduza sua Password"
                                        onChangeText ={handlechangedatapass}
                                    /> 
 

                                    {!pass &&(
                                         <Text style = {changeStyle.wrong}> Por favor insira a senha correta </Text> 
                                    )}
                                            
                                </View>
                            
                                    <TouchableOpacity style ={styles.conteinerbtn} onPress ={checkdoc}>
                                        <Text style = {styles.titlebtn}>Enter</Text>
                                    </TouchableOpacity>

                                    <View style={styles.container5}>
                                        <View style={styles.line}></View>
                                        <Text style={styles.acesse}> Ou acesse com </Text>
                                    </View>

                                    <TouchableOpacity style ={[styles.conteinerbtn,{height:56,top:48}]} onPress={handleGoogleSing} >
                                    <Fontisto style ={{alignSelf:'flex-start', paddingLeft:25,top:18}} name="google" size={24} color="black" />
                                        <Text style = {[styles.titlebtn,{top:-7,left:6}]}>Sing in with Google</Text>
                                    </TouchableOpacity>
                                    
                                  
                                    
                                    
                                    
                                    <View style = {styles.div}>

                                        <View style = {{top :55,height:100}}>
                                            <Text>Não tem uma conta ? </Text>
                                        </View>

                                        <View>
                                            <TouchableOpacity onPress ={() => navigation.navigate('Criar conta')}>
                                                <View>
                                                <Text  style ={{color:'#059669',height:40,top:55}}>Crie aqui</Text> 
                                                </View> 
                                            </TouchableOpacity>
                                        </View>
                                    
                                    </View>
                                    

                                </View>
                            </ScrollView>
                        </View>
            {isLoading &&(
              <View style={{position:'absolute',alignSelf:'center',top:420}}>
                <ActivityIndicator size="large" color="#000" />
                <Text style={{}}>Carregando...</Text>
              </View>
            )}
                </View>
  );
}
