using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace BryterOpsAdmin.Models
{
    public partial class BryterOpsContext : DbContext
    {
        public virtual DbSet<BryterUserDB> BryterUsers { get; set; }

        public virtual DbSet<AdminUserDB> AdminUsers { get; set; }

        public virtual DbSet<RetailerDB> Retailers { get; set; }
        public virtual DbSet<RetailerBasicDB> RetailersBasic { get; set; }

        public virtual DbSet<ProviderDB> Providers { get; set; }

        public virtual DbSet<BryterImage> BryterImages { get; set; }
        public virtual DbSet<ProfileImage> ProfileImages { get; set; }

        public BryterOpsContext(DbContextOptions<BryterOpsContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BryterUserDB>(entity =>
            {
                entity.Property(e => e.UserID).IsRequired();
            });
            modelBuilder.Entity<AdminUserDB>(entity =>
            {
                entity.Property(e => e.UserID).IsRequired();
            });
            modelBuilder.Entity<RetailerDB>(entity =>
            {
                entity.Property(e => e.RetailerID).IsRequired();
            });
            modelBuilder.Entity<ProviderDB>(entity =>
            {
                entity.Property(e => e.ProviderID).IsRequired();
            });
        }
    }
}
