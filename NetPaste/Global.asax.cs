﻿namespace NetPaste
{
    using Microsoft.AspNet.SignalR;
    using NetPaste.Components.Identity;
    using System;
    using System.Web;
    using System.Web.Http;
    using System.Web.Mvc;
    using System.Web.Optimization;
    using System.Web.Routing;

    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_PostAuthenticateRequest(Object sender, EventArgs e)
        {
            string userId = UserIdentityProvider.GetUserId();

            if (userId != null)
            {
                HttpContext.Current.User = new NetPastePrincipal(userId);
            }
        }

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            GlobalHost.HubPipeline.RequireAuthentication();
        }
    }
}