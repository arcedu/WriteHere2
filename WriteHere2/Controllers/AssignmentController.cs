using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccess;


namespace WriteHere2.Controllers
{
    [Route("api/[controller]")]
    public class AssignmentController : Controller
    {
 

        // Dev Note: Do not change the Post function name. Must be exactly as this.
        [HttpPut]
        public async void Create([FromBody] AssignmentRequest a)
        {
            AssignmentRepository.Create(a);
            return ;
        }
        [HttpPut]
        public async void Update([FromBody] Assignment a)
        {
            AssignmentRepository.Update(a);
            return;
        }
    }
}
