import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TaskItem({ task, onUpdate, onPress }) {

  const toggle = () => {
    const tarefaAtualizada = {
      ...task,
      concluida: task.concluida ? 0 : 1,
      dataConclusao: !task.concluida
        ? new Date().toLocaleString('pt-BR')
        : null
    };

    onUpdate(tarefaAtualizada);
  };

  return (
    <View style={[
      styles.card,
      task.concluida ? styles.concluida : styles.pendente
    ]}>
      
      <TouchableOpacity onPress={toggle}>
        <Text style={styles.checkbox}>
          {task.concluida ? '☑' : '☐'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onPress}>
        <Text style={[
          styles.texto,
          task.concluida && styles.riscado
        ]}>
          {task.titulo}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 0,
    borderBottomColor: '#333'
  },
  concluida: { backgroundColor: '#333' },

  checkbox: {
    color: '#fff',
    fontSize: 18,
    marginRight: 10
  },

  texto: {
    color: '#fff',
    fontSize: 16
  },

  riscado: {
    textDecorationLine: 'line-through'
  }
});