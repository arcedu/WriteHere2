using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess
{

    public class Assignment
    {
        public Guid Id;
        public string Title;
        public string Subtitle;
        public string ArticleStatus;
        public string AuthorPenName;
        public DateTime AssignedDate;
        public Guid AuthorUserId;
        public Guid EditorUserId;
        public string EditorUserName;
        public string Content;
        public string Summary;
        public string EditorReasonNote;
        public short AcceptDecline;
    }
}
