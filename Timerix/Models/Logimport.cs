using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Timerix.Models
{
    public class Logimport
    {
        [Column("Logimport_ID")]
        public int LogimportId { get; set; }
        public int AuftragNummer { get; set; }
        [Column(TypeName = "VARCHAR(64)")]
        public string Auftrag { get; set; }
        [Column(TypeName = "VARCHAR(255)")]
        public string Beschreibung { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime Zeitpunkt { get; set; }
        [Column(TypeName = "VARCHAR(64)")]
        public string Dataareaid { get; set; }
    }
}
