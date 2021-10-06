using Timerix.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Timerix.Data
{
    public class DbInitializer
    {
        public static void Initialize(TimerixContext context)
        {
            context.Database.EnsureCreated();
            
            // Look for any students.
            if (context.Mitarbeiter.Any())
            {
                return;   // DB has been seeded
            }
        }
    }
}
