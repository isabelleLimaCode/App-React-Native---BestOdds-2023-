import { Text, View,Image, TouchableOpacity} from 'react-native';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import styles from '../../../styles/StyleLigaCardAdm';
import { Octicons,Feather} from '@expo/vector-icons'; 


// Base das ligas
const jogos = [   
    {id: 140,name: 'La Liga', url: require('../../../assets/Ligas/laliga.png')},
    {id: 61,name: 'Ligue 1', url: require('../../../assets/Ligas/ligue1.png')},
    {id: 71,name: 'Serie A',name2: 'Serie', url: require('../../../assets/Ligas/seriea.png')},
    ];

export default function CardLeagues(navigation) {

    const [jogo, setJogo] = useState('');
    // const [liga, setLiga] = useState('');

  const options = {
  method: 'GET',
  url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
  params: {
    live: 'all',
    league: '71',
    season: '2023'
  },
  headers: {
    'X-RapidAPI-Key': '15139b1f4amsh86b0b3d4f1c191cp12bec1jsn09d459294180',
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  }
};
    
    useEffect(() => {
      axios.request(options)
      .then(function (response) {
        setJogo(response.data.response)
        // setLiga(response.data.response.league)
        // console.log('Response do useState')
        // // console.log(liga);
        // console.log('Response do useState com strigFy')
        // console.log(JSON.stringify(jogo));
      })
      .catch(function (error) {
        console.error(error);
      }); 
    }, []);

    const [eyes,setEyes] = useState(false);
    
  return (
<View>
    {jogo.map(jogos =>
        <View style = {[styles.cardConteiner,{height:120}]}>    
        <View style = {{
            justifyContent:'space-evenly',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30
            }}>
                  <View>
            <Image style={{height: 50, width:50}} source={{ uri: jogos.teams.home.logo }}/>
        </View>
                
            <View style={styles.text}>
                <Text style={styles.textinfo}>{jogos.teams.home.name} </Text>
            </View>

            <View style={styles.text}>
                <Feather name="x" size={20} color="black"/>
            </View>

            <View style={styles.text}>
                <Text style={styles.textinfo}> {jogos.teams.away.name} </Text>
            </View>
            <View>
            <Image style={{height: 50, width:50}} source={{ uri: jogos.teams.away.logo }}/>
        </View>  
        </View>   
                 
    </View>
    )} 
</View>
  );
}