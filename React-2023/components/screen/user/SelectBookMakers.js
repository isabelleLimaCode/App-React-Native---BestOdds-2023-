import React, { useState, useEffect } from 'react';
import { Text, View,Image, TouchableOpacity, ScrollView,FlatList } from 'react-native';
import { FontAwesome,Feather,MaterialCommunityIcons} from '@expo/vector-icons'; 
import styles from '../../../styles/StyleBestOdds.js'
import styles2 from '../../../styles/StylesCardLeagues';
import styles3 from '../../../styles/StyleCard';
import moment from 'moment';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {db,firebase,auth} from './../Services/firebaseconfig';

const diasdasemana = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sabado'];
const date = new Date();


const data = [
  {
    type: 'casa',
    odds: (Math.random() * (10 - 1) + 1).toFixed(2)
  },
  {
    type: 'empate',
    odds: (Math.random() * (10 - 1) + 1).toFixed(2)
  },
  {
    type: 'fora',
    odds: (Math.random() * (10 - 1) + 1).toFixed(2)
  }
];


const newData = [];
let currentIndex = 0;

while (currentIndex < data.length) {
  newData.push(data[currentIndex]);
  newData.push(data[currentIndex + 1]);
  newData.push(data[currentIndex + 2]);
  currentIndex += 3;
}


console.log(data);

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


export default function SelectBookMakers({navigation,route}) {
    
    const { jogo1 } = route.params;
    const { jogo2 } = route.params;
    const { logo1 } = route.params;
    const { logo2 } = route.params;
    const {fixture} = route.params;


      //dias 
  const[hojedata,sethojedata] = useState();
  const[amanhadata,setamanhadata] = useState();
  const[depoisdata,setdepoisdata] = useState();

  //ligas
  const[collection2, SetCollection2] = useState([]);

    console.log('logo1',logo1);
    console.log('fixute',fixture);

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
              const gamesRef = query(collection(db, hojedata), where("idFixture", "==", fixture));
              const gamesRef2 = query(collection(db, amanhadata), where("idFixture", "==", fixture));
              const gamesRef3 = query(collection(db, depoisdata), where("idFixture", "==", fixture));
      
              const querySnapshot = await getDocs(gamesRef);
              const querySnapshot2 = await getDocs(gamesRef2);
              const querySnapshot3 = await getDocs(gamesRef3);
      
              const jogos = new Map();
      
              querySnapshot.forEach((doc) => {
                const jogoData = doc.data();
                const leagueName = jogoData.idFixture;
      
                if (leagueName === fixture) {
                  if (!jogos.has(leagueName)) {
                    jogos.set(leagueName, jogoData);
                  }
                }
              });
      
              querySnapshot2.forEach((doc) => {
                const jogoData = doc.data();
                const leagueName = jogoData.idFixture;
      
                if (leagueName === fixture) {
                  if (!jogos.has(leagueName)) {
                    jogos.set(leagueName, jogoData);
                  }
                }
              });
      
              querySnapshot3.forEach((doc) => {
                const jogoData = doc.data();
                const leagueName = jogoData.idFixture;
      
                if (leagueName === fixture) {
                  if (!jogos.has(leagueName)) {
                    jogos.set(leagueName, jogoData);
                  }
                }
              });
      
              const jogosUnicos = Array.from(jogos.values());
              SetCollection2(jogosUnicos);
              console.log('teste', collection2);
            } catch (error) {
              console.log('Erro ao puxar jogos:', error);
            }
          };
      
          fetchData();
        }
      }, [hojedata, amanhadata, depoisdata, fixture]);



    const renderItem = ({item}) =>{
        return(
            <View style = {[styles2.cardConteiner,{height:120,marginBottom:20,marginTop:20,flex:1}]}>
            <View style={styles2.ContainerCardTop}>
            <View>
                    <Image style= {styles2.imagStyles2} source={require('./../../../assets/Bwin_casa_aposta.png')}/>
                </View>
               
                <View>
                    <Text style={styles2.txt3}>  </Text>
                </View>
                
            </View> 
            <View style = {{
                    alignContent: 'space-between',
                    justifyContent:'center',
                    flexDirection: 'row',
                    top:-6,
                    left:25
                    }}>
                    <View style={styles3.infoCard}>
                        <Text style={styles.textinfo}>Casa</Text>
                        <Text style={styles.textinfo}>{item.odds}</Text>
                    </View>
                    <View style={styles3.infoCard}>
                        <Text style={styles.textinfo}>Empate</Text>
                        <Text style={styles.textinfo}>{item.odds}</Text>
                    </View>
                    <View style={styles3.infoCard}>
                        <Text style={styles.textinfo}>Fora</Text>
                        <Text style={styles.textinfo}> {item.odds}</Text>
                    </View>
                </View>            
        </View>
 
        )
    }
    const renderItem2 = ({ item }) => (
      
      <View style={{ padding: 10 }}>
        <Text>Casa: {item.odds}</Text>
        <Text>Empate: {item.odds}</Text>
        <Text>Fora: {item.odds}</Text>
      </View>
    )

  return (
    <View 
        style ={[styles.conteiner,{paddingTop:5, flex:1}]}
        behavior={Platform.OS == "ios" ? "padding" : "height"} 
    >
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
  
</View>
         <View style ={styles.jogos}>         
                      <Text style={[styles.buttonText,{color:'#000',alignItems:'center',left:40,marginTop:8}]}>BookMakers</Text>    
                      <MaterialCommunityIcons name="soccer-field" size={30} color="#059669" style ={{top:5,left:-20}} />                                                             
            </View>
              <TouchableOpacity style = {{right:-8}} onPress={() => navigation.goBack()}>
                    <View>
                        <FontAwesome name="angle-left" size={32} color="black" />
                    </View>
                </TouchableOpacity>
                
                <View style = {[styles3.cardConteiner,{height:120}]}>
                    <Image style= {[styles3.imagStyles,{top:25,height:50,width:50}]} source={{ uri: logo1 }}/>
                      <Image style= {[styles3.imagStyles2,{top:25,height:50,width:50}]} source={{uri: logo2}}/>
                    <View style = {{
                        justifyContent:'space-around',
                        flexDirection: 'row',
                        marginTop:40,
                        marginHorizontal:90,
                        marginBottom:10,
                        }}>
                        <View style={styles3.text}>
                            <Text style={styles.textinfo}>{jogo1.substring(0, 10)}</Text>
                        </View>

                        <View style={[styles3.text,{marginHorizontal:50}]}>
                            <Feather name="x" size={20} color="black"/>
                        </View>

                        <View style={styles3.text}>
                            <Text style={styles.textinfo}>{jogo2.substring(0, 10)}</Text>
                        </View>

                        
                    </View>              
                </View>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />

        
    </View>
  );
}