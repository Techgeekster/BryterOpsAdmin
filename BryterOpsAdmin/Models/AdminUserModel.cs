using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using BryterOpsAdmin.Classes.Helpers;
using static BryterOpsAdmin.Classes.Helpers.Enums;

namespace BryterOpsAdmin.Models
{
    public partial class AdminUserDB
    {
        public AdminUserDB() { }

        [Required]
        [Key]
        public int UserID { get; set; }
        [Required]
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Nullable<int> Phone { get; set; }
        public string Email { get; set; }
        public Nullable<int> AdminUserTypeID { get; set; }
        public string Title { get; set; }
        public Nullable<int> StatusID { get; set; }
        public DateTime CreatedOn { get; set; }
    }

    public partial class AdminUser : AdminUserDB 
    {
        public AdminUser() { }

        public AdminUser(AdminUserDB adminUser) 
        {
            adminUser.CopyPropertiesTo(this);

            CreatedOnStr = adminUser.CreatedOn.ToShortDateString() + " " + adminUser.CreatedOn.ToShortTimeString();

            if (adminUser.StatusID.HasValue) 
            {
                StatusName = Enum.GetName(typeof(Status), adminUser.StatusID.Value);
            }

            AdminUserTypeName = Enum.GetName(typeof(AdminUserType), adminUser.AdminUserTypeID.Value);
        }

        public string StatusName { get; set; }
        public string AdminUserTypeName { get; set; }
        public string CreatedOnStr { get; set; }
    }
}
