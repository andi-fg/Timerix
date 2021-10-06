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
    public class TagesrapportController : ControllerBase
    {
        private readonly TimerixContext _context;

        public TagesrapportController(TimerixContext context)
        {
            _context = context;
        }

        // GET: api/Tagesrapport
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tagesrapport>>> GetTagesrapport()
        {
            return await _context.Tagesrapport.ToListAsync();
        }

        // GET: api/Tagesrapport/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tagesrapport>> GetTagesrapport(int id)
        {
            var tagesrapport = await _context.Tagesrapport.FindAsync(id);

            if (tagesrapport == null)
            {
                return NotFound();
            }

            return tagesrapport;
        }

        // PUT: api/Tagesrapport/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTagesrapport(int id, Tagesrapport tagesrapport)
        {
            if (id != tagesrapport.AuftragId)
            {
                return BadRequest();
            }

            _context.Entry(tagesrapport).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TagesrapportExists(id))
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

        // POST: api/Tagesrapport
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Tagesrapport>> PostTagesrapport(Tagesrapport tagesrapport)
        {
            _context.Tagesrapport.Add(tagesrapport);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TagesrapportExists(tagesrapport.AuftragId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTagesrapport", new { id = tagesrapport.AuftragId }, tagesrapport);
        }

        // DELETE: api/Tagesrapport/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTagesrapport(int id)
        {
            var tagesrapport = await _context.Tagesrapport.FindAsync(id);
            if (tagesrapport == null)
            {
                return NotFound();
            }

            _context.Tagesrapport.Remove(tagesrapport);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TagesrapportExists(int id)
        {
            return _context.Tagesrapport.Any(e => e.AuftragId == id);
        }
    }
}
