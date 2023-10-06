using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Models{
    [ApiController]
    [Route("[controller]")]
    public class TipController : ControllerBase{
        public Context _context;

        public TipController(Context context){
            _context = context;
        }

        [Route("VratiSveTipove")]
        [HttpGet]
        public async Task<ActionResult> VratiSveTipove(){
            try{
                var tip = await _context.Tipovi.ToListAsync();
                return Ok(tip);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }


        [Route("NapraviTip")]
        [HttpPost]
        public async Task<ActionResult> NapraviTip(Tip tip){
            try{
                _context.Tipovi.Add(tip);
                await _context.SaveChangesAsync();
                return Ok("Uspesno je napravljen tip");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("DodajTipuProizvod")]
        [HttpPut]
        public async Task<ActionResult> DodajTipuProizvod(int idTipa, int idPro){
            try{
                var tip = await _context.Tipovi.Include(p => p.Proizvodi).FirstOrDefaultAsync(t => t.ID == idTipa);
                if(tip == null)
                    return BadRequest("Tip sa ovim Id-jem ne postoji");

                var pro = await _context.Proizvodi.FindAsync(idPro);
                if(pro == null)
                    return BadRequest("Proizvod sa ovim Id-jem ne postoji");

                tip.Proizvodi.Add(pro);
                await _context.SaveChangesAsync();
                return Ok("Uspesno je proizvod dodat tipu");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
    }
}