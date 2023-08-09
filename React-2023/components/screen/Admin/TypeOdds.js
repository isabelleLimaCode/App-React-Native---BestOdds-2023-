import React, { useState } from "react";
import {Alert, Text, SafeAreaView, View, ScrollView, Modal, TouchableOpacity, Pressable} from "react-native";
import SearchBar from "../SearchBar/SearchBar";
import Checkbox from 'expo-checkbox';
import styles from '../../../styles/StyleTypeOdds'



function TypeOdds() {
    // SearchBar Area 
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);

    // CheckBox Area
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(true);
    const [check3, setCheck3] = useState(true);
    const [check4, setCheck4] = useState(false);
    const [check5, setCheck5] = useState(true);
    const [check6, setCheck6] = useState(true);


    // Alert Btn atualizar
    const showAlert = () =>
        Alert.alert(
          'Atualizar Odds',
          'Tem certeza que deseja atualizar as odds mostradas no aplicativo?',
          [
            {
              text: 'Sim',
              onPress: () => Alert.alert('Odds atualizadas com sucesso!'),
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
      {id: check1,use: setCheck1,  tipo: 'H2H', sobre: 'Aposte na equipa vencedora'},
      {id: check2,use: setCheck2,  tipo: 'SPREAD', sobre: 'Aposte na equipa vencedora depois de aplicar um handicap de pontos a cada equipa'},
      {id: check3,use: setCheck3,  tipo: 'TOTALS', sobre: 'Aposte na pontuação total do jogo acima ou abaixo de um limite'},
      {id: check4,use: setCheck4,  tipo: 'OUTRIGHTS', sobre: 'Aposte no resultado final de um torneio ou competição'},
      {id: check5,use: setCheck5,  tipo: 'H2H_LAY', sobre: 'Aposte contra um resultado h2h. Este mercado é aplicável apenas a bolsas de apostas'},
      {id: check6,use: setCheck6,  tipo: 'OUTRIGHTS_LAY', sobre: 'Aposte contra um resultado definitivo.'
    },];
    // modal
    const [modalVisible, setModalVisible] = useState(false);

     return (
      <ScrollView style={styles.container}>   
       {/*Modal btn saiba mais!  */}     
       <Modal        
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        {/* container modal */}
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.mdlTxtContainer}>
              <Text style={styles.titlemdl}>Dicionario dos tipos das odds</Text>
            {tipos_odds.map(tipos_odds => 
            <View style={styles.txtmdl}>
               <Text style={styles.txtTitle}>
               {tipos_odds.tipo}
               </Text>
               <Text style={styles.txtPa}>
               {tipos_odds.sobre}
               </Text>
             </View>                
              )}
              <View style={styles.txtmdl}>
                <Text style={styles.txtTitle}>
                  H2H
                </Text>
                <Text style={styles.txtPa}>
                Aposte na equipa vencedora
                </Text>
              </View>
            </View>            
            {/* botao fechar modal */}
            <Pressable
              style={[styles.button1, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Voltar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

          {/* search area */}         
          <View style={styles.searchArea}>
            <SafeAreaView style={styles.root}>
              {!clicked && <Text style={styles.title}> Tipos de Apostas </Text>}
              <SearchBar
                  searchPhrase={searchPhrase}
                  setSearchPhrase={setSearchPhrase}
                  clicked={clicked}
                  setClicked={setClicked} />
            </SafeAreaView>
          </View>

          <View style={styles.checkContainer}>
            <ScrollView              
              horizontal={false}
              indicatorStyle={'white'}
            >
             
              {tipos_odds.map(tipos_odds => 
              <View style={styles.checkbox}>          
              <Checkbox
                value={tipos_odds.id}
                onValueChange={tipos_odds.use}
                color={tipos_odds.id ? '#059669' : undefined}
               />
               <Text style={styles.txt}>{tipos_odds.tipo}</Text>
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
                <Pressable style ={styles.btn}>
                  <TouchableOpacity style = {styles.back} onPress={() => setModalVisible(true)}>
                      <Text style = {styles.btntxt}> Saiba mais </Text>
                  </TouchableOpacity>
                </Pressable>  
          </View>       
      </ScrollView>
    ); 
}
export default TypeOdds;


