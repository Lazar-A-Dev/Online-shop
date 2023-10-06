using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Models{
    [ApiController]
    [Route("[controller]")]
    public class ProdavnicaController : ControllerBase{
        public Context _context;

        public ProdavnicaController(Context context){
            _context = context;
        }

        [Route("VratiSveProdavnice")]
        [HttpGet]
        public async Task<ActionResult> VratiSveProdavnice(){
            try{
                var pro = await _context.Prodavnice.Include(t => t.Tipovi).ToListAsync();
                return Ok(pro);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("NapraviProdavnicu")]
        [HttpPost]
        public async Task<ActionResult> NapraviProdavnicu(Prodavnica pro){
            try{
                _context.Prodavnice.Add(pro);
                await _context.SaveChangesAsync();
                return Ok("Uspesno je napravljena prodavica");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("DodajProdavniciTip")]
        [HttpPut]
        public async Task<ActionResult> DodajProdavniciTip(int idPro, int idTip){
            try{
                var pro = await _context.Prodavnice.Include(t => t.Tipovi).FirstOrDefaultAsync(p => p.ID == idPro);
                if(pro == null)
                    return BadRequest("Prodavnica sa ovim Id-jem ne postoji");

                var tip = await _context.Tipovi.FindAsync(idTip);
                if(tip == null)
                    return BadRequest("Tip sa ovim Id-jem ne postoji");

                pro.Tipovi.Add(tip);
                await _context.SaveChangesAsync();
                return Ok("Uspesno je tip dodat prodavnici");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
    }
}