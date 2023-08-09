import React, { useState } from 'react';
import { Text, View,Image, TouchableOpacity, ScrollView} from 'react-native';
import { FontAwesome} from '@expo/vector-icons'; 
import styles from '../../../styles/StyleBestOdds.js'
import styles2 from '../../../styles/StylesCardLeagues';

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


export default function SelectBookMakersAdm2() {
    
  const [selectedButton, setSelectedButton] = useState(1);

  const btn1selecionado = () => {
    setSelectedButton(1);
  };

  const btn2selecionado = () => {
    setSelectedButton(2);
  };

  const btn3selecionado = () => {
    setSelectedButton(3);
  };

  return (
    <View style ={styles.conteiner}>
        <ScrollView>
              <TouchableOpacity style = {{right:-8}}>
                    <View>
                        <FontAwesome name="angle-left" size={28} color="black" />
                    </View>
                </TouchableOpacity>
            <View style = {[styles2.cardConteiner,{height:70,marginBottom:20,marginTop:20}]}>
                <View style={styles2.ContainerCardTop}>
                    <View>
                        <Image style= {styles2.imagStyles2} source={require('./../../../assets/Bwin_casa_aposta.png')}/>
                    </View>

                    <View>
                        <Text style={styles2.txt3}> Bwin </Text>
                    </View>
                </View>            
            </View>
            <View>
            <View style ={styles.btnContainerAdc}>      
                    <TouchableOpacity
                    style={styles.btnBestAdc}>
                        <Text style={styles.buttonAdc}>Adicionar +</Text>
                    </TouchableOpacity>                                                                             
            </View>
          </View>
                     
                <View style = {{
                            justifyContent:'space-evenly',
                            flexDirection: 'row',
                            alignItems: 'center'
                            }}>
                    <View style ={styles.btnContainerBest}>      
                        <TouchableOpacity
                        style={[styles.btnBest, selectedButton === 1 ? styles.selectedBtnBetst : null]}
                        onPress={btn1selecionado}>
                            <Text style={[styles.buttonText, selectedButton === 1 ? styles.selectedBtnbuttonText : null]}>{atual}</Text>
                        </TouchableOpacity>  
                    
                    
                        <TouchableOpacity
                        style={[styles.btnBest, selectedButton === 2 ? styles.selectedBtnBetst : null]}
                        onPress={btn2selecionado}>
                            <Text style={[styles.buttonText, selectedButton === 2 ? styles.selectedBtnbuttonText : null]}>{segundo}</Text>
                        </TouchableOpacity> 

                        <TouchableOpacity
                        style={[styles.btnBest, selectedButton === 3 ? styles.selectedBtnBetst : null]}
                        onPress={btn3selecionado}>
                            <Text style={[styles.buttonText, selectedButton === 3 ? styles.selectedBtnbuttonText : null]}>{terceiro}</Text>
                        </TouchableOpacity>                                                                             
                    </View>
                    </View>                             

        </ScrollView>
                
    </View>
  );
}