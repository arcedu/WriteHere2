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

        [HttpGet("[action]")]
        public IEnumerable<Assignment> GetAssignmentList(Guid? userId)
        {
            var list = AssignmentRepository.GetAssignmentListByEditorUserId(userId);
            return list;
        }

        [HttpGet("[action]")]
        public Assignment GetAssignment(Guid id)
        {
            var a = AssignmentRepository.GetAssignment(id);
            return a;
        }


        // Dev Note: Do not change the Post function name. Must be exactly as this.
        [HttpPost]
        public async Task<IActionResult> PostAssignment([FromBody] Assignment a)
        {
            a = AssignmentRepository.SaveAssignment(a);
            return Json(a);
        }

    }
}
