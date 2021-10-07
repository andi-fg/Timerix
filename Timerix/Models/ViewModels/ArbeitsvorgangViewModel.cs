using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Timerix.Models.ViewModels
{
    public class ArbeitsvorgangViewModel
    {
        public int ArbeitsvorgangId { get; set; }
        public string ArbeitsvorgangName { get; set; }
        public bool? Aktiv { get; set; }
    }
}
