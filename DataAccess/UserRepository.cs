using System;

using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace DataAccess
{
    public static class UserRepository
    {
        public static UserInfo GetUserInfoByUserName(string userName)
        {
            return null;
        }

        public static UserInfo GetUserInfoById(Guid id)
        {
            SqlDataReader rdrUser = null;
            SqlDataReader rdrRole = null;
            SqlConnection conn = new SqlConnection(Const.ConnString);
            SqlCommand cmdUser = new SqlCommand("SELECT * FROM dbo.[User] WHERE ID ='" + id+"'" , conn);
            SqlCommand cmdRole = new SqlCommand("SELECT * FROM dbo.[UserRole] WHERE UserID ='" + id + "'", conn);
            var user = new UserInfo();
            try
            {
                conn.Open();
                rdrUser = cmdUser.ExecuteReader();
                rdrRole = cmdRole.ExecuteReader();
                if (rdrUser.Read())
                {     
                    user.Id = (System.Guid)rdrUser["ID"];
                    user.UserName = (string)rdrUser["UserName"];
                   
                    while (rdrRole.Read())
                    {
                        var role = new Role();
                        role.Id = (System.Guid)rdrRole["ID"];
                        role.RoleName = (string)rdrRole["RoleName"];
                        user.Roles.Add(role);

                    }
                }
            }
            finally
            {
                if (rdrUser != null) { rdrUser.Close(); }
                if (rdrRole != null) { rdrRole.Close(); }
                if (conn != null) { conn.Close(); }
            }
            return user;
        }

        public static List<UserInfo> GetUserInfoList()
        {
            SqlDataReader rdrUser = null;
            SqlDataReader rdrRole = null;
            SqlConnection conn = new SqlConnection(Const.ConnString);
            SqlCommand cmdUser = new SqlCommand("SELECT * FROM dbo.[User] ", conn);
            var list = new List<UserInfo>();
            try
            {
                conn.Open();
                rdrUser = cmdUser.ExecuteReader();
                while (rdrUser.Read())
                {
                    var user = new UserInfo();
                    user.Id = (System.Guid)rdrUser["ID"];
                    user.UserName = (string)rdrUser["UserName"];
                    list.Add(user);
                }
                if (rdrUser != null) { rdrUser.Close(); }
                
                foreach (var user in list)
                {
                    SqlCommand cmdRole = new SqlCommand("SELECT u.Id,r.RoleName FROM dbo.[UserRole] u LEFT OUTER JOIN dbo.[Role] r ON u.RoleId = r.ID WHERE UserID ='" + user.Id + "'", conn);
                    rdrRole = cmdRole.ExecuteReader();

                  
                    while (rdrRole.Read())
                    {
                        var role = new Role();
                        role.Id = (System.Guid)rdrRole["ID"];
                        role.RoleName = (string)rdrRole["RoleName"];
                        user.Roles.Add(role);

                    }
                    if (rdrRole != null) { rdrRole.Close(); }
                }
            }
            finally
            {
                if (rdrUser != null) { rdrUser.Close(); }
                if (rdrRole != null) { rdrRole.Close(); }
                if (conn != null) { conn.Close(); }
            }
            return list;
        }
    }
}


