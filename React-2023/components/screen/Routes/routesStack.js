import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../Free_access/MainScreen';
import Login from '../user/Login';
// import Routes from './routes';
import RoutesAdm from './RoutesAdm' 
import CreateUser from '../user/CreateUser';
import AcessLeaguesOdds from '../user/AccessLeaguesOdds';
import SelectBookMakers from '../user/SelectBookMakers';
import Games from '../user/Games';
import BestOddsHeader2 from '../Free_access/BestOddsHeader2';
import BestOddsHeader from '../user/BestOddsHeader';
import League from '../Admin/LeagueAdm';
import SelectLiga from '../Admin/SelectLiga';
import AdcApostas from '../Admin/AdcAposta';
import SelectGamer from '../Admin/SelectGame';
import Routes from './routes';
import ModelPerfilUser from '../user/ModelPerfilUser';
import LinkSite from '../user/LinkSite';
import DeleteAccount from '../user/DeleteAccount';
import PasswordReset from '../user/PasswordReset';
import MessageDelete from '../user/MessageDelete';
import MessageDesativar from '../user/MessageDesativar';

const Stack = createStackNavigator();
const headerType = 2;

export function RoutesStack() {
  const [isuser,SetisUser] = useState(false);
  const [isadmin,SetisAdmin] = useState(true);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen" screenOptions={{animationEnabled: false}}>
      <Stack.Screen 
          name='MainScreen' 
          component={MainScreen}
          options={{ header: (props) => <BestOddsHeader2 {...props} /> }}
          
        />
      <Stack.Screen 
          options={{ header: (props) => <BestOddsHeader2 {...props} /> }}
          name='Login' 
          component={Login} 
        />
        <Stack.Screen 
          options={{ header: (props) => <BestOddsHeader2 {...props} /> }}
          name='Criar conta' 
          component={CreateUser} 
        />

            <Stack.Screen 
            options={{headerShown: false }}
            name='Home' 
            component={Routes} 
          />


             <Stack.Screen 
             options={{headerShown: false }}
             name='admin' 
             component={RoutesAdm} 
           />

       
       
        <Stack.Screen 
         options={{ header: (props) => <BestOddsHeader {...props} /> ,presentation: 'modal'}}
         name='Leagues' 
          component={AcessLeaguesOdds} />

        <Stack.Screen 
        options={{ header: (props) => <BestOddsHeader {...props} /> }}
        name='JogosDaAposta' 
        component={SelectBookMakers} />
        <Stack.Screen options={{headerShown: false }} name='Games' component={Games} />


        <Stack.Screen 
        options={{ header: (props) => <BestOddsHeader {...props} /> }}
        name='SelectLiga' 
        component={SelectLiga} />

      <Stack.Screen 
        options={{ header: (props) => <BestOddsHeader {...props} /> }}
        name='LigaAdm' 
        component={League} />

      <Stack.Screen 
        options={{ header: (props) => <BestOddsHeader {...props} /> }}
        name='adcAposta' 
        component={AdcApostas} />   

      <Stack.Screen 
        options={{ header: (props) => <BestOddsHeader {...props} /> }}
        name='selectGamerAdm' 
        component={SelectGamer} /> 

        <Stack.Screen 
        name='Modal' 
        component={ModelPerfilUser}  
        options={{ header: (props) => <BestOddsHeader {...props} /> }}
        />

      <Stack.Screen 
        name='linkcasa' 
        component={LinkSite}  
        options={{ header: (props) => <BestOddsHeader2 {...props} /> }}
        />

      <Stack.Screen 
        name='deletconta' 
        component={DeleteAccount}  
        options={{ header: (props) => <BestOddsHeader2 {...props} /> }}
        />

      <Stack.Screen 
        name='ResetPass' 
        component={PasswordReset}  
        options={{ header: (props) => <BestOddsHeader2 {...props} /> }}
        />

      <Stack.Screen 
        name='MessageDelete' 
        component={MessageDelete}  
        options={{ header: (props) => <BestOddsHeader2 {...props} /> }}
        />
         <Stack.Screen 
        name='MessageDesativar' 
        component={MessageDesativar}  
        options={{ header: (props) => <BestOddsHeader2 {...props} /> }}
        />
        


      </Stack.Navigator>

      
    </NavigationContainer>
  );
}