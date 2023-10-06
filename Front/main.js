import { Proizvod } from "./Proizvod.js";
import { Prodavnica } from "./Prodavnica.js";
import { Tip } from "./Tip.js";

var response = await fetch("http://localhost:5243/Prodavnica/VratiSveProdavnice");
var data = await response.json();

data.forEach(e => {
    var prodavnica = new Prodavnica(e["id"], e["nazivProdavnice"]);
    e["tipovi"].forEach(t => {
        var tip = new Tip(t["id"], t["nazivTipa"]);
        prodavnica.dodajTip(tip);
    })

    prodavnica.crtaj(document.body);
});