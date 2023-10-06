using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
namespace Models{
    public class Tip{
        [Key]
        public int ID{get; set;}
        public string? NazivTipa{get; set;}

        [JsonIgnore]
        public List<Proizvod>? Proizvodi{get; set;}
    }
}