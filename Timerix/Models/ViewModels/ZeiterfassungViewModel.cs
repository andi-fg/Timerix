using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Timerix.Models.ViewModels
{
    public class ZeiterfassungViewModel
    {
        public int ZeiterfassungId { get; set; }
        public int MitarbeiterId { get; set; }
        public int ProduktionsstrasseId { get; set; }
        public int AuftragId { get; set; }
        public DateTime ZeitVon { get; set; }
        public DateTime? ZeitBis { get; set; }
        public int? ArbeitsvorgangId { get; set; }
        public int? Anzahl { get; set; }
        public string Bemerkung { get; set; }
        public AuftragViewModel Auftrag { get; set; }
       // public Mitarbeiter Mitarbeiter { get; set; }
        public ProduktionsstrasseViewModel Produktionsstrasse { get; set; }
        public ArbeitsvorgangViewModel Arbeitsvorgang { get; set; }
    }
}
