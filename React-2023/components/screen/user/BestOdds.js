import React, { useState } from 'react';
import {Text, View,TouchableOpacity, ScrollView ,Image} from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import styles from '../../../styles/StyleBestOdds.js'
import styles3 from '../../../styles/StyleCard';

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


export default function BestOdds() {
    
  const [SelectedButton, SetSelectedButton] = useState(1);

  const [Game1,setGame1] = useState(true);
  const [Game2,setGame2] = useState(false);
  const [Game3,setGame3] = useState(false);

  function handlePressGame1() {
      SetSelectedButton(1);
      setGame2(false);
      setGame3(false);
      setGame1(true);
  }

  function handlePressGame2() {
      SetSelectedButton(2);
      setGame1(false);
      setGame3(false);
      setGame2(true);
  }

  function handlePressGame3() {
      SetSelectedButton(3);
      setGame1(false);
      setGame2(false);
      setGame3(true);
  }
  return (
    <View style ={styles.conteiner} behavior={Platform.OS == "ios" ? "padding" : "height"} >
                     
                <View style = {{
                            justifyContent:'space-evenly',
                            flexDirection: 'row',
                            alignItems: 'center'
                            }}>
                    <View style ={styles.btnContainerBest}>      
                        <TouchableOpacity
                        style={[styles.btnBest, SelectedButton === 1 ? styles.selectedBtnBetst : null]}
                        onPress={handlePressGame1}>
                            <Text style={[styles.buttonText, SelectedButton === 1 ? styles.selectedBtnbuttonText : null]}>{atual}</Text>
                        </TouchableOpacity>  
                    
                    
                        <TouchableOpacity
                        style={[styles.btnBest, SelectedButton === 2 ? styles.selectedBtnBetst : null]}
                        onPress={handlePressGame2}>
                            <Text style={[styles.buttonText, SelectedButton === 2 ? styles.selectedBtnbuttonText : null]}>{segundo}</Text>
                        </TouchableOpacity> 

                        <TouchableOpacity
                        style={[styles.btnBest, SelectedButton === 3 ? styles.selectedBtnBetst : null]}
                        onPress={handlePressGame3}>
                            <Text style={[styles.buttonText, SelectedButton === 3 ? styles.selectedBtnbuttonText : null]}>{terceiro}</Text>
                        </TouchableOpacity>                                                                             
                    </View>
                </View>                             
    
                <ScrollView>
                {Game1 &&(
                    <View style = {styles3.cardConteiner}>
                    <Image style= {styles3.imagStyles} source={require('./../../../assets/flamengo.png')}/>
                    <Image style= {styles3.imagStyles2} source={require('./../../../assets/benfica.png')}/>
                    <View style = {{
                        justifyContent:'space-around',
                        flexDirection: 'row',
                        marginTop:40,
                        marginHorizontal:90,
                        marginBottom:10,
                        }}>
                        <View style={styles3.text}>
                            <Text style={styles.textinfo}>Benfica </Text>
                        </View>

                        <View style={styles3.text}>
                            <Feather name="x" size={20} color="black"/>
                        </View>

                        <View style={styles3.text}>
                            <Text style={styles.textinfo}>Flamengo</Text>
                        </View>

                        
                    </View>
                    <View style = {{
                        alignContent: 'space-between',
                        justifyContent:'center',
                        flexDirection: 'row',
                        top:-1
                        }}>
                        <View style={styles3.infoCard}>
                            <Text style={styles.textinfo}>Casa</Text>
                            <Text style={styles.textinfo}>1.9€</Text>
                        </View>
                        <View style={styles3.infoCard}>
                            <Text style={styles.textinfo}>Empate</Text>
                            <Text style={styles.textinfo}>2.0€</Text>
                        </View>
                        <View style={styles3.infoCard}>
                            <Text style={styles.textinfo}>Fora</Text>
                            <Text style={styles.textinfo}>3.0€</Text>
                        </View>
                    </View>               
                </View>
           )}

            {Game2 &&(
                    <View style = {styles3.cardConteiner}>
                    <Image style= {styles3.imagStyles} source={require('./../../../assets/flamengo.png')}/>
                      <Image style= {styles3.imagStyles2} source={require('./../../../assets/benfica.png')}/>
                    <View style = {{
                        justifyContent:'space-around',
                        flexDirection: 'row',
                        marginTop:40,
                        marginHorizontal:90,
                        marginBottom:10,
                        }}>
                        <View style={styles3.text}>
                            <Text style={styles.textinfo}>Benfica </Text>
                        </View>

                        <View style={styles3.text}>
                            <Feather name="x" size={20} color="black"/>
                        </View>

                        <View style={styles3.text}>
                            <Text style={styles.textinfo}>Flamengo</Text>
                        </View>

                        
                    </View>
                    <View style = {{
                        alignContent: 'space-between',
                        justifyContent:'center',
                        flexDirection: 'row',
                        top:-1
                        }}>
                        <View style={styles3.infoCard}>
                            <Text style={styles.textinfo}>Casa</Text>
                            <Text style={styles.textinfo}>1.9€</Text>
                        </View>
                        <View style={styles3.infoCard}>
                            <Text style={styles.textinfo}>Empate</Text>
                            <Text style={styles.textinfo}>2.0€</Text>
                        </View>
                        <View style={styles3.infoCard}>
                            <Text style={styles.textinfo}>Fora</Text>
                            <Text style={styles.textinfo}>3.0€</Text>
                        </View>
                    </View>               
                </View>
            )}
            
            {Game3 &&(
                    <View style = {styles3.cardConteiner}>
                    <Image style= {styles3.imagStyles} source={require('./../../../assets/flamengo.png')}/>
                      <Image style= {styles3.imagStyles2} source={require('./../../../assets/benfica.png')}/>
                    <View style = {{
                        justifyContent:'space-around',
                        flexDirection: 'row',
                        marginTop:40,
                        marginHorizontal:90,
                        marginBottom:10,
                        }}>
                        <View style={styles3.text}>
                            <Text style={styles.textinfo}>Benfica </Text>
                        </View>

                        <View style={styles3.text}>
                            <Feather name="x" size={20} color="black"/>
                        </View>

                        <View style={styles3.text}>
                            <Text style={styles.textinfo}>Flamengo</Text>
                        </View>

                        
                    </View>
                    <View style = {{
                        alignContent: 'space-between',
                        justifyContent:'center',
                        flexDirection: 'row',
                        top:-1
                        }}>
                        <View style={styles3.infoCard}>
                            <Text style={styles.textinfo}>Casa</Text>
                            <Text style={styles.textinfo}>1.9€</Text>
                        </View>
                        <View style={styles3.infoCard}>
                            <Text style={styles.textinfo}>Empate</Text>
                            <Text style={styles.textinfo}>2.0€</Text>
                        </View>
                        <View style={styles3.infoCard}>
                            <Text style={styles.textinfo}>Fora</Text>
                            <Text style={styles.textinfo}>3.0€</Text>
                        </View>
                    </View>               
                </View>
            )}
                </ScrollView>
    </View>
  );
}
