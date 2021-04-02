using System;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace DataAccess
{
    public static class ArticleVoteRepository
    {
       
        public static ArticleVote SaveArticleVote(ArticleVote a)
        {
            // When a.Id is a Guid.Null, this is a create. else this is a update
            SqlConnection conn = new SqlConnection(Const.ConnString);
            var cmd = new SqlCommand("sp_Save_ArticleVote", conn)
            {
                CommandType = System.Data.CommandType.StoredProcedure
            };

            cmd.Parameters.AddWithValue("@id", a.Id);
            cmd.Parameters.AddWithValue("@Vote", a.Vote);
            cmd.Parameters.AddWithValue("@VoteOwnerID", a.VoteOwnerId);
            cmd.Parameters.AddWithValue("@articleID", a.ArticleId);
            cmd.Parameters.AddWithValue("@showOwner", a.ShowOwner);


            try
            {
                conn.Open();
                var retId = (Guid)cmd.ExecuteScalar();
                a.Id = retId;
            }
            catch (Exception ex)
            {
                Console.Write(ex.Message);
            }
            finally
            {
                if (conn != null) { conn.Close(); }
            }
            return a;
        }


        public static void DelteArticleVote(Guid id)
        {
            if (id == null || id == Guid.Empty) return;

            SqlConnection conn = new SqlConnection(Const.ConnString);
            var cmd = new SqlCommand("DELETE FROM ArticleVote WHERE id ='" + id + "'", conn);

            try
            {
                conn.Open();
                cmd.ExecuteScalar();
            }
            finally
            {
                if (conn != null) { conn.Close(); }
            }

            return;
        }

        public static ArticleVote GetArticleVote(Guid id)
        {
            SqlDataReader rdr = null;
            SqlConnection conn = new SqlConnection(Const.ConnString);
            SqlCommand cmd = new SqlCommand("SELECT * FROM dbo.vwArticleVoteList WHERE ID ='" + id + "' ORDER BY VoteDateTime Desc", conn);
            ArticleVote a = null;

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

        public static List<ArticleVote> GetArticleVoteListByQuery(ArticleVoteQuery  query)
        {
            var sql = "SELECT * FROM dbo.[vwArticleVoteList]";
            if (query.UserId.HasValue
                  || query.ArticleId.HasValue)
             {
                sql += " WHERE ";
                if (query.UserId.HasValue) { sql += " VoteOwnerID = @u"; }
                if (query.ArticleId.HasValue) { sql += " ArticleId = @ar"; }
             }

            SqlDataReader rdr = null;
            SqlConnection conn = new SqlConnection(Const.ConnString);
            SqlCommand cmd = new SqlCommand(sql, conn);
            if (query.UserId.HasValue) { cmd.Parameters.AddWithValue("@u", query.UserId); }
            if (query.ArticleId.HasValue) { cmd.Parameters.AddWithValue("@ar", query.ArticleId); }

            var list = new List<ArticleVote>();
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
       
     
        private static ArticleVote ReadRow(SqlDataReader rdr)
        {
            var a = new ArticleVote();
            // get the results of each column
            a.Id = (Guid)rdr["ID"];
            a.Vote = (rdr["Vote"] == DBNull.Value) ? string.Empty : rdr["Vote"].ToString();
            a.VoteOwnerId = (Guid)rdr["VoteOwnerId"];
            a.VoteOwnerPenName = (rdr["VoteOwnerPenName"] == DBNull.Value) ? string.Empty : rdr["VoteOwnerPenName"].ToString();
            a.ArticleTitle = (rdr["ArticleTitle"] == DBNull.Value) ? string.Empty : rdr["ArticleTitle"].ToString();
            a.ShowOwner = (bool)rdr["ShowOwner"];
            a.VoteOwnerShowProfile = (bool) rdr["VoteOwnerShowProfile"];
            a.VoteDate = (rdr["VoteDateTime"] == DBNull.Value) ? string.Empty : ((DateTime)rdr["VoteDateTime"]).ToString("yyyy-MM-dd");
            return a;
        }
    }
}


