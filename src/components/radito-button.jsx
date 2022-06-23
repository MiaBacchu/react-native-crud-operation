//import liraries
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

// create a component
const RadioButton = ({onPress,customStyle,option,selected}) => {
    return (
        <Pressable onPress={onPress} style={customStyle}>
            <View style={styles.outerCircle}>
            <View style={[styles.innerCircle,selected && styles.selectedInnerCircle]}/>
            </View>
            <Text style={styles.name}>{option}</Text>
        </Pressable>
    );
};

// define your styles
const styles = StyleSheet.create({
    text:{
        alignSelf:'center',
        fontSize:25,
        marginTop:15
    },
    signUp:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center',
        marginBottom:25
    },
    outerCircle:{
        width:30,
        height:30,
        borderRadius:15,
        borderWidth:1,
        borderColor:'gray',
        justifyContent:'center',
        alignItems:'center',
        marginRight:8
    },
    innerCircle:{
        width:16,
        height:16,
        borderRadius:8,
        borderWidth:1,
        borderColor:'gray'
    },
    name:{
        fontSize:20
    },
    selectedInnerCircle:{
        backgroundColor:'green',
        borderColor:'green'
    }
});
//make this component available to the app
export default RadioButton;