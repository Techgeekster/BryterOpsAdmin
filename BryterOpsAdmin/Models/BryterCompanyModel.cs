using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BryterOpsAdmin.Models
{
    public class BryterCompany
    {
        public BryterCompany() { }

        [Required]
        [Key]
        public Nullable<int> CompanyID { get; set; }
        public string CompanyName { get; set; }
    }
}
