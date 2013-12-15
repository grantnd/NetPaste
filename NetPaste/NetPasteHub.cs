namespace NetPaste
{
    using Microsoft.AspNet.SignalR;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public class NetPasteHub : Hub
    {
        private static Dictionary<string, string> identityToConnectionIdLookup = new Dictionary<string, string>();

        public override Task OnConnected()
        {
            string identity = GetIdentity();

            identityToConnectionIdLookup[identity] = Context.ConnectionId;

            return base.OnConnected();
        }

        private string GetIdentity()
        {
            return Context.Request.GetHttpContext().Request.UserHostAddress;
        }

        public override Task OnDisconnected()
        {
            string identity = GetIdentity();

            identityToConnectionIdLookup.Remove(identity);

            return base.OnDisconnected();
        }

        public void SendPaste(PasteData pasteData, string recipientIdentity)
        {
            var paste = new Paste();

            paste.Data = pasteData;
            paste.Sender = GetIdentity();
            paste.Received = DateTime.Now;
            Clients.All.receivePaste(paste);
        }

        public IEnumerable<string> GetRecipients()
        {
            return null;
        }
    }
}