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
    public class ArbeitsvorgangController : ControllerBase
    {
        private readonly TimerixContext _context;

        public ArbeitsvorgangController(TimerixContext context)
        {
            _context = context;
        }

        // GET: api/Arbeitsvorgang
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Arbeitsvorgang>>> GetArbeitsvorgang()
        {
            return await _context.Arbeitsvorgang.ToListAsync();
        }

        // GET: api/Arbeitsvorgang/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Arbeitsvorgang>> GetArbeitsvorgang(int id)
        {
            var arbeitsvorgang = await _context.Arbeitsvorgang.FindAsync(id);

            if (arbeitsvorgang == null)
            {
                return NotFound();
            }

            return arbeitsvorgang;
        }

        // PUT: api/Arbeitsvorgang/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArbeitsvorgang(int id, Arbeitsvorgang arbeitsvorgang)
        {
            if (id != arbeitsvorgang.ArbeitsvorgangId)
            {
                return BadRequest();
            }

            _context.Entry(arbeitsvorgang).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArbeitsvorgangExists(id))
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

        // POST: api/Arbeitsvorgang
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Arbeitsvorgang>> PostArbeitsvorgang(Arbeitsvorgang arbeitsvorgang)
        {
            _context.Arbeitsvorgang.Add(arbeitsvorgang);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetArbeitsvorgang", new { id = arbeitsvorgang.ArbeitsvorgangId }, arbeitsvorgang);
        }

        // DELETE: api/Arbeitsvorgang/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArbeitsvorgang(int id)
        {
            var arbeitsvorgang = await _context.Arbeitsvorgang.FindAsync(id);
            if (arbeitsvorgang == null)
            {
                return NotFound();
            }

            _context.Arbeitsvorgang.Remove(arbeitsvorgang);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ArbeitsvorgangExists(int id)
        {
            return _context.Arbeitsvorgang.Any(e => e.ArbeitsvorgangId == id);
        }
    }
}
