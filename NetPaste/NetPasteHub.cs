namespace NetPaste
{
    using Microsoft.AspNet.SignalR;
    using NetPaste.Models;
    using NetPaste.Services;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class NetPasteHub : Hub
    {
        private static UserConnectionMapping userConnectionMapping = new UserConnectionMapping();

        [Authorize]
        public override Task OnConnected()
        {
            string userId = Context.User.Identity.Name;

            userConnectionMapping.Add(userId, Context.ConnectionId);

            Clients.AllExcept(userConnectionMapping.GetConnections(userId).ToArray())
                .recipientConnected(UserProfileService.Instance.GetProfile(userId));

            return base.OnConnected();
        }

        [Authorize]
        public override Task OnDisconnected()
        {
            string userId = Context.User.Identity.Name;
            
            userConnectionMapping.Remove(userId, Context.ConnectionId);

            if(!userConnectionMapping.UserIsConnected(userId))
            {
                Clients.AllExcept(userConnectionMapping.GetConnections(userId).ToArray())
                    .recipientDisconnected(UserProfileService.Instance.GetProfile(userId));

                UserProfileService.Instance.RemoveProfile(userId);
            }

            return base.OnDisconnected();
        }

        [Authorize]
        public void SendPaste(PasteData pasteData, IEnumerable<string> recipientIds)
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

        [Authorize]
        public IEnumerable<UserProfile> GetRecipients()
        {
            string userId = Context.User.Identity.Name;

            return UserProfileService.Instance.GetProfiles(userConnectionMapping.GetConnectedUserIds())
                .Where(p => p.UserId != userId);
        }
    }
}