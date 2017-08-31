using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BryterOpsAdmin.Models;
using Microsoft.EntityFrameworkCore;
using BryterOps_Library;

namespace BryterOpsAdmin.Controllers
{
    public class ProvidersController : Controller
    {
        private readonly BryterOpsContext _bryterOpsContext;
        public ProvidersController(BryterOpsContext bryterOpsContext)
        {
            _bryterOpsContext = bryterOpsContext;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetAllProviders()
        {
            IList<Provider> providers = _bryterOpsContext.Providers.FromSql("Admin_LIST_Providers").ToList();

            return JSON.Success(new { providers = providers });
        }
    }
}