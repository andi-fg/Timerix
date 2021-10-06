using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Timerix.Models
{
    public class Produktionsstrasse
    {
        [Column("Produktionsstrasse_ID")]
        public int ProduktionsstrasseId { get; set; }
        [Required]
        [Column(TypeName = "VARCHAR(64)")]
        public string Beschreibung { get; set; }
        public bool? Aktiv { get; set; }
        [Column("Standort_ID")]
        public int? StandortId { get; set; }
        public  Standort Standort { get; set; }
        public virtual ICollection<Tagesrapport> Tagesrapport { get; set; }
        public virtual ICollection<Zeiterfassung> Zeiterfassung { get; set; }
    }
}
