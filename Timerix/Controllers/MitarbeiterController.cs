using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Timerix.Models;
using Timerix.Models.ViewModels;

namespace Timerix.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MitarbeiterController : ControllerBase
    {
        private readonly TimerixContext _context;

        public MitarbeiterController(TimerixContext context)
        {
            _context = context;
        }

        // GET: api/Mitarbeiter
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Mitarbeiter>>> GetMitarbeiter()
        {
            
            return await _context.Mitarbeiter.ToListAsync();
        }

        // GET: api/Mitarbeiter/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Mitarbeiter>> GetMitarbeiter(int id)
        {
            var mitarbeiter = await _context.Mitarbeiter.FindAsync(id);
            //var mitarbeiter = await _context.Mitarbeiter.Include(mitarbeiter => mitarbeiter.Standort).FirstOrDefaultAsync(mitarbeiter => mitarbeiter.MitarbeiterId == id); ;
            if (mitarbeiter == null)
            {
                return NotFound();
            }
            return mitarbeiter;
        }
        //Get Mitarbeite für Login ob er auck aktiv ist
        // GET: api/Mitarbeiter/Login/5
        [HttpGet("login/{id}")]
        public async Task<ActionResult<Mitarbeiter>> GetMitarbeiterLogin(int id)
        {
            var mitarbeiter = await _context.Mitarbeiter.FindAsync(id);
            //var mitarbeiter = await _context.Mitarbeiter.Include(mitarbeiter => mitarbeiter.Standort).FirstOrDefaultAsync(mitarbeiter => mitarbeiter.MitarbeiterId == id); ;
            if (mitarbeiter == null || mitarbeiter.Aktiv == false)
            {
                return NotFound();
            }
            return mitarbeiter;
        }
        //Get Mitarbeiter mit Standort zusammen
        // GET: api/Mitarbeiter/mitstan/5
        [HttpGet("mitstan/{id}")]
        public async Task<ActionResult<MitarbeiterStandortViewModel>> GetMitarbeiterStandort(int id)
        {
            var mitarbeiter = await _context.Mitarbeiter.Include(mitarbeiter => mitarbeiter.Standort).FirstOrDefaultAsync(mitarbeiter => mitarbeiter.MitarbeiterId == id); ;
            if (mitarbeiter == null)
            {
                return NotFound();
            }
            MitarbeiterStandortViewModel msvm = new MitarbeiterStandortViewModel();
            msvm.MitarbeiterId = mitarbeiter.MitarbeiterId;
            msvm.Name = mitarbeiter.Name;
            msvm.Vorname = mitarbeiter.Vorname;
            msvm.Abteilung = mitarbeiter.Abteilung;
            msvm.Admin = mitarbeiter.Admin;
            msvm.Geburtsdatum = mitarbeiter.Geburtsdatum;
            if (mitarbeiter.Standort != null) {
                msvm.StandortId = mitarbeiter.StandortId;
                msvm.Bezeichnung = mitarbeiter.Standort.Bezeichnung;
                msvm.AuftragPraefix = mitarbeiter.Standort.AuftragPraefix;
            }
            return msvm;
        }

        // PUT: api/Mitarbeiter/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMitarbeiter(int id, Mitarbeiter mitarbeiter)
        {
            if (id != mitarbeiter.MitarbeiterId)
            {
                return BadRequest();
            }

            _context.Entry(mitarbeiter).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MitarbeiterExists(id))
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

        // POST: api/Mitarbeiter
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Mitarbeiter>> PostMitarbeiter(Mitarbeiter mitarbeiter)
        {
            _context.Mitarbeiter.Add(mitarbeiter);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMitarbeiter", new { id = mitarbeiter.MitarbeiterId }, mitarbeiter);
        }

        // DELETE: api/Mitarbeiter/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMitarbeiter(int id)
        {
            var mitarbeiter = await _context.Mitarbeiter.FindAsync(id);
            if (mitarbeiter == null)
            {
                return NotFound();
            }

            _context.Mitarbeiter.Remove(mitarbeiter);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MitarbeiterExists(int id)
        {
            return _context.Mitarbeiter.Any(e => e.MitarbeiterId == id);
        }

        //Get MitariberterList mit aktiven oder innaktiven mitarbeiter
        // GET: api/Mitarbeiter
        [HttpGet("aktiv/{id}")]
        public async Task<ActionResult<IEnumerable<Mitarbeiter>>> GetMitarbeiterAktiv(int id)
        {
            List<Mitarbeiter> ml = new List<Mitarbeiter>();
            if(id == 2)
            {
                ml = _context.Mitarbeiter
                    .Where(mit => mit.Aktiv == true)
                    .ToList();
            }
            else if(id == 3)
            {
                ml = _context.Mitarbeiter
                    .Where(mit => mit.Aktiv == false)
                    .ToList();
            }
            return ml;
        }
    }
}
