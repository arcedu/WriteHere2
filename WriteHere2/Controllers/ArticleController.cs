using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccess;
using Newtonsoft.Json;

namespace WriteHere2.Controllers
{

    [Route("api/[controller]")]
    public class ArticleController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<ArticleRow> GetArticleRows(string querystring)
        {
            var articleQuery = new ArticleQuery();
            if (!string.IsNullOrEmpty(querystring))
            {
                articleQuery = JsonConvert.DeserializeObject<ArticleQuery>(querystring);
            }
            var list = ArticleRepository.GetArticleRowList(articleQuery);

         
            return list;
        }

        [HttpGet("[action]")]
        public HallOfFamePack GetHallOfFamePack(string querystring)
        {
         
            var list = HallOfFameRepository.GetHallOfFameList();
            var pack = new HallOfFamePack
            {
                MostVoteUp = list.Where(x => x.HallOfFameType == "MostVoteUp")
                        .OrderBy(x => x.RowNumber),
                MostVoteDown = list.Where(x => x.HallOfFameType == "MostVoteDown")
                        .OrderBy(x => x.RowNumber),
                MostViewed = list.Where(x => x.HallOfFameType == "MostViewed")
                        .OrderBy(x => x.RowNumber),
                MostCommented = list.Where(x => x.HallOfFameType == "MostCommented")
                        .OrderBy(x => x.RowNumber),
                MostPublished = list.Where(x => x.HallOfFameType == "MostPublished")
                        .OrderBy(x => x.RowNumber),
                MostRejected = list.Where(x => x.HallOfFameType == "MostRejected")
                        .OrderBy(x => x.RowNumber),

            };
            return pack;
        }



        [HttpGet("[action]")]
        public DashboardPack GetDashBoardPack(Guid loginId )
        {
            var pack = new DashboardPack();

            pack.myArticles = ArticleRepository.GetArticleRowList(new ArticleQuery { AuthorUserId = loginId });
            pack.myLikedArticles = ArticleRepository.GetArticleRowList(new ArticleQuery { VotedUpByUserId = loginId });
            pack.myArticlesToEdit = ArticleRepository.GetArticleRowList(new ArticleQuery { EditorUserId = loginId });

            return pack;
        }


        [HttpGet("[action]")]
    public Article GetArticle(Guid id, Guid byId)
    {

        var a = ArticleRepository.GetArticle(id);
            if (a == null)
            {
                a = new Article
                {
                    Id = Guid.Empty,
                    Title = "ArticleTitle"
                };
            }
            else 
            {
                // load comments
                var ac = ArticleCommentRepository.GetArticleCommentListByQuery
                    (new ArticleCommentQuery {ArticleId = id });
                a.Comments = ac;

                // load viewer's vote
            }

            if (a.AuthorUserId != byId)
        {
            ArticleRepository.IncreaseArticleViewedCount(id);
            a.ViewedCount++;
        }
        return a;
    }


        [HttpGet("[action]")]
        public Article AnyFuncName(Guid id)
        {
         
            var a = ArticleRepository.GetArticle(id);
            return a;
        }

        [HttpDelete("[action]")]
        public StandardResponse Delete(Guid id)
        {
            ArticleRepository.DeleteArticle(id);
            var result = new StandardResponse() { Success = true, Message = "" };
            return result;
        }


        // Dev Note: Do not change the Post function name. Must be exactly as this.
        [HttpPost]
        public async Task<IActionResult> PostArticle([FromBody] Article a)
        {
            // save the article
            if (a != null)
            {
                a = ArticleRepository.SaveArticle(a);
            }

            return Json(a);
        }


    }
}
