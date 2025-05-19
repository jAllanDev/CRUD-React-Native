import * as SQLite from 'expo-sqlite/legacy';
const db = SQLite.openDatabase('agenda.db');

const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS agenda (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, telefone TEXT)",
      [],
      () => console.log("Tabela criada com sucesso."),
      (tx, error) => {
        console.log("Erro ao criar tabela:", error);
        return true;
      }
    );
  });
};

const getAgenda = (setAgenda) => {
db.transaction(tx => {
tx.executeSql(
'SELECT * FROM agenda;',
[],
(_, { rows: { _array } }) => {
console.log("Dados recuperados:", _array);
setAgenda(_array);
},
(tx, error) => {
console.log("Erro ao recuperar dados:", error);
return true;
}
);
});
};
const adicionarAgenda = (nome, telefone, setAgenda) => {
db.transaction(tx => {
tx.executeSql(
'INSERT INTO agenda (nome, telefone) VALUES (?, ?);',
[nome, telefone],
() => {
console.log("Dados inseridos com sucesso.");
getAgenda(setAgenda);
},
(tx, error) => {
console.log("Erro ao inserir dados:", error);
return true;
}
);
});
};
createTable();
export { db, getAgenda, adicionarAgenda };