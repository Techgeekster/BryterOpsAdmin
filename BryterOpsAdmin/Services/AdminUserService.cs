using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using BryterOpsAdmin.Models;
using Microsoft.EntityFrameworkCore;

namespace BryterOpsAdmin.Services
{
    public class AdminUserService
    {
        private readonly BryterOpsContext _bryterOpsContext;
        public AdminUserService(BryterOpsContext bryterOpsContext) {
            _bryterOpsContext = bryterOpsContext;
        }

        //SqlParameter param1 = new SqlParameter("@firstName", "Frank");
        //SqlParameter param2 = new SqlParameter("@lastName", "Borland");
        //_bryterOpsContext.Database.ExecuteSqlCommand("Admin_INSERT_AdminUser @firstName, @lastName",
        //      param1, param2);

        public IList<AdminUser> GetAllAdminUsers() 
        {
            IList<AdminUser> adminUsers = _bryterOpsContext.AdminUsers.FromSql("Admin_LIST_AdminUsers").ToList();

            return adminUsers;
        }

        public AdminUser CreateAdminUser(AdminUser user) 
        {
            AdminUser adminUser = _bryterOpsContext.AdminUsers.FromSql("Admin_INSERT_AdminUser {0}, {1}, {2}, {3}, {4}, {5}, {6}",
                user.Username, user.FirstName, user.LastName, user.Phone, user.Email, user.AdminUserTypeID, user.Title).FirstOrDefault();

            return adminUser;
        }
    }
}
