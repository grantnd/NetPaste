namespace NetPaste
{
    using Microsoft.AspNet.SignalR;
    using Microsoft.AspNet.SignalR.Hubs;
    using System.Collections.Generic;

    public class UserProfileService
    {
        private Dictionary<string, UserProfile> userIdToProfileLookup;

        public UserProfileService()
        {
            userIdToProfileLookup = new Dictionary<string, UserProfile>();
        }

        internal UserProfile GenerateProfile(string userId, HubCallerContext context)
        {
            UserProfile profile = new UserProfile()
            {
                UserId = userId,
                HostAddress = context.Request.GetHttpContext().Request.UserHostAddress,
                Name = context.QueryString["name"]
            };

            userIdToProfileLookup[userId] = profile;

            return profile;
        }

        internal void RemoveProfile(string userId)
        {
            userIdToProfileLookup.Remove(userId);
        }

        internal UserProfile GetProfile(string userId)
        {
            return userIdToProfileLookup[userId];
        }

        internal IEnumerable<UserProfile> GetAllProfiles()
        {
            foreach (var profile in this.userIdToProfileLookup.Values)
            {
                yield return profile;
            }
        }
    }
}