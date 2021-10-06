using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Timerix.Models
{
    public class Zeiterfassung
    {
        [Key]
        [Column("Zeiterfassung_ID")]
        public int ZeiterfassungId { get; set; }
        [Column("Mitarbeiter_ID")]
        public int MitarbeiterId { get; set; }
        [Column("Produktionsstrasse_ID")]
        public int ProduktionsstrasseId { get; set; }
        [Column("Auftrag_ID")]
        public int AuftragId { get; set; }
        [Column("Zeit_von")]
        [DataType(DataType.DateTime)]
        public DateTime ZeitVon { get; set; }
        [Column("Zeit_bis")]
        [DataType(DataType.DateTime)]
        public DateTime? ZeitBis { get; set; }
        [Column("Arbeitsvorgang")]
        public int? ArbeitsvorgangId { get; set; }

        public int? Anzahl { get; set; }
        public string Bemerkung { get; set; }
        public  Auftrag Auftrag { get; set; }
        public  Mitarbeiter Mitarbeiter { get; set; }
        public  Produktionsstrasse Produktionsstrasse { get; set; }
        public Arbeitsvorgang Arbeitsvorgang { get; set; }
    }
}
