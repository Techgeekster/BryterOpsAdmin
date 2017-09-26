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

        public IList<BryterCompany> GetUniqueCompanies() {
            IList<BryterCompany> bryterCompanies = _bryterOpsContext.BryterCompanies.FromSql("Admin_LIST_UniqueBryterCompanies").ToList();

            return bryterCompanies;
        }

        public ProfileImage GetBryterUserProfileImage(int userID) 
        {
            ProfileImageDB profileImage = _bryterOpsContext.ProfileImages.FromSql("Admin_LIST_GetBryterUserProfileImage {0}", userID).FirstOrDefault();

            if (profileImage != null)
                return new ProfileImage(profileImage);

            return new ProfileImage();
        }

        public BryterUser CreateBryterUser(BryterUser user) {
            BryterUserDB bryterUser = _bryterOpsContext.BryterUsers.FromSql("Admin_INSERT_BryterUser {0}, {1}, {2}, {3}, {4}, {5}, {6}, " +
                "{7}, {8}, {9}, {10}, {11}, {12}, {13}, {14}, {15}, {16}, {17}, {18}, {19}, {20}, {21}, {22}, {23}, {24}, {25}, {26}",
                user.Username, user.CompanyName, user.CompanyID, user.FirstName, user.LastName, user.Address1, user.Address2, user.City,
                user.State, user.Zipcode, user.Country, user.Title, user.ExperienceLevel, user.ManagerName, user.ManagerPhone, user.ManagerEmail,
                user.Phone, user.Email, user.Rating, user.Photo, user.YearsWithCompany, user.ApprovalRate, user.CompletionRate, user.RetainingRate,
                user.AssignedCityLicenseIDs, user.StatusID, user.BryterUserTypeID).FirstOrDefault();

            return new BryterUser(bryterUser);
        }

        public BryterUser EditBryterUser(BryterUser user) {
            BryterUserDB bryterUser = _bryterOpsContext.BryterUsers.FromSql("Admin_UPDATE_BryterUser {0}, {1}, {2}, {3}, {4}, {5}, {6}, " +
                "{7}, {8}, {9}, {10}, {11}, {12}, {13}, {14}, {15}, {16}, {17}, {18}, {19}, {20}, {21}, {22}, {23}, {24}, {25}, {26}, {27}",
                user.UserID, user.Username, user.CompanyName, user.CompanyID, user.FirstName, user.LastName, user.Address1, user.Address2, user.City,
                user.State, user.Zipcode, user.Country, user.Title, user.ExperienceLevel, user.ManagerName, user.ManagerPhone, user.ManagerEmail,
                user.Phone, user.Email, user.Rating, user.Photo, user.YearsWithCompany, user.ApprovalRate, user.CompletionRate, user.RetainingRate,
                user.AssignedCityLicenseIDs, user.StatusID, user.BryterUserTypeID).FirstOrDefault();

            return new BryterUser(bryterUser);
        }

        public ProfileImage UpdateBryterUserProfileImage(int UserID, string ProfileImageURL, string ProfileImageBase64) 
        {
            ProfileImageDB profileImage = _bryterOpsContext.ProfileImages.FromSql("Admin_UPDATE_BryterUserProfileImage {0}, {1}, {2}", UserID, ProfileImageURL, ProfileImageBase64).FirstOrDefault();
            return new ProfileImage(profileImage);
        }

        public IList<BryterUser> DeleteBryterUser(int userID) {
            IList<BryterUserDB> bryterUsers = _bryterOpsContext.BryterUsers.FromSql("Admin_DELETE_BryterUser {0}", userID).ToList();

            return bryterUsers.Select(x => new BryterUser(x)).ToList();
        }
    }
}
