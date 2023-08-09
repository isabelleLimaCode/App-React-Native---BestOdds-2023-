import React, { useState , useEffect} from 'react';
import { Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { Octicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../../../styles/StyleBestOdds';
import styles2 from '../../../styles/StyleLigaCardAdm';
import ProgressBar from '../../../ProgressBar';
import moment from 'moment';
import {db,firebase,auth} from './../Services/firebaseconfig';
import  { doc , setDoc, collection, getDocs } from 'firebase/firestore';

export default function League({ navigation, route }) {
  // State do olho, alterar dps
  const [eyes, setEyes] = useState(false);
  const [ligas1, setLigas1] = useState(route.params?.ligas1);
   const [ligalogo, setligalogo] = useState(route.params?.ligalogo);
    const [fixure, setfixure] = useState(route.params?.fixure);
  const [porcentagem, SetPorcentagem] = useState(0);

  //dias 
  const[hojedata,sethojedata] = useState();
  const[amanhadata,setamanhadata] = useState();
  const[depoisdata,setdepoisdata] = useState();

  //ligas
  const[collection2, SetCollection2] = useState([]);

  console.log('teste variavel');
  console.log(ligas1);
  console.log(ligalogo);

  
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
          // isso quando tiver os dias corretos
           const gamesRef = collection(db, hojedata);
            const gamesRef2 = collection(db, amanhadata);
          const gamesRef3 = collection(db, depoisdata);
          //const gamesRef = collection(db, '2023-06-10');
          //const gamesRef2 = collection(db, '2023-06-11');
          //const gamesRef3 = collection(db, '2023-06-12');
  
          const querySnapshot = await getDocs(gamesRef);
          const querySnapshot2 = await getDocs(gamesRef2);
          const querySnapshot3 = await getDocs(gamesRef3);
  
          const jogos = new Map();
  
          querySnapshot.forEach((doc) => {
            const jogoData = doc.data();
            const leagueName = jogoData.LeagueName;
  
            if (!jogos.has(leagueName)) {
              jogos.set(leagueName, jogoData);
            }
          });
  
          querySnapshot2.forEach((doc) => {
            const jogoData = doc.data();
            const leagueName = jogoData.LeagueName;
  
            if (!jogos.has(leagueName)) {
              jogos.set(leagueName, jogoData);
            }
          });
  
          querySnapshot3.forEach((doc) => {
            const jogoData = doc.data();
            const leagueName = jogoData.LeagueName;
  
            if (!jogos.has(leagueName)) {
              jogos.set(leagueName, jogoData);
            }
          });
  
          const jogosUnicos = Array.from(jogos.values());
          SetCollection2(jogosUnicos);
          console.log(collection2);
        } catch (error) {
          console.log('Erro ao puxar jogos:', error);
        }
      };
  
      fetchData();
    }
  }, [hojedata, amanhadata, depoisdata]);
  



  return (
    <View style={styles.conteiner}>
      {/* Ligas despotivas titulo */}
      <View style={styles.jogos}>
        <Text style={[styles.buttonText, { color: '#000', alignItems: 'center', left: 40 }]}>Ligas Desportivas </Text>
        <MaterialCommunityIcons name="podium" size={28} color="#059669" style={{ top: 5, left: -8 }} />
      </View>

      {/* Card ligas */}
      <FlatList
        data={collection2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity  onPress={() => navigation.navigate('Leagues', { ligas1: item.LeagueName, ligalogo: item.LeagueLogo, fixure:item.fixure})}>
             <View style={styles2.cardConteiner}>
            {/* Conteudo dentro do container */}
            <View style={styles2.containerIn}>
              {/* Imagem da liga */}
              <View style={{ width: '50%', height: '100%', justifyContent: 'center' }}>
                <Image style={styles2.ImgLeague2} source={{uri:item.LeagueLogo}} />
              </View>
              {/* Imagem nome da liga */}
              <View>
                <Text style={[styles2.TextLeague,{right:50}]}>{item.LeagueName}</Text>
              </View>

              {/* Flecha de direcionamento para a próxima página */}
              
            </View>
          </View>
          </TouchableOpacity>
         
        )}
      />
    </View>
  );
}
