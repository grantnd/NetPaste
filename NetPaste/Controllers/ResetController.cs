namespace NetPaste.Controllers
{
    using NetPaste.Components;
    using System.Web.Http;

    public class ResetController : ApiController
    {
        public void Get()
        {
            UserProfileStore.Instance.Reset();
            UserConnectionMapping.Instance.Reset();
        }
    }
}