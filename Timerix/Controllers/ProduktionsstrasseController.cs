using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Timerix.Models;

namespace Timerix.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProduktionsstrasseController : ControllerBase
    {
        private readonly TimerixContext _context;

        public ProduktionsstrasseController(TimerixContext context)
        {
            _context = context;
        }

        // GET: api/Produktionsstrasse
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Produktionsstrasse>>> GetProduktionsstrasse()
        {
            return await _context.Produktionsstrasse.ToListAsync();
        }

        // GET: api/Produktionsstrasse/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Produktionsstrasse>> GetProduktionsstrasse(int id)
        {
            var produktionsstrasse = await _context.Produktionsstrasse.FindAsync(id);

            if (produktionsstrasse == null)
            {
                return NotFound();
            }

            return produktionsstrasse;
        }

        // PUT: api/Produktionsstrasse/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduktionsstrasse(int id, Produktionsstrasse produktionsstrasse)
        {
            if (id != produktionsstrasse.ProduktionsstrasseId)
            {
                return BadRequest();
            }

            _context.Entry(produktionsstrasse).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProduktionsstrasseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Produktionsstrasse
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Produktionsstrasse>> PostProduktionsstrasse(Produktionsstrasse produktionsstrasse)
        {
            _context.Produktionsstrasse.Add(produktionsstrasse);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduktionsstrasse", new { id = produktionsstrasse.ProduktionsstrasseId }, produktionsstrasse);
        }

        // DELETE: api/Produktionsstrasse/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduktionsstrasse(int id)
        {
            var produktionsstrasse = await _context.Produktionsstrasse.FindAsync(id);
            if (produktionsstrasse == null)
            {
                return NotFound();
            }

            _context.Produktionsstrasse.Remove(produktionsstrasse);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProduktionsstrasseExists(int id)
        {
            return _context.Produktionsstrasse.Any(e => e.ProduktionsstrasseId == id);
        }
    }
}
