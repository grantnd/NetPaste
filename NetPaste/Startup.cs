namespace NetPaste
{
    using Microsoft.AspNet.SignalR;
    using Owin;

    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            HubConfiguration configuration = new HubConfiguration();
            
            app.MapSignalR(configuration);            
        }
    }
}