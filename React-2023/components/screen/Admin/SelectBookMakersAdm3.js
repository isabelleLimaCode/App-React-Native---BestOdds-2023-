import React, { useState } from 'react';
import {  SafeAreaView, Text, View,Image, TouchableOpacity, ScrollView,StatusBar, Pressable, showAlert } from 'react-native';
import { FontAwesome} from '@expo/vector-icons'; 
import styles from '../../../styles/StyleBestOdds.js'
import styles2 from '../../../styles/StylesCardLeagues';
import styles3 from '../../../styles/StyleTypeOdds'

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


export default function SelectBookMakersAdm3() {
    
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
    <View style ={styles.conteiner2}>
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
                                        
        </ScrollView>
         
        <View style={styles3.button2}>
        <View>
                <Pressable style={styles3.btn5}>
                  <TouchableOpacity>
                      <Text style={styles3.txt5}> Alterar Odds do jogo </Text>
                  </TouchableOpacity>
                </Pressable>
            </View>
            <Text></Text>
          
               
            <View>
                <Pressable style={styles3.btn5}>
                    <TouchableOpacity>
                        <Text style={styles3.txt5}> Remover jogo </Text>
                    </TouchableOpacity>
                </Pressable> 
            </View>
          </View>
          <View style={{marginTop:100, backgroundColor:'red'}}>
            </View>  

            <View style={styles3.button}>
                <Pressable style ={styles3.btn}>
                  <TouchableOpacity>
                      <Text style = {styles3.btntxt}> Salvar </Text>
                  </TouchableOpacity>
                </Pressable>
                <Pressable style ={styles3.btn}>
                  <TouchableOpacity>
                      <Text style = {styles3.btntxt}>  Cancelar </Text>
                  </TouchableOpacity>
                </Pressable>  
          </View>       
    </View>
  );
}
