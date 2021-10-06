using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Timerix.Models.ViewModels
{
    public class MitarbeiterStandortViewModel
    {
        public int MitarbeiterId { get; set; }
        public string Name { get; set; }
        public string Vorname { get; set; }
        public DateTime Geburtsdatum { get; set; }
        public string Abteilung { get; set; }
        public bool? Admin { get; set; }
        public int? StandortId { get; set; }
        public string Bereich { get; set; }
        public bool? Aktiv { get; set; }
        public string Bezeichnung { get; set; }
        public int? AuftragPraefix { get; set; }
    }
}
