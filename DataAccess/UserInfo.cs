using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess
{
    public class UserInfo
    {
        public UserInfo()
        { Roles = new List<Role>(); }
        public Guid Id;
        public string UserName;
        

        public List<Role> Roles;
    }
}
