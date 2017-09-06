using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using BryterOps_Library;
using BryterOpsAdmin.Models;
using Microsoft.EntityFrameworkCore;
using BryterOpsAdmin.Services;

namespace BryterOpsAdmin.Controllers
{
    public class BryterUserController : Controller
    {
        private readonly BryterOpsContext _bryterOpsContext;
        private readonly BryterUserService _bryterUserService;

        public BryterUserController(BryterOpsContext bryterOpsContext) 
        {
            _bryterOpsContext = bryterOpsContext;
            _bryterUserService = new BryterUserService(bryterOpsContext);
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetAllBryterUsers()
        {
            IList<BryterUser> bryterUsers = _bryterUserService.GetAllBryterUsers();

            return JSON.Success(new { bryterUsers = bryterUsers });
        }

        [HttpPost]
        public IActionResult CreateBryterUser(BryterUser user) {
            BryterUser bryterUser = _bryterUserService.CreateBryterUser(user);

            return JSON.Success(new { bryterUser = bryterUser });
        }

        [HttpPost]
        public IActionResult EditBryterUser(BryterUser user) {
            BryterUser bryterUser = _bryterUserService.EditBryterUser(user);

            return JSON.Success(new { bryterUser = bryterUser });
        }

        [HttpPost]
        public IActionResult DeleteBryterUser(int userID) {
            IList<BryterUser> bryterUsers = _bryterUserService.DeleteBryterUser(userID);

            return JSON.Success(new { bryterUsers = bryterUsers });
        }
    }
}