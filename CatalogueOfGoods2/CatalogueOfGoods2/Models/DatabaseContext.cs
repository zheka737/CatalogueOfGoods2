using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace CatalogueOfGoods2.Models
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(): base()
        {
        }

        public DatabaseContext(DbContextOptions<DatabaseContext> opts)
            : base(opts)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                IConfigurationRoot configuration = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json")
                    .Build();
            }
            optionsBuilder.UseSqlite(@"Data Source=./CatalogueOfGoods.db");
        }

        public DbSet<Product> Products { get; set; }
    }
}
