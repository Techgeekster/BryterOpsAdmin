using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using BryterOpsAdmin.Classes.Helpers;
using static BryterOpsAdmin.Classes.Helpers.Enums;

namespace BryterOpsAdmin.Models
{
    public class RetailerBasicDB
    {
        public RetailerBasicDB() { }

        [Required]
        [Key]
        public int RetailerID { get; set; }
        public string RetailerName { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public Nullable<int> Phone { get; set; }
        public string Website { get; set; }
        public string Email { get; set; }
        public string Contact { get; set; }
        public Nullable<int> StatusID { get; set; }
        public DateTime CreatedOn { get; set; }
    }

    public partial class RetailerBasic : RetailerBasicDB {
        RetailerBasic() { }

        public RetailerBasic(RetailerBasicDB retailer) {
            retailer.CopyPropertiesTo(this);

            CreatedOnStr = retailer.CreatedOn.ToShortDateString() + " " + retailer.CreatedOn.ToShortTimeString();

            if (retailer.StatusID.HasValue) {
                StatusName = Enum.GetName(typeof(Status), retailer.StatusID.Value);
            }
        }

        public string StatusName { get; set; }
        public string CreatedOnStr { get; set; }
    }
}
