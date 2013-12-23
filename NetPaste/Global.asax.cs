namespace NetPaste
{
    using System;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.Optimization;
    using System.Web.Routing;

    public class MvcApplication : System.Web.HttpApplication
    {
        UserIdentityService userIdentityService = new UserIdentityService();

        protected void Application_PostAuthenticateRequest(Object sender, EventArgs e)
        {
            string userId = UserIdentityService.GetUserId();

            if (userId != null)
            {
                HttpContext.Current.User = new NetPastePrincipal(userId);
            }
        }

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}