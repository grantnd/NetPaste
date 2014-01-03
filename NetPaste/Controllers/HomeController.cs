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
            return View();
        }
	}
}