export class Proizvod{
    constructor(id, nazivProizvoda, cena, kolicina){
        this.id = id;
        this.nazivProizvoda = nazivProizvoda ?? "Proizvod 1";
        this.cena = cena ?? 0;
        this.kolicina = kolicina;
        //this.tip = tip;

        this.container = null;
    }

}