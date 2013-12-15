namespace NetPaste
{
    using Microsoft.AspNet.SignalR;
    using Owin;

    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            HubConfiguration configuration = new HubConfiguration();
            var idProvider = new NetPasteUserIdProvider();
            configuration.Resolver.Register(typeof(IUserIdProvider), () => idProvider);

            app.MapSignalR(configuration);            
        }
    }
}