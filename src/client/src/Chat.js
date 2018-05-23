import React, { Component } from 'react';
import { HubConnectionBuilder } from '@aspnet/signalr';
import './Chat.css';
import {adicionarMensagem } from './acoes/chat.acao';
import { connect } from 'react-redux';

class Chat extends Component {

  constructor(props) {
    super(props);
    this.conexao = {};
    this.state = {mensagem: '', nome: ''};
  }
  
  componentDidMount() {

    this.conexao = new HubConnectionBuilder().withUrl('http://localhost:5000/chatHub').build();

    this.conexao.on("RecebendoMensagem", (dado) => { 
      this.props.adicionarMensagem(dado);
    }); 
    
    this.conexao.start().catch(err => console.error(err.toString()));
    let nome = prompt('Entre com o seu nome:');
    this.setState({nome});
  }

  obterMensagem(e) {
    this.setState({mensagem: e.target.value });
  }

  enviarMensagem(e) {
    e.preventDefault();
    this.conexao.invoke('EnviarMensagem', {nome: this.state.nome, msg: this.state.mensagem});
    this.setState({mensagem:''})
  }
  
  render() {
    
    return (
          <div>
            <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet" />
            <div className="container">
              <div className="row">
                  <div className="message-wrap col-lg-12">
                  {this.props.mensagensChat.map(item => (
                    <div key={item.nome + item.msg} className="msg-wrap">                                                                  
                      <div className="media-body">
                          <h5 className="media-heading">{item.nome}</h5>
                          <small>{item.msg}</small>
                      </div>
                    </div>
                  ))}                    
                    <div className="send-wrap ">
                      <form onSubmit={e => this.enviarMensagem(e)} className="input-group mb-3">
                        <input type="text" value={this.state.mensagem} className="form-control" onChange={e => this.obterMensagem(e)} />
                          <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="submit">Enviar</button>
                          </div>
                      </form>            
                    </div>                  
                  </div>
              </div>
            </div>
          </div>
    );
  }
}



const mapStateToProps = state => {
  return { mensagensChat : state.chat }
};

const mapDispatchToProps = dispatch => {
  return {
    adicionarMensagem : (mensagem) => {
      dispatch(adicionarMensagem(mensagem));     
    }
  }
}

const ChatContainer = connect(mapStateToProps,mapDispatchToProps)(Chat);


export default ChatContainer;
