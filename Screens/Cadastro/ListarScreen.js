import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Alert, Modal } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import axios from 'axios';
import TextInputBox from '../../Componentes/TextInputBox/TextInputBox';

function ListarScreen() {
    const [alunos, setAlunos] = useState([]);
    const [status, setStatus] = useState('');
    const [idAluno, setIdAluno] = useState('');
    
    // Estados para o modo de edição
    const [modoEdicao, setModoEdicao] = useState(false);
    const [alunoEditando, setAlunoEditando] = useState(null);
    const [nomeEdit, setNomeEdit] = useState('');
    const [telefoneEdit, setTelefoneEdit] = useState('');
    const [idadeEdit, setIdadeEdit] = useState('');
    const [turmaEdit, setTurmaEdit] = useState('');
    
    const buscarAlunos = async () => {
        try {
            setStatus('Carregando...');
            const resposta = await axios.get('http://192.168.8.1:3000/alunos');
            setAlunos(resposta.data);
            setStatus('');
        } catch (erro) {
            console.error('Erro ao buscar alunos:', erro);   
            setStatus('Erro ao buscar alunos');
        } 
    };

    const buscarAlunoID = async () => {
        // Validar se o ID foi informado
        if (!idAluno || idAluno.trim() === '') {
            setStatus('Por favor, informe o ID do aluno');
            return;
        }

        try {
            setStatus('Buscando aluno...');
            const resposta = await axios.get(`http://192.168.8.1:3000/alunos/${idAluno}`);
            
            if (resposta.data) {
                setAlunos([resposta.data]); // Coloca o aluno encontrado na lista
                setStatus('');
            } else {
                setStatus('Aluno não encontrado');
                setAlunos([]);
            }
        } catch (erro) {
            console.error('Erro ao buscar aluno por ID:', erro);
            setStatus('Erro ao buscar aluno por ID');
            setAlunos([]);
        }
    };

    const deletarAluno = async (id) => {
        try {
            setStatus('Excluindo...');
            await axios.delete(`http://192.168.8.1:3000/alunos/${id}`);
            
            // Remover o aluno da lista após excluir
            setAlunos(alunos.filter(aluno => aluno.id !== id));
            
            setStatus('Aluno excluído com sucesso!');
        } catch (erro) {
            console.error('Erro ao excluir aluno:', erro);
            setStatus('Erro ao excluir aluno');
        }
    };

    // Função para iniciar a edição de um aluno
    const iniciarEdicao = (aluno) => {
        setAlunoEditando(aluno);
        setNomeEdit(aluno.nome || '');
        setTelefoneEdit(aluno.telefone || '');
        setIdadeEdit(aluno.idade ? aluno.idade.toString() : '');
        setTurmaEdit(aluno.turma || '');
        setModoEdicao(true);
    };

    // Função para salvar as alterações
    const salvarEdicao = async () => {
        if (!nomeEdit || !telefoneEdit || !idadeEdit || !turmaEdit) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        try {
            setStatus('Atualizando aluno...');
            
            const dadosAtualizados = {
                nome: nomeEdit,
                telefone: telefoneEdit,
                idade: parseInt(idadeEdit, 10),
                turma: turmaEdit,
            };
            
            const resposta = await axios.put(
                `http://192.168.8.1:3000/alunos/${alunoEditando.id}`, 
                dadosAtualizados
            );
            
            // Atualizar o aluno na lista local
            const alunosAtualizados = alunos.map(aluno => {
                if (aluno.id === alunoEditando.id) {
                    return { ...aluno, ...dadosAtualizados };
                }
                return aluno;
            });
            
            setAlunos(alunosAtualizados);
            setStatus('Aluno atualizado com sucesso!');
            cancelarEdicao();
        } catch (erro) {
            console.error('Erro ao atualizar aluno:', erro);
            setStatus('Erro ao atualizar aluno');
        }
    };

    // Função para cancelar a edição
    const cancelarEdicao = () => {
        setAlunoEditando(null);
        setModoEdicao(false);
    };
  
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Usuários cadastrados</Text>
            
            {/* Botões de busca */}
            <TouchableOpacity 
                style={styles.button}
                onPress={buscarAlunos}
            >
                <Text style={styles.buttonText}>Buscar todos</Text>
            </TouchableOpacity>

            {/* Área de busca por ID */}
            <View style={styles.searchContainer}>
                <TextInputBox
                    placeholder="Digite o ID do aluno"
                    keyboardType="numeric"
                    value={idAluno}
                    onChangeText={(text) => setIdAluno(text)}
                />
                <TouchableOpacity 
                    style={styles.button}
                    onPress={buscarAlunoID}
                >
                    <Text style={styles.buttonText}>Buscar aluno por ID</Text>
                </TouchableOpacity>
            </View>
            
            {/* Exibição do status */}
            {status ? <Text style={styles.status}>{status}</Text> : null}

            {/* Lista de alunos */}
            <ScrollView style={styles.scrollView}>
                {alunos.length > 0 ? (
                    alunos.map((aluno, index) => (
                        <View key={`aluno-${index}-${aluno.id || 'no-id'}`} style={styles.alunoCard}>
                            <Text style={styles.alunoNome}>{aluno.nome || 'Nome não informado'}</Text>
                            <Text>Telefone: {aluno.telefone || 'Não informado'}</Text>
                            <Text>Idade: {aluno.idade || 'Não informada'}</Text>
                            <Text>Turma: {aluno.turma || 'Não informada'}</Text>
                            
                            <View style={styles.actionButtons}>
                                <TouchableOpacity onPress={() => iniciarEdicao(aluno)}>
                                    <Text style={styles.editUnder}>Editar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => deletarAluno(aluno.id)}>
                                    <Text style={styles.deleteUnder}>Excluir</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noData}>Nenhum aluno encontrado</Text>
                )}
            </ScrollView>
            
            {/* Modal para edição */}
            <Modal
                visible={modoEdicao}
                transparent={true}
                animationType="slide"
                onRequestClose={cancelarEdicao}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Editar Aluno</Text>
                        
                        <TextInputBox
                            placeholder="Nome"
                            value={nomeEdit}
                            onChangeText={setNomeEdit}
                        />
                        
                        <TextInputBox
                            placeholder="Telefone"
                            value={telefoneEdit}
                            onChangeText={setTelefoneEdit}
                        />
                        
                        <TextInputBox
                            placeholder="Idade"
                            value={idadeEdit}
                            onChangeText={setIdadeEdit}
                            keyboardType="numeric"
                        />
                        
                        <TextInputBox
                            placeholder="Turma"
                            value={turmaEdit}
                            onChangeText={setTurmaEdit}
                        />
                        
                        <View style={styles.modalButtons}>
                            <TouchableOpacity 
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={cancelarEdicao}
                            >
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                style={[styles.modalButton, styles.saveButton]}
                                onPress={salvarEdicao}
                            >
                                <Text style={styles.buttonText}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    searchContainer: {
        width: '100%',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    status: {
        marginBottom: 10,
        color: '#666',
        fontWeight: 'bold',
    },
    scrollView: {
        width: '100%',
        maxHeight: '70%',
    },
    alunoCard: {
        backgroundColor: '#f8f9fa',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#dee2e6',
    },
    alunoNome: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    editUnder: {
        color: 'blue',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 15,
    },
    deleteUnder: {
        color: 'red',
        fontSize: 16,
        fontWeight: 'bold',
    },
    noData: {
        textAlign: 'center',
        marginTop: 20,
        color: '#666',
    },
    
    // Estilos para o modal
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    modalButton: {
        padding: 10,
        borderRadius: 5,
        width: '48%',
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#6c757d',
    },
    saveButton: {
        backgroundColor: '#28a745',
    }
});

export default ListarScreen;