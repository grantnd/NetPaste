namespace NetPaste.Controllers
{
    using NetPaste.Components;
    using NetPaste.Components.Identity;
    using NetPaste.Models;
    using System.Web;
    using System.Web.Http;

    public class IdentifyController : ApiController
    {
        public void Post([FromBody]IdentifyModel model)
        {
            string userId = UserIdentityProvider.Identify();

            var profile = new UserProfile()
            {
                UserId = userId,
                HostAddress = HttpContext.Current.Request.UserHostAddress,
                Name = model.Name
            };

            UserProfileStore.Instance.SaveProfile(userId, profile);
        }
    }
}