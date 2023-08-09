import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  SafeAreaView, Text, View,Image, TouchableOpacity,FlatList, Pressable,ScrollView } from 'react-native';
import { Octicons,Feather} from '@expo/vector-icons'; 
import { FontAwesome} from '@expo/vector-icons'; 
import styles from '../../../styles/StyleBestOdds.js'
import styles2 from '../../../styles/StylesCardLeagues'
import styles3 from '../../../styles/StyleLigaCardAdm';
import {db,firebase,auth} from './../Services/firebaseconfig';
import  { doc , setDoc, collection, getDocs } from 'firebase/firestore';
import moment from 'moment';

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
const teste = () => {
   console.log('enter');
    
  };

  export default function SelectLiga({navigation,route}) {

  const [fixture1, setLigas1] = useState(route.params?.fixture1);
  //dias 
  const[hojedata,sethojedata] = useState();
  const[amanhadata,setamanhadata] = useState();
  const[depoisdata,setdepoisdata] = useState();
  const[collection2, SetCollection2] = useState([]);
  const[collection3, SetCollection3] = useState([]);
  const[collection4, SetCollection4] = useState([]);

  // passagem de parametro
  const[jogo1,setJogo1] = useState(route.params?.jogo1);
  const[jogo2,setJogo2] = useState(route.params?.jogo2);
  const[logo1,setlogo1] = useState(route.params?.logo1);
  const[logo2,setlogo2] = useState(route.params?.logo2);

  //variavel partilhada
  const { ligas1 } = route.params;
  const { ligalogo } = route.params;
  const [jogo, setJogo] = useState([]);


  //games das ligas e casas de aposta
  const [Game1,setGame1] = useState(1);
  const [Game2,setGame2] = useState(0);
  const [Game3,setGame3] = useState(0);

  //não tem jogos
  const[Donthave,SetDonthave] = useState(false);
 

 

    // Estado botao de dias
  const [selectedButton, setSelectedButton] = useState(1);

  const btn1selecionado = () => {
    setSelectedButton(1);
    setGame2(0);
    setGame3(0);
    setGame1(1);
    if (collection2.length > 0) {
      SetDonthave(false);
    } else {
      SetDonthave(true);
    }
  };

  const btn2selecionado = () => {
    setSelectedButton(2);
    setGame1(0);
    setGame3(0);
    setGame2(1);
    if (collection3.length > 0) {
      SetDonthave(false);
    } else {
      SetDonthave(true);
    }
  };

  const btn3selecionado = () => {
    setSelectedButton(3);
    setGame1(0);
    setGame2(0);
    setGame3(1);
    if (collection4.length > 0) {
      SetDonthave(false);
    } else {
      SetDonthave(true);
    }
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
    if (hojedata && amanhadata && depoisdata) {
      const fetchData = async () => {
        try {
          const gamesRef = collection(db, hojedata);
          const gamesRef2 = collection(db, amanhadata);
          const gamesRef3 = collection(db, depoisdata);

          //const gamesRef = collection(db, '2023-06-10');
          //const gamesRef2 = collection(db, '2023-06-11');
          //const gamesRef3 = collection(db, '2023-06-12');
  
          const querySnapshot = await getDocs(gamesRef);
          const querySnapshot2 = await getDocs(gamesRef2);
          const querySnapshot3 = await getDocs(gamesRef3);
  
          const jogos = [];
          const jogos2 = [];
          const jogos3 = [];

          querySnapshot.forEach((doc) => {
            const jogoData = doc.data();
            const leagueName = jogoData.LeagueName;
  
            if (leagueName === ligas1) {
              jogos.push(jogoData);
              console.log('Jogo encontrado no primeiro dia:', jogoData);
            }
          });
  
          querySnapshot2.forEach((doc) => {
            const jogoData2 = doc.data();
            const leagueName = jogoData2.LeagueName;
  
            if (leagueName === ligas1) {
              jogos2.push(jogoData2);
              console.log('Jogo encontrado no segundo dia:', jogoData2);
            }
          });
  
          querySnapshot3.forEach((doc) => {
            const jogoData3 = doc.data();
            const leagueName = jogoData3.LeagueName;
  
            if (leagueName === ligas1) {
              jogos3.push(jogoData3);
              console.log('Jogo encontrado no terceiro dia:', jogoData3);
            }
          });
  
          SetCollection2(jogos);
          SetCollection3(jogos2);
          SetCollection4(jogos3);
          
        } catch (error) {
          console.log('Erro ao puxar jogos:', error);
        }
      };
  
      fetchData();
    }
  }, [hojedata, amanhadata, depoisdata]);

  useEffect(()=>{
    console.log('jogos:', collection2);
    console.log('dia2', collection3);
    console.log('dia3', collection4);
  },[collection2,collection3,collection4])

  useEffect(()=>{
    console.log('gamer1:', Game1);
    console.log('gamer2', Game2);
    console.log('gamer3', Game3);
  },[Game1,Game2,Game3])
  
  
  return (
   
    <View style={[styles.conteiner,{flex:1}]}>
        <Pressable style={{ right: -8 }}>
          <View>
            <FontAwesome name="angle-left" size={32} color="black" onPress={() => navigation.goBack()} />
          </View>
        </Pressable>
        
            {/* Liga selecionada com base no objeto jogo */}
            {/* Seleciona o primeiro elemento do objeto e pega as informações desejadas */}
            <View style={{backgroundColor:'silver', flexDirection:'row', justifyContent:'space-evenly', alignItems: 'center', margin: 10, borderRadius: 10}}>
                {/* Imagem liga */}
         
                    <Image style={{width:50, height:55, marginLeft: '-10%', margin:10}} source={{ uri: ligalogo }}/>
                
                {/* Nome Liga */}
                <View>
                    <Text>
                        {ligas1}
                    </Text>
                </View>                
            </View>         

        {/* Botao selecionar dias */}
        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.btnContainerBest}>
            <TouchableOpacity
              style={[styles.btnBest, selectedButton === 1 ? styles.selectedBtnBetst : null]}
              onPress={btn1selecionado}
            >
              <Text style={[styles.buttonText, selectedButton === 1 ? styles.selectedBtnbuttonText : null]}>{atual}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btnBest, selectedButton === 2 ? styles.selectedBtnBetst : null]}
              onPress={btn2selecionado}
            >
              <Text style={[styles.buttonText, selectedButton === 2 ? styles.selectedBtnbuttonText : null]}>{segundo}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btnBest, selectedButton === 3 ? styles.selectedBtnBetst : null]}
              onPress={btn3selecionado}
            >
              <Text style={[styles.buttonText, selectedButton === 3 ? styles.selectedBtnbuttonText : null]}>{terceiro}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* cards dos jogos de uma determinada liga */}
        
            {/* FlatList para listar estes jogos, e renderizar usando RenderItem */}
  {Game1 == 1 ?(

          <FlatList
            data={collection2}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('JogosDaAposta', { jogo1: item.homeTeam, jogo2: item.awayTeam, logo1: item.awayLogo, logo2: item.homeLogo })}>
                   <View style={[styles3.cardConteiner, { height: 120 }]}>
                <View
                  style={{
                    justifyContent: 'space-evenly',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 30
                  }}
                >
                {/* Imagem time casa */}
                  <View>
                    <Image style={{ height: 50, width: 50 }} source={{ uri: item.homeLogo }} />
                  </View>
                {/* Nome do time casa */}
                  <View style={styles3.text}>
                    <Text style={styles3.textinfo}>{item.homeTeam.substring(0, 10)} </Text>
                  </View>
                {/* separador por X */}
                  <View style={styles3.text}>
                    <Feather name="x" size={20} color="black" />
                  </View>
                {/* Nome time fora */}
                  <View style={styles3.text}>
                    <Text style={styles3.textinfo}> {item.awayTeam.substring(0, 10)} </Text>
                  </View>
                {/* Imagem time fora */}
                  <View>
                    <Image style={{ height: 50, width: 50 }} source={{ uri: item.awayLogo }} />
                  </View>
             
                </View>
              </View>
              </TouchableOpacity>
             
            )}
          />
          ):null}
    {Game2 == 1 ?(
          <FlatList
            data={collection3}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('JogosDaAposta', { jogo1: item.homeTeam, jogo2: item.awayTeam, logo1: item.awayLogo, logo2: item.homeLogo })}>
                    <View style={[styles3.cardConteiner, { height: 120 }]}>
                <View
                  style={{
                    justifyContent: 'space-evenly',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 30
                  }}
                >
                {/* Imagem time casa */}
                  <View>
                    <Image style={{ height: 50, width: 50 }} source={{ uri: item.homeLogo }} />
                  </View>
                {/* Nome do time casa */}
                  <View style={styles3.text}>
                    <Text style={styles3.textinfo}>{item.homeTeam.substring(0, 10)} </Text>
                  </View>
                {/* separador por X */}
                  <View style={styles3.text}>
                    <Feather name="x" size={20} color="black" />
                  </View>
                {/* Nome time fora */}
                  <View style={styles3.text}>
                    <Text style={styles3.textinfo}> {item.awayTeam.substring(0, 10)} </Text>
                  </View>
                {/* Imagem time fora */}
                  <View>
                    <Image style={{ height: 50, width: 50 }} source={{ uri: item.awayLogo }} />
                  </View>
                </View>
              </View>
              </TouchableOpacity>
            
            )}
          />
          ):null}


      {Game3 == 1 ?(
                <FlatList
                  data={collection4}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('JogosDaAposta', { jogo1: item.homeTeam, jogo2: item.awayTeam, logo1: item.awayLogo, logo2: item.homeLogo })}>
                           <View style={[styles3.cardConteiner, { height: 120 }]}>
                      <View
                        style={{
                          justifyContent: 'space-evenly',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: 30
                        }}
                      >
                      {/* Imagem time casa */}
                      
                      <View>
                          <Image style={{ height: 50, width: 50 }} source={{ uri: item.homeLogo }} />
                        </View>
                      {/* Nome do time casa */}
                        <View style={styles3.text}>
                          <Text style={styles3.textinfo}>{item.homeTeam.substring(0, 10)} </Text>
                        </View>
                      {/* separador por X */}
                        <View style={styles3.text}>
                          <Feather name="x" size={20} color="black" />
                        </View>
                      {/* Nome time fora */}
                        <View style={styles3.text}>
                          <Text style={styles3.textinfo}> {item.awayTeam.substring(0, 10)} </Text>
                        </View>
                      {/* Imagem time fora */}
                        <View>
                          <Image style={{ height: 50, width: 50 }} source={{ uri: item.awayLogo }} />
                        </View>
                      </View>
                       
                    </View>
                    </TouchableOpacity>
               
                  )}
                />
                ):null}

              {Donthave ?(
                 <View>
                 <ScrollView>
                   <Image style={{ width: 300, height: 300, marginBottom: 10, alignSelf: 'center' , top:-40}} source={require('./../../../assets/donthavegames.gif')} />
                   <Text style={{ alignSelf: 'center', top: -35, fontWeight: 'bold' }}>Oh! não há jogos desta liga !</Text>
                 </ScrollView>
               </View>
            ):null}
    </View>
    
  );
}