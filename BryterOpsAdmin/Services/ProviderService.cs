using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BryterOpsAdmin.Models;
using Microsoft.EntityFrameworkCore;

namespace BryterOpsAdmin.Services
{
    public class ProviderService
    {
        private readonly BryterOpsContext _bryterOpsContext;
        public ProviderService(BryterOpsContext bryterOpsContext) {
            _bryterOpsContext = bryterOpsContext;
        }

        public IList<Provider> GetAllProvider() {
            IList<Provider> providers = _bryterOpsContext.Providers.FromSql("Admin_LIST_Providers").ToList();

            return providers;
        }

        public Provider CreateProvider(Provider provider) {
            Provider newProvider = _bryterOpsContext.Providers.FromSql("Admin_INSERT_Provider {0}, {1}, {2}, {3}, {4}, {5}, {6}, {7}, " +
                "{8}, {9}, {10}, {11}, {12}, {13}, {14}, {15}, {16}", provider.ProviderName, provider.EIN, provider.Address1, provider.Address2,
                provider.City,  provider.State, provider.Zipcode, provider.Country, provider.Phone, provider.Website, provider.Email, provider.Contact,
                provider.ApprovalRate, provider.CompletionRate, provider.RetainingRate, provider.AssignedCityLicenseIDs, provider.StatusID).FirstOrDefault();

            return newProvider;
        }

        public Provider EditProvider(Provider provider) {
            Provider newProvider = _bryterOpsContext.Providers.FromSql("Admin_UPDATE_Provider {0}, {1}, {2}, {3}, {4}, {5}, {6}, {7}, " +
                "{8}, {9}, {10}, {11}, {12}, {13}, {14}, {15}, {16}, {17}", provider.ProviderID, provider.ProviderName, provider.EIN, provider.Address1, 
                provider.Address2, provider.City, provider.State, provider.Zipcode, provider.Country, provider.Phone, provider.Website, provider.Email, 
                provider.Contact, provider.ApprovalRate, provider.CompletionRate, provider.RetainingRate, provider.AssignedCityLicenseIDs, provider.StatusID)
                .FirstOrDefault();

            return newProvider;
        }

        public IList<Provider> DeleteProvider(int providerID) {
            IList<Provider> provider = _bryterOpsContext.Providers.FromSql("Admin_DELETE_Provider {0}", providerID).ToList();

            return provider;
        }
    }
}
