import React, { useState ,useEffect} from 'react';
import { Text, View,TouchableOpacity, ScrollView ,Image,FlatList} from 'react-native';
import styles from '../../../styles/StyleBookMakers';
import { AntDesign,Fontisto, FontAwesome5 ,Octicons,Feather} from '@expo/vector-icons'; 
import styles2 from '../../../styles/StyleBestOdds'
import styles3 from '../../../styles/StylesCardLeagues'
import styles4 from '../../../styles/StyleCard'
import {db,firebase,auth} from './../Services/firebaseconfig';
import styles5 from '../../../styles/StylesCardLeagues';
import styles6 from '../../../styles/StyleCard';
import { collection, getDocs} from 'firebase/firestore';
import moment from 'moment';


export default function MainScreen({navigation}) {
    const [selectedButton, setSelectedButton] = useState(1);
    const [SelectBestOdds,SetSelectBestOdds] = useState(true);
    const [SelectBookMakers,SetSelectBookMakers] = useState(false);
    const[collection2, SetCollection2] = useState([]);
    const[ FilteredbookmakersMaData,setFilteredbookmakersData] = useState([]);

     //jogos
  const[collection3, SetCollection3] = useState([]);
  const[collection4, SetCollection4] = useState([]);
  const[collection5, SetCollection5] = useState([]);

  //dias
  const[hojedata,sethojedata] = useState();
  const[amanhadata,setamanhadata] = useState();
  const[depoisdata,setdepoisdata] = useState();

  const[ FilteredJogosData,setFilteredJogosData] = useState([]);
  const[ FilteredJogosData2,setFilteredJogosData2] = useState([]);

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

    const btn1selecionado = () => {
      setSelectedButton(1);
      SetSelectBookMakers(false);
      SetSelectBestOdds(true);
   
    };
  
    const btn2selecionado = () => {
      setSelectedButton(2);
      SetSelectBestOdds(false);
      SetSelectBookMakers(true);
      fetchData();
    };


    useEffect(() => {
      const fetchData2 = async () => {
        try {
          const jogos = [];
          const querySnapshot = await getDocs(collection(db, hojedata));
          querySnapshot.forEach((doc) => {
            jogos.push(doc.data());
            
          });
          SetCollection3(jogos.JSON.parse());
          console.log(collection3);
  
        } catch (error) {
          console.log('Erro ao puxar Favoritos:', error);
        }
      };
      fetchData2();
    }, []);
    
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
    
    
      const fetchData= async () => {
        try {
  
          const bookmakersRef = collection(db, 'bookmakers');
          const querySnapshot = await getDocs(bookmakersRef);
  
          const bookmakers = [];
          querySnapshot.forEach((doc) => {
            bookmakers.push(doc.data());
          });

          SetCollection3(bookmakers);
          
  
        } catch (error) {
          console.log('Erro ao puxar bookmakers:', error);
        }
      };
      
    
    
      useEffect(()=>{
        console.log('colle',collection3);
      },[collection3])
    
      
        const renderItem = ({ item }) => {         
            return (
              <View style={styles.cardConteiner}>
                <Image style={[styles.imagStyles,{height:70,width:125,top:40}]} source={{uri:item.img}} />
                <View style={styles.card}>
                  <View style={{ marginHorizontal: 2, top: 16 }}>
                    <Text style={{ 
                        top: 60, 
                        marginHorizontal:35,
                        fontWeight:'bold', 
                        fontSize:14,
                        }}>{item.nome}</Text>
                  </View>
                </View>
                {/* Segunda parte do card */}
                <View style={styles4.conteinerCardbest}>
                  <View style={styles.text}>
                    <Text>Pagamento Rápido</Text>
                  </View>
                  <View style={styles.X}>
                    <FontAwesome5 name="money-check-alt" size={24} color="#059669" />
                  </View>
                  <View style={styles.hand}>
                    <FontAwesome5 name="handshake" size={24} color="black" />
                  </View>
                  <TouchableOpacity style={{ right: -80, top: -35 }}>
                    <Octicons name="chevron-right" size={24} color="black" onPress={() => navigation.navigate('linkcasa')} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          };

          const renderItem2 = ({item}) =>{
            return(
                <View style = {[styles5.cardConteiner,{height:120,marginBottom:20,marginTop:20,flex:1}]}>
                <View style={styles5.ContainerCardTop}>
                <View>
                        <Image style= {styles5.imagStyles2} source={require('./../../../assets/Bwin_casa_aposta.png')}/>
                    </View>
                   
                    <View>
                        <Text style={styles5.txt3}>  </Text>
                    </View>
                    
                </View> 
                <View style = {{
                        alignContent: 'space-between',
                        justifyContent:'center',
                        flexDirection: 'row',
                        top:-6,
                        left:25
                        }}>
                        <View style={styles6.infoCard}>
                            <Text style={styles.textinfo}>Casa</Text>
                            <Text style={styles.textinfo}>{item.odds}</Text>
                        </View>
                        <View style={styles6.infoCard}>
                            <Text style={styles.textinfo}>Empate</Text>
                            <Text style={styles.textinfo}>{item.odds}</Text>
                        </View>
                        <View style={styles6.infoCard}>
                            <Text style={styles.textinfo}>Fora</Text>
                            <Text style={styles.textinfo}> {item.odds}</Text>
                        </View>
                    </View>            
            </View>
     
            )
        }
          


return (    
    <View style={{backgroundColor:'#fff',flex:1}} behavior={Platform.OS == "ios" ? "padding" : "height"} >
        
            <View style={{marginTop:10}}>
                    <Text style={styles2.text4}> Bonus de Boas-Vindas</Text>
                        <Text style={styles2.text4}> Bónus até 50% até 50€ </Text>
                    <View style = {{
                        flexDirection: 'column',
                        justifyContent:'space-between'
                        
                        }}>
                        <TouchableOpacity style={[styles2.button,{backgroundColor:'#3C464E',height:50,width:300,marginTop:8,justifyContent:'center',alignSelf:'center',marginBottom:5}]} onPress ={() => navigation.navigate('Criar conta')}>
                            <Text style={[styles2.text4,{ fontSize:18,color:'#fff',marginTop:6,left:-10}]}>Registrar</Text>
                            <Feather style={{alignSelf:'center',position:'absolute',right:70,top:10}} name="user-plus" size={24} color="#059669" />
                        </TouchableOpacity>
                    </View>
                   
            </View>
            <View style ={styles2.btnContainerMain}>      
                <TouchableOpacity
                style={[styles2.button, selectedButton === 1 ? styles2.selectedButton : null]}
                onPress={btn1selecionado}>
                    <Text style={[styles2.buttonText, selectedButton === 1 ? styles2.selectedBtnbuttonText : null]}>Melhores Odds</Text>
                </TouchableOpacity>  
               
             
                <TouchableOpacity
                  style={[styles2.button, selectedButton === 2 ? styles2.selectedButton : null]}
                  onPress={btn2selecionado}>
                      <Text style={[styles2.buttonText, selectedButton === 2 ? styles2.selectedBtnbuttonText : null]}>Casas de Apostas</Text>
                </TouchableOpacity>                                                                    
            </View>
       
            {SelectBookMakers &&(
                    <View style={{flex:1}}>
                    <FlatList
                      data={collection3}
                      keyExtractor={(item) => item.id}
                      renderItem={renderItem}
                    />
        
                    </View>
            )}
                  {/* PARTE DA ODDS*/}    
            {SelectBestOdds &&(

            <FlatList
            data={data}
            renderItem={renderItem2}
            keyExtractor={(item, index) => index.toString()}
            />
            )}
    </View>
  );
}