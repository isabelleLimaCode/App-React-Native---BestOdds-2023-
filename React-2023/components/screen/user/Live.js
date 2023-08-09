import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, FlatList, Image,RefreshControl} from 'react-native';
import { Feather,MaterialIcons } from '@expo/vector-icons'; 
import styles from '../../../styles/StyleCard';
import styles2 from '../../../styles/StyleLive';
import axios from 'axios';
import { getMinutes } from 'date-fns';





export default function Live() {

    const [jogo, setJogo] = useState('');
    const [updatetime,getupdatetime] = useState();
    const [refreshing, setRefreshing] = useState(false);

   


    const options = {
      method: 'GET',
      url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',

      params: {live: 'all'},
      headers: {
        'X-RapidAPI-Key': 'f3f4e67379msh97140e0374432efp12ea40jsneaa62f4ea97b',
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    }
    useEffect(() => {
      axios.request(options)

        .then(function (response) {
            setJogo(response.data.response);
        })
        .catch(function (error) {
          console.error(error);
        });
    }, []);

    setTimeout(() => {
        //usar o codigo do carro!
    }, 2000);

    const renderItem = ({item,index}) => (

      <View key={index}>
      <View style = {styles.cardConteiner}>
          <View style = {styles.topText}>
              <Text style={[styles.txtLive, styles.textinfo]}>{item.fixture.status.long}</Text>
              <Text style={[styles.txtLive, styles.textinfo]}> {item.fixture.status.elapsed}:00 </Text>
          </View>
          {/* Imagem dos times */}

          <View style = {{
              marginHorizontal:3,
              flexDirection: 'row',
              justifyContent:'space-between'
              }}>
              <View style ={{alignItems:'center'}}>
                  <Image style={{ width: 65, height: 65,alignSelf:'center',marginHorizontal:40}} source={{ uri: item.teams.home.logo }}/>  
                  <Text style={{alignSelf:'auto', fontWeight:'bold',marginHorizontal:40}}> {item.teams.home.name.substring(0,9)} </Text> 
              </View>
              <View style ={{alignItems:'center'}}>
                  <Image style={{ width: 65, height: 65,alignSelf:'center',marginHorizontal:40}} source={{ uri: item.teams.away.logo }}/>
                  <Text style={{alignSelf:'flex-end', fontWeight:'bold',marginHorizontal:40}}>{item.teams.away.name.substring(0, 9)}</Text>
              </View>
          </View>
        
         
          {/* Times */}
          <View style = {{
              justifyContent:'space-around',
              flexDirection: 'row',
              marginTop:-45
              }}>
              <View style={styles.text}>
                  <Text style={[styles.txtLive, styles.textinfo]}>{item.goals.home}</Text>
                   <Feather name="x" size={20} color="black"/>
                   <Text style={[styles.txtLive, styles.textinfo]}>{item.goals.away}</Text>
              </View>
          </View>

          {/* Titulo dos valores */}
         

      
      </View>
  </View>
               
    )
        

    
      return (
        <View style={[styles.container,{flex:1}]} behavior={Platform.OS == "ios" ? "padding" : "height"} >
            <View style={[styles2.rectangle,{right:-10,top:10,marginBottom:20}]}>
                <MaterialIcons name="live-tv" size={28} color="red" />
                <Text style={styles2.text}> Jogos Ao Vivo</Text>
             </View>
             <FlatList
                data={jogo}
                renderItem={renderItem}
                scrollEventThrottle={16}
                keyExtractor={(item) => item.league.name.toString()}/>
          <StatusBar style="auto" />
        </View>
      );
    }
