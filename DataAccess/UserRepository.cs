using System;

using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace DataAccess
{
    public static class UserRepository
    {
        public static User GetUserByLogin(string username, string password)
        {
            SqlDataReader rdrUser = null;
            SqlConnection conn = new SqlConnection(Const.ConnString);
            SqlCommand cmdUser = new SqlCommand("SELECT * FROM dbo.[User] WHERE UserName = @u AND LoginPassword = @p", conn);
            cmdUser.Parameters.AddWithValue("@u", username);
            cmdUser.Parameters.AddWithValue("@p", password);

            User user = null;
            try
            {
                conn.Open();
                rdrUser = cmdUser.ExecuteReader();
                if (rdrUser.Read())
                {
                    user = ReadRow(rdrUser);
                }
            }
            finally
            {
                if (rdrUser != null) { rdrUser.Close(); }
                if (conn != null) { conn.Close(); }
            }
            return user;
        }

        public static User GetUserById(Guid id)
        {
            SqlDataReader rdrUser = null;
            SqlConnection conn = new SqlConnection(Const.ConnString);
            SqlCommand cmdUser = new SqlCommand("SELECT * FROM dbo.[User] WHERE ID ='" + id+"'" , conn);

            User user =null;
            try
            {
                conn.Open();
                rdrUser = cmdUser.ExecuteReader();
                if (rdrUser.Read())
                {
                    user = ReadRow(rdrUser);
                }
            }
            finally
            {
                if (rdrUser != null) { rdrUser.Close(); }
                if (conn != null) { conn.Close(); }
            }
            return user;
        }

        public static List<User> GetUserList()
        {
            SqlDataReader rdrUser = null;
            SqlConnection conn = new SqlConnection(Const.ConnString);
            SqlCommand cmdUser = new SqlCommand("SELECT * FROM dbo.[User] ", conn);
            var list = new List<User>();
            try
            {
                conn.Open();
                rdrUser = cmdUser.ExecuteReader();
                while (rdrUser.Read())
                {
                    var user = ReadRow(rdrUser);
                    list.Add(user);
                }
            }
            finally
            {
                if (rdrUser != null) { rdrUser.Close(); }
                if (conn != null) { conn.Close(); }
            }
            return list;
        }

        private static User ReadRow(SqlDataReader rdrUser)
        {
            var user = new User();
           
                user.Id = (Guid)rdrUser["ID"];
                user.UserName = (string)rdrUser["UserName"];
            
            return user;
        }
    }
}


