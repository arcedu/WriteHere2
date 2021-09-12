using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccess;


namespace WriteHere2.Controllers
{
    [Route("api/[controller]")]
    public class ArticleVoteController : Controller
    {

        // Dev Note: Do not change the Post function name. Must be exactly as this.
        [HttpPost]
        public async Task<IActionResult> PostArticleVote([FromBody] ArticleVote a)
        {
            if (a != null)
            {
                ArticleVoteRepository.SaveArticleVote(a);
            }
            return Json(a);
        }

    }
}
