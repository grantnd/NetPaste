namespace NetPaste
{
    using Microsoft.AspNet.SignalR;
    using Microsoft.AspNet.SignalR.Hubs;
    using System;
    using System.Web;

    public class NetPasteUserIdProvider : IUserIdProvider
    {
        private const string cookieName = "NetPasteIdentity";

        public string GetUserId(IRequest request)
        {
            if (!request.Cookies.ContainsKey(cookieName))
            {
                return null;
            }

            return request.Cookies[cookieName].Value;
        }
        
        internal string CreateNewUserId(HubCallerContext context)
        {
            string userId = Guid.NewGuid().ToString();
            var cookie = new HttpCookie(cookieName, userId);
            cookie.Expires = DateTime.Now.AddYears(1);

            context.Request.GetHttpContext().Response.AppendCookie(cookie);

            return userId;
        }
    }
}