using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Timerix.Models.ViewModels
{
    public class ProduktionsstrasseViewModel
    {
        public int ProduktionsstrasseId { get; set; }
        public string Beschreibung { get; set; }
        public bool? Aktiv { get; set; }
        public int? StandortId { get; set; }
        public Standort Standort { get; set; }
    }
}
