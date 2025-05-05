import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ListarScreen from './ListarScreen';
import CustomButton from '../../Componentes/CustomButton/CustomButton';
import { useState } from 'react';
import TextInputBox from '../../Componentes/TextInputBox/TextInputBox';
import axios from 'axios';

export function CadastroScreenNavigator() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Cadastro" component={CadastroScreen} />
      <Drawer.Screen name="Listar" component={ListarScreen} />
    </Drawer.Navigator>
  );
}

function CadastroScreen() {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [idade, setIdade] = useState('');
    const [turma, setTurma] = useState('');
    const [status, setStatus] = useState('');
    
    // PUT
    const cadastrarAluno = async () => {

        if (!nome || !telefone || !idade || !turma) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        const novoAluno = {
          nome,
          telefone,
          idade: parseInt(idade, 10),
          turma
      };
        
        try {
          const resultado = await axios.post('http://192.168.8.1:3000/alunos', novoAluno);          
          Alert.alert('Sucesso', 'Aluno cadastrado!');
        } catch (erro) {
          Alert.alert('Erro', erro.message);
        }
      }
   
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cadastro de Aluno</Text>
        
        <TextInputBox
          placeholder="Digite o nome"
          value={nome}
          onChangeText={text => setNome(text)}
        />
        
        <TextInputBox
          placeholder="Digite o telefone"
          value={telefone}
          onChangeText={text => setTelefone(text)}
        />
        
        <TextInputBox
          placeholder="Digite a idade"
          value={idade}
          onChangeText={text => setIdade(text)}
          keyboardType="numeric"
        />
        
        <TextInputBox
          placeholder="Digite a turma"
          value={turma}
          onChangeText={text => setTurma(text)}
        />
        
        
        <CustomButton
            title="Cadastrar"
            onPress={cadastrarAluno}
        />

        <Text style={styles.status}>{status}</Text>

        
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
  status: {
    marginVertical: 10,
    color: '#666',
  }
});

export default CadastroScreen;