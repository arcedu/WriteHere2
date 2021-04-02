using Microsoft.AspNetCore.Mvc;
using DataAccess;

namespace WriteHere2.Controllers
{

    [Route("api/[controller]")]
    public class LookupController : Controller
    {
        [HttpGet("[action]")]
        public LookupPack GetLookupList(string lookupType)
        {
            var pack = new LookupPack();

            pack.Genre = LookupRepository.GenreList();
            pack.AssignPurpose = LookupRepository.AssignPurposeList();
            return pack;
        }

    }
}
