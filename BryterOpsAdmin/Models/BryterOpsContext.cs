using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace BryterOpsAdmin.Models
{
    public partial class BryterOpsContext : DbContext
    {
        public virtual DbSet<BryterUser> BryterUsers { get; set; }
        public virtual DbSet<AdminUser> AdminUsers { get; set; }
        public virtual DbSet<Retailer> Retailers { get; set; }
        public virtual DbSet<Provider> Providers { get; set; }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    if (!optionsBuilder.IsConfigured)
        //    {
        //        #warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
        //        optionsBuilder.UseSqlServer(@"Server=tcp:bryteropsathena.database.windows.net,1433;Initial Catalog=BryterOps;Persist Security Info=False;User ID=tdillman;Password=L@mbda13;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
        //    }
        //}

        public BryterOpsContext(DbContextOptions<BryterOpsContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BryterUser>(entity =>
            {
                entity.Property(e => e.UserID).IsRequired();
            });
            modelBuilder.Entity<AdminUser>(entity =>
            {
                entity.Property(e => e.UserID).IsRequired();
            });
            modelBuilder.Entity<Retailer>(entity =>
            {
                entity.Property(e => e.RetailerID).IsRequired();
            });
            modelBuilder.Entity<Provider>(entity =>
            {
                entity.Property(e => e.ProviderID).IsRequired();
            });
        }
    }

    public partial class BryterUser
    {
        public BryterUser() { }

        [Required]
        [Key]
        public int UserID { get; set; }
        [Required]
        public string Username { get; set; }
        public string CompanyName { get; set; }
        public Nullable<int> CompanyID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public Nullable<int> Zipcode { get; set; }
        public string Country { get; set; }
        public string Title { get; set; }
        public string ExperienceLevel { get; set; }
        public string ManagerName { get; set; }
        public Nullable<int> ManagerPhone { get; set; }
        public string ManagerEmail { get; set; }
        public Nullable<int> Phone { get; set; }
        public string Email { get; set; }
        public string Rating { get; set; }
        public string Photo { get; set; }
        public Nullable<int> YearsWithCompany { get; set; }
        public Nullable<int> ApprovalRate { get; set; }
        public Nullable<int> CompletionRate { get; set; }
        public Nullable<int> RetainingRate { get; set; }
        public string AssignedCityLicenseIDs { get; set; }
    }

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
    }

    public partial class Retailer
    {
        public Retailer() { }

        [Required]
        [Key]
        public int RetailerID { get; set; }
        public string RetailerName { get; set; }
        public string EIN { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public Nullable<int> Zipcode { get; set; }
        public string Country { get; set; }
        public Nullable<int> Phone { get; set; }
        public string Website { get; set; }
        public string Email { get; set; }
        public string Contact { get; set; }
        public Nullable<int> ApprovalRate { get; set; }
        public Nullable<int> CompletionRate { get; set; }
        public Nullable<int> RetainingRate { get; set; }
        public string AssignedCityLicenseIDs { get; set; }
        public string ProviderIDs { get; set; }
    }

    public partial class Provider
    {
        public Provider() { }

        [Required]
        [Key]
        public int ProviderID { get; set; }
        public string ProviderName { get; set; }
        public string EIN { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public Nullable<int> Zipcode { get; set; }
        public string Country { get; set; }
        public Nullable<int> Phone { get; set; }
        public string Website { get; set; }
        public string Email { get; set; }
        public string Contact { get; set; }
        public Nullable<int> ApprovalRate { get; set; }
        public Nullable<int> CompletionRate { get; set; }
        public Nullable<int> RetainingRate { get; set; }
        public string AssignedCityLicenseIDs { get; set; }
    }
}
