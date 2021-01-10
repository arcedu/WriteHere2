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
        public IEnumerable<User> GetUserList()
        {
            var list = UserRepository.GetUserList();
            return list;
        }

        [HttpGet("[action]")]
        public User GetUserById(Guid id)
        {
            var a = UserRepository.GetUserById(id);
            return a;
        }


        [HttpGet("[action]")]
        public User Login(string username, string password)
        {
       
            var user = UserRepository.GetUserByLogin(username, password);
            
            return user;
        }
    }
}
