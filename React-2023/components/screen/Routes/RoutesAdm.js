import React from 'react';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo,Ionicons,MaterialIcons, SimpleLineIcons} from '@expo/vector-icons'; 
import TypeOdds from '../Admin/TypeOdds';
import League from '../Admin/LeagueAdm';
// import League from '../Admin/SelectLiga';

import Live from '../user/Live';
import BestOddsHome from '../Admin/BestOddsHome';
import BestOddsHeader from '../user/BestOddsHeader';
import Login from "../user/Login";
import setting from '../Admin/setting';
import SelectGame from '../Admin/SelectGame';



const Tab = createBottomTabNavigator();

export default function RoutesAdm(){
    return(
        <Tab.Navigator tabBarOptions={{
            style:{
                backgroundColor:'#fff',
                borderTopColor:'transparent'
            },
            activeTintColor:'#059669',
            tabStyle:{
                padding:5,
                paddingTop:5,
            }
        }}>
            <Tab.Screen 
            name='Odds' 
            component={TypeOdds}
            options={{
                headerShown: true,
                header: () => <BestOddsHeader/>,
                tabBarIcon: ({size, color}) => (
                    <Ionicons name='podium' size={size} color={color}/>
                )
            }}/>

            <Tab.Screen 
            name='Ligas' 
            component={League}
            options={{
                headerShown: true,
                header: () => <BestOddsHeader/>,
                tabBarIcon: ({size, color}) => (
                     <Entypo name='sports-club' size={size} color={color}/>
                )
            }}/>

            <Tab.Screen 
            name='Live' 
            component={Live}
            options={{
                headerShown: true,
                header: () => <BestOddsHeader/>,
                tabBarIcon: ({size, color}) => (
                    //<Fontisto name='livestream' size={size} color={color}/>
                    <MaterialIcons name='live-tv' size={size} color={color}/>
                )
            }}/>

    
            <Tab.Screen 
            name='BestOdds' 
            component={SelectGame}
            options={{
                headerShown: true,
                header: () => <BestOddsHeader/>,
                tabBarIcon: ({size, color}) => (
                    < Ionicons  name='football-outline' size={size} color={color}/>
                )
            }}/>

            <Tab.Screen 
            name='Menu' 
            component={setting}
            options={{
                headerShown: true,
                header: () => <BestOddsHeader/>,
                tabBarIcon: ({size, color}) => (
                    <MaterialIcons name="admin-panel-settings" size={size} color={color} />
                )
            }}/>
        </Tab.Navigator>
    )
}
