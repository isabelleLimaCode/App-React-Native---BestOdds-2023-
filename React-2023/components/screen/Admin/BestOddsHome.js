import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,TouchableOpacity,ScrollView, FlatList, Image} from 'react-native';
import { Octicons,Feather,MaterialCommunityIcons} from '@expo/vector-icons'; 
import styles from '../../../styles/StyleBestOdds';
import styles3 from '../../../styles/StyleLigaCardAdm';
import styles10 from '../../../styles/StyleLigaCardAdm';
import axios from 'axios';
import moment from 'moment';
import  { doc , setDoc, collection, getDocs } from 'firebase/firestore';
import {db,app,storage} from './../Services/firebaseconfig';

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


const formatFixtureId = (id) => {
  const formattedId = id.replace(/-/g, '');
  const chunks = [];
  for (let i = 0; i < formattedId.length; i += 6) {
    chunks.push(formattedId.substring(i, i + 6));
  }
  return chunks.join('-');
};


export default function BestOddsHome() {


    const [selectedButton, setSelectedButton] = useState(1);
    const [selectedButton2, setSelectedButton2] = useState(1);

    const btn1selecionado = () => {
      setSelectedButton2(1);
    };
  
    const btn2selecionado = () => {
      setSelectedButton2(2);
    };
  
    const btn3selecionado = () => {
      setSelectedButton(3);
    };

    const btn4selecionado = () => {
        setSelectedButton(4);
      };
    
      const btn5selecionado = () => {
        setSelectedButton(5);
      };
      

// State do olho, alterar dps
const [eyes,setEyes] = useState(false);

// Base de dados das ligas
const ligas = [   
  {id: 140,ano:'2022',name: 'Bet365', url: require('../../../assets/Ligas/laliga.png')},
  {id: 61,ano:'2022',name: '1xbet', url: require('../../../assets/Ligas/ligue1.png')},
  {id: 71,ano:'2023', name: 'Betano',name2: 'Serie', url: require('../../../assets/Ligas/seriea.png')},
  ];
  return (
    <View style ={styles.conteiner}>
            {/* <View style = {styles.Co}>
            <View style ={styles.btnContainerAdc}>      
                    <TouchableOpacity
                    style={styles.btnBestAdc}>
                        <Text style={styles.buttonAdc}>Adicionar +</Text>
                    </TouchableOpacity>                                                                             
            </View>
          </View> */}
            
             
        <View style = {{
                    justifyContent:'space-evenly',
                    flexDirection: 'row',
                    alignItems: 'center'
                    }}>
            <View style ={styles.btnContainerBest}>      
                    <TouchableOpacity
                    style={[styles.btnBest, selectedButton === 3 ? styles.selectedBtnBetst : null]}
                    onPress={btn3selecionado}>
                        <Text style={[styles.buttonText, selectedButton === 3 ? styles.selectedBtnbuttonText : null]}>{atual}</Text>
                    </TouchableOpacity>  
                
                
                    <TouchableOpacity
                    style={[styles.btnBest, selectedButton === 4 ? styles.selectedBtnBetst : null]}
                    onPress={btn4selecionado}>
                        <Text style={[styles.buttonText, selectedButton === 4 ? styles.selectedBtnbuttonText : null]}>{segundo}</Text>
                    </TouchableOpacity> 

                    <TouchableOpacity
                    style={[styles.btnBest, selectedButton === 5 ? styles.selectedBtnBetst : null]}
                    onPress={btn5selecionado}>
                        <Text style={[styles.buttonText, selectedButton === 5 ? styles.selectedBtnbuttonText : null]}>{terceiro}</Text>
                    </TouchableOpacity>                                                                             
            </View>
          </View>                             

    <ScrollView>
{/* Card jogos */}

           




      {/* cards dos bookmakers */}


      <FlatList
          data={ligas}
          keyExtractor={(item) => item.ligas }
          renderItem={({ item }) => (
              <View style={styles10.cardConteiner}>
                  {/* Conteudo dentro do container */}
                  <View style={styles10.containerInBook}>
                      {/* Olhos de ativo e desativo */}
                      {/* <View style={{ height: '100%', width: '10%', justifyContent: 'center' }}>
                          <View style={styles10.eye}>
                              <TouchableOpacity onPress={() => setEyes(!eyes)}>
                              {!eyes && <Feather name="eye" size={24} color="black" />}
                              {eyes && <Feather name="eye-off" size={24} color="black" />}
                              </TouchableOpacity>
                          </View>
                      </View> */}


                      {/* Imagem nome bookmaker*/}
                      <View>
                        <Text style={[styles10.TextLeague,{}]}>{item.name}</Text>
                      </View>
                      <View style={{flexDirection:'row'}}>
                        
                        <View style={styles10.bets}>
                          <Text style={[styles10.TextLeague,{}]}>Casa</Text>
                          <Text style={[styles10.TextLeague,{}]}>2.3</Text>
                        </View>

                        <View  style={styles10.bets}>
                          <Text style={[styles10.TextLeague,{}]}>Empate</Text>
                          <Text style={[styles10.TextLeague,{}]}>1.2</Text>
                        </View>
                        <View  style={styles10.bets}>
                          <Text style={[styles10.TextLeague,{}]}>Fora</Text>
                          <Text style={[styles10.TextLeague,{}]}>3.5</Text>
                        </View>
                      </View>

                      {/* Flecha de direcionamento para a proxima pagina */}
                      {/* <View style={styles10.Arrow}>
                          <TouchableOpacity>
                          <Octicons name="chevron-right" size={24} color="black"/>
                          </TouchableOpacity>
                      </View> */}
                  </View>
              </View>
        )}
      />
    </ScrollView>
</View>
  );
}