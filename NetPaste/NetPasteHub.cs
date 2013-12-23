namespace NetPaste
{
    using Microsoft.AspNet.SignalR;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public class NetPasteHub : Hub
    {
        private static UserProfileService userProfileService = new UserProfileService();

        [Authorize]
        public override Task OnConnected()
        {
            string userId = Context.User.Identity.Name;
            
            userProfileService.GenerateProfile(userId, Context);

            Clients.All.updateRecipients(userProfileService.GetAllProfiles());

            return base.OnConnected();
        }

        [Authorize]
        public override Task OnDisconnected()
        {
            string userId = Context.User.Identity.Name;

            userProfileService.RemoveProfile(userId);

            Clients.All.updateRecipients(userProfileService.GetAllProfiles());

            return base.OnDisconnected();
        }

        [Authorize]
        public void SendPaste(PasteData pasteData, IEnumerable<string> recipientIds)
        {
            var paste = new Paste()
            {
                Data = pasteData,
                Sender = userProfileService.GetProfile(Context.User.Identity.Name),
                Received = DateTime.Now
            };

            foreach (var recipientId in recipientIds)
            {
                Clients.User(recipientId).receivePaste(paste);
            }
        }

        public IEnumerable<UserProfile> GetRecipients()
        {
            return userProfileService.GetAllProfiles();
        }
    }
}