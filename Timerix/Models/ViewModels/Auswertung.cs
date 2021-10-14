using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Timerix.Models.ViewModels
{
    public class Auswertung
    {
        public int id { get; set; }
        public int mitarbeiterId { get; set; }
        public string mitarbeiter { get; set; }
        public string chargenauftrag { get; set; }
        public string maschine { get; set; }
        public string arbeitsvorgang { get; set; }
        public DateTime eingestempelt { get; set; }
    }
}
