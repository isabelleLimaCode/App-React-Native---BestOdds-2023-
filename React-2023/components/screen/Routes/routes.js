import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, Entypo, MaterialIcons, AntDesign, Ionicons ,FontAwesome} from '@expo/vector-icons';
import Live from '../user/Live';
import SearchLeague from '../user/SearchLeague';

import Favorites from '../user/Favorites';
import Games from '../user/Games';
import League from '../user/Leagues';
import BestOddsHeader from '../user/BestOddsHeader';
import { UserScreen } from '../user/UserScrennMenu';
import { AdminCrud } from '../Services/AdminCrud';
import favorites from '../user/Favorites';

const Tab = createBottomTabNavigator();

const  Routes = () => {
    return(
                    <Tab.Navigator
                    screenOptions={{
                    tabBarStyle: {
                        backgroundColor: '#fff',
                        borderTopColor: 'transparent',
                    },
                    tabBarActiveTintColor: '#059669',
                    tabBarTabStyle: {
                        padding: 5,
                        paddingTop: 5,
                    },
                    }}
                >
                <Tab.Screen 
                name='perfil' 
                component={UserScreen}
                options={{
                    headerShown: true,
                    header: () => <BestOddsHeader/>,
                    tabBarIcon: ({size, color}) => (
                        <FontAwesome name="user-circle-o" size={size} color={color}/>
                    )
                }}/>
             

                <Tab.Screen 
                name='BestOdds' 
                component={Games}
                options={{
                    headerShown: true,
                    header: () => <BestOddsHeader/>,
                    tabBarIcon: ({size, color}) => (
                        <Ionicons name='football-outline' size={size} color={color}/>
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
                name='Favoritos' 
                component={Favorites}
                options={{
                    headerShown: true,
                    header: () => <BestOddsHeader/>,
                    tabBarIcon: ({size, color}) => (
                        <AntDesign name='star' size={size} color={color}/>
                        
                    )
                }}/>
                 <Tab.Screen 
                name='Pesquisa' 
                component={SearchLeague}
                options={{
                    headerShown: true,
                    header: () => <BestOddsHeader/>,
                    tabBarIcon: ({size, color}) => (
                        <Feather name='search' size={size} color={color}/>
                    )
                }}
                />

              

                
            </Tab.Navigator>

    )
}

export default  Routes;
