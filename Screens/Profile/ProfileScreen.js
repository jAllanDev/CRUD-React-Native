import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from '../../Componentes/CustomButton/CustomButton';
import MathUtils from '../../Acoes/MathUtils';
import TextInputBox from '../../Componentes/TextInputBox/TextInputBox';
import { useState, useEffect } from 'react';

export default function ProfileScreen() {
  const [resultado, setResultado] = useState();
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);

  useEffect(() => {
    console.log('O resultado mudou para:', resultado);
  }, []);

  return (
<View style={styles.container}>
  <Text> Profile Screen </Text>

  
  <TextInputBox
        placeholder="Digite o primeiro número"
        keyboardType="numeric"
        onChangeText={setNum1}
      />
      {/* Update num2 state */}
      <TextInputBox
        placeholder="Digite o segundo número"
        keyboardType="numeric"
        onChangeText={setNum2}
      />
<Text style={styles.title}>Calculadora</Text>
<Text style={{ marginBottom: 20 }}>Escolha uma operação:</Text>

<View style={{ flexDirection: 'row' }}>
  
<CustomButton title="Somar" onPress={() => setResultado(MathUtils.somar(num1,num2))} style={{ marginRight: 10 }} />
<CustomButton title="Subtrair" onPress={() => setResultado(MathUtils.subtrair(num1, num2))} style={{ marginRight: 10 }} />
<CustomButton title="Multiplicar" onPress={() => setResultado(MathUtils.multiplicar(num1, num2))} style={{ marginRight: 10 }} />
<CustomButton title="Dividir" onPress={() => setResultado(MathUtils.dividir(num1, num2))} />
  

</View>
<Text style={{ marginTop: 50, fontSize: 20, fontWeight: 'bold' }}>Resultado: {resultado}</Text>

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