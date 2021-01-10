using System;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace DataAccess
{
    public static class AssignmentRepository
    {
        public static Assignment CreateAssignment(Assignment a)
        {

            return a;
        }
        public static Assignment SaveAssignment(Assignment a)
        {
            return a;
        }


        public static void DelteAssignment(Guid id)
        {

            return;
        }

        public static Assignment GetAssignment(Guid id)
        {
            SqlDataReader rdr = null;
            SqlConnection conn = new SqlConnection(Const.ConnString);
            SqlCommand cmd = new SqlCommand("SELECT * FROM dbo.vwAssignmentList WHERE ID ='" + id + "'", conn);
            Assignment a = null;

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

        public static List<Assignment> GetAssignmentListByEditorUserId(Guid? userId)
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


        private static Assignment ReadRow(SqlDataReader rdr)
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
            a.EditorUserName = (rdr["EditorUserName"] == DBNull.Value) ? string.Empty : rdr["EditorUserName"].ToString(); 
            return a;
        }
    }
}


