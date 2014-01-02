namespace NetPaste
{
    using Microsoft.AspNet.SignalR;
    using NetPaste.Models;
    using NetPaste.Services;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public class NetPasteHub : Hub
    {
        private static UserConnectionMapping userConnectionMapping = new UserConnectionMapping();

        [Authorize]
        public override Task OnConnected()
        {
            string userId = Context.User.Identity.Name;

            userConnectionMapping.Add(userId, Context.ConnectionId);

            Clients.All.updateRecipients(
                UserProfileService.Instance.GetProfiles(
                    userConnectionMapping.GetConnectedUserIds()
                )
            );

            return base.OnConnected();
        }

        [Authorize]
        public override Task OnDisconnected()
        {
            string userId = Context.User.Identity.Name;
            
            userConnectionMapping.Remove(userId, Context.ConnectionId);
            if(!userConnectionMapping.UserIsConnected(userId))
            {
                UserProfileService.Instance.RemoveProfile(userId);
            }

            Clients.All.updateRecipients(
                UserProfileService.Instance.GetProfiles(
                    userConnectionMapping.GetConnectedUserIds()
                )
            );

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

        public IEnumerable<UserProfile> GetRecipients()
        {
            return UserProfileService.Instance.GetProfiles(
                    userConnectionMapping.GetConnectedUserIds()
                );
        }
    }
}