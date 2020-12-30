using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccess;


namespace WriteHere2.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<UserInfo> GetUserInfoList()
        {
            var list = UserRepository.GetUserInfoList();
            return list;
        }

        [HttpGet("[action]")]
        public UserInfo GetUserInfoById(Guid id)
        {
            var a = UserRepository.GetUserInfoById(id);
            return a;
        }


        // Dev Note: Do not change the Post function name. Must be exactly as this.
        [HttpPost]
        public async Task<IActionResult> PostArticle([FromBody] Article a)
        {
            ArticleRepository.s
            if ( a.Id == null) { a.Id = Guid.NewGuid(); }
            a.Title += " saved";
            return Json(a);
        }

    }
}
