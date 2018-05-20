import { List } from 'immutable';

export default function chat(state, action) {

    if (!state) {
        state = [];
    } 

    switch (action.type) {
        case "ADICIONAR_MENSAGEM":

            let itens = new List(state);
            let listaNovo = itens.push(action.mensagem);
            return listaNovo.toArray();
        default:
            return state;
    }
}