namespace NetPaste.Components.Identity
{
    using System.Security.Principal;

    public class NetPastePrincipal : IPrincipal
    {
        public IIdentity Identity { get; private set; }

        public bool IsInRole(string role)
        {
            return false;
        }

        public NetPastePrincipal(string userId)
        {
            this.Identity = new GenericIdentity(userId);
        }
    }
}