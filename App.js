import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Screens/Home/HomeScreen';
import ProfileScreen from './Screens/Profile/ProfileScreen';
import CadastroScreen from './Screens/Cadastro/CadastroScreen';
import { CadastroScreenNavigator } from './Screens/Cadastro/CadastroScreen';
import CEPScreen from './Screens/CEP/CEPScreen';

const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Cadastro" component={CadastroScreenNavigator} />
        <Tab.Screen name="CEP" component={CEPScreen} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  },
  title: {
  fontSize: 24,
  marginBottom: 20,
  }
  });