import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Router from './pages/Router';
import DataProvider from './store/data-context';
import { RootSiblingParent } from 'react-native-root-siblings';


export default function App() {

  
  return (
    <DataProvider>
       <RootSiblingParent> 
        
    <Router />
    </RootSiblingParent>
    <StatusBar style="auto" />
    </DataProvider>
  );
}

const styles = StyleSheet.create({

});
