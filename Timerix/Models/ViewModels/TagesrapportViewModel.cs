using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Timerix.Models.ViewModels
{
    public class TagesrapportViewModel
    {
        public int AuftragId { get; set; }
        public int ProduktionsstrasseId { get; set; }
        public DateTime Datum { get; set; }
        public int? Anzahl { get; set; }
        public string Bemerkung { get; set; }
        public virtual AuftragViewModel Auftrag { get; set; }
        public virtual ProduktionsstrasseViewModel Produktionsstrasse { get; set; }
    }
}
