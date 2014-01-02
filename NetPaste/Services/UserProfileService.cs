namespace NetPaste.Services
{
    using NetPaste.Models;
    using System.Collections.Generic;

    public class UserProfileService
    {
        private static UserProfileService _instance = new UserProfileService();

        public static UserProfileService Instance { get { return _instance; } }

        private Dictionary<string, UserProfile> userIdToProfileLookup;

        private UserProfileService()
        {
            userIdToProfileLookup = new Dictionary<string, UserProfile>();
        }

        internal void SaveProfile(string userId, UserProfile profile)
        {
            userIdToProfileLookup[userId] = profile;
        }

        internal void RemoveProfile(string userId)
        {
            userIdToProfileLookup.Remove(userId);
        }

        internal UserProfile GetProfile(string userId)
        {
            return userIdToProfileLookup[userId];
        }

        internal IEnumerable<UserProfile> GetProfiles(IEnumerable<string> userIds)
        {
            foreach (var userId in userIds)
            {
                if (this.userIdToProfileLookup.ContainsKey(userId))
                {
                    yield return this.userIdToProfileLookup[userId];
                }
            }
        }
    }
}