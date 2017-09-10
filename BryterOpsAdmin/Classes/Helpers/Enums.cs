using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BryterOpsAdmin.Classes.Helpers
{
    public class Enums
    {
        public enum Status {
            Active = 1,
            Inactive = 2
        }

        public enum AccessType {
            Admin = 1,
            Bryter = 2,
            Retailer = 3,
            Provider = 4
        }
    }
}
