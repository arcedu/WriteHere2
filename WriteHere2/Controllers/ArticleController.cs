using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccess;


namespace WriteHere2.Controllers
{
    [Route("api/[controller]")]
    public class ArticleController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<Article> GetArticleList(Guid? userId, string statusName)
        {
            var list = ArticleRepository.GetArticleList(userId, statusName);
            return list;
        }

        [HttpGet("[action]")]
        public Article GetArticle(Guid id)
        {
            var a = ArticleRepository.GetArticle(id);
            return a;
        }


        [HttpGet("[action]")]
        public Article AnyFuncName(Guid id)
        {
         
            var a = ArticleRepository.GetArticle(id);
            return a;
        }


        // Dev Note: Do not change the Post function name. Must be exactly as this.
        [HttpPost]
        public async Task<IActionResult> PostArticle([FromBody] Article a)
        {

                a=ArticleRepository.SaveArticle(a);
         
            return Json(a);
        }

    }
}
