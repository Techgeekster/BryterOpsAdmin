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
    public class AdminUsersController : Controller
    {
        private readonly BryterOpsContext _bryterOpsContext;
        public AdminUsersController(BryterOpsContext bryterOpsContext)
        {
            _bryterOpsContext = bryterOpsContext;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetAllAdminUsers()
        {
            IList<AdminUser> adminUsers = _bryterOpsContext.AdminUsers.FromSql("Admin_LIST_AdminUsers").ToList();

            return JSON.Success(new { adminUsers = adminUsers });
        }
    }
}