using System;
using System.IO;
using BryterOps_Library;
using BryterOpsAdmin.Classes.Helpers;
using BryterOpsAdmin.Models;
using BryterOpsAdmin.Services;
using Microsoft.AspNetCore.Mvc;

namespace BryterOpsAdmin.Controllers
{
    public class ImageController : Controller {
        private readonly BryterOpsContext _bryterOpsContext;
        private readonly AdminUserService _adminUserService;
        private readonly BryterUserService _bryterUserService;
        private readonly RetailerService _retailerService;
        private readonly ProviderService _providerService;
        private readonly ImageService _imageService;
        private readonly AzureStorageService _azureService;

        public ImageController(BryterOpsContext bryterOpsContext) 
        {
            _bryterOpsContext = bryterOpsContext;
            _adminUserService = new AdminUserService(bryterOpsContext);
            _bryterUserService = new BryterUserService(bryterOpsContext);
            _retailerService = new RetailerService(bryterOpsContext);
            _providerService = new ProviderService(bryterOpsContext);
            _imageService = new ImageService(bryterOpsContext);
            _azureService = new AzureStorageService();
        }

        public IActionResult SaveProfileImage(string ImageBase64, string FileName, int ID, int AccessType)
        {
            var imageBytes = Convert.FromBase64String(ImageBase64.Split(',')[1]);
            string filePath = _azureService.CreateImageFromBytes(imageBytes, FileName, true);

            switch (AccessType) {
                case (int)Enums.AccessType.Admin:
                    _adminUserService.UpdateAdminUserProfileImage(ID, filePath, ImageBase64);
                    break;
                case (int)Enums.AccessType.Bryter:
                    _bryterUserService.UpdateBryterUserProfileImage(ID, filePath, ImageBase64);
                    break;
                case (int)Enums.AccessType.Retailer:
                    _retailerService.UpdateRetailerProfileImage(ID, filePath, ImageBase64);
                    break;
                case (int)Enums.AccessType.Provider:
                    _providerService.UpdateProviderProfileImage(ID, filePath, ImageBase64);
                    break;
            }

            return JSON.Success(new { filePath = filePath});
        }

        public IActionResult GetDefaultProfileImage() {
            BryterImage defaultProfileImage = _imageService.GetDefaultProfileImage();

            return JSON.Success(new { defaultProfileImage = defaultProfileImage });
        }

        public IActionResult GetProfileImage(int ID, int AccessType) 
        {
            ProfileImage profileImage = null;

            switch (AccessType) {
                case (int)Enums.AccessType.Admin:
                    profileImage = _adminUserService.GetAdminUserProfileImage(ID);
                    break;
                case (int)Enums.AccessType.Bryter:
                    profileImage = _bryterUserService.GetBryterUserProfileImage(ID);
                    break;
                case (int)Enums.AccessType.Retailer:
                    profileImage = _retailerService.GetRetailerProfileImage(ID);
                    break;
                case (int)Enums.AccessType.Provider:
                    profileImage =_providerService.GetProviderProfileImage(ID);
                    break;
            }

            return JSON.Success(new { profileImage = profileImage });
        }
    }
}