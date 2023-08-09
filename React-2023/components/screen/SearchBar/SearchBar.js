// SearchBar.js
import React from "react";
import {TextInput, View, Keyboard, Button, Pressable, TouchableOpacity } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import styles from '../../../styles/StyleSearchBar.js'

const SearchBar = ({clicked, searchPhrase, setSearchPhrase, setClicked}) => {
var color = 'black';
  return (
    <View style={styles.container}>
      <View
        style={
          clicked
            ? styles.searchBar__clicked
            : styles.searchBar__unclicked
        }>

        {/* icone lupa */}
        {clicked && (
          <Pressable>
            <TouchableOpacity>
                <Feather
                  name="search"
                  size={20}
                  color='black'
                  style={{ marginLeft: 1 }}/>
            </TouchableOpacity>
          </Pressable>
        )}    
              
        {/* input */}
        <TextInput
          style={styles.input}
          placeholder="Digite sua pesquisa"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => { setClicked(true); }}
        />
        {/* icone de X, serve para limpar o inputText */}
        {clicked && (
          <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
              setSearchPhrase("")
          }}/>
        )}
      </View>
    </View>
  );
};

export default SearchBar;