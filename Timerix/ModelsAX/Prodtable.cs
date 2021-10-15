using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Timerix.ModelsAX
{
    public class Prodtable
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Column("Prodid")]
        public int ProdId { get; set; }
        [Required]
        [Column(TypeName = "VARCHAR(64)")]
        public string Dataareaid { get; set; }
        [Column(TypeName = "VARCHAR(64)")]
        public string ItemId { get; set; }
        [Column(TypeName = "VARCHAR(64)")]
        [Required]
        public string Name { get; set; }
        [Column(TypeName = "decimal(28,12)")]
        public decimal? QtySched { get; set; }
    }
}
