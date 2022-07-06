import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';


export default function Editar({ route }) {
    //aqui recebo o id  do editarid
    // id : editarid
    const { id } = route.params;
    console.log(id);

    const [Nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    //const [password, setPassword] = useState("")
    const [mensagem, setMensagem] = useState("")


    async function Listar_um_usuario() {
        await fetch('http://192.168.15.13:8080/Um_usuario/'+ id)
            .then((response) => response.json())
            .then((responsejson) => {
                console.log(responsejson)
                setNome(responsejson.usuario.Nome);
                setEmail(responsejson.usuario.email)
                setMensagem(responsejson.mensagem)
            }).catch((err) => {
                console.log(err)
            })

    }

    const newUser = () => {
       navigation.navigate('Login')
    }
    useEffect(() => {
        Listar_um_usuario();
    }, [])
    async function Atualizar() {
        await fetch('http://192.168.15.13:8080/usuario/' + id,{
            method:"PUT",
            body: JSON.stringify({ Nome, email}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
        .then((responsejson) => (
            console.log(responsejson),
            //setMensagem(responsejson.mensagem),
            setEmail(""),
            setNome("")
           
        )).catch((err) => {
            console.log("Erro - " + err);
        })
    }
    return (
        <View>
            <Text>Atualizar Usuário</Text>

            <Text style={styles.inputform}>{mensagem}</Text>   

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
           
            <TouchableOpacity>
                <Text style={styles.txtformsubmit} onPress={Atualizar}>Atualizar</Text>
            </TouchableOpacity>

            <Text style={styles.status} onPress={newUser}>Voltar</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#161616'

    },

    linkUser: {
        color: '#fff',
        fontSize: 22,
        marginTop: 15
    },
    inputform: {
        backgroundColor: "#fff",
        padding: 10,
        width: "90%",
        marginBottom: 15,
        color: "#000",
        fontSize: 18,
        borderRadius: 7,


    },





    txtformsubmit: {
        backgroundColor: "#ebb105",
        borderRadius: 10,
        color: '#fff',
        fontSize: 22,
        width: "90%",
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
    },
})