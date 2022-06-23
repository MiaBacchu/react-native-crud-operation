//import liraries
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

// create a component
const Input = ({placeholder,onChangeText,secureTextEntry,multiline,customStyle,value}) => {
    return (
        <TextInput style={[styles.input,customStyle]} placeholder={placeholder} onChangeText={onChangeText} secureTextEntry={secureTextEntry} multiline={multiline} value={value} textAlignVertical={'top'}></TextInput>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    input:{
        marginTop:30,
        marginHorizontal:5,
        paddingVertical:5,
        paddingHorizontal:7,
        borderEndColor:'gray',
        borderWidth:1,
        borderRadius:5
    },
});

//make this component available to the app
export default Input;
