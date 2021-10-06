using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Timerix.Models
{
    public class Tagesrapport
    {
        [Key]
        [Column("Auftrag_ID")]
        public int AuftragId { get; set; }
        [Key]
        [Column("Produktionsstrasse_ID")]
        public int ProduktionsstrasseId { get; set; }
        [Key]
        [DataType(DataType.DateTime)]
        public DateTime Datum { get; set; }
        public int? Anzahl { get; set; }
        [Column(TypeName = "VARCHAR(255)")]
        public string Bemerkung { get; set; }

        public virtual Auftrag Auftrag { get; set; }
        public virtual Produktionsstrasse Produktionsstrasse { get; set; }
    }
}
