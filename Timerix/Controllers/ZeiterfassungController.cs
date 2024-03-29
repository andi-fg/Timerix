﻿using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Timerix.Models;
using Timerix.Models.ViewModels;

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
            updateTagesrapport(zeiterfassung, id);
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
        //Überprüfe tagesrapport, wenn Zeiterfassung geändert wird
        private void updateTagesrapport(Zeiterfassung zeiterfassung, int id)
        {
            var zeiterfassungAlt =  _context.Zeiterfassung.Where(zeit => zeit.ZeiterfassungId == id).FirstOrDefault();
            if(zeiterfassungAlt.ZeitVon.Date != zeiterfassung.ZeitVon.Date || zeiterfassungAlt.ProduktionsstrasseId != zeiterfassung.ProduktionsstrasseId || zeiterfassungAlt.AuftragId != zeiterfassung.AuftragId)
            {
                //Tagesrapport überprüfen ob der Rapport für die Alte Zeiterfassung gelöscht werden kann
                var anzahlZeiterfassungenAlt = _context.Zeiterfassung
                    .Where(zeit => zeit.AuftragId == zeiterfassungAlt.AuftragId && zeit.ProduktionsstrasseId == zeiterfassungAlt.ProduktionsstrasseId && zeit.ZeitVon.Date == zeiterfassungAlt.ZeitVon.Date)
                    .Count();
                if(anzahlZeiterfassungenAlt == 1)
                {
                    //Tagesrapport löschen
                    var rapport = _context.Tagesrapport.Where(tag => tag.AuftragId == zeiterfassungAlt.AuftragId && tag.ProduktionsstrasseId == zeiterfassungAlt.ProduktionsstrasseId && tag.Datum <= zeiterfassungAlt.ZeitVon && tag.Datum.AddDays(1) >= zeiterfassungAlt.ZeitVon).FirstOrDefault();
                    _context.Tagesrapport.Remove(rapport);
                }
                //Tagesrapport überprüfen ob es für die abgeänderte Zeiterfassung einen neuen braucht
                var anzahlZeiterfassungen = _context.Zeiterfassung
                    .Where(zeit => zeit.AuftragId == zeiterfassung.AuftragId && zeit.ProduktionsstrasseId == zeiterfassung.ProduktionsstrasseId && zeit.ZeitVon.Date == zeiterfassung.ZeitVon.Date)
                    .Count();
                if(anzahlZeiterfassungen < 1)
                {
                    //Neuer Tagesrapport erstellen
                    _context.Entry(zeiterfassung.Auftrag).State = EntityState.Unchanged;
                    _context.Entry(zeiterfassung.Produktionsstrasse).State = EntityState.Unchanged;
                    _context.Entry(zeiterfassung.Arbeitsvorgang).State = EntityState.Unchanged;
                    _ = addTagesrapport(zeiterfassung);
                }
                
            }
            _context.Entry(zeiterfassungAlt).State = EntityState.Detached;
        }

        //Aktuelle Zeiterfassung bekommen
        [HttpGet("aktuelleZeiterfassung/{mid}")]
        public async Task<ActionResult<Zeiterfassung>> GetAktuelleZeiterfassung(int mid)
        {
            var zeiterfassung =  _context.Zeiterfassung.Where(zeit => zeit.ZeitBis == null && zeit.MitarbeiterId == mid).FirstOrDefault();

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
            
            int d = t.Days;
            int s = t.Hours + d*24;
            string stunde = s + "";
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
            addTagesrapport(zeiterfassung);
            _context.Entry(zeiterfassung).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }
        public async Task<IActionResult> endZeiterfassung(Zeiterfassung zeiterfassung)
        {
            //Beende aktuelle Zeiterfassung
            Zeiterfassung z = _context.Zeiterfassung.Where(zeit => zeit.ZeitBis == null && zeit.MitarbeiterId == zeiterfassung.Mitarbeiter.MitarbeiterId).FirstOrDefault();
            if (z == null)
            {
                return NoContent();
            }
            z.ZeitBis = DateTime.Now;
            addTagesrapport(z);
            /*_context.Entry(z.Mitarbeiter).State = EntityState.Unchanged;
            _context.Entry(z.Produktionsstrasse).State = EntityState.Unchanged;
            _context.Entry(z.Auftrag).State = EntityState.Unchanged;
            _context.Entry(z.Arbeitsvorgang).State = EntityState.Unchanged;*/
            _context.Entry(z).State = EntityState.Modified;
            //_context.SaveChanges();

            return NoContent();
        }
        //Tagesrapport speichern
        private async Task<IActionResult> addTagesrapport(Zeiterfassung zeiterfassung)
        {
            //DateTime today = DateTime.Today;
            Tagesrapport t = _context.Tagesrapport.Where(tag => tag.AuftragId == zeiterfassung.AuftragId && tag.ProduktionsstrasseId == zeiterfassung.ProduktionsstrasseId && tag.Datum <= zeiterfassung.ZeitVon && tag.Datum.AddDays(1) >= zeiterfassung.ZeitVon).FirstOrDefault();
            if (t != null)
            {
                return NoContent();
            }
            else
            {
                Tagesrapport tr = new Tagesrapport();
                DateTime rapportTime = zeiterfassung.ZeitVon.Date;
                tr.Auftrag = zeiterfassung.Auftrag;
                tr.AuftragId = zeiterfassung.AuftragId;
                tr.ProduktionsstrasseId = zeiterfassung.ProduktionsstrasseId;
                tr.Produktionsstrasse = zeiterfassung.Produktionsstrasse;
                tr.Datum = rapportTime;
                _context.Tagesrapport.Add(tr);
            }
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
            zeiterfassung.AuftragId = zeiterfassung.Auftrag.AuftragId;
            zeiterfassung.ProduktionsstrasseId = zeiterfassung.Produktionsstrasse.ProduktionsstrasseId;
            addTagesrapport(zeiterfassung);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetZeiterfassung", new { id = zeiterfassung.ZeiterfassungId }, zeiterfassung);
        }

        //Get alle Zeitrefassungen User
        // GET: api/Zeiterfassung
        [HttpGet("zeiterfassungenMit/{mid}")]
        public async Task<ActionResult<IEnumerable<ZeiterfassungViewModel>>> GetZeiterfassungMitarbeiter(int mid)
        {
            var lz = await _context.Zeiterfassung
                .Where(zeit => zeit.Mitarbeiter.MitarbeiterId == mid && zeit.ArbeitsvorgangId != null)
                .OrderByDescending(zeit => zeit.ZeitVon)
                .Include(zeit => zeit.Auftrag)
                .Include(zeit => zeit.Produktionsstrasse)
                .Include(zeit => zeit.Arbeitsvorgang)
                .ToListAsync();
            if (lz == null)
            {
                return NotFound();
            }
            List<ZeiterfassungViewModel> lzvm = new List<ZeiterfassungViewModel>();
            foreach(Zeiterfassung z in lz) {
                ZeiterfassungViewModel zv = new ZeiterfassungViewModel();
                zv.ZeiterfassungId = z.ZeiterfassungId;
                zv.ZeitBis = z.ZeitBis;
                zv.ZeitVon = z.ZeitVon;
                zv.Anzahl = z.Anzahl;
                zv.Bemerkung = z.Bemerkung;
                zv.MitarbeiterId = z.MitarbeiterId;
                AuftragViewModel avm = new AuftragViewModel();
                avm.AuftragId = z.Auftrag.AuftragId;
                avm.Beschreibung = z.Auftrag.Beschreibung;
                avm.ItemId = z.Auftrag.ItemId;
                avm.QtySched = z.Auftrag.QtySched;
                avm.Nummer = z.Auftrag.Nummer;
                zv.Auftrag = avm;
                ArbeitsvorgangViewModel abvm = new ArbeitsvorgangViewModel();
                abvm.ArbeitsvorgangId = z.Arbeitsvorgang.ArbeitsvorgangId;
                abvm.ArbeitsvorgangName = z.Arbeitsvorgang.ArbeitsvorgangName;
                abvm.Aktiv = z.Arbeitsvorgang.Aktiv;
                zv.Arbeitsvorgang = abvm;
                ProduktionsstrasseViewModel pvm = new ProduktionsstrasseViewModel();
                pvm.Aktiv = z.Produktionsstrasse.Aktiv;
                pvm.Beschreibung = z.Produktionsstrasse.Beschreibung;
                pvm.ProduktionsstrasseId = z.Produktionsstrasse.ProduktionsstrasseId;
                zv.Produktionsstrasse = pvm;
                lzvm.Add(zv);
            }
            return lzvm;
        }
        //Get Zeiterfassung um zu bearbeiten
        // GET: api/Zeiterfassung/5
        [HttpGet("zeiterfassungenBearbeiten/{id}")]
        public async Task<ActionResult<ZeiterfassungViewModel>> GetZeiterfassungBearbeiten(int id)
        {
            var z =  _context.Zeiterfassung
                .Include(zeit => zeit.Auftrag)
                .Include(zeit => zeit.Produktionsstrasse)
                .Include(zeit => zeit.Arbeitsvorgang)
                .Where(zeit => zeit.ZeiterfassungId == id )
                .FirstOrDefault();

            if (z == null)
            {
                return NotFound();
            }
            ZeiterfassungViewModel zv = new ZeiterfassungViewModel();
            zv.ZeiterfassungId = z.ZeiterfassungId;
            zv.ZeitBis = z.ZeitBis;
            zv.ZeitVon = z.ZeitVon;
            zv.Anzahl = z.Anzahl;
            zv.Bemerkung = z.Bemerkung;
            //zv.MitarbeiterId = z.MitarbeiterId;
            AuftragViewModel avm = new AuftragViewModel();
            avm.AuftragId = z.Auftrag.AuftragId;
            avm.Beschreibung = z.Auftrag.Beschreibung;
            avm.ItemId = z.Auftrag.ItemId;
            avm.QtySched = z.Auftrag.QtySched;
            avm.Nummer = z.Auftrag.Nummer;
            zv.Auftrag = avm;
            ArbeitsvorgangViewModel abvm = new ArbeitsvorgangViewModel();
            abvm.ArbeitsvorgangId = z.Arbeitsvorgang.ArbeitsvorgangId;
            abvm.ArbeitsvorgangName = z.Arbeitsvorgang.ArbeitsvorgangName;
            abvm.Aktiv = z.Arbeitsvorgang.Aktiv;
            zv.Arbeitsvorgang = abvm;
            ProduktionsstrasseViewModel pvm = new ProduktionsstrasseViewModel();
            pvm.Aktiv = z.Produktionsstrasse.Aktiv;
            pvm.Beschreibung = z.Produktionsstrasse.Beschreibung;
            pvm.ProduktionsstrasseId = z.Produktionsstrasse.ProduktionsstrasseId;
            zv.Produktionsstrasse = pvm;
            return zv;
        }

        // POST: api/Zeiterfassung
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Zeiterfassung>> PostZeiterfassung(Zeiterfassung zeiterfassung)
        {
            _context.Entry(zeiterfassung.Mitarbeiter).State = EntityState.Unchanged;
            _context.Entry(zeiterfassung.Produktionsstrasse).State = EntityState.Unchanged;
            _context.Entry(zeiterfassung.Auftrag).State = EntityState.Unchanged;
            _context.Entry(zeiterfassung.Arbeitsvorgang).State = EntityState.Unchanged;
            _context.Zeiterfassung.Add(zeiterfassung);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetZeiterfassung", new { id = zeiterfassung.ZeiterfassungId }, zeiterfassung);
        }


        //Filter Nach AuftragsID
        // GET: api/Zeiterfassung/filter/1/1
        [HttpGet("filter/{id}/{mid}")]
        public async Task<ActionResult<IEnumerable<ZeiterfassungViewModel>>> GetZeiterfassungFilter(int id, int mid)
        {
            var lz = await _context.Zeiterfassung
                .Where(zeit => zeit.AuftragId == id && zeit.ArbeitsvorgangId != null)
                .Where(zeit => zeit.MitarbeiterId == mid)
                .OrderByDescending(zeit => zeit.ZeitVon)
                .Include(zeit => zeit.Auftrag)
                .Include(zeit => zeit.Produktionsstrasse)
                .Include(zeit => zeit.Arbeitsvorgang)
                .ToListAsync();
            if (lz == null)
            {
                return NotFound();
            }
            List<ZeiterfassungViewModel> lzvm = new List<ZeiterfassungViewModel>();
            foreach (Zeiterfassung z in lz)
            {
                ZeiterfassungViewModel zv = new ZeiterfassungViewModel();
                zv.ZeiterfassungId = z.ZeiterfassungId;
                zv.ZeitBis = z.ZeitBis;
                zv.ZeitVon = z.ZeitVon;
                zv.Anzahl = z.Anzahl;
                zv.Bemerkung = z.Bemerkung;
                zv.MitarbeiterId = z.MitarbeiterId;
                AuftragViewModel avm = new AuftragViewModel();
                avm.AuftragId = z.Auftrag.AuftragId;
                avm.Beschreibung = z.Auftrag.Beschreibung;
                avm.ItemId = z.Auftrag.ItemId;
                avm.QtySched = z.Auftrag.QtySched;
                avm.Nummer = z.Auftrag.Nummer;
                zv.Auftrag = avm;
                ArbeitsvorgangViewModel abvm = new ArbeitsvorgangViewModel();
                abvm.ArbeitsvorgangId = z.Arbeitsvorgang.ArbeitsvorgangId;
                abvm.ArbeitsvorgangName = z.Arbeitsvorgang.ArbeitsvorgangName;
                abvm.Aktiv = z.Arbeitsvorgang.Aktiv;
                zv.Arbeitsvorgang = abvm;
                ProduktionsstrasseViewModel pvm = new ProduktionsstrasseViewModel();
                pvm.Aktiv = z.Produktionsstrasse.Aktiv;
                pvm.Beschreibung = z.Produktionsstrasse.Beschreibung;
                pvm.ProduktionsstrasseId = z.Produktionsstrasse.ProduktionsstrasseId;
                zv.Produktionsstrasse = pvm;
                lzvm.Add(zv);
            }
            return lzvm;
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
