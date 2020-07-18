import React, { useState } from 'react'; //importa o useSate
import './App.css';
import Header from './Header';

function App() {
  //cria uma variavel - "counter" e usa o useSate
  //useState retorna um array [valor do estado, função para atualizar o valor do estado]
  //então usamos a desestruturação para guardar esses valores
  const [counter, setCounter] = useState(0);

  function handleButtonClick(){
    //usa o metodo para atualozar o contador
    setCounter(counter + 1);
  }

  return (
    <div>
      <Header title={`Contador: ${counter}`} />

    {/* exibe o valor do contador */}
    <h1>{counter}</h1>
    {/* botão chama a função para incrementar o valor do estado */}
    <button onClick={handleButtonClick}>Clicar</button>

      <h1>Conteudo da Aplicação</h1>
    </div>
  );
}

export default App;
