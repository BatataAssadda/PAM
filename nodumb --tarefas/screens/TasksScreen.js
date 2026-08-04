import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from '../components/TaskItem';

export default function TasksScreen() {
  const [tarefas, setTarefas] = useState([]);
  const [tarefaSelecionada, setTarefaSelecionada] = useState(null);

  const [modalAdicionar, setModalAdicionar] = useState(false);

  const [titulo, setTitulo] = useState('');
  const [detalhe, setDetalhe] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const URL = "http://10.214.158.118:3000";
  
//get
useEffect(() => { 
  carregarTarefas();
}, []);

const carregarTarefas = async () => {
  try {
    console.log("🔄 Carregando tarefas de:", `${URL}/tarefas`);
    const response = await fetch(`${URL}/tarefas`);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const dados = await response.json();
    console.log("✅ Tarefas carregadas:", dados);
    setTarefas(Array.isArray(dados) ? dados : []);

  } catch (erro) {
    console.error("❌ Erro GET:", erro);
    setTarefas([]);
  }
};

//Post
  const adicionar = async () => {

  if (!titulo) {
    console.warn("⚠️ Título vazio!");
    return;
  }

  try {
    console.log("📤 Enviando tarefa:", { titulo, detalhe, prioridade });

    const response = await fetch(`${URL}/tarefas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        titulo,
        descricao: detalhe,
        prioridade: prioridade || "Normal",
        concluida: 0
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const resultado = await response.json();
    console.log("✅ Tarefa criada:", resultado);

    await carregarTarefas();

    setTitulo("");
    setDetalhe("");
    setPrioridade("");
    setModalAdicionar(false);

  } catch (erro) {
    console.error("❌ Erro POST:", erro);
  }

};

  // atualizar
  const atualizar = async (tarefaAtualizada) => {
    try {
      console.log("✏️ Atualizando tarefa:", tarefaAtualizada);

      const response = await fetch(`${URL}/tarefas/${tarefaAtualizada.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          titulo: tarefaAtualizada.titulo,
          descricao: tarefaAtualizada.descricao,
          prioridade: tarefaAtualizada.prioridade,
          concluida: tarefaAtualizada.concluida
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const resultado = await response.json();
      console.log(" Tarefa atualizada:", resultado);

      await carregarTarefas();
    } catch (erro) {
      console.error("❌ Erro PUT:", erro);
    }
  };

  // remover
  const remover = (id) => {
    try {
      fetch(`${URL}/tarefas/${id}`, {
        method: "DELETE"
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Erro ao remover tarefa");
          }
          carregarTarefas();
        });
    } catch (erro) {
      console.log("Erro DELETE:", erro);
    }
    setTarefaSelecionada(null);
  };

  return (
    <View style={styles.container}>
     

      <FlatList
        data={tarefas}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onUpdate={atualizar}
            onPress={() => setTarefaSelecionada(item)}
          />
        )}
        ListEmptyComponent={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <Text style={{ fontSize: 16, color: '#fff', textAlign: 'center' }}>
              Nenhuma tarefa encontrada.\nClique em "+ Nova Tarefa" para começar!
            </Text>
          </View>
        }
      />

      {/* ABRIR MODAL */}
      <TouchableOpacity
        style={styles.botao}
        onPress={() => setModalAdicionar(true)}
      >
        <Text style={styles.botaoTexto}>+ Nova Tarefa</Text>
      </TouchableOpacity>

      {/* MODAL ADICIONAR */}
      <Modal visible={modalAdicionar} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitulo}>Nova Tarefa</Text>

            <TextInput
              placeholder="Título"
              value={titulo}
              onChangeText={setTitulo}
              style={styles.input}
            />

            <TextInput
              placeholder="Detalhe opcional"
              value={detalhe}
              onChangeText={setDetalhe}
              style={styles.input}
            />

   <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>Prioridade:</Text>
<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
  {['Baixa', 'Média', 'Alta'].map((nivel) => (
    <TouchableOpacity
      key={nivel}
      onPress={() => setPrioridade(nivel)}
      style={{
        flex: 1,
        padding: 10,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: prioridade === nivel ? '#00442D' : '#fff',
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: prioridade === nivel ? '#00442D' : '#0FBA7C'
      }}
    >
      <Text style={{ color: prioridade === nivel ? '#fff' : '#0FBA7C', fontWeight: 'bold' }}>
        {nivel}
      </Text>
    </TouchableOpacity>
  ))}
</View>

            <TouchableOpacity style={styles.salvar} onPress={adicionar}>
              <Text style={{ color: '#fff' }}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalAdicionar(false)}>
              <Text style={{ marginTop: 10 }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL DETALHES */}
      <Modal visible={!!tarefaSelecionada} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            {tarefaSelecionada && (
              <>
                <Text style={styles.modalTitulo}>
                  {tarefaSelecionada.titulo}
                </Text>

                <Text>Detalhe: {tarefaSelecionada.detalhe || ''}</Text>
                <Text>Data de Início: {tarefaSelecionada.data}</Text>
                <Text>Prioridade: {tarefaSelecionada.prioridade}</Text>
               <Text>
                     Status: {tarefaSelecionada.concluida ? 'Concluída' : 'Pendente'}
                          </Text>

                                    {tarefaSelecionada.dataConclusao && (
                             <Text> Concluída em: {tarefaSelecionada.dataConclusao}</Text>
                                                )}
                                                

                <TouchableOpacity
                  style={styles.remover}
                  onPress={() => remover(tarefaSelecionada.id)}
                >
                  <Text style={{ color: '#fff' }}>Remover</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setTarefaSelecionada(null)}>
                  <Text style={{ marginTop: 10 }}>Fechar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E6E8F' },



  botao: {
    backgroundColor: '#1faede',
    padding: 15,
    alignItems: 'center'
  },

  botaoTexto: { fontWeight: 'bold' },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  modal: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10
  },

  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },

  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5
  },

  salvar: {
    backgroundColor: 'green',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5
  },

  remover: {
    backgroundColor: '#03653e',
    padding: 10,
    marginTop: 15,
    alignItems: 'center',
    borderRadius: 5
  }
});