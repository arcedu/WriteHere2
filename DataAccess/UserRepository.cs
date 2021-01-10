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

        private static User ReadRow(SqlDataReader rdr)
        {
            var user = new User();

            user.Id = (Guid)rdr["ID"];
            user.UserName = (string)rdr["UserName"];
            user.FirstName = (rdr["FirstName"] == DBNull.Value) ? string.Empty : rdr["FirstName"].ToString();
            user.LastName = (rdr["LastName"] == DBNull.Value) ? string.Empty : rdr["LastName"].ToString();
            var gradeAsOf2021 = (rdr["GradeAsOf2021"] == DBNull.Value) ? 0 : (int)rdr["GradeAsOf2021"];
            user.Grade = gradeAsOf2021 + DateTime.Today.Year - gradeAsOf2021;
            user.ShowGrade = (rdr["ShowGrade"] == DBNull.Value) ? false : (bool)rdr["ShowGrade"];
            user.Country = (rdr["Country"] == DBNull.Value) ? string.Empty : rdr["Country"].ToString();
            user.ShowCountry = (rdr["ShowCountry"] == DBNull.Value) ? false : (bool)rdr["ShowCountry"];
            user.State = (rdr["State"] == DBNull.Value) ? string.Empty : rdr["State"].ToString();
            user.ShowState = (rdr["ShowState"] == DBNull.Value) ? false : (bool)rdr["ShowState"];

            user.ShowProfile = (rdr["ShowProfile"] == DBNull.Value) ? false : (bool)rdr["ShowProfile"];
            user.ShowInHall = (rdr["ShowInHall"] == DBNull.Value) ? false : (bool)rdr["ShowInHall"];
            user.IsAdmin = (rdr["IsAdmin"] == DBNull.Value) ? false : (bool)rdr["IsAdmin"];
            user.IsReader = (rdr["IsReader"] == DBNull.Value) ? false : (bool)rdr["IsReader"];
            user.IsWriter = (rdr["IsWriter"] == DBNull.Value) ? false : (bool)rdr["IsWriter"];
            user.IsEditor = (rdr["IsEditor"] == DBNull.Value) ? false : (bool)rdr["IsEditor"];
            user.IsAuditor = (rdr["IsAuditor"] == DBNull.Value) ? false : (bool)rdr["IsAuditor"];
            user.IsDrawer = (rdr["IsDrawer"] == DBNull.Value) ? false : (bool)rdr["IsDrawer"];
            user.IsTutor = (rdr["IsTutor"] == DBNull.Value) ? false : (bool)rdr["IsTutor"];

            return user;
        }
    }
}


