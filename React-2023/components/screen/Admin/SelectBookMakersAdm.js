import React, { useState} from "react";
import { Text, View,TouchableOpacity,ScrollView} from 'react-native';
import styles from '../../../styles/StyleBestOdds';
import styles2 from '../../../styles/StyleBestOdds'
import Card from '../Card/CardBookMakersAdm';

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

export default function SelectBookMakersAdm() {
    const [selectedButton, setSelectedButton] = useState(2);
    const [selectedButton2, setSelectedButton2] = useState(4);

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
      

  return (
    <View style ={styles.conteiner}>
         <View style ={styles2.btnContainerMain}>      
                <TouchableOpacity
                style={[styles2.button, selectedButton2 === 1 ? styles2.selectedButton : null]}
                onPress={btn1selecionado}>
                    <Text style={[styles2.buttonText, selectedButton2 === 1 ? styles2.selectedBtnbuttonText : null]}>Ligas Despostivas</Text>
                </TouchableOpacity>  
               
             
                <TouchableOpacity
                  style={[styles2.button, selectedButton2 === 2 ? styles2.selectedButton : null]}
                  onPress={btn2selecionado}>
                      <Text style={[styles2.buttonText, selectedButton2 === 2 ? styles2.selectedBtnbuttonText : null]}>Casas de Apostas</Text>
                </TouchableOpacity>                                                                    
            </View> 

            <View style = {styles.Co}>
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
            <Card key={1}/>
            <Card key={2}/>
    </ScrollView>
</View>
  );
}