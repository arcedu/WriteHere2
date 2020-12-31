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


        [HttpGet("[action]")]
        public UserInfo Login(string username, string password)
        {
            ViewData["Login"] = "user1";
            var user = UserRepository.GetUserInfoByLogin(username, password);
            
            return user;
        }
    }
}
