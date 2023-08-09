import React, { useState,useEffect} from "react";
import { Text, View, Image,Pressable, TouchableOpacity,Modal,TouchableWithoutFeedback} from 'react-native';
import { Surface } from 'react-native-paper'; 
import { Ionicons, FontAwesome,FontAwesome5} from '@expo/vector-icons'; 
import logo from '../../../assets/logo.png';
import styles from '../../../styles/StylesHeader.js';
import styles2 from '../../../styles/StylesLogin';
import {getAuth,onAuthStateChanged}from "firebase/auth";
import {auth,db} from './../Services/firebaseconfig'
import { collection,query,where,getDocs} from 'firebase/firestore';
import { CommonActions } from '@react-navigation/native';




// header
const BestOddsHeader = ({navigation}) => {


  return ( 
 
            <View style = { styles.header}>
                <TouchableOpacity style={{height:'100%', width:'50%', top: 10}} >
                    <Image source={logo} style={{marginLeft: 10, resizeMode: 'contain',height:'100%', width:'75%', }}></Image>
                </TouchableOpacity>
            </View>   

  )
}
export default BestOddsHeader;