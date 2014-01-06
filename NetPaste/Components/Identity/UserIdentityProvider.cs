namespace NetPaste.Components.Identity
{
    using System;
    using System.Web;

    public static class UserIdentityProvider
    {
        private const string cookieName = "NetPasteIdentity";

        internal static string GetUserId()
        {
            if (HttpContext.Current.Request.Cookies.Get(cookieName) == null)
            {
                return null;
            }

            return HttpContext.Current.Request.Cookies.Get(cookieName).Value;
        }

        internal static string Identify()
        {
            string userId = GetUserId();

            if (userId == null)
            {
                userId = CreateIdentity();
            }

            return userId;
        }

        private static string CreateIdentity()
        {
            string userId = Guid.NewGuid().ToString();
            var cookie = new HttpCookie(cookieName, userId);
            cookie.Expires = DateTime.Now.AddYears(1);

            HttpContext.Current.Response.AppendCookie(cookie);

            return userId;
        }
    }
}