namespace NetPaste
{
    using System;
    using System.Web;

    public class UserIdentityService
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

        internal static void Identify()
        {
            if(GetUserId() == null)
            {
                CreateIdentity();
            }
        }

        private static void CreateIdentity()
        {
            string userId = Guid.NewGuid().ToString();
            var cookie = new HttpCookie(cookieName, userId);
            cookie.Expires = DateTime.Now.AddYears(1);

            HttpContext.Current.Response.AppendCookie(cookie);
        }
    }
}