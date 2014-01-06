namespace NetPaste
{
    using Microsoft.AspNet.SignalR;
    using NetPaste.Models;
    using NetPaste.Services;
    using System;
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.Linq;
    using System.Threading.Tasks;

    public class NetPasteHub : Hub
    {
        private static UserConnectionMapping userConnectionMapping = new UserConnectionMapping();

        public override Task OnConnected()
        {
            try
            {
                string userId = Context.User.Identity.Name;

                userConnectionMapping.Add(userId, Context.ConnectionId);

                Clients.AllExcept(userConnectionMapping.GetConnections(userId).ToArray())
                    .recipientConnected(UserProfileService.Instance.GetProfile(userId));

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
                    Sender = UserProfileService.Instance.GetProfile(Context.User.Identity.Name),
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

                return UserProfileService.Instance.GetProfiles(userConnectionMapping.GetConnectedUserIds())
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

                userConnectionMapping.Remove(userId, Context.ConnectionId);

                if (!userConnectionMapping.UserIsConnected(userId))
                {
                    Clients.AllExcept(userConnectionMapping.GetConnections(userId).ToArray())
                        .recipientDisconnected(UserProfileService.Instance.GetProfile(userId));

                    UserProfileService.Instance.RemoveProfile(userId);
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