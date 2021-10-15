using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Timerix.ModelsAX
{
    public class AXDBContext : DbContext
    {
        public AXDBContext(DbContextOptions<AXDBContext> options)
            : base(options)
        {
        }
        public DbSet<Prodtable> Prodtable { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Prodtable>().ToTable("Prodtable");
        }
    }
}
