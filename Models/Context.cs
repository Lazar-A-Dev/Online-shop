using Microsoft.EntityFrameworkCore;

namespace Models{
    public class Context : DbContext{

        public DbSet<Prodavnica> Prodavnice{get; set;}
        public DbSet<Tip> Tipovi{get; set;}
        public DbSet<Proizvod> Proizvodi{get; set;}
        public Context(DbContextOptions options) : base(options){

        }
    }
}