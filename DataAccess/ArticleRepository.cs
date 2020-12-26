using System;

using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace DataAccess
{
    public static class ArticleRepository
    {
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

                while (rdr.Read())
                {
                    // get the results of each column
                    a.Id = (System.Guid)rdr["ID"];
                    a.AuthorDisplayName = (string)rdr["AuthorDisplayName"];
                    a.Title = (string)rdr["Title"];
                    a.Subtitle = (string)rdr["Subtitle"];
                    a.FirstName = (string)rdr["FirstName"];
                    a.LastName = (string)rdr["LastName"];
                    a.Content = (string)rdr["Content"];
                    a.ArticleStatus = (string)rdr["ArticleStatus"];
                }
            }
            finally
            {
                if (rdr != null) { rdr.Close(); }
                if (conn != null) { conn.Close(); }
            }
            return a;
        }

        public static List<Article> GetArticleList()
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


