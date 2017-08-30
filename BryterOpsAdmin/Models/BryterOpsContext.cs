using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace BryterOpsAdmin.Models
{
    public partial class BryterOpsContext : DbContext
    {
        public virtual DbSet<User> Users { get; set; }

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
            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Username).IsRequired();
            });
        }
    }

    public partial class User
    {
        public User() { }

        [Required]
        public int UserID { get; set; }
        [Required]
        public string Username { get; set; }
    }
}
