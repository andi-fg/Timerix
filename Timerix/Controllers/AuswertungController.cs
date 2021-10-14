using System;
using System.Collections.Generic;
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
    public class AuswertungController : ControllerBase
    {
        private readonly TimerixContext _context;

        public AuswertungController(TimerixContext context)
        {
            _context = context;
        }

        // GET: api/Arbeitsvorgang
        [HttpGet("gesamt/{sid}")]
        public async Task<ActionResult<IEnumerable<Auswertung>>> GetGesamt(int sid)
        {
            var gesamt = new List<Zeiterfassung>();
            if (sid >= 1)
            {
                gesamt = _context.Zeiterfassung
               .Include(zeit => zeit.Mitarbeiter)
               .Include(zeit => zeit.Produktionsstrasse)
               .Include(zeit => zeit.Auftrag)
               .Include(zeit => zeit.Arbeitsvorgang)
               .Where(zeit => zeit.ZeitBis == null && (zeit.Auftrag.StandortId == sid || zeit.Auftrag.StandortId == null))
               .OrderBy(zeit => zeit.Produktionsstrasse.Beschreibung)
               .ToList();
            }
            else
            {
                gesamt = _context.Zeiterfassung
                .Include(zeit => zeit.Mitarbeiter)
                .Include(zeit => zeit.Produktionsstrasse)
                .Include(zeit => zeit.Auftrag)
                .Include(zeit => zeit.Arbeitsvorgang)
                .Where(zeit => zeit.ZeitBis == null)
                .OrderBy(zeit => zeit.Produktionsstrasse.Beschreibung)
                .ToList();
            }
            List<Auswertung> al = new List<Auswertung>();
            foreach(var z in gesamt)
            {
                Auswertung a = new Auswertung();
                a.id = z.ZeiterfassungId;
                a.maschine = z.Produktionsstrasse.Beschreibung;
                a.mitarbeiter = z.Mitarbeiter.Name + " " + z.Mitarbeiter.Vorname;
                a.mitarbeiterId = z.MitarbeiterId;
                a.arbeitsvorgang = z.Arbeitsvorgang.ArbeitsvorgangName;
                a.eingestempelt = z.ZeitVon;
                a.chargenauftrag = z.Auftrag.Nummer;
                al.Add(a);
            }
            return al;
        }
        [HttpGet("maschine/{mid}")]
        public async Task<ActionResult<IEnumerable<Auswertung>>> GetMaschine(int mid)
        {
            var gesamt = _context.Zeiterfassung
               .Include(zeit => zeit.Mitarbeiter)
               .Include(zeit => zeit.Produktionsstrasse)
               .Include(zeit => zeit.Auftrag)
               .Include(zeit => zeit.Arbeitsvorgang)
               .Where(zeit => zeit.ZeitBis == null && zeit.ProduktionsstrasseId == mid)
               .OrderBy(zeit => zeit.Produktionsstrasse.Beschreibung)
               .ToList();



            List<Auswertung> al = new List<Auswertung>();
            foreach (var z in gesamt)
            {
                Auswertung a = new Auswertung();
                a.id = z.ZeiterfassungId;
                a.maschine = z.Produktionsstrasse.Beschreibung;
                a.mitarbeiter = z.Mitarbeiter.Name + " " + z.Mitarbeiter.Vorname;
                a.mitarbeiterId = z.MitarbeiterId;
                a.arbeitsvorgang = z.Arbeitsvorgang.ArbeitsvorgangName;
                a.eingestempelt = z.ZeitVon;
                a.chargenauftrag = z.Auftrag.Nummer;
                al.Add(a);
            }
            return al;
        }
        [HttpGet("auftrag/{aid}")]
        public async Task<ActionResult<IEnumerable<Auswertung>>> GetAuftrag(int aid)
        {
            var gesamt = _context.Zeiterfassung
               .Include(zeit => zeit.Mitarbeiter)
               .Include(zeit => zeit.Produktionsstrasse)
               .Include(zeit => zeit.Auftrag)
               .Include(zeit => zeit.Arbeitsvorgang)
               .Where(zeit => zeit.ZeitBis == null && zeit.AuftragId == aid)
               .OrderBy(zeit => zeit.Produktionsstrasse.Beschreibung)
               .ToList();


            List<Auswertung> al = new List<Auswertung>();
            foreach (var z in gesamt)
            {
                Auswertung a = new Auswertung();
                a.id = z.ZeiterfassungId;
                a.maschine = z.Produktionsstrasse.Beschreibung;
                a.mitarbeiter = z.Mitarbeiter.Name + " " + z.Mitarbeiter.Vorname;
                a.mitarbeiterId = z.MitarbeiterId;
                a.arbeitsvorgang = z.Arbeitsvorgang.ArbeitsvorgangName;
                a.eingestempelt = z.ZeitVon;
                a.chargenauftrag = z.Auftrag.Nummer;
                al.Add(a);
            }
            return al;
        }
    }
}
