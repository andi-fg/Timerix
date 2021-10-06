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
    public class MobatimeController : ControllerBase
    {
        private readonly TimerixContext _context;

        public MobatimeController(TimerixContext context)
        {
            _context = context;
        }

        // GET: api/Mobatime
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Mobatime>>> GetMobatime()
        {
            return await _context.Mobatime.ToListAsync();
        }

        // GET: api/Mobatime/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Mobatime>> GetMobatime(int id)
        {
            var mobatime = await _context.Mobatime.FindAsync(id);

            if (mobatime == null)
            {
                return NotFound();
            }

            return mobatime;
        }

        // PUT: api/Mobatime/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMobatime(int id, Mobatime mobatime)
        {
            if (id != mobatime.MobaId)
            {
                return BadRequest();
            }

            _context.Entry(mobatime).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MobatimeExists(id))
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

        // POST: api/Mobatime
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Mobatime>> PostMobatime(Mobatime mobatime)
        {
            _context.Mobatime.Add(mobatime);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMobatime", new { id = mobatime.MobaId }, mobatime);
        }

        // DELETE: api/Mobatime/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMobatime(int id)
        {
            var mobatime = await _context.Mobatime.FindAsync(id);
            if (mobatime == null)
            {
                return NotFound();
            }

            _context.Mobatime.Remove(mobatime);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MobatimeExists(int id)
        {
            return _context.Mobatime.Any(e => e.MobaId == id);
        }
    }
}
