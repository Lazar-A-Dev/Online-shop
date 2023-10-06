using System.ComponentModel.DataAnnotations;
namespace Models{
    public class Proizvod{
        [Key]
        public int ID{get; set;}
        public string? NazviProizovda{get; set;}
        public float Cena{get; set;}
        public int Kolicina{get; set;}
        public Tip? Tip{get; set;}
    }
}