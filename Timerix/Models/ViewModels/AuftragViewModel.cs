using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Timerix.Models.ViewModels
{
    public class AuftragViewModel
    {
        public int AuftragId { get; set; }
        public string Nummer { get; set; }
        public string Beschreibung { get; set; }
        public string ItemId { get; set; }
        public decimal? QtySched { get; set; }
        public int? StandortId { get; set; }
        public Standort Standort { get; set; }
    }
}
