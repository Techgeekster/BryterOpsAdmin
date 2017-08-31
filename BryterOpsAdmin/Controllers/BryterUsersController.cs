using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using BryterOps_Library;
using BryterOpsAdmin.Models;
using Microsoft.EntityFrameworkCore;

namespace BryterOpsAdmin.Controllers
{
    public class BryterUsersController : Controller
    {
        private readonly BryterOpsContext _bryterOpsContext;
        public BryterUsersController(BryterOpsContext bryterOpsContext)
        {
            _bryterOpsContext = bryterOpsContext;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetAllBryterUsers()
        {
            IList<BryterUser> bryterUsers = _bryterOpsContext.BryterUsers.FromSql("Admin_LIST_BryterUsers").ToList();

            return JSON.Success(new { bryterUsers = bryterUsers });
        }
    }
}