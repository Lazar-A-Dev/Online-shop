using System.ComponentModel.DataAnnotations;
namespace Models{
    public class Prodavnica{
        [Key]
        public int ID{get; set;}
        public string? NazivProdavnice{get; set;}
        public List<Tip>? Tipovi{get; set;}
    }
}