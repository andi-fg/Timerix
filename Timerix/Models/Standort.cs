using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Timerix.Models
{
    public class Standort
    {
        [Column("Standort_ID")]
        public int StandortId { get; set; }
        [Required]
        [Column(TypeName = "VARCHAR(64)")]
        public string Bezeichnung { get; set; }
        public int? AuftragPraefix { get; set; }
        [Column(TypeName = "VARCHAR(64)")]
        public string Dataareaid { get; set; }

        public virtual ICollection<Auftrag> Auftrag { get; set; }
        public virtual ICollection<Produktionsstrasse> Produktionsstrasse { get; set; }
        public virtual ICollection<Mitarbeiter> Mitarbeiter { get; set; }
    }
}
