using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using BryterOpsAdmin.Classes.Helpers;

namespace BryterOpsAdmin.Models
{
    public partial class BryterImageDB
    {
        [Key]
        public string Name { get; set; }
        public string ProfileImageURL { get; set; }
        public string ProfileImageBase64 { get; set; }
        public DateTime CreatedOn { get; set; }
    }

    public partial class BryterImage : BryterImageDB 
    {
        public BryterImage() { }

        public BryterImage(BryterImageDB bryterImage) {
            bryterImage.CopyPropertiesTo(this);
            CreatedOnStr = bryterImage.CreatedOn.ToShortDateString() + " " + bryterImage.CreatedOn.ToShortTimeString();
        }

        public string CreatedOnStr { get; set; }

    }

    public partial class ProfileImageDB
    {
        [Key]
        public string ProfileImageURL { get; set; }
        public string ProfileImageBase64 { get; set; }
        public DateTime CreatedOn { get; set; }
    }

    public partial class ProfileImage: ProfileImageDB {
        public ProfileImage() { }

        public ProfileImage(ProfileImageDB profileImage) {
            profileImage.CopyPropertiesTo(this);
            CreatedOnStr = profileImage.CreatedOn.ToShortDateString() + " " + profileImage.CreatedOn.ToShortTimeString();
        }

        public string CreatedOnStr { get; set; }
    }
}
