import { useState, useEffect, useFocusEffect } from 'react';
import { useNavigationState } from '@react-navigation/native';
import { Text, View, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import styles from './../../../styles/StylesLogin';
import img from './../../../assets/Darkmode.gif';
import { db, auth } from './../Services/firebaseconfig';
import { CommonActions } from '@react-navigation/native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import moment from 'moment';
import { doc,deleteDoc, setDoc, collection, getDocs,query,deleteDocs} from "firebase/firestore";
import { getAuth,signOut,deleteUser} from 'firebase/auth';

// header
const settings = ({ navigation }) => {
  const [visibilibutton, setvisibilibutton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

   

      // Obter a data de hoje
      const today = moment().format('YYYY-MM-DD');

      // Um dia atrás
      const oneDayAgo = moment(today).subtract(1, 'day').format('YYYY-MM-DD');

      // Um dia depois de amanhã
      const tomorrow = moment(today).add(1, 'day').format('YYYY-MM-DD');
    
      console.log('today',today);
      console.log('um dia atras',oneDayAgo);
      console.log('amanha',tomorrow);
   

    async function deleteCollection(db, collectionPath) {
      const collectionRef = collection(db, collectionPath);
      const querySnapshot = await getDocs(collectionRef);
    
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    
      console.log('Coleção excluída com sucesso!');
    }
    

  const handleUpdateAll = () => {
    Alert.alert(
      'Confirmação',
      'Deseja realmente Atualizar o jogos ?',
      [
        {
          text: 'Atualizar Dados',
          onPress:async () => {
           
            //const collectionPath = '2023-06-13';
            const collectionPath = today;
            deleteCollection(db, collectionPath)
            //const collectionPath2 = '2023-06-14';
            const collectionPath2 = oneDayAgo;
            deleteCollection(db, collectionPath2);
            //const collectionPath3 = '2023-06-14';
            const collectionPath3 = tomorrow;
            deleteCollection(db, collectionPath3);
            await new Promise((resolve) => {
              setTimeout(resolve, 2000); 
            });
            fetchData(dates[0], setJogo);
            fetchData(dates[1], setJogo2);
            fetchData(dates[2], setJogo3);
          }
        },
        {
          text: 'Cancel',
        },
      ],
      { cancelable: false }
    );
  };

  const handleResetNavigation = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      console.log('Usuário deslogado com sucesso.');
    } catch (error) {
      console.log('Erro ao fazer logout do usuário:', error);
    }

    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'MainScreen' }],
        })
      );
    }, 3000);
  };

  const formatFixtureId = (id) => {
    const formattedId = id.replace(/-/g, '');
    const chunks = [];
    for (let i = 0; i < formattedId.length; i += 6) {
      chunks.push(formattedId.substring(i, i + 6));
    }
    return chunks.join('-');
  };

  // Objetos dos jogos
  const [jogo, setJogo] = useState([]);
  const [jogo2, setJogo2] = useState([]);
  const [jogo3, setJogo3] = useState([]);

  // Datas dos jogos
  const currentDate = moment().format('YYYY-MM-DD');
  const dates = [
    currentDate,
    moment(currentDate).add(1, 'day').format('YYYY-MM-DD'),
    moment(currentDate).add(2, 'day').format('YYYY-MM-DD'),
  ];

  // Estrutura das ids do options
  const [fixtureApi, setFixtures] = useState('');

  // Requests API
  const options2 = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
    params: { ids: fixtureApi },
    headers: {
      'X-RapidAPI-Key': 'f3f4e67379msh97140e0374432efp12ea40jsneaa62f4ea97b',
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    },
  };

  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/odds',
    headers: {
      'X-RapidAPI-Key': 'f3f4e67379msh97140e0374432efp12ea40jsneaa62f4ea97b',
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    },
  };

  // // Metodo de save firebase
  const saveJogos = async (jogos, date) => {
    for (const teste of jogos) {
      try {
        const response2 = await axios.request({ ...options2, params: { ids: formatFixtureId(teste.fixture.id.toString()) } });

        let homeTeam, awayTeam, goalsHome, goalsAway;

        try {
          homeTeam = response2.data.response[0].teams.home.name;
          homeLogo = response2.data.response[0].teams.home.logo;
          awayTeam = response2.data.response[0].teams.away.name;
          awayLogo = response2.data.response[0].teams.away.logo;
          goalsHome = response2.data.response[0].goals.home || 0;
          goalsAway = response2.data.response[0].goals.away || 0;

        } catch (error) {
          console.error('Error retrieving data from API response:', error);
          continue; // Skip to the next iteration if data retrieval fails
        }
         // Obtenha o nome do campo da resposta da API
        await setDoc(doc(db, date, teste.fixture.id.toString()), {
          idFixture: teste.fixture.id,
          LeagueName: teste.league.name,
          LeagueLogo: teste.league.logo,

          // Casas de aposta
          Bookmaker0: teste.bookmakers[0].name,
          Bookmaker1: teste.bookmakers[1].name,
          Bookmaker2: teste.bookmakers[2].name,
          Bookmaker3: teste.bookmakers[3].name,
          
          // type 1 + value
          TypeBet10: teste.bookmakers[0].bets[0].name,
          Value10: teste.bookmakers[0].bets[0].values,

          TypeBet11: teste.bookmakers[1].bets[0].name,
          Value11: teste.bookmakers[1].bets[0].values,

          TypeBet12: teste.bookmakers[2].bets[0].name,
          Value12: teste.bookmakers[2].bets[0].values,

          TypeBet13: teste.bookmakers[3].bets[0].name,
          Value13: teste.bookmakers[3].bets[0].values,


          // Type 2 + value
          TypeBet20: teste.bookmakers[0].bets[1].name,
          Value20: teste.bookmakers[0].bets[1].values,

          TypeBet21: teste.bookmakers[1].bets[1].name,
          Value21: teste.bookmakers[1].bets[1].values,

          TypeBet22: teste.bookmakers[2].bets[1].name,
          Value22: teste.bookmakers[2].bets[1].values,

          TypeBet23: teste.bookmakers[3].bets[1].name,
          Value23: teste.bookmakers[3].bets[1].values,


          // type 3 + value
          TypeBet30: teste.bookmakers[0].bets[2].name,
          Value30: teste.bookmakers[0].bets[2].values,

          TypeBet31: teste.bookmakers[1].bets[2].name,
          Value31: teste.bookmakers[1].bets[2].values,

          TypeBet32: teste.bookmakers[2].bets[2].name,
          Value32: teste.bookmakers[2].bets[2].values,

          TypeBet33: teste.bookmakers[3].bets[2].name,
          Value33: teste.bookmakers[3].bets[2].values,

          // Type 4 + value
          TypeBet40: teste.bookmakers[0].bets[3].name,
          Value40: teste.bookmakers[0].bets[3].values,

          TypeBet41: teste.bookmakers[1].bets[3].name,
          Value41: teste.bookmakers[1].bets[3].values,

          TypeBet42: teste.bookmakers[2].bets[3].name,
          Value42: teste.bookmakers[2].bets[3].values,

          TypeBet43: teste.bookmakers[3].bets[3].name,
          Value43: teste.bookmakers[3].bets[3].values,


          // dados dos times
          homeTeam,
          homeLogo,
          awayTeam,
          awayLogo,
          goalsHome,
          goalsAway,
        });
      } catch (error) {
        console.error('Error saving the data:', error);
      }
    }
  };

 
    const fetchData = async (date, setJogo) => {
      try {
        const response = await axios.request({ ...options, params: { date } });
        setJogo(response.data.response);
      } catch (error) {
        console.error(error);
      }
    };
 

  useEffect(() => {
    if (jogo && jogo.length > 0) {
      saveJogos(jogo, dates[0]);
    }
  }, [jogo]);

  useEffect(() => {
    if (jogo2 && jogo2.length > 0) {
      saveJogos(jogo2, dates[1]);
    }
  }, [jogo2]);

  useEffect(() => {
    if (jogo3 && jogo3.length > 0) {
      saveJogos(jogo3, dates[2]);
    }
  }, [jogo3]);

 

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Image style={{ height: 300, width: 300, alignSelf: 'center' }} source={img} />
      <TouchableOpacity
        style={[styles.conteinerbtn, { backgroundColor: '#059669', alignSelf: 'center', marginBottom: 5 }]}
        onPress={handleUpdateAll}
      >
        <Text>Jogos do dia </Text>
        <MaterialCommunityIcons name="update" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.conteinerbtn, { backgroundColor: '#059669', alignSelf: 'center' }]}
        onPress={handleResetNavigation}
      >
        <Text> Logout </Text>
        <Ionicons name="log-out" size={24} color="black" />
      </TouchableOpacity>
      {isLoading && (
        <View style={{ position: 'absolute', alignSelf: 'center', top: 420 }}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={{}}>Carregando...</Text>
        </View>
      )}
    </View>
  );
};

export default settings;
