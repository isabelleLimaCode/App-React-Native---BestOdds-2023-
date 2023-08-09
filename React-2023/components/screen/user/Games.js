import React, { useState, useEffect } from 'react';
import { Text, View,TouchableOpacity,ScrollView,Image,FlatList} from 'react-native';
import { Octicons,Feather,MaterialCommunityIcons} from '@expo/vector-icons'; 
import styles from '../../../styles/StyleBestOdds';
import styles2 from '../../../styles/StyleBestOdds'
import styles4 from '../../../styles/StyleCard';
import {db,firebase,auth} from './../Services/firebaseconfig';
import  { doc , setDoc, collection, getDocs } from 'firebase/firestore';
import moment from 'moment';
import axios from 'axios';
const diasdasemana = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sabado'];
const date = new Date();

let dia = date.getUTCDay(); 
// a funcao sempre da o valor inteiro de 0 a 6

let atual = diasdasemana[dia];

// verificao e declaração dos numeros 
let segundo;
let terceiro;

if(dia >= 6){
    let dia = 0;
    segundo = diasdasemana[dia];
}else{
    segundo = diasdasemana[dia+1]; 
    // 6
}

if(dia == 5)
{
    let dia = 0;
    terceiro = diasdasemana[dia];
}else if(dia >= 6){
    let dia = 0;
    terceiro = diasdasemana[dia+1]
}else{
    terceiro = diasdasemana[dia+2]
}

export default function Games({navigation,route}) {
    const [SelectedButton, SetSelectedButton] = useState(3);
    const[collection2, SetCollection2] = useState([]);
    const[collection3, SetCollection3] = useState([]);
    const[collection4, SetCollection4] = useState([]);
    const[hojedata,sethojedata] = useState();
    const[amanhadata,setamanhadata] = useState();
    const[depoisdata,setdepoisdata] = useState();
    //games das ligas e casas de aposta
    const [Game1,setGame1] = useState(1);
    const [Game2,setGame2] = useState(0);
    const [Game3,setGame3] = useState(0);

    // passagem de parametro
    const[jogo1,setJogo1] = useState(route.params?.jogo1);
    const[jogo2,setJogo2] = useState(route.params?.jogo2);
    const[logo1,setlogo1] = useState(route.params?.logo1);
    const[logo2,setlogo2] = useState(route.params?.logo2);
    const[fixture,setfixure] = useState(route.params?.fixture);

    useEffect(()=>{
        console.log('jogo1',collection2);
        console.log('-------');
        console.log('jogo2',collection3);
        console.log('-------');
        console.log('jogo3',collection4);
    },[jogo1,jogo2,logo1,logo2])

    const btn3selecionado = () => {
        SetSelectedButton(3);
        setGame2(0);
        setGame3(0);
        setGame1(1);
      };
  

    const btn4selecionado = () => {
        SetSelectedButton(4);
        setGame1(0);
        setGame3(0);
        setGame2(1);
      };
    
      const btn5selecionado = () => {
        SetSelectedButton(5);
        setGame1(0);
        setGame2(0);
        setGame3(1);
      };

      useEffect(()=>{
              
        // data de hoje
        const hoje = moment().format('YYYY-MM-DD');
        sethojedata(hoje);
        console.log('Hoje:', hoje);

        // data de amanhã
        const amanha = moment().add(1, 'days').format('YYYY-MM-DD');
        setamanhadata(amanha);
        console.log('Amanhã:', amanha);

        // data depois de amanhã
        const depoisDeAmanha = moment().add(2, 'days').format('YYYY-MM-DD');
        setdepoisdata(depoisDeAmanha);
        console.log('Depois de amanhã:', depoisDeAmanha);
      },[])
    
      useEffect(() => {
        if (hojedata) {
          const fetchData = async () => {
            try {
              const gamesRef = collection(db, hojedata);
              //const gamesRef = collection(db, '2023-06-10');
              const querySnapshot = await getDocs(gamesRef);
              const jogo = [];
              querySnapshot.forEach((doc) => {
                jogo.push(doc.data());
              });
              SetCollection2(jogo);
             
            } catch (error) {
              console.log('Erro ao puxar jogos:', error);
            }
          };
          fetchData();
        }
      }, [hojedata]);
      
      useEffect(() => {
        if (amanhadata) {
          const fetchData2 = async () => {
            try {
              const gamesRef = collection(db, amanhadata);
              //const gamesRef = collection(db, '2023-06-11');
              const querySnapshot = await getDocs(gamesRef);
              const jogo = [];
              querySnapshot.forEach((doc) => {
                jogo.push(doc.data());
              });
              SetCollection3(jogo);
             
            } catch (error) {
              console.log('Erro ao puxar jogos:', error);
            }
          };
          fetchData2();
        }
      }, [amanhadata]);
      
      useEffect(() => {
        if (depoisdata) {
          const fetchData3 = async () => {
            try {
              const gamesRef = collection(db, depoisdata);
              //const gamesRef = collection(db, '2023-06-12');
              const querySnapshot = await getDocs(gamesRef);
              const jogo = [];
              querySnapshot.forEach((doc) => {
                jogo.push(doc.data());
              });
              SetCollection4(jogo);
            } catch (error) {
              console.log('Erro ao puxar jogos:', error);
            }
          };
          fetchData3();
        }
      }, [depoisdata]);

  
 
      
      const renderItem = ({ item }) => {         
        return (
          <TouchableOpacity onPress={() => navigation.navigate('JogosDaAposta', { jogo1: item.homeTeam, jogo2: item.awayTeam, logo1: item.awayLogo, logo2: item.homeLogo ,fixture:item.idFixture})}>
                <View style = {[styles4.cardConteiner,{height:120}]}>

            <TouchableOpacity>
            <Image style= {[styles4.imagStyles,{top:25,marginHorizontal:40,height:60,width:60}]} source={{uri:item.awayLogo}}/>
            <Image style= {[styles4.imagStyles2,{top:25,marginHorizontal:40,height:60,width:60}]} source={{uri:item.homeLogo}}/>
            </TouchableOpacity>

            <View style = {{
                justifyContent:'space-around',
                flexDirection: 'row',
                marginTop:40,
                marginHorizontal:50,
                marginBottom:15,
                }}>
                <View style={styles4.text}>
                    <Text style={[styles.textinfo,{top:45}]}>{item.homeTeam.substring(0, 10)} </Text>
                </View>

                <View style={[styles4.text,{top:20,marginHorizontal:50}]}>
                    <Feather name="x" size={20} color="black"/>
                </View>

                <View style={styles4.text}>
                    <Text style={[styles.textinfo,{top:45}]}>{item.awayTeam.substring(0, 10)}</Text>
                </View>

                
            </View>              
            </View>
          </TouchableOpacity>
          
        );
      };

  return (
    <View style ={[styles.conteiner,{paddingTop:5}]} behavior={Platform.OS == "ios" ? "padding" : "height"} >
         <View style ={styles.jogos}>         
                      <Text style={[styles2.buttonText,{color:'#000',alignItems:'center',left:40}]}>Jogos</Text>    
                      <MaterialCommunityIcons name="soccer-field" size={30} color="#059669" style ={{top:5,left:-20}} />                                                             
            </View>
        <View style = {{
                    justifyContent:'space-evenly',
                    flexDirection: 'row',
                    alignItems: 'center'
                    }}>
        <View style ={styles.btnContainerBest}>      
                <TouchableOpacity
                style={[styles.btnBest, SelectedButton === 3 ? styles.selectedBtnBetst : null]}
                onPress={btn3selecionado}>
                    <Text style={[styles.buttonText, SelectedButton === 3 ? styles.selectedBtnbuttonText : null]}>{atual}</Text>
                </TouchableOpacity>  
            
            
                <TouchableOpacity
                style={[styles.btnBest, SelectedButton === 4 ? styles.selectedBtnBetst : null]}
                onPress={btn4selecionado}>
                    <Text style={[styles.buttonText, SelectedButton === 4 ? styles.selectedBtnbuttonText : null]}>{segundo}</Text>
                </TouchableOpacity> 

                <TouchableOpacity
                style={[styles.btnBest, SelectedButton === 5 ? styles.selectedBtnBetst : null]}
                onPress={btn5selecionado}>
                    <Text style={[styles.buttonText, SelectedButton === 5 ? styles.selectedBtnbuttonText : null]}>{terceiro}</Text>
                </TouchableOpacity>                                                                             
        </View>
    </View>  
    

    {/* seleciona os jogos das casas de aposta dependendo do dia*/} 
    {Game1 == 1 ?(
              <View style={{flex:1}}>
              <FlatList
                data={collection2}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
              />
  
              </View>
            
    ):null}
    {Game2 == 1 ?(
       
       <View style={{flex:1}}>
       <FlatList
         data={collection3}
         keyExtractor={(item) => item.id}
         renderItem={renderItem}
       />

       </View>

    ):null} 

    {Game3 == 1?(

        <View style={{flex:1}}>
        <FlatList
        data={collection4}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        />

        </View>
    ):null}

</View>
  );
}
