using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BryterOpsAdmin.Models
{
    public partial class Retailer
    {
        public Retailer() { }

        [Required]
        [Key]
        public int RetailerID { get; set; }
        public string RetailerName { get; set; }
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
        public string ProviderIDs { get; set; }
    }
}
