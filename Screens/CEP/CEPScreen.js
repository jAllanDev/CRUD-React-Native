import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import TextInputBox from '../../Componentes/TextInputBox/TextInputBox';
import CustomButton from '../../Componentes/CustomButton/CustomButton';
import { useState } from 'react';
import Apis from '../../apis/apis';

function CEPScreen() {

  const [endereco, setEndereco] = useState(null);
  const [cep, setCep] = useState('CEP');

    
    return (
      <View style={styles.container}>
        <Text style={styles.title}>CEP Screen</Text>
        <TextInputBox
          placeholder="Digite o CEP"
          onChangeText={setCep}
          keyboardType="numeric"
          maxLength={8}
          style={{ marginBottom: 20 }}
        />
        <CustomButton
          title="Buscar"
          onPress={() => {
            Apis.buscaEndereco(cep, setEndereco)
          }}
          style={styles.button}
          />
        
          <Text style={styles.mensagem}>
            {endereco ? `Seu endereço: ${endereco.logradouro}` : 'Insira o CEP'}
            
            </Text>
        <StatusBar style="auto" />
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  },
  title: {
  fontSize: 24,
  marginBottom: 20,
  }
  });
  export default CEPScreen;