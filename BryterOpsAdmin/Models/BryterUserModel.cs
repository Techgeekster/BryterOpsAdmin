using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using BryterOpsAdmin.Classes.Helpers;
using static BryterOpsAdmin.Classes.Helpers.Enums;

namespace BryterOpsAdmin.Models
{
    public partial class BryterUserDB
    {
        public BryterUserDB() { }

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
        public Nullable<int> StatusID { get; set; }
        public DateTime CreatedOn { get; set; }
        public int BryterUserTypeID { get; set; }
    }

    public partial class BryterUser : BryterUserDB {
        public BryterUser() { }

        public BryterUser(BryterUserDB bryterUser) {
            bryterUser.CopyPropertiesTo(this);

            CreatedOnStr = bryterUser.CreatedOn.ToShortDateString() + " " + bryterUser.CreatedOn.ToShortTimeString();

            if (bryterUser.StatusID.HasValue) {
                StatusName = Enum.GetName(typeof(Status), bryterUser.StatusID.Value);
            }

            BryterUserTypeName = Enum.GetName(typeof(BryterUserType), bryterUser.BryterUserTypeID);
        }

        public string StatusName { get; set; }
        public string BryterUserTypeName { get; set; }
        public string CreatedOnStr { get; set; }
    }
}
