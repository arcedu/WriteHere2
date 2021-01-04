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
            cmd.Parameters.AddWithValue("@abstract", a.Abstract);
            cmd.Parameters.AddWithValue("@ownerUserID", a.OwnerUserId);
            cmd.Parameters.AddWithValue("@authorDisplayName", a.AuthorDisplayName);

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

        public static List<Article> GetArticleList(Guid? authorUserId, Guid? editorUserId, string statusName)
        {
            var sql = "SELECT * FROM dbo.vwArticleList";
            if (authorUserId.HasValue || editorUserId.HasValue || !string.IsNullOrEmpty(statusName))
            {
                sql += " WHERE ";
                if (authorUserId.HasValue) { sql += " AuthorUserId = @au"; }
                if (editorUserId.HasValue) { sql += " EditorUserId = @eu"; }
                if (!string.IsNullOrEmpty(statusName)) { sql += " StatusName = @s"; }
            }

            SqlDataReader rdr = null;
            SqlConnection conn = new SqlConnection(Const.ConnString);
            SqlCommand cmd = new SqlCommand(sql, conn);
            if (authorUserId.HasValue) { cmd.Parameters.AddWithValue("@au", authorUserId); }
            if (editorUserId.HasValue) { cmd.Parameters.AddWithValue("@eu", editorUserId); }
            if (!string.IsNullOrEmpty(statusName)) { cmd.Parameters.AddWithValue("@s", statusName); }

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

        public static List<Assignment> GetAssignmentList(Guid? userId)
        {
            var sql = "SELECT * FROM dbo.vwAssignmentList";
            if (userId.HasValue)
            {
                sql += " WHERE ";
                if (userId.HasValue) { sql += " EditorUserId = @u"; }

            }

            SqlDataReader rdr = null;
            SqlConnection conn = new SqlConnection(Const.ConnString);
            SqlCommand cmd = new SqlCommand(sql, conn);
            if (userId.HasValue) { cmd.Parameters.AddWithValue("@u", userId); }

            var list = new List<Assignment>();
            try
            {
                conn.Open();
                rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    var a = new Assignment();
                    // get the results of each column
                    a.Id = (Guid)rdr["ID"];
                    a.AuthorDisplayName = (rdr["AuthorDisplayName"] == DBNull.Value) ? string.Empty : rdr["AuthorDisplayName"].ToString();
                    a.Title = (string)rdr["Title"];
                    a.Subtitle = (rdr["Subtitle"] == DBNull.Value) ? string.Empty : rdr["Subtitle"].ToString();
                    a.ArticleStatus = (string)rdr["ArticleStatus"];
                    a.AssignedDate = (DateTime)rdr["AssignedDate"];
                    a.AuthorUserId = (Guid)rdr["AuthorUserId"];
                    a.EditorUserId = (Guid)rdr["EditorUserId"];

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
            a.FirstName = (rdr["FirstName"] == DBNull.Value) ? string.Empty : rdr["FirstName"].ToString(); ;
            a.LastName = (rdr["LastName"] == DBNull.Value) ? string.Empty : rdr["LastName"].ToString(); ;
            a.Content = (rdr["Content"] == DBNull.Value) ? string.Empty : rdr["Content"].ToString(); ;
            a.Abstract = (rdr["Abstract"] == DBNull.Value) ? string.Empty : rdr["Abstract"].ToString(); ;
            a.ArticleStatus = (rdr["ArticleStatus"] == DBNull.Value) ? string.Empty : rdr["ArticleStatus"].ToString();
            a.UpVote = (rdr["ArticleThumbUpCount"] == DBNull.Value) ? 0 : (int)rdr["ArticleThumbUpCount"];
            a.DownVote = (rdr["ArticleThumbDownCount"] == DBNull.Value) ? 0 : (int)rdr["ArticleThumbDownCount"];
            a.CommentCount = (rdr["ArticleCommentCount"] == DBNull.Value) ? 0 : (int)rdr["ArticleCommentCount"];
            a.EditorUserId = (rdr["EditorUserId"] == DBNull.Value) ? (Guid?)null : (Guid?)rdr["EditorUserId"];
            a.EditorUserName = (rdr["EditorUserName"] == DBNull.Value) ? string.Empty : (string)rdr["EditorUserName"];
            a.AssignedDate = (rdr["AssignedDate"] == DBNull.Value) ? (DateTime?)null : (DateTime?)rdr["AssignedDate"];
            a.EditorReviewNote = (rdr["EditorReviewNote"] == DBNull.Value) ? string.Empty : (string)rdr["EditorReviewNote"];

            return a;
        }
    }
}


