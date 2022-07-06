import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,} from 'react-native';

export default function Listar({ navigation }) {

    const [usuarios, setUsuarios] = useState([])
    const [mensagem , setMensagem]= useState()
    async function Listar() {
        fetch('http://192.168.15.13:8080/usuarios')
            .then((response) => response.json())
            .then((responsejson) => (
                //console.log(responsejson),
                setUsuarios(responsejson.usuarios)

            )).catch((err) => {
                console.log("Error" + err)
            })
    }
    useEffect(() => {
        Listar();
    }, [])


    async function apagar(apagarid) {
        //console.log(apagarid);

        await fetch('http://192.168.15.13:8080/usuario/'+ apagarid,{
            method:"DELETE",
        })
        .then((response)=> response.json())
        .then((responseJson)=>{
            console.log(responseJson);
            setMensagem(responseJson.mensagem)
            Listar();
        }).catch(()=>{
    
        })  
        
       

    }

    async function editar(editarid) {
        navigation.navigate('Editar', {
            // id recebe o valor do editarid   
            id: editarid
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.inputform} >Listar de Usuário</Text>

            <Text style={styles.inputform} >{mensagem}</Text>
            {usuarios.map(usuario => (
                <View key={usuario.id}>
                    <Text style={styles.msg}>{usuario.Nome}</Text>

                    <TouchableOpacity style={styles.btnformsubmit} onPress={() => apagar(usuario.id)}>
                        <Text style={styles.txtformsubmit}>Apagar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnformsubmit} onPress={() => editar(usuario.id)}>
                        <Text style={styles.txtformsubmit}>Editar</Text>
                    </TouchableOpacity>
                </View>

            ))}


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
    msg: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: 22,
        padding: 2
    },
    linkUser: {
        color: '#fff',
        fontSize: 22,
        marginTop: 15
    },
    inputform: {
        backgroundColor: "orange",
        padding: 10,
        width: "90%",
        marginBottom: 15,
        color: "#fff",
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