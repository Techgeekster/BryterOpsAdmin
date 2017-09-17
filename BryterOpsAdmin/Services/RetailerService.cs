using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BryterOpsAdmin.Models;
using Microsoft.EntityFrameworkCore;

namespace BryterOpsAdmin.Services
{
    public class RetailerService
    {
        private readonly BryterOpsContext _bryterOpsContext;
        public RetailerService(BryterOpsContext bryterOpsContext) {
            _bryterOpsContext = bryterOpsContext;
        }

        public IList<Retailer> GetAllRetailers() {
            IList<RetailerDB> retailers = _bryterOpsContext.Retailers.FromSql("Admin_LIST_Retailers").ToList();
            return retailers.Select(x => new Retailer(x)).ToList();
        }

        public IList<RetailerBasic> GetAllRetailersBasic() {
            IList<RetailerBasicDB> retailers = _bryterOpsContext.RetailersBasic.FromSql("Admin_LIST_RetailersBasic").ToList();
            return retailers.Select(x => new RetailerBasic(x)).ToList();
        }

        public ProfileImage GetRetailerProfileImage(int retailerID) 
        {
            ProfileImageDB profileImage = _bryterOpsContext.ProfileImages.FromSql("Admin_LIST_GetRetailerProfileImage {0}", retailerID).FirstOrDefault();

            if (profileImage != null)
                return new ProfileImage(profileImage);

            return new ProfileImage();
        }

        public Retailer CreateRetailer(Retailer retailer) {
            RetailerDB newRetailer = _bryterOpsContext.Retailers.FromSql("Admin_INSERT_Retailer {0}, {1}, {2}, {3}, {4}, {5}, {6}, {7}, " +
                "{8}, {9}, {10}, {11}, {12}, {13}, {14}, {15}, {16}", retailer.RetailerName, retailer.EIN, retailer.Address1, retailer.Address2,
                retailer.City,  retailer.State, retailer.Zipcode, retailer.Country, retailer.Phone, retailer.Website, retailer.Email, retailer.Contact,
                retailer.ApprovalRate, retailer.CompletionRate, retailer.RetainingRate, retailer.AssignedCityLicenseIDs, retailer.StatusID).FirstOrDefault();

            return new Retailer(newRetailer);
        }

        public Retailer EditRetailer(Retailer retailer) {
            RetailerDB newRetailer = _bryterOpsContext.Retailers.FromSql("Admin_UPDATE_Retailer {0}, {1}, {2}, {3}, {4}, {5}, {6}, {7}, " +
                "{8}, {9}, {10}, {11}, {12}, {13}, {14}, {15}, {16}, {17}", retailer.RetailerID, retailer.RetailerName, retailer.EIN, retailer.Address1, 
                retailer.Address2, retailer.City, retailer.State, retailer.Zipcode, retailer.Country, retailer.Phone, retailer.Website, retailer.Email, 
                retailer.Contact, retailer.ApprovalRate, retailer.CompletionRate, retailer.RetainingRate, retailer.AssignedCityLicenseIDs, retailer.StatusID)
                .FirstOrDefault();

            return new Retailer(newRetailer);
        }

        public ProfileImage UpdateRetailerProfileImage(int UserID, string ProfileImageURL, string ProfileImageBase64) 
        {
            ProfileImageDB profileImage = _bryterOpsContext.ProfileImages.FromSql("Admin_UPDATE_RetailerProfileImage {0}, {1}, {2}", UserID, ProfileImageURL, ProfileImageBase64).FirstOrDefault();
            return new ProfileImage(profileImage);
        }

        public IList<Retailer> DeleteRetailer(int retailerID) {
            IList<RetailerDB> retailers = _bryterOpsContext.Retailers.FromSql("Admin_DELETE_Retailer {0}", retailerID).ToList();

            return retailers.Select(x => new Retailer(x)).ToList();
        }
    }
}
