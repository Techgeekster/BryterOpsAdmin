using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using BryterOpsAdmin.Classes.Helpers;
using static BryterOpsAdmin.Classes.Helpers.Enums;

namespace BryterOpsAdmin.Models
{
    public partial class ProviderDB
    {
        public ProviderDB() { }

        [Required]
        [Key]
        public int ProviderID { get; set; }
        public string ProviderName { get; set; }
        public string EIN { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public Nullable<int> Zipcode { get; set; }
        public string Country { get; set; }
        public Nullable<int> Phone { get; set; }
        public string Website { get; set; }
        public string Email { get; set; }
        public string Contact { get; set; }
        public Nullable<int> ApprovalRate { get; set; }
        public Nullable<int> CompletionRate { get; set; }
        public Nullable<int> RetainingRate { get; set; }
        public string AssignedCityLicenseIDs { get; set; }
        public Nullable<int> StatusID { get; set; }
        public DateTime CreatedOn { get; set; }
    }

    public partial class Provider : ProviderDB {
        public Provider() { }

        public Provider(ProviderDB provider) {
            provider.CopyPropertiesTo(this);

            CreatedOnStr = provider.CreatedOn.ToShortDateString() + " " + provider.CreatedOn.ToShortTimeString();

            if (provider.StatusID.HasValue) {
                StatusName = Enum.GetName(typeof(Status), provider.StatusID.Value);
            }
        }

        public string StatusName { get; set; }
        public string CreatedOnStr { get; set; }
    }
}
