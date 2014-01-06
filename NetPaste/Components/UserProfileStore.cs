namespace NetPaste.Components
{
    using NetPaste.Models;
    using System.Collections.Generic;

    public class UserProfileStore
    {
        private static UserProfileStore instance = new UserProfileStore();

        public static UserProfileStore Instance { get { return instance; } }

        private Dictionary<string, UserProfile> userIdToProfileLookup;

        private UserProfileStore()
        {
            this.userIdToProfileLookup = new Dictionary<string, UserProfile>();
        }

        internal void SaveProfile(string userId, UserProfile profile)
        {
            this.userIdToProfileLookup[userId] = profile;
        }

        internal void RemoveProfile(string userId)
        {
            this.userIdToProfileLookup.Remove(userId);
        }

        internal UserProfile GetProfile(string userId)
        {
            return this.userIdToProfileLookup[userId];
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

        internal void Reset()
        {
            this.userIdToProfileLookup.Clear();
        }
    }
}