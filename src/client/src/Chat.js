import React, { Component } from 'react';
import { HubConnectionBuilder } from '@aspnet/signalr';
import './Chat.css';

class Chat extends Component {

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
          <div>
            <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet" />
            <div className="container">
              <div className="row">
                  <div className="message-wrap col-lg-12">
                  {this.state.conversa.map(item => (
                    <div className="msg-wrap">                                                                  
                      <div className="media-body">
                          <h5 className="media-heading">Fulano de Tal</h5>
                          <small>Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker.</small>
                      </div>
                    </div>
                  ))}                    
                    <div className="send-wrap ">
                      <div className="input-group mb-3">
                        <input type="text" class="form-control" />
                          <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button">Enviar</button>
                          </div>
                      </div>            
                    </div>                  
                  </div>
              </div>
            </div>
          </div>
    );
  }
}

export default Chat;
