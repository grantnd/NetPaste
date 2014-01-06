namespace NetPaste.Components
{
    using System.Collections.Generic;
    using System.Linq;

    public class UserConnectionMapping
    {
        private static UserConnectionMapping instance = new UserConnectionMapping();

        public static UserConnectionMapping Instance { get { return instance; } }

        private readonly Dictionary<string, HashSet<string>> userConnections;

        private UserConnectionMapping()
        {
            this.userConnections = new Dictionary<string, HashSet<string>>();
        }

        public int Count
        {
            get
            {
                return userConnections.Count;
            }
        }

        public void Add(string userId, string connectionId)
        {
            lock (userConnections)
            {
                HashSet<string> connections;
                if (!userConnections.TryGetValue(userId, out connections))
                {
                    connections = new HashSet<string>();
                    userConnections.Add(userId, connections);
                }

                lock (connections)
                {
                    connections.Add(connectionId);
                }
            }
        }

        public IEnumerable<string> GetConnections(string userId)
        {
            HashSet<string> connections;
            if (userConnections.TryGetValue(userId, out connections))
            {
                return connections;
            }

            return Enumerable.Empty<string>();
        }

        public void Remove(string userId, string connectionId)
        {
            lock (userConnections)
            {
                HashSet<string> connections;
                if (!userConnections.TryGetValue(userId, out connections))
                {
                    return;
                }

                lock (connections)
                {
                    connections.Remove(connectionId);

                    if (connections.Count == 0)
                    {
                        userConnections.Remove(userId);
                    }
                }
            }
        }

        public IEnumerable<string> GetConnectedUserIds()
        {
            return this.userConnections.Keys.Select(u => u);
        }

        internal bool UserIsConnected(string userId)
        {
            return this.userConnections.ContainsKey(userId);
        }

        internal void Reset()
        {
            this.userConnections.Clear();
        }
    }
}