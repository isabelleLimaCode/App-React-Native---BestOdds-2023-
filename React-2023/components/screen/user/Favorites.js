import React, { useState ,useEffect } from 'react';
import {Text, View,TouchableOpacity,ScrollView,Image, FlatList,RefreshControl} from 'react-native';
import styles from '../../../styles/StyleBestOdds';
import styles2 from '../../../styles/StyleBestOdds';
import styles3 from '../../../styles/StylesCardLeagues';
import { AntDesign} from '@expo/vector-icons'; 
import { FlashList } from "@shopify/flash-list";
import {db,firebase,auth} from './../Services/firebaseconfig';
import { collection, getDocs,arrayRemove,getDoc, updateDoc,doc,setDoc,where,query} from 'firebase/firestore';

export default function favorites({navigation}) {
    const [selectedButton2, setSelectedButton2] = useState(1);
    const [changestar,setchangerstar] = useState(false);
    const [open,setopen] = useState(true);
    const[collection2, SetCollection2] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const[ FilteredJogosData,setFilteredJogosData] = useState([]);
    const[Donthave,SetDonthave] = useState(false);
    const [refreshing, setRefreshing] = React.useState();

    const onRefresh = React.useCallback(async () => {
      setRefreshing(true);
      await fetchData();
      setRefreshing(false);
    }, [FilteredJogosData,SetDonthave]);



    function handlePressEquipas() {
        setSelectedButton2(1);
        setopen(true)

    }

    useEffect(() => {
      if (FilteredJogosData.length > 0) {
        SetDonthave(false);
      } else {
        SetDonthave(true);
      }
      setRefreshing(false);
    }, [FilteredJogosData, SetDonthave]);
    

    function handlePressCasas() {
        setSelectedButton2(2);
        setopen(false)
       }

       const fetchData = async () => {
        try {
          const userId = auth.currentUser.uid;
          const favoritosRef = doc(db, 'favoritos', userId);
          const docSnapshot = await getDoc(favoritosRef);
          console.log(Donthave);
          if (docSnapshot.exists()) {
            const favoritos = docSnapshot.data();
            console.log(favoritos);
            SetCollection2(favoritos);
              console.log('favoritos',favoritos);
              console.log('favoritosid',favoritos.id);
              console.log('favoritoslen',favoritos.id.length);
            
          }
        } catch (error) {
          console.log('Erro ao puxar Favoritos:', error);
        }
      };
  
      useEffect(() => {
       
          fetchData();
        
      }, []);  

      useEffect(() => {
       
        console.log('donthave',Donthave);
      
    }, [Donthave]);  

      const RemoveToFavorites = (favoritosRef, item) => {
        return updateDoc(favoritosRef, {
          id: arrayRemove(item.id),
          logo: arrayRemove(item.logo),
          nome: arrayRemove(item.nome),
        });
      };

        const SelectedItem = (item) => {    
          const userId = auth.currentUser.uid;
          const favoritosRef = doc(db, 'favoritos', userId);
          getDoc(favoritosRef)
            .then((FavoritosSnap) => {
              if (FavoritosSnap.exists()) {
                const favoritosData = FavoritosSnap.data();
                if (favoritosData && favoritosData.nome && favoritosData.nome.includes(item.nome)) {
                  RemoveToFavorites(favoritosRef, item)
                    .then(() => {
                      console.log('item Removido aos favoritos!');
                    })
                    .catch((error) => {
                      console.log('Erro ao remover o item aos favoritos:', error);
                    });
                }
              } else {
                
                const favoritosData = {
                  id: [item.id],
                  logo: [item.logo],
                  nome: [item.nome],
                };
                setDoc(favoritosRef, favoritosData)
                  .then(() => {
                    console.log('Novo item adicionado aos favoritos!');
                  })
                  .catch((error) => {
                    console.log('Erro ao adicionar o item aos favoritos:', error);
                  });
              }
            })
            .catch((error) => {
              console.log('Erro ao obter o documento favoritos:', error);
            });
           

        setSelectedItems((prevSelectedItems) => {
          const itemIndex = prevSelectedItems.findIndex(
            (selectedItem) => selectedItem.id === item.id
          );
          if (itemIndex !== -1) {
            const updatedSelectedItems = [...prevSelectedItems];
            updatedSelectedItems.splice(itemIndex, 1);
        
            return updatedSelectedItems;
          } else {
            return [...prevSelectedItems, item];
           
          }
        });
      };

      const renderItem = ({ item }) => {
        const favorito = item;
      
        if (!favorito || !favorito.id || !favorito.logo || !favorito.nome) {
          return null;
        }
      
        const isItemSelected = selectedItems.some(
          (selectedItem) => selectedItem.id === favorito.id
        );
      
        return (
          <TouchableOpacity
            style={[
              styles3.cardConteiner,
              isItemSelected ? styles3.selectedCard : null,
            ]}
            onPress={() => SelectedItem(favorito)}
          >
            <Image
              style={[
                styles3.imagStyles,
                { width: 100, height: 100, alignSelf: 'flex-start', marginTop: -10 },
              ]}
              source={{ uri: favorito.logo }}
            />
            <View style={styles3.card}>
              <View style={{ top: 30 }}>
                <Text style={[styles3.text2, { left: 20, alignSelf: 'center' }]}>
                  {favorito.nome}
                </Text>
              </View>
              <TouchableOpacity
                style={{ alignSelf: 'flex-end', left: 45, top: -20 }}
                onPress={() => SelectedItem(favorito)}
              >
                <AntDesign
                  name="star"
                  size={20}
                  color={isItemSelected ? '#FFF' : '#F0BE0E'}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        );
      };
      
      
      useEffect(() => {
        if (
          collection2 &&
          Array.isArray(collection2.id) &&
          Array.isArray(collection2.logo) &&
          Array.isArray(collection2.nome) &&
          collection2.id.length === collection2.logo.length &&
          collection2.id.length === collection2.nome.length
        ) {
          const transformedData = collection2.id.map((_, index) => ({
            id: collection2.id[index],
            logo: collection2.logo[index],
            nome: collection2.nome[index]
          }));
      
          setFilteredJogosData(transformedData);
          console.log('filtre', transformedData);
        }
      }, [collection2,SetDonthave]);
      
      
      
      
      
      
      
  return (
    <View style ={styles.conteiner} behavior={Platform.OS == "ios" ? "padding" : "height"} >
         <View style ={styles2.btnContainerMain}>      
                <TouchableOpacity
                onPress={handlePressEquipas}>
                    <Text style={styles2.buttonText}>Equipas Favoritas</Text>
                </TouchableOpacity>                                                                       
            </View>                             
            {Donthave ?(
                 <View>
                 <ScrollView
                   refreshControl={
                     <RefreshControl
                       style={{ position: 'absolute', alignSelf: 'center', color: '#059669' }}
                       refreshing={refreshing}
                       onRefresh={onRefresh}
                     />
                   }
                 >
                   <Image style={{ width: 350, height: 350, marginBottom: 10, alignSelf: 'center' }} source={require('./../../../assets/rocket.gif')} />
                   <Text style={{ alignSelf: 'center', top: -25, fontWeight: 'bold' }}>Oh! Não há Ainda favoritos!</Text>
                 </ScrollView>
               </View>
            ): (
              <View style={{flex:1, backgroundColor:'#fff'}}>
              <FlatList
                data={FilteredJogosData}
                keyExtractor={(item, index) => item.id}
                renderItem={renderItem}
                refreshControl={ <RefreshControl style={{position:'absolute',alignSelf:'center', color:'#059669'}} refreshing={refreshing} onRefresh={onRefresh} />}
              />
              </View>
            )}
           
          </View>
  );
}
