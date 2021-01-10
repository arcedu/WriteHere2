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
            var cmd = new SqlCommand("sp_Save_Article", conn) {
                CommandType = System.Data.CommandType.StoredProcedure
             };
            cmd.Parameters.AddWithValue("@id", a.Id);
            cmd.Parameters.AddWithValue("@title", a.Title);
            cmd.Parameters.AddWithValue("@subtitle", a.Subtitle);
            cmd.Parameters.AddWithValue("@content", a.Content);
            cmd.Parameters.AddWithValue("@abstract", a.Summary );
            cmd.Parameters.AddWithValue("@ownerUserID", a.OwnerUserId);
            cmd.Parameters.AddWithValue("@authorDisplayName", a.AuthorDisplayName);
            cmd.Parameters.AddWithValue("@editorReviewNote", a.EditorReviewNote);

            try
            {
                conn.Open();
                var retId = (Guid)cmd.ExecuteScalar();
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

            return;
        }

        public static Article GetArticle(Guid id)
        {
            SqlDataReader rdr = null;
            SqlConnection conn = new SqlConnection(Const.ConnString);
            SqlCommand cmd = new SqlCommand("SELECT * FROM dbo.vwArticleList WHERE ID ='" + id + "'", conn);
            Article a = null;

            try
            {
                conn.Open();
                rdr = cmd.ExecuteReader();

                if (rdr.Read())
                {
                   a = ReadRow(rdr);
                }
            }
            finally
            {
                if (rdr != null) { rdr.Close(); }
                if (conn != null) { conn.Close(); }
            }
            return a;
        }

        public static List<Article> GetArticleList(ArticleQuery articleQuery)
        {
            var sql = "SELECT * FROM dbo.vwArticleList";
            if (articleQuery.OwnerUserId.HasValue 
                || articleQuery.EditorUserId.HasValue 
                || !string.IsNullOrEmpty(articleQuery.StatusName)
                || !string.IsNullOrEmpty(articleQuery.Genre)
                )
            {
                sql += " WHERE ";
                if (articleQuery.OwnerUserId.HasValue) { sql += " AuthorUserId = @au"; }
                if (articleQuery.EditorUserId.HasValue) { sql += " EditorUserId = @eu"; }
                if (!string.IsNullOrEmpty(articleQuery.StatusName)) { sql += " ArticleStatus = @s"; }
                if (!string.IsNullOrEmpty(articleQuery.Genre)) { sql += " Genre = @g"; }
            }
            sql += " ORDER BY Title ";
            SqlDataReader rdr = null;
            SqlConnection conn = new SqlConnection(Const.ConnString);
            SqlCommand cmd = new SqlCommand(sql, conn);
            if (articleQuery.OwnerUserId.HasValue) { cmd.Parameters.AddWithValue("@au", articleQuery.OwnerUserId.Value); }
            if (articleQuery.EditorUserId.HasValue) { cmd.Parameters.AddWithValue("@eu", articleQuery.EditorUserId.Value); }
            if (!string.IsNullOrEmpty(articleQuery.StatusName)) { cmd.Parameters.AddWithValue("@s", articleQuery.StatusName); }
            if (!string.IsNullOrEmpty(articleQuery.Genre)) { cmd.Parameters.AddWithValue("@g", articleQuery.Genre); }
            
            var list = new List<Article>();
            try
            {
                conn.Open();
                rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    var a = ReadRow(rdr);
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

        private static Article ReadRow(SqlDataReader rdr)
        {
            var a = new Article();
            // get the results of each column
            a.Id = (Guid)rdr["ID"];
            a.OwnerUserId = (Guid)rdr["AuthorUserId"];
            a.AuthorDisplayName = (rdr["AuthorDisplayName"] == DBNull.Value) ? string.Empty : rdr["AuthorDisplayName"].ToString();
            a.AuthorIsPublicProfile = (bool)rdr["AuthorIsPublicProfile"];
            a.Title = (string)rdr["Title"];
            a.Subtitle = (rdr["Subtitle"] == DBNull.Value) ? string.Empty : rdr["Subtitle"].ToString();
            a.FirstName = (rdr["FirstName"] == DBNull.Value) ? string.Empty : rdr["FirstName"].ToString(); 
            a.LastName = (rdr["LastName"] == DBNull.Value) ? string.Empty : rdr["LastName"].ToString(); 
            a.Content = (rdr["Content"] == DBNull.Value) ? string.Empty : rdr["Content"].ToString(); 
            a.Summary = (rdr["Abstract"] == DBNull.Value) ? string.Empty : rdr["Abstract"].ToString(); 
            a.ArticleStatus = (rdr["ArticleStatus"] == DBNull.Value) ? string.Empty : rdr["ArticleStatus"].ToString();
            
            a.ViewedCount = (rdr["ViewedCount"] == DBNull.Value) ? 0 : (int)rdr["ViewedCount"];
            a.UpVote = (rdr["ArticleThumbUpCount"] == DBNull.Value) ? 0 : (int)rdr["ArticleThumbUpCount"];
            a.DownVote = (rdr["ArticleThumbDownCount"] == DBNull.Value) ? 0 : (int)rdr["ArticleThumbDownCount"];
            a.CommentCount = (rdr["ArticleCommentCount"] == DBNull.Value) ? 0 : (int)rdr["ArticleCommentCount"];
           
            a.EditorUserId = (rdr["EditorUserId"] == DBNull.Value) ? (Guid?)null : (Guid?)rdr["EditorUserId"];
            a.EditorUserName = (rdr["EditorUserName"] == DBNull.Value) ? string.Empty : (string)rdr["EditorUserName"];
            a.AssignedDate = (rdr["AssignedDate"] == DBNull.Value) ? (DateTime?)null : (DateTime?)rdr["AssignedDate"];
            a.EditorReviewNote = (rdr["EditorReviewNote"] == DBNull.Value) ? string.Empty : (string)rdr["EditorReviewNote"];
            a.Genre = (rdr["Genre"] == DBNull.Value) ? string.Empty : (string)rdr["Genre"];
            return a;
        }
    }
}


