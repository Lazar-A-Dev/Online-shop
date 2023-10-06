export class Tip{
    constructor(id, nazivTipa){
        this.id = id;
        this.nazivTipa = nazivTipa ?? "Tip 1";

        this.listaProizvoda = [];
        this.container = null;
    }

    dodajTip(pro){
        this.listaProizvoda.push(pro);
    }

}