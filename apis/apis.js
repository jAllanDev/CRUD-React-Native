class Apis{
    static async buscaEndereco(cep, setEndereco) {
    try {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) {
    alert('CEP inválido!');
    return;
    }
    const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
    const data = await response.json();
    if (data.erro) {
    alert('CEP não encontrado!');
    return;
    }
    setEndereco(data);
    } catch (error) {
    console.error(error);
    alert('Erro ao buscar CEP!');
    }
    }
    }
    export default Apis;