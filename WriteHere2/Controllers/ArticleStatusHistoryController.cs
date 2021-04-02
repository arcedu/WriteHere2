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
    public class ArticleStatusHistoryController : Controller
    {

        [HttpGet("[action]")]
        public StandardResponse Submit(Guid articleId)
        {
            // update the status
            var ah = new ArticleStatusHistory()
            {
                ArticleID = articleId,
                ArticleStatusID = ArticleStatus.Submitted
            };
            ArticleStatusRepository.SaveArticleStatusHistory(ah);

            var result = new StandardResponse() { Success = true, Message = "" };
            return result;
        }
    }


}
