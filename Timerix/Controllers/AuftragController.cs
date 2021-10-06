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
    public class AuftragController : ControllerBase
    {
        private readonly TimerixContext _context;

        public AuftragController(TimerixContext context)
        {
            _context = context;
        }

        // GET: api/Auftrag
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Auftrag>>> GetAuftrag()
        {
            return await _context.Auftrag.ToListAsync();
        }

        // GET: api/Auftrag/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Auftrag>> GetAuftrag(int id)
        {
            var auftrag = await _context.Auftrag.FindAsync(id);

            if (auftrag == null)
            {
                return NotFound();
            }

            return auftrag;
        }

        // PUT: api/Auftrag/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAuftrag(int id, Auftrag auftrag)
        {
            if (id != auftrag.AuftragId)
            {
                return BadRequest();
            }

            _context.Entry(auftrag).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AuftragExists(id))
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

        // POST: api/Auftrag
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Auftrag>> PostAuftrag(Auftrag auftrag)
        {
            _context.Auftrag.Add(auftrag);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAuftrag", new { id = auftrag.AuftragId }, auftrag);
        }

        // DELETE: api/Auftrag/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAuftrag(int id)
        {
            var auftrag = await _context.Auftrag.FindAsync(id);
            if (auftrag == null)
            {
                return NotFound();
            }

            _context.Auftrag.Remove(auftrag);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AuftragExists(int id)
        {
            return _context.Auftrag.Any(e => e.AuftragId == id);
        }
    }
}
