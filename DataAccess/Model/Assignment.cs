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
        public DateTime AssignmentDate;
        public Guid AuthorUserId;
        public Guid EditorUserId;
    }
}
