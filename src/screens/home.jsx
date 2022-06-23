//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { auth, db } from '../../App';
import Button from '../components/button';
import {signOut } from "firebase/auth";
import { Feather, AntDesign } from '@expo/vector-icons';
import { collection, query, where, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { SafeAreaView } from 'react-native-safe-area-context';

// create a component
const Home =({navigation,user}) => {
    const [notes,setNotes]=useState([]);
    useEffect(()=>{
        const q = query(collection(db, "notes"), where("uid", "==",user.uid));
const notesLisnerSubscription = onSnapshot(q, (querySnapshot) => {
    console.log('this is notes data',querySnapshot)
  const list = [];
  querySnapshot.forEach((doc) => {
      list.push({...doc.data(),id:doc.id});
  });
  setNotes(list)
});
return notesLisnerSubscription;
    },[]);
    const SignOut=()=>{
        signOut(auth)
        .then(() => {
            console.log('signout succesfull')
          })
        .catch((error) => {
            console.log(error)
          });
    };
    const renderItem = ({ item }) => (
        <Pressable onPress={()=>navigation.navigate('Update',{item})} style={[styles.item,{backgroundColor:item.color}]}>
        <Pressable onPress={()=>{
            deleteDoc(doc(db, "notes",item.id));
        }} style={{alignSelf:'flex-end'}}><AntDesign name="delete" size={24} color="black" /></Pressable>
        <Text>{item.title}</Text>
        <Text>{item.description}</Text>
        </Pressable>
      );
    return (
        <SafeAreaView>
            <View style={styles.container}>
            <View style={styles.child}>
            <Text style={{fontSize:40}}>HOME</Text>
            <Pressable onPress={()=>navigation.navigate('Create')}>
            <Feather style={{fontSize:40,color:'blue'}} name="plus-circle" size={24} color="black" />
            </Pressable>
            <Button onPress={SignOut} title='sign out'></Button>
            </View>
        </View>
        <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={item => item.uid}
      />
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems:'flex-start'
    },
    child:{
        flex: 1,
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems:'center'
    },
    item:{
        margin:30,
        borderRadius:15,
        padding:20,
    }
});

//make this component available to the app
export default Home;
