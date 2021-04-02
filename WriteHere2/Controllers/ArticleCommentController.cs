using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccess;


namespace WriteHere2.Controllers
{
    [Route("api/[controller]")]
    public class ArticleCommentController : Controller
    {

        [HttpGet("[action]")]
        public IEnumerable<ArticleComment> GetCommentList(ArticleCommentQuery  query)
        {
            var list = ArticleCommentRepository.GetArticleCommentListByQuery(query);
            return list;
        }

        [HttpGet("[action]")]
        public ArticleComment GetArticleComment(Guid id)
        {
            var a = ArticleCommentRepository.GetArticleComment(id);
            return a;
        }


        // Dev Note: Do not change the Post function name. Must be exactly as this.
        [HttpPost]
        public async Task<IActionResult> PostArticleComment([FromBody] ArticleComment a)
        {
            if (a != null)
            {
                 a = ArticleCommentRepository.SaveArticleComment(a);
            }
            return Json(a);
        }

    }
}
