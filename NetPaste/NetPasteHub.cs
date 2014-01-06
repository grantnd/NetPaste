namespace NetPaste
{
    using Microsoft.AspNet.SignalR;
    using NetPaste.Components;
    using NetPaste.Models;
    using System;
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.Linq;
    using System.Threading.Tasks;

    public class NetPasteHub : Hub
    {
        public override Task OnConnected()
        {
            try
            {
                string userId = Context.User.Identity.Name;

                UserConnectionMapping.Instance.Add(userId, Context.ConnectionId);

                Clients.AllExcept(UserConnectionMapping.Instance.GetConnections(userId).ToArray())
                    .recipientConnected(UserProfileStore.Instance.GetProfile(userId));

                return base.OnConnected();
            }
            catch (Exception ex)
            {
                Trace.TraceError(TraceHelper.FormatErrorMessage("Exception raised in OnConnected", ex,
                    new Dictionary<string, object>(){
                        {"Context.User.Identity", Context.User.Identity},
                        {"Context.ConnectionId", Context.ConnectionId}
                    }));

                throw;
            }
        }
        
        public void SendPaste(PasteData pasteData, IEnumerable<string> recipientIds)
        {
            try
            {
                var paste = new Paste()
                {
                    Data = pasteData,
                    Sender = UserProfileStore.Instance.GetProfile(Context.User.Identity.Name),
                    Received = DateTime.Now
                };

                foreach (var recipientId in recipientIds)
                {
                    Clients.User(recipientId).receivePaste(paste);
                }
            }
            catch (Exception ex)
            {
                Trace.TraceError(TraceHelper.FormatErrorMessage("Exception raised in SendPaste", ex,
                    new Dictionary<string, object>(){
                        {"pasteData", pasteData},
                        {"Context.User.Identity", Context.User.Identity},
                        {"Context.ConnectionId", Context.ConnectionId}
                    }));

                throw;
            }
        }

        public IEnumerable<UserProfile> GetRecipients()
        {
            try
            {
                string userId = Context.User.Identity.Name;

                return UserProfileStore.Instance.GetProfiles(UserConnectionMapping.Instance.GetConnectedUserIds())
                    .Where(p => p.UserId != userId);
            }
            catch (Exception ex)
            {
                Trace.TraceError(TraceHelper.FormatErrorMessage("Exception raised in GetRecipients", ex,
                    new Dictionary<string, object>(){
                        {"Context.User.Identity", Context.User.Identity},
                        {"Context.ConnectionId", Context.User.Identity}
                    }));

                throw;
            }
        }

        public override Task OnDisconnected()
        {
            try
            {
                string userId = Context.User.Identity.Name;

                UserConnectionMapping.Instance.Remove(userId, Context.ConnectionId);

                if (!UserConnectionMapping.Instance.UserIsConnected(userId))
                {
                    Clients.AllExcept(UserConnectionMapping.Instance.GetConnections(userId).ToArray())
                        .recipientDisconnected(UserProfileStore.Instance.GetProfile(userId));

                    UserProfileStore.Instance.RemoveProfile(userId);
                }

                return base.OnDisconnected();
            }
            catch (Exception ex)
            {
                Trace.TraceError(TraceHelper.FormatErrorMessage("Exception raised in OnDisconnected", ex,
                    new Dictionary<string, object>(){
                        {"Context.User.Identity", Context.User.Identity},
                        {"Context.ConnectionId", Context.ConnectionId}
                    }));

                throw;
            }
        }
    }
}