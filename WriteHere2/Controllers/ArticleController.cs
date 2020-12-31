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
        public IEnumerable<Article> GetArticleList()
        {
            var list = ArticleRepository.GetArticleList();
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

            if (a.Id == null)
            {
                a = ArticleRepository.CreateArticle(a);
                a.Title += " created";
            }
            else
            {
                ArticleRepository.UpdateArticle(a);
                a.Title += " updated";
            }

            return Json(a);
        }

    }
}
