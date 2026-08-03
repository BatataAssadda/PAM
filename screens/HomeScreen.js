import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      
      <View style={styles.logoContainer}>
        <Image
          source={ require('../assets/logo.png') } 
          style={styles.logo}
        />
      </View>

      {/* Texto sobre o app */}
      <Text style={styles.titulo}>NoDumb - Tarefas</Text>
      <Text style={styles.descricao}>
        Este aplicativo foi desenvolvido para ajudar você a organizar suas tarefas diárias de forma simples e eficiente.  
        Você pode adicionar tarefas, marcar como concluídas, definir prioridades e acompanhar detalhes de cada atividade.
      </Text>

      <Text style={styles.credito}>
        Desenvolvido por: DumbCompany / Grupo Dumb
      </Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E6E8F',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoContainer: {
    backgroundColor: '#1E6E8F',
    marginBottom: 20,
    borderWidth: 0,
    borderRadius: 0,
    padding: 10,

  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain'
  },
  titulo: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center'
  },
  descricao: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22
  },
  credito: {
    fontSize: 14,
    color: '#f4b942',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});