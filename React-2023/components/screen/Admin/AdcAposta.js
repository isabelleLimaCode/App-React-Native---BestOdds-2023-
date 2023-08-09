import React, { useState } from "react";
import { FontAwesome, MaterialIcons ,Ionicons} from "@expo/vector-icons";
import { SelectList } from 'react-native-dropdown-select-list';
import {Alert, Text, SafeAreaView, View, ScrollView, Modal, TouchableOpacity, Pressable} from "react-native";
import Checkbox from 'expo-checkbox';
import styles3 from '../../../styles/StyleCreateUser.js';
import styles from '../../../styles/StyleTypeOdds';
import styles2 from '../../../styles/StyleLigaCardAdm';


function AdcApostas({navigation}) {

// Dropdown
  const [selected, setSelected] = useState(false);

// Dados do dropdown
const data = [
  { key: '1', value: 'bet365' },
  { key: '2', value: 'Marathonbet' },
  { key: '3', value: 'Unibet' },
  { key: '4', value: 'Betsson' },
  { key: '5', value: '188bet' },
  { key: '6', value: 'Pinnacle' },
  { key: '7', value: 'SBO' },
  { key: '8', value: '1xBet' },
  { key: '9', value: 'Sportinbet' },
  { key: '10', value: 'ComeOn' },
  { key: '11', value: 'Betway' },
  { key: '12', value: 'Tipico' },
  { key: '13', value: 'Betcris' },
  { key: '14', value: '888Sport' },
  { key: '15', value: 'Dafabet' },
];
    // CheckBox Area
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(true);
    const [check3, setCheck3] = useState(false);
    const [check4, setCheck4] = useState(true);


    // Alert Btn atualizar
    const showAlert = () =>
        Alert.alert(
          'Atualizar Jogos',
          'Tem certeza que deseja atualizar os jogos mostrados no aplicativo?',
          [
            {
              text: 'Sim',
              onPress: () => Alert.alert('Jogos atualizadas com sucesso!'),
              style: 'cancel',
            },
            {
              text: 'Não',
              onPress: () => Alert.alert('Operação desfeita com sucesso!'),
              style: 'cancel',
            },
          ],
          {
            cancelable: true,
            onDismiss: () =>
              Alert.alert('operação cancelada por ter selecionado area externa',)
            ,
          },
        );

    // Informações sobre odds
    const tipos_odds = [   
      {id: check1,use: setCheck1,  tipo: 'Palmeiras x Flamengo', sobre: 'Dia 19 de maio as 19:00'},
      {id: check2,use: setCheck2,  tipo: 'Porto x Benfica', sobre: 'Dia 20 de maio as 20:30'},
      {id: check3,use: setCheck3,  tipo: 'Juventus x Real Madri', sobre: 'Dia 20 de maio as 20:50'},
      {id: check4,use: setCheck4,  tipo: 'Tondela x Porto', sobre: 'Dia 21 de maios as 16:30'},
     ];

    return (
      <ScrollView style={styles.container}>      
          <View style={styles.searchArea}>
          <View>
                        <TouchableOpacity style = {styles3.back} onPress={() => navigation.goBack()}>
                          <Ionicons name="md-arrow-back" size={30} color={'#000'}></Ionicons> 
                        </TouchableOpacity>
                    </View>
            <SafeAreaView style={[styles.root,{marginTop:10}]}>
            <View style={{flex:2}}>
                 <Text style={[styles.title,{marginTop:10, marginBottom:20}]}> Jogos disponiveis </Text>
                
                {/* DropDown */}
                 <SelectList 
                    setSelected={setSelected} 
                    placeholder="Selecione a casa de aposta"
                    data={data}  
                    arrowicon={<FontAwesome name="chevron-down" size={18} color={'black'} />} 
                    searchicon={<FontAwesome name="search" size={18} color={'black'} />} 
                    search={true} 
                    maxHeight={200}
                    boxStyles={{borderRadius:15, width:300,backgroundColor: "#d9dbda"}} //override default styles
                  />
              </View> 
         
          
              
              
{/* 
              <SearchBar
                  searchPhrase={searchPhrase}
                  setSearchPhrase={setSearchPhrase}
                  clicked={clicked}
                  setClicked={setClicked} /> */}
            </SafeAreaView>
          </View>
          
               <View>
               <View style={[styles.checkContainer,{margin:10}]}>
                 <ScrollView              
                   horizontal={false}
                   indicatorStyle={'white'}
                 >
                 
                   {tipos_odds.map(tipos_odds =>
                   <View style={{alignContent:'center', flexDirection:'row'}}>
                     <View style={styles.checkbox}>          
                         <Checkbox
                             value={tipos_odds.id}
                             onValueChange={tipos_odds.use}
                             color={tipos_odds.id ? '#059669' : undefined}
                         />
                         <View style={{alignContent:'center', flexDirection:'column', marginTop:-12}}>
                             <Text style={styles.txt}>{tipos_odds.tipo}</Text>
                             <Text style={styles.txt2}>{tipos_odds.sobre}</Text>
                         </View>              
                     </View>                
                   </View> 
                   
                   
                   
                   )}
                 </ScrollView>           
               </View>                    
               <View style={styles.button}>
                     <Pressable style ={styles.btn}>
                       <TouchableOpacity style = {styles.back} onPress={showAlert}>
                           <Text style = {styles.btntxt}> Atualizar </Text>
                       </TouchableOpacity>
                     </Pressable>
               </View>  
                 
               </View>
          
          
          
      </ScrollView>
    ); 
}
export default AdcApostas;