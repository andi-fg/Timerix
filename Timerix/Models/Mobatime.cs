using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Timerix.Models
{
    public class Mobatime
    {
        [Key]
        [Column("Moba_ID")]
        public int MobaId { get; set; }
        [Required]
        [DataType(DataType.DateTime)]
        public DateTime Start { get; set; }
        [Required]
        [DataType(DataType.DateTime)]
        public DateTime Ende { get; set; }
        [Column("Mitarbeiter_ID")]
        public int MitarbeiterId { get; set; }
        public  Mitarbeiter Mitarbeiter { get; set; }
    }
}
