import React, { Component } from 'react';
import { HubConnectionBuilder } from '@aspnet/signalr';

class App extends Component {

  constructor() {
    super();
    this.conexao = {};
    this.state = {mensagem: '', nome: '', conversa:[]};
  }
  
  componentDidMount() {

    this.conexao = new HubConnectionBuilder().withUrl('http://localhost:5000/chatHub').build();

    this.conexao.on("ReceiveMessage", (dado) => { 
      let conversa = this.state.conversa;
      conversa.push(dado);
      this.setState({conversa});
    }); 
    
    this.conexao.start().catch(err => console.error(err.toString()));
    let nome = prompt('Entre com o seu nome:');
    this.setState({nome});
  }

  setValue(nomePropriedade, e) {
    this.setState({[nomePropriedade]: e.target.value });
  }

  enviarMensagem(e) {
    e.preventDefault();
    this.conexao.invoke('EnviarMensagem', {nome: this.state.nome, msg: this.state.mensagem});
  }
  
  render() {
    return (
      <div className='container'>
        <form onSubmit={e => this.enviarMensagem(e)}>
          <div className="input-group mb-3">
            <input type="text" className="form-control" onChange={e => this.setValue('mensagem', e)} />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="submit">Button</button>
            </div>
          </div>     
        </form>
      </div> 
    );
  }
}

export default App;
