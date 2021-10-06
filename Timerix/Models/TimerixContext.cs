using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Timerix.Models
{
    public class TimerixContext : DbContext
    {
        public TimerixContext(DbContextOptions<TimerixContext> options)
            : base(options)
        {
        }
        public  DbSet<Arbeitsvorgang> Arbeitsvorgang { get; set; }
        public  DbSet<Auftrag> Auftrag { get; set; }
        public  DbSet<Mitarbeiter> Mitarbeiter { get; set; }
        public  DbSet<Mobatime> Mobatime { get; set; }
        public  DbSet<Produktionsstrasse> Produktionsstrasse { get; set; }
        public  DbSet<Standort> Standort { get; set; }
        public  DbSet<Tagesrapport> Tagesrapport { get; set; }
        public  DbSet<Zeiterfassung> Zeiterfassung { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Standort>().ToTable("Standort");
            modelBuilder.Entity<Mitarbeiter>().ToTable("Mitarbeiter");
            modelBuilder.Entity<Mobatime>().ToTable("Mobatime");
            modelBuilder.Entity<Auftrag>().ToTable("Auftrag");
            modelBuilder.Entity<Produktionsstrasse>().ToTable("Produktionsstrasse");
            modelBuilder.Entity<Arbeitsvorgang>().ToTable("Arbeitsvorgang");
            modelBuilder.Entity<Tagesrapport>().ToTable("Tagesrapport");
            modelBuilder.Entity<Zeiterfassung>().ToTable("Zeiterfassung");
            //PKs
            modelBuilder.Entity<Tagesrapport>().HasKey(sc => new { sc.AuftragId, sc.Datum, sc.ProduktionsstrasseId });
        }
        //
    }
}
