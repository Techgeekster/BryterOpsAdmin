using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BryterOpsAdmin.Models;
using Microsoft.EntityFrameworkCore;
using BryterOps_Library;
using BryterOpsAdmin.Services;

namespace BryterOpsAdmin.Controllers
{
    public class RetailerController : Controller
    {
        private readonly BryterOpsContext _bryterOpsContext;
        private readonly RetailerService _retailerService;

        public RetailerController(BryterOpsContext bryterOpsContext) 
        { 
            _bryterOpsContext = bryterOpsContext;
            _retailerService = new RetailerService(bryterOpsContext);
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

        [HttpPost]
        public IActionResult CreateRetailer(Retailer retailer) {
            Retailer newRetailer = _retailerService.CreateRetailer(retailer);

            return JSON.Success(new { retailer = newRetailer });
        }

        [HttpPost]
        public IActionResult EditRetailer(Retailer retailer) {
            Retailer newRetailer = _retailerService.EditRetailer(retailer);

            return JSON.Success(new { retailer = newRetailer });
        }

        [HttpPost]
        public IActionResult DeleteRetailer(int retailerID) {
            IList<Retailer> retailers = _retailerService.DeleteRetailer(retailerID);

            return JSON.Success(new { retailers = retailers });
        }
    }
}