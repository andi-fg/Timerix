function ZeitAnzeigen() {
    var Wochentagname = new Array("Sonntag", "Montag", "Dienstag", "Mittwoch",
        "Donnerstag", "Freitag", "Samstag");
    var Jetzt = new Date();
    var Tag = Jetzt.getDate();
    var Monat = Jetzt.getMonth() + 1;
    var Jahr = Jetzt.getYear();
    if (Jahr < 999)
        Jahr += 1900;
    var Stunden = Jetzt.getHours();
    var Minuten = Jetzt.getMinutes();
    var Sekunden = Jetzt.getSeconds();
    var WoTag = Jetzt.getDay();
    var Vortag = (Tag < 10) ? "0" : "";
    var Vormon = (Monat < 10) ? ".0" : ".";
    var Vorstd = (Stunden < 10) ? "0" : "";
    var Vormin = (Minuten < 10) ? ":0" : ":";
    var Vorsek = (Sekunden < 10) ? ":0" : ":";
    var Datum = Vortag + Tag + Vormon + Monat + "." + Jahr;
    var Uhrzeit = Vorstd + Stunden + Vormin + Minuten + Vorsek + Sekunden;
    var Gesamt = Wochentagname[WoTag] + ", " + Datum + ", " + Uhrzeit;
    document.getElementById("zeit").innerHTML = Gesamt;
    window.setTimeout("ZeitAnzeigen()", 1000);
}
window.onload(ZeitAnzeigen());