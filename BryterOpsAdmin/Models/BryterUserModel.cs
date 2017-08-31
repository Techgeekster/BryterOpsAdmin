using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BryterOpsAdmin.Models
{
    public partial class BryterUser
    {
        public BryterUser() { }

        [Required]
        [Key]
        public int UserID { get; set; }
        [Required]
        public string Username { get; set; }
        public string CompanyName { get; set; }
        public Nullable<int> CompanyID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public Nullable<int> Zipcode { get; set; }
        public string Country { get; set; }
        public string Title { get; set; }
        public string ExperienceLevel { get; set; }
        public string ManagerName { get; set; }
        public Nullable<int> ManagerPhone { get; set; }
        public string ManagerEmail { get; set; }
        public Nullable<int> Phone { get; set; }
        public string Email { get; set; }
        public string Rating { get; set; }
        public string Photo { get; set; }
        public Nullable<int> YearsWithCompany { get; set; }
        public Nullable<int> ApprovalRate { get; set; }
        public Nullable<int> CompletionRate { get; set; }
        public Nullable<int> RetainingRate { get; set; }
        public string AssignedCityLicenseIDs { get; set; }
    }
}
