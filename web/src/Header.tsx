import React from 'react';

// vamos criar a interface para tipar o obj (vamos criar as propriedades)
interface HeaderProps{
    title: string;
}

// trabalhando com TS podemos transformar a function em constante
// é uma arrow function agora
// React.FC - tipamos a const Header (generic)
const Header: React.FC<HeaderProps> = (props) => {
    return(
      <header>
          <h1>{props.title}</h1> 
      </header>  
    );
}

export default Header;