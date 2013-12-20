namespace NetPaste
{
    using Microsoft.AspNet.SignalR;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public class NetPasteHub : Hub
    {
        private static NetPasteUserIdProvider userIdProvider = new NetPasteUserIdProvider();
        private static UserProfileService userProfileService = new UserProfileService();

        public override Task OnConnected()
        {
            string userId;

            if ((userId = userIdProvider.GetUserId(Context.Request)) == null)
            {
                userId = userIdProvider.CreateNewUserId(Context);
            }

            userProfileService.GenerateProfile(userId, Context);

            Clients.All.updateRecipients(userProfileService.GetAllProfiles());

            return base.OnConnected();
        }

        public override Task OnDisconnected()
        {
            string userId = userIdProvider.GetUserId(Context.Request);

            userProfileService.RemoveProfile(userId);

            Clients.All.updateRecipients(userProfileService.GetAllProfiles());
        
            return base.OnDisconnected();
        }

        public void SendPaste(PasteData pasteData, IEnumerable<string> recipientIds)
        {
            var paste = new Paste()
            {
                Data = pasteData,
                Sender = userProfileService.GetProfile(userIdProvider.GetUserId(Context.Request)),
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