using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Timerix.Models
{
    public class Auftrag
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Column("Auftrag_ID")]
        public int AuftragId { get; set; }
        [Required]
        [Column(TypeName = "VARCHAR(64)")]
        public string Nummer { get; set; }
        [Column(TypeName = "VARCHAR(64)")]
        [Required]
        public string Beschreibung { get; set; }
        [Column(TypeName = "VARCHAR(64)")]
        public string ItemId { get; set; }
        [Column(TypeName = "decimal(28,12)")]
        public decimal? QtySched { get; set; }
        [Column("Standort_ID")]
        public int? StandortId { get; set; }
        public Standort Standort { get; set; }
        public virtual ICollection<Tagesrapport> Tagesrapport { get; set; }
        public virtual ICollection<Zeiterfassung> Zeiterfassung { get; set; }
    }
}
