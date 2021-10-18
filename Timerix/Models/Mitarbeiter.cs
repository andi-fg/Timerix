using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Timerix.Models
{
    public class Mitarbeiter
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Column("Mitarbeiter_ID")]
        public int MitarbeiterId { get; set; }
        [Required]
        [Column(TypeName = "VARCHAR(64)")]
        public string Name { get; set; }
        [Required]
        [Column(TypeName = "VARCHAR(64)")]
        public string Vorname { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime Geburtsdatum { get; set; }
        [Required]
        [Column(TypeName = "VARCHAR(64)")]
        public string Abteilung { get; set; }
        public bool? Admin { get; set; }
        [Column("Mandant")]
        public int? StandortId { get; set; }
        [Column(TypeName = "VARCHAR(32)")]
        public string Bereich { get; set; }
        public bool? Aktiv { get; set; }
        public Standort Standort { get; set; }
        public virtual ICollection<Mobatime> Mobatime { get; set; }
        public virtual ICollection<Zeiterfassung> Zeiterfassung { get; set; }
    }
}
