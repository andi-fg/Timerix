var mitarbeiter;
function initFooter(seite) {
    var uriMitStan = "session/mitStandort";
    fetch(uriMitStan)
        .then(response => response.text())
        .then(data => {
            if (data.length > 3) {
                mitarbeiter = JSON.parse(data);
                schreibFooter();
                admin();
                if (seite == "menu") {
                    laufenderAuftrag();
                    fetchStandort();
                } else if (seite == "abestaet") {
                    document.getElementById("mid").innerHTML = mitarbeiter.name + " " + mitarbeiter.vorname;
                }
                else if (seite == "details") {
                    ausgabe();
                } else if (seite == "vorgangWechseln") {
                    ausgabe();
                }
                return mitarbeiter;
            } else {
                footerMenu(seite);
            }
        });
}
function footerMenu(seite) {
    var uri = "session/mitId";
    fetch(uri)
        .then(response => response.text())
        .then(data => {
            var uriMit = "api/mitarbeiter/mitstan/" + data;

            fetch(uriMit)
                .then(response => response.json())
                .then(dataMit => {
                    mitarbeiter = dataMit;
                    schreibFooter();
                    admin();
                    if (seite == "menu") {
                        fetchStandort();
                        laufenderAuftrag();
                    }
                    fetchMitStan();
                    return mitarbeiter;
                });
        });
}

function schreibFooter() {
    if (mitarbeiter.standortId != null) {
        document.getElementById("mitDaten").innerHTML = mitarbeiter.name + " " + mitarbeiter.vorname + " / MNr: " + mitarbeiter.mitarbeiterId + " / Standort: " + mitarbeiter.bezeichnung;
    } else {
        document.getElementById("mitDaten").innerHTML = mitarbeiter.name + " " + mitarbeiter.vorname + " / MNr: " + mitarbeiter.mitarbeiterId + " / Standort: ";
    }
}

function admin() {
    if (mitarbeiter.admin) {
        document.getElementById("mitButton").removeAttribute("hidden");
        document.getElementById("tagesrapport").removeAttribute("hidden");
        document.getElementById("import").removeAttribute("hidden");
    }
}

function fetchMitStan() {
    var uri = "session/mitStandort";
    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mitarbeiter)
    })
        .then(response => {
        })

        .catch(error => console.error('Unable to add user.', error));
}