import React, { useState } from 'react';

import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
export default function Cadastrar({ navigation, route }) {

    //console.log(route.params);


    const [Nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [mensagem, setMensagem] = useState("")

    const Acessar = async () => {
        console.log(Nome)
        console.log(email)
        console.log(password)



        await fetch('http://192.168.15.13:8080/usuario', {
            method: 'POST',
            body: JSON.stringify({ Nome, email, password }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
            .then((responsejson) => (
                //console.log(responsejson.mensagem),
                setMensagem(responsejson.mensagem),
                setEmail(""),
                setNome(""),
                setPassword("")
            )).catch((err) => {
                console.log("Erro - " + err);
            })
    }



    const newUser = () => {
        navigation.navigate('Listar')


    }

    return (
        <View style={styles.container}>
            <Text style={styles.linkUser}>Cadastra se</Text>

            <Text style={styles.status}>{mensagem}</Text>
            <TextInput
                style={styles.inputform}
                placeholder=' Nome...'
                autoCorrect={false}
                value={Nome}
                onChangeText={(text) => { setNome(text) }}
            />

            <TextInput
                style={styles.inputform}
                placeholder='email...'
                autoCorrect={false}
                value={email}
                onChangeText={(text) => { setEmail(text) }}
            />

            <TextInput
                style={styles.inputform}
                placeholder='insira um password'
                autoCorrect={false}
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => { setPassword(text) }}
            />
            <TouchableOpacity style={styles.btnformsubmit}>
                <Text style={styles.txtformsubmit} onPress={Acessar}>cadastrar</Text>
            </TouchableOpacity>

            <Text style={styles.status} onPress={newUser}>Listar</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#161616'

    },
    logo: {
        color: 'white'
    },
    inputform: {
        backgroundColor: "#fff",
        padding: 10,
        width: "90%",
        marginBottom: 15,
        color: "#222",
        fontSize: 18,
        borderRadius: 7

    },
    btnformsubmit: {
        backgroundColor: "#ebb105",
        width: "90%",
        fontSize: 18,
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 7

    },
    status: {
        color: 'green',
        fontSize: 22,
        marginBottom: 5
    },
    txtformsubmit: {
        color: '#fff',
        fontSize: 22,

    }
});