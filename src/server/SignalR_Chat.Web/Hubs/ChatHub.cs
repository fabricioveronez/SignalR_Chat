using Microsoft.AspNetCore.SignalR;
using SignalR_Chat.Web.Modelo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalR_Chat.Web.Hubs
{
    public class ChatHub : Hub
    {
        public async Task EnviarMensagem(Mensagem mensagem)
        {
            await Clients.All.SendAsync("RecebendoMensagem", mensagem);
        }
    }
  
}
