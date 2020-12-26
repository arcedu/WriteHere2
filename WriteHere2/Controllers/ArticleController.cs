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

    }
}
