using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BryterOpsAdmin.Models;
using Microsoft.EntityFrameworkCore;

namespace BryterOpsAdmin.Services
{
    public class BryterUserService
    {
        private readonly BryterOpsContext _bryterOpsContext;
        public BryterUserService(BryterOpsContext bryterOpsContext) {
            _bryterOpsContext = bryterOpsContext;
        }

        public IList<BryterUser> GetAllBryterUsers() {
            IList<BryterUserDB> bryterUsers = _bryterOpsContext.BryterUsers.FromSql("Admin_LIST_BryterUsers").ToList();

            return bryterUsers.Select(x => new BryterUser(x)).ToList();
        }

        public BryterUser CreateBryterUser(BryterUser user) {
            BryterUserDB bryterUser = _bryterOpsContext.BryterUsers.FromSql("Admin_INSERT_BryterUser {0}, {1}, {2}, {3}, {4}, {5}, {6}, " +
                "{7}, {8}, {9}, {10}, {11}, {12}, {13}, {14}, {15}, {16}, {17}, {18}, {19}, {20}, {21}, {22}, {23}, {24}, {25}",
                user.Username, user.CompanyName, user.CompanyID, user.FirstName, user.LastName, user.Address1, user.Address2, user.City,
                user.State, user.Zipcode, user.Country, user.Title, user.ExperienceLevel, user.ManagerName, user.ManagerPhone, user.ManagerEmail,
                user.Phone, user.Email, user.Rating, user.Photo, user.YearsWithCompany, user.ApprovalRate, user.CompletionRate, user.RetainingRate,
                user.AssignedCityLicenseIDs, user.StatusID).FirstOrDefault();

            return new BryterUser(bryterUser);
        }

        public BryterUser EditBryterUser(BryterUser user) {
            BryterUserDB bryterUser = _bryterOpsContext.BryterUsers.FromSql("Admin_UPDATE_BryterUser {0}, {1}, {2}, {3}, {4}, {5}, {6}, " +
                "{7}, {8}, {9}, {10}, {11}, {12}, {13}, {14}, {15}, {16}, {17}, {18}, {19}, {20}, {21}, {22}, {23}, {24}, {25}, {26}",
                user.UserID, user.Username, user.CompanyName, user.CompanyID, user.FirstName, user.LastName, user.Address1, user.Address2, user.City,
                user.State, user.Zipcode, user.Country, user.Title, user.ExperienceLevel, user.ManagerName, user.ManagerPhone, user.ManagerEmail,
                user.Phone, user.Email, user.Rating, user.Photo, user.YearsWithCompany, user.ApprovalRate, user.CompletionRate, user.RetainingRate,
                user.AssignedCityLicenseIDs, user.StatusID).FirstOrDefault();

            return new BryterUser(bryterUser);
        }

        public IList<BryterUser> DeleteBryterUser(int userID) {
            IList<BryterUserDB> bryterUsers = _bryterOpsContext.BryterUsers.FromSql("Admin_DELETE_BryterUser {0}", userID).ToList();

            return bryterUsers.Select(x => new BryterUser(x)).ToList();
        }
    }
}
