using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Timerix.Models
{
    public class Arbeitsvorgang
    {
        [Column("Arbeitsvorgang_ID")]
        public int ArbeitsvorgangId { get; set; }
        [Required]
        [Column("Arbeitsvorgang",TypeName = "VARCHAR(64)")]
        public string ArbeitsvorgangName { get; set; }
        public bool? Aktiv { get; set; }
        public virtual ICollection<Zeiterfassung> Zeiterfassung { get; set; }
    }

}
