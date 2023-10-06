export class Prodavnica {
    constructor(id, nazivProdavnice) {
        this.id = id;
        this.nazivProdavnice = nazivProdavnice ?? "Prodavnica 1";

        this.listaTipova = [];
        this.korpa = [];
        this.container = null;
    }

    dodajTip(tip) {
        this.listaTipova.push(tip);
    }

    crtaj(host) {
        this.container = document.createElement("div");
        this.container.className = "glavni";
        host.appendChild(this.container);

        var naslov = document.createElement("h1");
        naslov.innerHTML = "Online prodavnica - " + this.nazivProdavnice;
        naslov.className = "naslov";
        this.container.appendChild(naslov);

        var prikaz = document.createElement("div");
        prikaz.className = "prikaz";
        this.container.appendChild(prikaz);

        var prikazLevi = document.createElement("div");
        prikazLevi.className = "prikazLevi";
        prikaz.appendChild(prikazLevi);

        var pretraga = document.createElement("label");
        pretraga.innerHTML = "Pretraga";
        pretraga.className = "pretraga";
        prikazLevi.appendChild(pretraga);

        var red1 = document.createElement("div");
        red1.className = "red1";
        prikazLevi.appendChild(red1);

        var tip = document.createElement("label");
        tip.innerHTML = "Tip: ";
        tip.className = "tip";
        red1.appendChild(tip);

        var selTip = document.createElement("select");
        selTip.id = this.id;
        selTip.className = "selTip";
        selTip.selected = true;
        red1.appendChild(selTip);

        this.listaTipova.forEach(o => {
            var opcija = document.createElement("option");
            opcija.value = o.id;
            opcija.innerHTML = o.nazivTipa;
            selTip.appendChild(opcija);
        })

        var red2 = document.createElement("div");
        red2.className = "red2";
        prikazLevi.appendChild(red2);

        var labelCenaOd = document.createElement("label");
        labelCenaOd.innerHTML = "Cena od: ";
        labelCenaOd.className = "labelCenaOd";
        red2.appendChild(labelCenaOd);

        var inputCenaOd = document.createElement("input");
        inputCenaOd.className = "inputCenaOd";
        inputCenaOd.type = "number";
        inputCenaOd.min = 0;
        red2.appendChild(inputCenaOd);

        var red3 = document.createElement("div");
        red3.className = "red3";
        prikazLevi.appendChild(red3);

        var labelCenaDo = document.createElement("label");
        labelCenaDo.innerHTML = "Cena do: ";
        labelCenaDo.className = "labelCenaDo";
        red3.appendChild(labelCenaDo);

        var inputCenaDo = document.createElement("input");
        inputCenaDo.className = "inputCenaDo";
        inputCenaDo.type = "number";
        inputCenaDo.min = 0;
        red3.appendChild(inputCenaDo);

        var red4 = document.createElement("div");
        red4.className = "red4";
        prikazLevi.appendChild(red4);

        var dugmePrikazi = document.createElement("button");
        dugmePrikazi.innerHTML = "Prikazi";
        dugmePrikazi.className = "dugmePrikazi";
        red4.appendChild(dugmePrikazi);

        var prikazDesni = document.createElement("div");
        prikazDesni.className = "prikazDesni";
        prikaz.appendChild(prikazDesni);

        dugmePrikazi.onclick = (async e => {
            var tipId = parseInt(this.container.querySelector(".selTip").value);
            var cenaOd = parseFloat(this.container.querySelector(".inputCenaOd").value);
            var cenaDo = parseFloat(this.container.querySelector(".inputCenaDo").value);

            if (!isNaN(cenaDo) && !isNaN(cenaOd))
                var response = await fetch(`http://localhost:5243/Proizvod/VratiTrazeneProizvode?idTip=${tipId}&cenaOd=${cenaOd}&cenaDo=${cenaDo}`);
            if (isNaN(cenaDo) && isNaN(cenaOd))
                var response = await fetch(`http://localhost:5243/Proizvod/VratiTrazeneProizvode?idTip=${tipId}`);


            var data = await response.json();

            while(prikazDesni.firstChild){
                prikazDesni.removeChild(prikazDesni.lastChild);
            }//Ovo sluzi da se uradi update tabelu

            var tbl = document.createElement("table");
            tbl.className = "tbl";
            prikazDesni.appendChild(tbl);

            var tblBody = document.createElement("tbody");
            tbl.appendChild(tblBody);

            // Kreiranje prvog reda sa naslovima kolona
            var trList = ["Naziv", "Cena", "Kolicina", "", ""];
            var tr = document.createElement("tr");
            tr.className = "naslov-tr";

            trList.forEach(text => {
                var th = document.createElement("th");
                th.textContent = text;
                tr.appendChild(th);
            });

            tblBody.appendChild(tr);

            // Generisanje redova za svaki proizvod
            data.forEach(e => this.crtajTabelu(e, tblBody));



            console.log(data);
        })
    }
    crtajTabelu(proizvod, host) {
        var tr = document.createElement("tr");

        var tdNaziv = document.createElement("td");
        tdNaziv.innerHTML = proizvod.nazviProizovda;
        tr.appendChild(tdNaziv);

        var tdCena = document.createElement("td");
        tdCena.className = "tdCena";
        tdCena.innerHTML = proizvod.cena;
        tr.appendChild(tdCena);

        var tdKolicina = document.createElement("td");
        tdKolicina.className = "tdKolicina";
        tdKolicina.innerHTML = proizvod.kolicina;
        tr.appendChild(tdKolicina);

        var tdIzmena = document.createElement("td");
        var tdIzmenaDugme = document.createElement("button");
        tdIzmenaDugme.innerHTML = "Izmeni";
        tdIzmena.appendChild(tdIzmenaDugme);
        tr.appendChild(tdIzmena);

        tdIzmenaDugme.onclick = (e => {
            this.crtajIzmenu(proizvod, tr);
        })

        var tdKorpa = document.createElement("td");
        var tdKorpaDugme = document.createElement("button");
        tdKorpaDugme.innerHTML = "Korpa";
        tdKorpa.appendChild(tdKorpaDugme);
        tr.appendChild(tdKorpa);

        tdKorpaDugme.onclick = (e => {
            this.crtajKorpu(proizvod);
        })

        host.appendChild(tr);
    }

    crtajIzmenu(proizvod, tr){
        var levi = this.container.querySelector(".prikazLevi");

        var divIzmena = document.createElement("div");
        divIzmena.className = "divIzmena";
        levi.appendChild(divIzmena);

        var labIzmena = document.createElement("label");
        labIzmena.className = "labIzmena";
        labIzmena.innerHTML = proizvod.nazviProizovda;
        divIzmena.appendChild(labIzmena);

        var redIzmenaCene = document.createElement("div");
        redIzmenaCene.className = "redIzmenaCene";
        divIzmena.appendChild(redIzmenaCene);

        var labelCenaIzmene = document.createElement("label");
        labelCenaIzmene.innerHTML = "Cena: ";
        labelCenaIzmene.className = "labelCenaIzmene";
        redIzmenaCene.appendChild(labelCenaIzmene);

        var inputCenaIzmene = document.createElement("input");
        inputCenaIzmene.className = "inputCenaIzmene";
        inputCenaIzmene.type = "number";
        inputCenaIzmene.min = 0;
        redIzmenaCene.appendChild(inputCenaIzmene);

        var redIzmenaKolicine = document.createElement("div");
        redIzmenaKolicine.className = "redIzmenaKolicine";
        divIzmena.appendChild(redIzmenaKolicine);

        var labelCenaKolicine = document.createElement("label");
        labelCenaKolicine.innerHTML = "Kolicina: ";
        labelCenaKolicine.className = "labelCenaKolicine";
        redIzmenaKolicine.appendChild(labelCenaKolicine);

        var inputKolicinaIzmene = document.createElement("input");
        inputKolicinaIzmene.className = "inputKolicinaIzmene";
        inputKolicinaIzmene.type = "number";
        inputKolicinaIzmene.min = 0;
        redIzmenaKolicine.appendChild(inputKolicinaIzmene);

        var sacuvaj = document.createElement("button");
        sacuvaj.innerHTML = "Sacuvaj";
        divIzmena.appendChild(sacuvaj);
        sacuvaj.onclick = (e => {this.sacuvajIzmenu(levi, proizvod, tr)})
    }

    async sacuvajIzmenu(host, proizvod, tabela){
        var cena = parseFloat(host.querySelector(".inputCenaIzmene").value);
        var kolicina = parseInt(host.querySelector(".inputKolicinaIzmene").value);

        var response = await fetch(`http://localhost:5243/Proizvod/IzmeniProizvod/${proizvod.id}/${cena}/${kolicina}`, {
            method: "PUT"
        });
        var data = await response.json();

        var cenaTd = tabela.querySelector(".tdCena");
        var kolicinaTd = tabela.querySelector(".tdKolicina");

        var cenaT = document.createElement("text");
        cenaTd.innerHTML = data.cena;
        cenaTd.appendChild(cenaT);

        var kolicinaT = document.createElement("text");
        kolicinaTd.innerHTML = data.kolicina;
        kolicinaTd.appendChild(kolicinaT);
    }

    crtajKorpu(proizvod){
        var desni = this.container.querySelector(".prikaz");

        var divKorpa = document.createElement("div");
        divKorpa.className = "divKorpa";
        desni.appendChild(divKorpa);

        var korpaLab = document.createElement("label");
        korpaLab.innerHTML = "Korpa: ";
        korpaLab.className = "korpaLab";
        divKorpa.appendChild(korpaLab);

        var redKorpa = document.createElement("div");
        redKorpa.className = "redKorpa";
        divKorpa.appendChild(redKorpa);

        var kolicinaKorpa = document.createElement("label");
        kolicinaKorpa.innerHTML = proizvod.nazviProizovda + "-" + 1 + "kom";
        kolicinaKorpa.className = "kolicinaKorpa";
        divKorpa.appendChild(kolicinaKorpa);

        var ukupno = document.createElement("label");
        ukupno.innerHTML = "Ukupna cena: ";
        ukupno.className = "ukupno";
        divKorpa.appendChild(ukupno);

        var poruciDugme = document.createElement("button");
        poruciDugme.className = "poruciDugme";
        poruciDugme.innerHTML = "Poruci";
        divKorpa.appendChild(poruciDugme);

        poruciDugme.onclick = (e => {this.kupiProizvodeIzKorpe()})/////////////////
        
        // Pretraži korpu da li već postoji isti proizvod
        let index = this.korpa.findIndex(item => item.proizvod.id === proizvod.id);

        if (index === -1) {
            // Dodaj novi proizvod u korpu ako ga nema
            this.korpa.push({ proizvod: proizvod, kolicina: 1 });
        } else {
            // Povećaj količinu ako postoji u korpi
            this.korpa[index].kolicina++;
        }

        this.osveziKorpu();

        
    }


    async kupiProizvodeIzKorpe() {
        for (let item of this.korpa) {
            var response = await fetch(`http://localhost:5243/Proizvod/KupiProizvod/${item.proizvod.id}/${item.kolicina}`, {
                method: "PUT"
            });
    
            if (response.ok) {
                // Uspesno kupljen proizvod, možete izvršiti dodatne akcije ako su potrebne
            } else {
                console.error(`Greška prilikom kupovine proizvoda sa ID ${item.proizvod.id}`);
            }
        }
    
        // Nakon završetka kupovine, resetujte korpu i osvežite prikaz
        this.korpa = [];
        this.osveziKorpu();
    
    }

    osveziKorpu() {
        //var korpaDiv = this.container.querySelector(".divKorpa");

        // Osveži prikaz korpe
        var korpaPrikaz = this.container.querySelector(".kolicinaKorpa");
        korpaPrikaz.innerHTML = this.korpa.map(item => `${item.proizvod.nazviProizovda}-${item.kolicina}kom`).join(', ');

        // Računanje ukupne cene
        var ukupnoCena = this.korpa.reduce((total, item) => total + item.proizvod.cena * item.kolicina, 0);

        var ukupnoPrikaz = this.container.querySelector(".ukupno");
        ukupnoPrikaz.innerHTML = `Ukupna cena: ${ukupnoCena}`;
    }
    
}