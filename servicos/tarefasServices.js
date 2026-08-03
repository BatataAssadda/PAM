const URL = "http://192.168.0.94:3000";
// Exemplos:
// const URL = "http://192.168.0.15:3000";
// Emulador Android Studio:
// const URL = "http://10.0.2.2:3000";

export async function listarTarefas() {

    const resposta = await fetch(`${URL}/tarefas`);

    return await resposta.json();

}

export async function criarTarefa(tarefa) {

    const resposta = await fetch(`${URL}/tarefas`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(tarefa)

    });

    return await resposta.json();

}

export async function atualizarTarefa(id, tarefa) {

    const resposta = await fetch(`${URL}/tarefas/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(tarefa)

    });

    return await resposta.json();

}

export async function excluirTarefa(id) {

    const resposta = await fetch(`${URL}/tarefas/${id}`, {

        method: "DELETE"

    });

    return await resposta.json();

}