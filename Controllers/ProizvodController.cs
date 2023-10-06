using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Models
{
    [ApiController]
    [Route("[controller]")]
    public class ProizvodController : ControllerBase
    {
        public Context _context;

        public ProizvodController(Context context)
        {
            _context = context;
        }

        [Route("VratiSveProizvode")]
        [HttpGet]
        public async Task<ActionResult> VratiSveProizvode()
        {
            try
            {
                var pro = await _context.Proizvodi.ToListAsync();
                return Ok(pro);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("NapraviProizvod")]
        [HttpPost]
        public async Task<ActionResult> NapraviProizvod(Proizvod pro)
        {
            try
            {
                _context.Proizvodi.Add(pro);
                await _context.SaveChangesAsync();
                return Ok("Uspesno napravljen proizvod");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("VratiTrazeneProizvode")]
        [HttpGet]
        public async Task<ActionResult> VratiTrazeneProizvode(int idTip, float? cenaOd, float? cenaDo)
        {
            try
            {
                var tip = await _context.Tipovi.FindAsync(idTip);
                if (tip == null)
                    return BadRequest("Tip sa ovim id-jem ne postoji");

                var query = _context.Proizvodi.Where(p => p.Tip.ID == idTip);

                if (cenaOd != null && cenaDo != null)
                {
                    query = query.Where(p => p.Cena >= cenaOd && p.Cena <= cenaDo);
                }

                var proizvodi = await query.ToListAsync();
                return Ok(proizvodi);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }



        [Route("IzmeniProizvod/{idPro}/{novaCena}/{novaKol}")]
        [HttpPut]
        public async Task<ActionResult> IzmeniProizvod(int idPro, int novaCena, int novaKol)
        {
            try
            {
                var proizvod = await _context.Proizvodi.FindAsync(idPro);
                if (proizvod == null)
                    return BadRequest("Proizvod sa ovim Id-jem ne postoji");

                if(novaKol < 0 || novaCena < 0)
                    return BadRequest("Nove vrednosti moraju biti pozitivne");

                proizvod.Kolicina = novaKol;
                proizvod.Cena = novaCena;

                await _context.SaveChangesAsync();
                return Ok(proizvod);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("KupiProizvod/{idPro}/{kol}")]
        [HttpPut]
        public async Task<ActionResult> KupiProizvod(int idPro, int kol)
        {
            try
            {
                var proizvod = await _context.Proizvodi.FindAsync(idPro);
                if (proizvod == null)
                    return BadRequest("Proizvod sa ovim Id-jem ne postoji");

                if (proizvod.Kolicina == 0)
                    return BadRequest("Proizvod nije na stanju");

                if(proizvod.Kolicina - kol < 0)
                    return BadRequest("Nema dovoljno proizvoda na stanju za ovu tranzakciju");

                proizvod.Kolicina -= kol;
                await _context.SaveChangesAsync();
                return Ok("Uspesno kupljen proizvod");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}