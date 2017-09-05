using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BryterOpsAdmin.Models
{
    public partial class AdminUser
    {
        public AdminUser() { }

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
    }
}
