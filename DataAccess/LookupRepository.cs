using System;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace DataAccess
{
    public static class LookupRepository
    { 
        public static List<Lookup> GenreList()
        {
            var sql = "SELECT * FROM dbo.LUGenre";
            SqlDataReader rdr = null;
            SqlConnection conn = new SqlConnection(Const.ConnString);
            SqlCommand cmd = new SqlCommand(sql, conn);

            var list = new List<Lookup>();
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
        public static List<Lookup> AssignPurposeList()
        {
            var sql = "SELECT * FROM dbo.LUAssignPurpose";
            SqlDataReader rdr = null;
            SqlConnection conn = new SqlConnection(Const.ConnString);
            SqlCommand cmd = new SqlCommand(sql, conn);

            var list = new List<Lookup>();
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

        private static Lookup ReadRow(SqlDataReader rdr)
        {
            var a = new Lookup();

            a.Value = (rdr["Id"] == DBNull.Value) ? (short)0 : (short)rdr["Id"];
            a.Text = (rdr["Text"] == DBNull.Value) ? string.Empty : rdr["Text"].ToString();
           
            return a;
        }
    }
}


