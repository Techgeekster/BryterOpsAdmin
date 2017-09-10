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
    public class ProviderController : Controller
    {
        private readonly BryterOpsContext _bryterOpsContext;
        private readonly ProviderService _providerService;

        public ProviderController(BryterOpsContext bryterOpsContext) 
        { 
            _bryterOpsContext = bryterOpsContext;
            _providerService = new ProviderService(bryterOpsContext);
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetAllProviders()
        {
            IList<Provider> providers = _providerService.GetAllProviders();

            return JSON.Success(new { providers = providers });
        }

        [HttpPost]
        public IActionResult CreateProvider(Provider provider) {
            Provider newProvider = _providerService.CreateProvider(provider);

            return JSON.Success(new { provider = newProvider });
        }

        [HttpPost]
        public IActionResult EditProvider(Provider provider) {
            Provider newProvider = _providerService.EditProvider(provider);

            return JSON.Success(new { provider = newProvider });
        }

        public IActionResult UpdateProviderProfileImage(int providerID, string filePath, string base64Image) 
        {
            _providerService.UpdateProviderProfileImage(providerID, filePath, base64Image);
            return JSON.Success();
        }

        [HttpPost]
        public IActionResult DeleteProvider(int providerID) {
            IList<Provider> providers = _providerService.DeleteProvider(providerID);

            return JSON.Success(new { providers = providers });
        }
    }
}