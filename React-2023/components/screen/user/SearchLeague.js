import React, { useState, useEffect} from "react";
import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  FlatList,
  Image
} from "react-native";
import SearchBar from "./../SearchBar/SearchBar";
import styles from '../../../styles/StyleSearchLeague.js';
import { FlashList } from "@shopify/flash-list";
import { AntDesign} from '@expo/vector-icons'; 
import {db,firebase,auth} from './../Services/firebaseconfig';
import { collection, getDocs,arrayRemove,arrayUnion,getDoc, updateDoc,doc,setDoc} from 'firebase/firestore';
import styles3 from '../../../styles/StylesCardLeagues'
function SearchLeague() {


    const [searchPhrase, setSearchPhrasse] = useState("");
    const [allcolection, setallcolection] = useState([]);
    const [visibili,setvisibilie] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [changestar,setchangerstar] = useState(false);
    const[collection2, SetCollection2] = useState([]);
    const[ FilteredJogosData,setFilteredJogosData] = useState([]);
    useEffect(() => {

        const fetchData = async () => {
            try {

                if (collection2.length === 0) {
                    const jogoRef = collection(db, 'teams');
                    const leaguesRef = collection(db, 'leagues');
                    const bookmakersRef = collection(db, 'bookmakers');
            
                    //const leagues = query(leaguesRef, where('nome', '>=', searchPhrase.toUpperCase())); 
                    //const bookmakers = query(bookmakersRef, where('nome', '>=', searchPhrase.toUpperCase())); 
                    //const jogo = query(jogoRef, where('nome', '>=', searchPhrase.toUpperCase())); 
            
            
                    const querySnapshot = await getDocs(jogoRef);
                    const jogosData = querySnapshot.docs.map((doc) => {
                        return {
                        id: doc.id,
                        ...doc.data()
                        };
                    });
            
                    
            
                    const querySnapshot3 = await getDocs(leaguesRef);
                    const jogosData3 = querySnapshot3.docs.map((doc) => {
                        return {
                        id: doc.id,
                        ...doc.data()
                        };
                    });
            
                    SetCollection2([...jogosData,...jogosData3]);
                }
              
            } catch (error) {
              console.log('Erro ao puxar jogos:', error);
            }
          };
        

          fetchData();
        
      }, []);


      useEffect(() => {
        const filteredJogosData = collection2.map((jogo) => {
            if (jogo.nome.toLowerCase().includes(searchPhrase.toLowerCase())) {
              return jogo;
            }
            return null;
          }).filter(Boolean);

          setFilteredJogosData(filteredJogosData);
      }, [searchPhrase]);


      const [selectedItems, setSelectedItems] = useState([]);
      const user = auth.currentUser;
        
      const addToFavorites = (favoritosRef, item) => {
        return updateDoc(favoritosRef, {
          id: arrayUnion(item.id),
          logo: arrayUnion(item.logo),
          nome: arrayUnion(item.nome),
        });
      };

    
      
      const SelectedItem = (item) => {
        const favoritosRef = doc(db, 'favoritos', user.uid);
        getDoc(favoritosRef)
          .then((FavoritosSnap) => {
            if (FavoritosSnap.exists()) {
              const favoritosData = FavoritosSnap.data();
              if (!favoritosData || !favoritosData.nome || !favoritosData.nome.includes(item.nome)) {
                addToFavorites(favoritosRef, item)
                  .then(() => {
                    console.log('Novo item adicionado aos favoritos!');
                  })
                  .catch((error) => {
                    console.log('Erro ao adicionar o item aos favoritos:', error);
                  });
              } else {
                console.log('Item já existe nos favoritos!');
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
          //apaga o item do array se o itemIndex retornar difrente de -1 significa que esta presente no array então faz a copia dele e splice remove se um item não esta selecionado
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
        const isItemSelected = selectedItems.some(
          (selectedItem) => selectedItem.id === item.id
        );
      
        return (
          <TouchableOpacity
            style={[
              styles3.cardConteiner,
              isItemSelected ? styles3.selectedCard : null,
            ]}
            onPress={() => SelectedItem(item)}
          >
            <Image
              style={[
                styles3.imagStyles,
                { width: 100, height: 100, alignSelf: 'flex-start', marginTop: -10 },
              ]}
              source={{ uri: item.logo }}
            />
            <View style={styles3.card}>
              <View style={{ top: 30 }}>
                <Text style={[styles3.text2, { left: 20, alignSelf: 'center' }]}>
                  {item.nome}
                </Text>
              </View>
              <TouchableOpacity
                style={{ alignSelf: 'flex-end', left: 45, top: -20 }}
                onPress={() => SelectedItem(item)}
              >
                <AntDesign
                  name="star"
                  size={20}
                  color={isItemSelected ? '#F0BE0E' : '#fff'}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        );
      };
      
      useEffect(() => {
        console.log(selectedItems);
      }, [selectedItems]);

      
     return (
        <View style={styles.container} behavior={Platform.OS == "ios" ? "padding" : "height"} >

            <SafeAreaView style={styles.root}>
                

                {!clicked &&  
                <View> 
                    <Text style={styles.title} > Encontre as equipas </Text>
                </View> }
                <SearchBar
                    searchPhrase={searchPhrase}
                    setSearchPhrase={setSearchPhrasse}
                    clicked={clicked}
                    setClicked={setClicked} />
            </SafeAreaView>
            {searchPhrase &&( 
                 <FlatList
                 data={FilteredJogosData}
                 keyExtractor={(item) => item.id}
                 renderItem={renderItem}
               />
                )
             }
        </View>
       
    );
}
export default SearchLeague;


