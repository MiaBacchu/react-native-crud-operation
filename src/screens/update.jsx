import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { db } from '../../App';
import Button from '../components/button';
import Input from '../components/input';
import RadioButton from '../components/radito-button';
import { doc, updateDoc } from "firebase/firestore";

const colors=['red','blue','yellow']

const Update = ({navigation,route}) => {
    const noteItem = route.params.item;
    const [option,setOption]=useState(noteItem.color);
    const [title,setTitle]=useState(noteItem.title);
    const [description,setDescription]=useState(noteItem.description);
    const updateRef = doc(db, "notes", noteItem.id);

    const UpdateToDb= async ()=>{
        try{
            await updateDoc(updateRef, {
              title:title,
              description:description,
              color:option
            });
        }
        catch(error){
            console.log(error)
        }
        navigation.goBack()
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Update Your Note</Text>
            <Input value={title} onChangeText={(text)=>setTitle(text)} placeholder={'Title'}/>
            <Input value={description} onChangeText={(text)=>setDescription(text)} customStyle={styles.description} multiline={true} placeholder={'Description'}/>
            {colors.map((color)=>{
                const selected=color===option;
                return(
                    <RadioButton key={color} selected={selected} onPress={()=>setOption(color)} option={color} customStyle={{flexDirection:'row',alignItems:'center',marginTop:20,marginLeft:20}}>
                </RadioButton>
                )
            })}
            <Button onPress={UpdateToDb} customStyle={styles.button} title={'Submit'}/>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
    },
    text:{
        fontSize:18,
        marginTop:30,
        alignSelf:'center'
    },
    button:{
        alignSelf:'center',
        marginTop:50
    },
    description:{
        height:200
    }
});

export default Update;