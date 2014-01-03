namespace NetPaste.Controllers
{
    using NetPaste.Models;
    using NetPaste.Services;
    using System.Web;
    using System.Web.Http;

    public class IdentifyController : ApiController
    {
        public void Post([FromBody]IdentifyModel model)
        {
            string userId = UserIdentityService.Identify();

            var profile = new UserProfile()
            {
                UserId = userId,
                HostAddress = HttpContext.Current.Request.UserHostAddress,
                Name = model.Name
            };

            UserProfileService.Instance.SaveProfile(userId, profile);
        }
    }
}