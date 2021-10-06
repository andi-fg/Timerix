﻿using System;
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
    public class ZeiterfassungController : ControllerBase
    {
        private readonly TimerixContext _context;

        public ZeiterfassungController(TimerixContext context)
        {
            _context = context;
        }

        // GET: api/Zeiterfassung
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Zeiterfassung>>> GetZeiterfassung()
        {
            return await _context.Zeiterfassung.ToListAsync();
        }

        // GET: api/Zeiterfassung/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Zeiterfassung>> GetZeiterfassung(int id)
        {
            var zeiterfassung = await _context.Zeiterfassung.FindAsync(id);

            if (zeiterfassung == null)
            {
                return NotFound();
            }

            return zeiterfassung;
        }

        // PUT: api/Zeiterfassung/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutZeiterfassung(int id, Zeiterfassung zeiterfassung)
        {
            if (id != zeiterfassung.ZeiterfassungId)
            {
                return BadRequest();
            }

            _context.Entry(zeiterfassung).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ZeiterfassungExists(id))
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
        //Aktuelle Zeiterfassung bekommen
        [HttpGet("aktuelleZeiterfassung/{mid}")]
        public async Task<ActionResult<Zeiterfassung>> GetAktuelleZeiterfassung(int mid)
        {
            var zeiterfassung =  _context.Zeiterfassung.Where(zeit => zeit.ZeitBis == null && zeit.Mitarbeiter.MitarbeiterId == mid).FirstOrDefault();

            if (zeiterfassung == null)
            {
                return NotFound();
            }

            return zeiterfassung;
        }
        //Get Aktuelle Dauer der Zeiterfassung
        [HttpGet("zeitDauer/{mid}")]
        public async Task<ActionResult<String>> GetAktuelleDauerZeiterfassung(int mid)
        {
            var zeiterfassung = _context.Zeiterfassung.Where(zeit => zeit.ZeitBis == null && zeit.Mitarbeiter.MitarbeiterId == mid).FirstOrDefault();

            if (zeiterfassung == null)
            {
                return NotFound();
            }
            TimeSpan t = DateTime.Now - zeiterfassung.ZeitVon;
            string stunde = t.Hours + "";
            string minuten = t.Minutes + "";
            if (stunde.Length < 2)
            {
                stunde = "0" + stunde;
            }
            if(minuten.Length < 2)
            {
                minuten = "0" + minuten;
            }
            string output = stunde + ":" +minuten;
            return output;
        }
        //Zeiterfassung beenden
        [HttpPut("endZeiterfassung")]
        public async Task<IActionResult> endZeiterfassungManuel(Zeiterfassung zeiterfassung)
        {
            //Beende aktuelle Zeiterfassung
           
            zeiterfassung.ZeitBis = DateTime.Now;
           
            _context.Entry(zeiterfassung).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
        public async Task<IActionResult> endZeiterfassung(Zeiterfassung zeiterfassung)
        {
            //Beende aktuelle Zeiterfassung
            Zeiterfassung z = _context.Zeiterfassung.Where(zeit => zeit.ZeitBis == null && zeit.Mitarbeiter.MitarbeiterId == zeiterfassung.Mitarbeiter.MitarbeiterId).FirstOrDefault();
            if (z == null)
            {
                return NoContent();
            }
            z.ZeitBis = DateTime.Now;
            /*_context.Entry(z.Mitarbeiter).State = EntityState.Unchanged;
            _context.Entry(z.Produktionsstrasse).State = EntityState.Unchanged;
            _context.Entry(z.Auftrag).State = EntityState.Unchanged;
            _context.Entry(z.Arbeitsvorgang).State = EntityState.Unchanged;*/
            _context.Entry(z).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("addZeiterfassung")]
        public async Task<ActionResult<Zeiterfassung>> addZeiterfassung(Zeiterfassung zeiterfassung)
        {
            _ = endZeiterfassung(zeiterfassung);

            _context.Entry(zeiterfassung.Mitarbeiter).State = EntityState.Unchanged;
            _context.Entry(zeiterfassung.Produktionsstrasse).State = EntityState.Unchanged;
            _context.Entry(zeiterfassung.Auftrag).State = EntityState.Unchanged;
            _context.Entry(zeiterfassung.Arbeitsvorgang).State = EntityState.Unchanged;
            zeiterfassung.ZeitVon = DateTime.Now;
            _context.Zeiterfassung.Add(zeiterfassung);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetZeiterfassung", new { id = zeiterfassung.ZeiterfassungId }, zeiterfassung);
        }
        // POST: api/Zeiterfassung
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Zeiterfassung>> PostZeiterfassung(Zeiterfassung zeiterfassung)
        {
            _context.Zeiterfassung.Add(zeiterfassung);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetZeiterfassung", new { id = zeiterfassung.ZeiterfassungId }, zeiterfassung);
        }

        // DELETE: api/Zeiterfassung/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteZeiterfassung(int id)
        {
            var zeiterfassung = await _context.Zeiterfassung.FindAsync(id);
            if (zeiterfassung == null)
            {
                return NotFound();
            }

            _context.Zeiterfassung.Remove(zeiterfassung);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ZeiterfassungExists(int id)
        {
            return _context.Zeiterfassung.Any(e => e.ZeiterfassungId == id);
        }
    }
}