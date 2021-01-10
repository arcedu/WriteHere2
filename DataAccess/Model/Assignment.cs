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
        public string AuthorDisplayName;
        public DateTime AssignedDate;
        public Guid AuthorUserId;
        public Guid EditorUserId;
        public string EditorUserName;
    }
}
