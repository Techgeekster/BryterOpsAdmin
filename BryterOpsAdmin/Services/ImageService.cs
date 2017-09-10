using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BryterOpsAdmin.Models;
using Microsoft.EntityFrameworkCore;

namespace BryterOpsAdmin.Services
{
    public class ImageService
    {
        private readonly BryterOpsContext _bryterOpsContext;
        public ImageService(BryterOpsContext bryterOpsContext) {
            _bryterOpsContext = bryterOpsContext;
        }

        public BryterImage GetDefaultProfileImage() {
            BryterImage defaultProfileImage = _bryterOpsContext.BryterImages.FromSql("Admin_LIST_BryterImage {0}", "DefaultProfileImage").FirstOrDefault();

            return defaultProfileImage;
        }
    }
}
