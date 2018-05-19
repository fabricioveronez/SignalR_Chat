import React, { Component } from 'react';

class App extends Component {
  
  render() {
    return (
      <div className='container'>
        <form>
          <div className="input-group mb-3">
            <input type="text" className="form-control" onChange={e => this.setValue('mensagem', e)} />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button">Button</button>
            </div>
          </div>     
        </form>
      </div> 
    );
  }
}

export default App;
