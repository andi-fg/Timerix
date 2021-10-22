using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Timerix.Models;

namespace Timerix.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogimportController : ControllerBase
    {
        private readonly TimerixContext _context;

        public LogimportController(TimerixContext context)
        {
            _context = context;
        }
        //Alle Importlogs
        // GET: api/Logimport
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Logimport>>> GetLogimport()
        {

            return await _context.Logimport.OrderByDescending(log => log.Zeitpunkt).ToListAsync();
        }
        //Importlogs und nur Nummer wird geschaut
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Logimport>>> GetLogImportFilter(int id)
        {
            var output = await _context.Logimport
                .Where(log => log.AuftragNummer == id)
                .ToListAsync();
            if(output.Count() == 0)
            {
                return NotFound();
            }
            return output;
        }
        //Importlogs und nur Nummer und Beschreibung wird geschaut
        [HttpGet("beide/{id}/{bes}")]
        public async Task<ActionResult<IEnumerable<Logimport>>> GetLogImportFilterBeide(int id,int bes)
        {
            List<Logimport> output = new List<Logimport>();
            if (bes == 2)
            {
                output = await _context.Logimport
                   .Where(log => log.Beschreibung.Contains("Fehler"))
                   .Where(log => log.AuftragNummer == id)
                   .ToListAsync();

            }
            else if (bes == 3)
            {
                output = await _context.Logimport
                    .Where(log => log.Beschreibung.Contains("Upgedated"))
                    .Where(log => log.AuftragNummer == id)
                    .ToListAsync();
            }
            else if (bes == 4)
            {
                output = await _context.Logimport
                   .Where(log => log.Beschreibung.Contains("Neuer"))
                   .Where(log => log.AuftragNummer == id)
                   .ToListAsync();
            }
            if (output.Count() == 0)
            {
                return NotFound();
            }
            return output;
        }
        //Importlogs und nur Beschreibung wird geschaut
        [HttpGet("bes/{id}")]
        public async Task<ActionResult<IEnumerable<Logimport>>> GetLogImportFilterBeschreibung(int id)
        {
            List<Logimport> output = new List<Logimport>();
            if(id == 2)
            {
                output = await _context.Logimport
                   .Where(log => log.Beschreibung.Contains("Fehler"))
                   .ToListAsync();

            }
            else if(id == 3)
            {
                output = await _context.Logimport
                    .Where(log => log.Beschreibung.Contains("Upgedated"))
                    .ToListAsync();
            }
            else if(id == 4)
            {
                output = await _context.Logimport
                   .Where(log => log.Beschreibung.Contains("Neuer"))
                   .ToListAsync();
            }
            if (output.Count() == 0)
            {
                return NotFound();
            }
            return output;
        }
    }
}
