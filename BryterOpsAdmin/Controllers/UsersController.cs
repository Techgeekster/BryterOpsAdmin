using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using BryterOps_Library;
using BryterOpsAdmin.Models;
using Microsoft.EntityFrameworkCore;

namespace BryterOpsAdmin.Controllers
{
    public class UsersController : Controller
    {
        private readonly BryterOpsContext _bryterOpsContext;
        public UsersController(BryterOpsContext bryterOpsContext)
        {
            _bryterOpsContext = bryterOpsContext;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetAllUsers()
        {
            IList<User> users = _bryterOpsContext.Users.FromSql("Admin_LIST_BryterUsers").ToList();

            return JSON.Success(new { users = users });
        }
    }
}