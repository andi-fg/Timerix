using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Timerix.Models;
using Timerix.ModelsAX;

namespace Timerix.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImportController : ControllerBase
    {
        private readonly TimerixContext _context;
        private readonly AXDBContext _axcontext;

        public ImportController(TimerixContext context, AXDBContext axcontext)
        {
            _context = context;
            _axcontext = axcontext;
        }

        //Importiert Aufträge
        //api/import/import
        [HttpGet("import")]
        public async Task<IActionResult> ImportAuftrag()
        {
            var axl = _axcontext.Prodtable.ToList();
            foreach(var ax in axl)
            {
                var ergebnis = "fehler";
                if (ax.Dataareaid != null)
                {
                    var dataareaid = ax.Dataareaid;
                    var standort = _context.Standort
                        .Where(standort => standort.Dataareaid == dataareaid)
                        .SingleOrDefault();
                    if(standort != null)
                    {
                        var idAuftrag = standort.AuftragPraefix + "" + ax.ProdId;
                        var auftragid = Convert.ToInt32(idAuftrag);
                        var auftrag = _context.Auftrag
                            .Where(auftrag => auftrag.AuftragId == auftragid)
                            .SingleOrDefault();
                        if (auftrag == null)
                        {
                            //Neuer Auftrag
                            ergebnis = "neu";
                            Auftrag a = new Auftrag();
                            a.AuftragId = auftragid;
                            a.Beschreibung = ax.Name;
                            a.ItemId = ax.ItemId;
                            a.QtySched = ax.QtySched;
                            a.Standort = standort;
                            a.Nummer = ax.ProdId + "";
                            _context.Entry(a.Standort).State = EntityState.Unchanged;
                            _context.Auftrag.Add(a);
                        }
                        else
                        {
                            //Auftrag updaten
                            ergebnis = "upgedated";
                            auftrag.QtySched = ax.QtySched;
                            auftrag.ItemId = ax.ItemId;
                            _context.Entry(auftrag).State = EntityState.Modified;
                        }
                    }
                }
                logimport(ax, ergebnis);
            }
                
            await _context.SaveChangesAsync();
            return NoContent();
        }
        //Log Import einträge erstellen
        private void logimport(Prodtable ax, string ergebnis)
        {
            Logimport l = new Logimport();
            l.AuftragNummer = ax.ProdId;
            l.Auftrag = ax.Name;
            l.Dataareaid = ax.Dataareaid;
            l.Zeitpunkt = DateTime.Now;
            if (ergebnis == "neu")
            {
                l.Beschreibung = "Neuer Import";
                
            }else if(ergebnis == "fehler")
            {
                l.Beschreibung = "Fehler: Konnte nich importiert werden";
            }else if(ergebnis == "upgedated")
            {
                l.Beschreibung = "Upgedated";
                
            }
            _context.Logimport.Add(l);
        }

    }
}
