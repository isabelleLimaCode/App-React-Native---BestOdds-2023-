import { StatusBar } from 'expo-status-bar';
import {Text, View ,Image} from 'react-native';
import logo from './../../../assets/logo.png';
import styles from '../../../styles/Styles';
export default function LinkSite() {
  return (
    <View style={styles.container} behavior={Platform.OS == "ios" ? "padding" : "height"} >
        <View style ={{flex: 0.2,top:-200}}>
            <View>
                <Text style= {{padding: 32, fontSize:14, color:'black' , fontWeight:'bold', alignItems:'center',top:-40}}>VOCÊ ESTÁ SENDO REDIRECIONADO PARA </Text>
            </View>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center',top:-35}}>
                    <Image  source={require('./../../../assets/Betano.png')}/>
            </View>
            <Text style= {styles.infoSection}>  Os grandes jogadores se distanciam dos dólares e dizem: </Text>
                    <Text style ={{fontWeight:'bold',textAlign:'center',fontSize:15}}>O dinheiro é exatamente o que fazemos</Text> 
            <View>
                <Image style={styles.image1} source={require('./../../../assets/logo_redirecionamento.png')}/>
            </View>
            <Text style={{justifyContent:'center',textAlign:'center',top:40,left:5}}>OBRIGADO POR USAR</Text>

            <View>
                    <Image source={logo} style={{marginLeft: 10, resizeMode: 'contain',height:'100%', width:'30%',top:5 ,right:-120}}></Image>
            </View>
        </View>
      <StatusBar style="auto" />
    </View>
  );
}