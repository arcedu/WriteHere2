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
            SqlCommand cmdUser = new SqlCommand("SELECT * FROM dbo.User WHERE ID ='" + id+"'" , conn);
            SqlCommand cmdRole = new SqlCommand("SELECT * FROM dbo.UserRole WHERE UserID ='" + id + "'", conn);
            var user = new UserInfo();
            try
            {
                conn.Open();
                rdrUser = cmdUser.ExecuteReader();
                rdrRole = cmdRole.ExecuteReader();
                if (rdrUser.Read())
                {      // get the results of each column
                    user.Id = (System.Guid)rdrUser["ID"];
                    user.UserName = (string)rdrUser["UserName"];
                    var role = new Role();
                    while (rdrRole.Read())
                    {
                        role.Id = (System.Guid)rdrRole["ID"];
                        role.RoleName = (string)rdrRole["RoleName"];
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
            SqlDataReader rdr = null;
            SqlConnection conn = new SqlConnection(Const.ConnString);
            SqlCommand cmd = new SqlCommand("SELECT * FROM dbo.vwArticleList", conn);
            var list = new List<Article>();
            try
            {
                conn.Open();
                rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    var a = new Article();
                    // get the results of each column
                    a.Id = (System.Guid)rdr["ID"];
                    a.AuthorDisplayName = (string)rdr["AuthorDisplayName"];
                    a.Title = (string)rdr["Title"];
                    a.Subtitle = (string)rdr["Subtitle"];
                    a.FirstName = (string)rdr["FirstName"];
                    a.LastName = (string)rdr["LastName"];
                    a.ArticleStatus = (string)rdr["ArticleStatus"];
                    a.Content = (string)rdr["Content"];
                    list.Add(a);
                }
            }
            finally
            {
                if (rdr != null) { rdr.Close(); }
                if (conn != null) { conn.Close(); }
            }
            return list;
        }
    }
}


