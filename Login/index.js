import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';

export default function Login({ navigation }) {


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState("")


  const newUser = () => {
    // navigation.navigate('Cadastrar')
    navigation.navigate('Cadastrar')
  }

  const Acessar = async () => {
    //alert('Acessou')
    console.log("Email :" + email)
    console.log("Senha :" + password)
    //http://localhost:8080/login     
    await fetch('http://192.168.15.13:8080/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
      .then((responsejson) => (
        console.log(responsejson),
        setStatus(responsejson.mensagem),
        newUser()
      )).catch((err) => {
        console.log("Erro - " + err);
      })
    // const result = await req.json();
    // console.log(result); 
  }

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={require("../../assets/usuario.png")} />

        <Text style={styles.msg}>{status}</Text>


      </View>
      <TextInput
        style={styles.inputform}
        placeholder='Email...'
        autoCorrect={false}
        value={email}
        onChangeText={text => { setEmail(text) }}
      />

      <TextInput
        style={styles.inputform}
        placeholder=' password'
        autoCorrect={false}
        value={password}
        secureTextEntry={true}
        onChangeText={text => { setPassword(text) }}
      />
      <TouchableOpacity style={styles.btnformsubmit} onPress={Acessar}>
        <Text style={styles.txtformsubmit}>Acessar</Text>
      </TouchableOpacity>

      <Text style={styles.linkUser} onPress={newUser}>Cadastrar</Text>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',




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
  linkUser: {
    color: '#fff',
    fontSize: 22,
    marginTop: 15
  },
  txtformsubmit: {
    color: '#fff',
    fontSize: 22,

  },
  msg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 22,
  }
});