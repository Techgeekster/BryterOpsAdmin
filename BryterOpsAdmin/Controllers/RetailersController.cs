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
    public class RetailersController : Controller
    {
        private readonly BryterOpsContext _bryterOpsContext;
        public RetailersController(BryterOpsContext bryterOpsContext)
        {
            _bryterOpsContext = bryterOpsContext;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetAllRetailers()
        {
            IList<Retailer> retailers = _bryterOpsContext.Retailers.FromSql("Admin_LIST_Retailers").ToList();

            return JSON.Success(new { retailers = retailers });
        }
    }
}