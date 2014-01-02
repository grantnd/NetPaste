namespace NetPaste
{
    using NetPaste.Models;
    using NetPaste.Services;
    using System;
    using System.Web.Mvc;

    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            string userId = UserIdentityService.Identify();
            var username = "User " + new Random((int)DateTime.Now.Ticks).Next(10);

            var profile = new UserProfile()
            {
                UserId = userId,
                HostAddress = Request.UserHostAddress,
                Name = username
            };

            UserProfileService.Instance.SaveProfile(userId, profile);

            ViewBag.Username = username;

            return View();
        }
	}
}