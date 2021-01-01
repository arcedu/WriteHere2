using System;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace DataAccess
{
    public static class ArticleRepository
    {
        public static Article CreateArticle(Article a)
        {
         
            return a;
        }
        public static Article SaveArticle(Article a)
        {
            // When a.Id is a Guid.Null, this is a create. else this is a update
            SqlConnection conn = new SqlConnection(Const.ConnString);
            SqlCommand cmd = new SqlCommand("sp_Save_Article", conn);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", a.Id);
            cmd.Parameters.AddWithValue("@title", a.Title);
            cmd.Parameters.AddWithValue("@subtitle", a.Subtitle);
            cmd.Parameters.AddWithValue("@content", a.Content);
            cmd.Parameters.AddWithValue("@abstract", a.Abstract);
            cmd.Parameters.AddWithValue("@ownerUserID", a.OwnerUserId);
            cmd.Parameters.AddWithValue("@authorDisplayName", a.AuthorDisplayName);

            try
            {
                conn.Open();
                var retId = (Guid) cmd.ExecuteScalar();
                a.Id = retId;
            }
            finally
            {
                if (conn != null) { conn.Close(); }
            }
            return a;
        }


        public static void DelteArticle(Guid id)
        {

            return ;
        }

        public static Article GetArticle(Guid id)
        {
            SqlDataReader rdr = null;
            SqlConnection conn = new SqlConnection(Const.ConnString);
            SqlCommand cmd = new SqlCommand("SELECT * FROM dbo.vwArticleList WHERE ID ='" + id+"'" , conn);
            var a = new Article();

            try
            {
                conn.Open();
                rdr = cmd.ExecuteReader();

                if (rdr.Read())
                {
                    // get the results of each column
                    a.Id = (Guid)rdr["ID"];
                    a.OwnerUserId  = (Guid)rdr["UserID"];
                    a.AuthorDisplayName = (rdr["AuthorDisplayName"] == DBNull.Value) ? string.Empty : rdr["AuthorDisplayName"].ToString(); 
                    a.AuthorIsPublicProfile = (bool)rdr["AuthorIsPublicProfile"];
                    a.Title = (string)rdr["Title"];
                    a.Subtitle = (rdr["Subtitle"] == DBNull.Value) ? string.Empty : rdr["Subtitle"].ToString(); 
                    a.FirstName = (rdr["FirstName"] == DBNull.Value) ? string.Empty : rdr["FirstName"].ToString(); ;
                    a.LastName = (rdr["LastName"] == DBNull.Value) ? string.Empty : rdr["LastName"].ToString(); ;
                    a.Content = (rdr["Content"] == DBNull.Value) ? string.Empty : rdr["Content"].ToString(); ;
                    a.ArticleStatus = (rdr["Abstract"] == DBNull.Value) ? string.Empty : rdr["Abstract"].ToString(); ;
                }
            }
            finally
            {
                if (rdr != null) { rdr.Close(); }
                if (conn != null) { conn.Close(); }
            }
            return a;
        }

        public static List<Article> GetArticleList(Guid? userId, string statusName)
        {
            var sql = "SELECT * FROM dbo.vwArticleList";
            if (userId.HasValue || !string.IsNullOrEmpty( statusName)) 
            { 
                sql += " WHERE ";
                if (userId.HasValue) { sql += " UserId = @u"; }
                if (!string.IsNullOrEmpty(statusName)) { sql += " StatusName = @s"; }
            }

            SqlDataReader rdr = null;
            SqlConnection conn = new SqlConnection(Const.ConnString);
            SqlCommand cmd = new SqlCommand(sql, conn);
            if (userId.HasValue) { cmd.Parameters.AddWithValue("@u", userId); }
            if (!string.IsNullOrEmpty(statusName)) { cmd.Parameters.AddWithValue("@s", statusName); }

            var list = new List<Article>();
            try
            {
                conn.Open();
                rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    var a = new Article();
                    // get the results of each column
                    a.Id = (Guid)rdr["ID"];
                    a.OwnerUserId = (Guid)rdr["UserID"];
                    a.AuthorDisplayName = (rdr["AuthorDisplayName"] == DBNull.Value) ? string.Empty : rdr["AuthorDisplayName"].ToString();
                    a.AuthorIsPublicProfile = (bool)rdr["AuthorIsPublicProfile"];
                    a.Title = (string)rdr["Title"];
                    a.Subtitle = (rdr["Subtitle"] == DBNull.Value) ? string.Empty : rdr["Subtitle"].ToString();
                    a.FirstName = (rdr["FirstName"] == DBNull.Value) ? string.Empty : rdr["FirstName"].ToString(); ;
                    a.LastName = (rdr["LastName"] == DBNull.Value) ? string.Empty : rdr["LastName"].ToString(); ;
                    a.Content = (rdr["Content"] == DBNull.Value) ? string.Empty : rdr["Content"].ToString(); ;
                    a.Abstract = (rdr["Abstract"] == DBNull.Value) ? string.Empty : rdr["Abstract"].ToString();
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


