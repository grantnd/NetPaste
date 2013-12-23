namespace NetPaste
{
    using System.Web.Mvc;

    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            UserIdentityService.Identify();

            return View();
        }
	}
}