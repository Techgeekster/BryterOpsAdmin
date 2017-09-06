﻿using System;
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

        public IList<AdminUser> GetAllAdminUsers() 
        {
            IList<AdminUserDB> adminUsers = _bryterOpsContext.AdminUsers.FromSql("Admin_LIST_AdminUsers").ToList();

            return adminUsers.Select(x => new AdminUser(x)).ToList();
        }

        public AdminUser CreateAdminUser(AdminUser user) 
        {
            AdminUserDB adminUser = _bryterOpsContext.AdminUsers.FromSql("Admin_INSERT_AdminUser {0}, {1}, {2}, {3}, {4}, {5}, {6}, {7}",
                user.Username, user.FirstName, user.LastName, user.Phone, user.Email, user.AdminUserTypeID, user.Title, user.StatusID)
                .FirstOrDefault();

            return new AdminUser(adminUser);
        }

        public AdminUser EditAdminUser(AdminUser user) 
        {
            AdminUserDB adminUser = _bryterOpsContext.AdminUsers.FromSql("Admin_UPDATE_AdminUser {0}, {1}, {2}, {3}, {4}, {5}, {6}, {7}, {8}",
                user.UserID, user.Username, user.FirstName, user.LastName, user.Phone, user.Email, user.AdminUserTypeID, user.Title, user.StatusID)
                .FirstOrDefault();

            return new AdminUser(adminUser);
        }

        public IList<AdminUser> DeleteAdminUser(int userID) 
        {
            IList<AdminUserDB> adminUsers = _bryterOpsContext.AdminUsers.FromSql("Admin_DELETE_AdminUser {0}", userID).ToList();

            return adminUsers.Select(x => new AdminUser(x)).ToList();
        }
    }
}
