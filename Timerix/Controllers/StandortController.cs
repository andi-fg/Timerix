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
    public class StandortController : ControllerBase
    {
        private readonly TimerixContext _context;

        public StandortController(TimerixContext context)
        {
            _context = context;
        }

        // GET: api/Standort
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Standort>>> GetStandort()
        {
            return await _context.Standort.ToListAsync();
        }

        // GET: api/Standort/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Standort>> GetStandort(int id)
        {
            var standort = await _context.Standort.FindAsync(id);

            if (standort == null)
            {
                return NotFound();
            }

            return standort;
        }

        // PUT: api/Standort/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStandort(int id, Standort standort)
        {
            if (id != standort.StandortId)
            {
                return BadRequest();
            }

            _context.Entry(standort).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StandortExists(id))
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

        // POST: api/Standort
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Standort>> PostStandort(Standort standort)
        {
            _context.Standort.Add(standort);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStandort", new { id = standort.StandortId }, standort);
        }

        // DELETE: api/Standort/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStandort(int id)
        {
            var standort = await _context.Standort.FindAsync(id);
            if (standort == null)
            {
                return NotFound();
            }

            _context.Standort.Remove(standort);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StandortExists(int id)
        {
            return _context.Standort.Any(e => e.StandortId == id);
        }
    }
}
