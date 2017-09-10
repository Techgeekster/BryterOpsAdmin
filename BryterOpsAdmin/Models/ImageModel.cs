using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BryterOpsAdmin.Models
{
    public class BryterImage
    {
        [Key]
        public string Name { get; set; }
        public string ProfileImageURL { get; set; }
        public string ProfileImageBase64 { get; set; }
    }

    public class ProfileImage 
    {
        [Key]
        public string ProfileImageURL { get; set; }
        public string ProfileImageBase64 { get; set; }
    }
}
