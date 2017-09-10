using System;
using System.IO;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace BryterOpsAdmin.Services
{
    public class AzureStorageService
    {
        public CloudBlobClient cloudBlobClient;
        public CloudBlobContainer imageContainer;
        public CloudBlobContainer publicImageContainer;
        private string storageConnectionString = "DefaultEndpointsProtocol=https;" 
            + "AccountName=bryteropsblobs;" 
            + "AccountKey=18bL9T4nTftmDLl2pWdT04kYWabk4HCFZO5aNDDwG7W9kR+CEk1MaN6fiwY6UDX2n99b8qBNh98Ybk8g4CEDuQ==;"
            + "EndpointSuffix=core.windows.net";

        public AzureStorageService() {
            CloudStorageAccount account = CloudStorageAccount.Parse(storageConnectionString);
            cloudBlobClient = account.CreateCloudBlobClient();

            Console.WriteLine("Create Azure Blob Image Container...");
            imageContainer = cloudBlobClient.GetContainerReference("images");
            imageContainer.CreateIfNotExistsAsync().Wait();

            Console.WriteLine("Create Azure Blob PublicImage Container...");
            publicImageContainer = cloudBlobClient.GetContainerReference("publicimages");
            publicImageContainer.CreateIfNotExistsAsync().Wait();
            BlobContainerPermissions publicImageContainerPermissions = publicImageContainer.GetPermissionsAsync().Result;
            publicImageContainerPermissions.PublicAccess = BlobContainerPublicAccessType.Container;
            publicImageContainer.SetPermissionsAsync(publicImageContainerPermissions);
        }

        public string CreateImageFromBytes(byte[] byteArray, string filePath, bool isPublic = false) {
            CloudBlockBlob image = null;

            if (isPublic)
                image = publicImageContainer.GetBlockBlobReference(filePath);
            else
                image = imageContainer.GetBlockBlobReference(filePath);

            image.Properties.ContentType = "image/png";
            image.UploadFromByteArrayAsync(byteArray, 0, byteArray.Length);

            return image.Uri.AbsoluteUri;
        }
    }
}
