import { useState, useFocusEffect } from 'react';
import { useNavigationState } from '@react-navigation/native';
import { Text, View, Image,StyleSheet,Pressable, TouchableOpacity} from 'react-native';
import { Surface } from 'react-native-paper'; 
import logo from '../../../assets/logo.png';
import signin from '../../../assets/conecte-se.png'
import styles from '../../../styles/StylesHeader.js';
import { MaterialCommunityIcons} from '@expo/vector-icons';


// header
const BestOddsHeader2 = ({navigation}) => {
    const [visibilibutton,setvisibilibutton] = useState(true)

  return ( 
        <Surface>
            <View style = { styles.header}>
                <View style={{height:'100%', width:'50%', top: 10}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>      
                     <Image source={logo} style={{marginLeft: 10, resizeMode: 'contain',height:'100%', width:'75%', }}></Image>
                    </TouchableOpacity>
                </View>

                <View  style ={{flexDirection:'row',marginRight:10}}>   
                          <TouchableOpacity style = {[styles.back,{top:7}]} onPress={() => navigation.navigate('Login')}>
                          <Image source={signin} style={{marginLeft: 10, resizeMode: 'contain',height:35, width:35 }}></Image>
                          </TouchableOpacity>
                </View>
              
                
            </View>   
        </Surface>
  )
}
export default BestOddsHeader2;