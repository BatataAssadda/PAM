import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) { 
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    if (usuario === 'admin' && senha === 'admin') {
      navigation.replace('Main'); 
    } else {
      alert('Usuário ou senha incorretos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login</Text>
      <TextInput
        placeholder="Usuário"
        value={usuario}
        onChangeText={setUsuario}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.botao} onPress={handleLogin}>
        <Text style={styles.botaoTexto}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#1E6E8F' },
  titulo: { fontSize: 24, color: '#00442D', fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  input: { backgroundColor: '#222', color: '#fff', padding: 10, borderRadius: 5, marginBottom: 15 },
  botao: { backgroundColor: '#00442D', padding: 15, borderRadius: 5, alignItems: 'center' },
  botaoTexto: { fontWeight: 'bold' }
});