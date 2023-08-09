import React, { useState} from "react"
import styles from '../../../styles/StyleLigaCardAdm';
import { Octicons,Feather} from '@expo/vector-icons';
import { Text, View,TouchableOpacity,Image} from 'react-native'; 



export default function CardLeagues() {
    const [eyes,setEyes] = useState(false);
    
  return (
    <View>       
    <View style = {styles.cardConteiner}>
        <View style={styles.containerIn}>
            <View style={styles.eye}>
                <TouchableOpacity onPress={ () => setEyes(!eyes)}>
                {!eyes &&(
                    <Feather name="eye" size={24} color="black" />
                )}
                {eyes &&(
                     <Feather name="eye-off" size={24} color="black" />
                )}                   
                </TouchableOpacity>
            </View>
            <View style={styles.ImgLeague2}>
                <Image source={require('../../../assets/Bwin_casa_aposta.png')}/>
            </View>
            
        
        
            
            <View>
                <Text style={styles.TextLeague}> Bwin </Text>
            </View>
           
            <View style={styles.Arrow}>             
                <TouchableOpacity>
                    <Octicons name="chevron-right" size={24} color="black" />
                </TouchableOpacity>                
            </View>
        </View>        
    </View>
</View>
  );
}

 {/* <TouchableOpacity style = {{right: -200,top:-50,}} onPress={ () => setchangerstar(!changestar)}>
                    {!changestar &&(
                            <AntDesign name="star" size={20} color="#F0BE0E" />
                    )}
                    {changestar &&(
                        <AntDesign name="star" size={20} color="#fff" />
                    )}
                </TouchableOpacity> */}