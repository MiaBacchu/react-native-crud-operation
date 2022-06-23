import { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator} from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/home';
import Create from './src/screens/create';
import SignIn from './src/screens/sign-in';
import SignUp from './src/screens/sign-up';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import Update from './src/screens/update';

const firebaseConfig = {
  apiKey: "AIzaSyBWuXfXw8WbG0ve8j8MVjJR2sZ6nHcBa-Y",
  authDomain: "aac-note-app-9b296.firebaseapp.com",
  projectId: "aac-note-app-9b296",
  storageBucket: "aac-note-app-9b296.appspot.com",
  messagingSenderId: "289925611482",
  appId: "1:289925611482:web:3732cd5b74225d2e49cae3"
};
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db = getFirestore(app);

const AppTheme={
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    background:'#fff'
  }
};
const Stack = createNativeStackNavigator();
export default function App() {
  const [user,setUser]=useState(null);
  const [loading,setLoading]=useState(false)
  useEffect(() => {
    setLoading(true)
    onAuthStateChanged(auth, (user) => {
      if (user) {
      setUser(user)
      setLoading(false)
      } else {
        setUser(null)
        setLoading(false)
      }
    });
  },[user]);
  if (loading) {
    return(
      <ActivityIndicator style={{flex:1,justifyContent:'center',alignItems:'center'}}></ActivityIndicator>
    )
}
  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator>
        {user ?(<>
          <Stack.Screen name="Home"  options={{headerShown:false}} 
        >{(props) => <Home {...props} user={user}/>}</Stack.Screen>
        <Stack.Screen name="Create">{(props) => <Create {...props} user={user}/>}</Stack.Screen>
        <Stack.Screen name="Update" component={Update} />
        </>) :(<>
          <Stack.Screen name="SignIn" component={SignIn} options={{headerShown:false}} />
        <Stack.Screen name="SignUp" component={SignUp} />
        </>)}
      </Stack.Navigator>
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
});
