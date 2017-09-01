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
    public class AdminUserController : Controller
    {
        private readonly BryterOpsContext _bryterOpsContext;
        private readonly AdminUserService _adminUserService;

        public AdminUserController(BryterOpsContext bryterOpsContext)
        {
            _bryterOpsContext = bryterOpsContext;
            _adminUserService = new AdminUserService(bryterOpsContext);
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetAllAdminUsers()
        {
            IList<AdminUser> adminUsers = _adminUserService.GetAllAdminUsers();

            return JSON.Success(new { adminUsers = adminUsers });
        }

        public IActionResult CreateAdminUser(AdminUser user) 
        {
            AdminUser adminUser = _adminUserService.CreateAdminUser(user);

            return JSON.Success();
        }
    }
}