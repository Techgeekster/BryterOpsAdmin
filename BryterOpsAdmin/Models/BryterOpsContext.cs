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
}
