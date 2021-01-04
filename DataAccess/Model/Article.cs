using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess
{
    public class Article
    {
        public Guid Id;
        public Guid OwnerUserId;
        public bool AuthorIsPublicProfile;
        public string Title;
        public string Subtitle;
        public string Summary;
        public string Content;
        public string Abstract;
        public string EditorReviewNote;

        public string AuthorDisplayName;
        public string FirstName;
        public string LastName;
        public string ArticleStatus;

        public int UpVote;
        public int DownVote;
        public int CommentCount;
        public Guid? EditorUserId;
        public string EditorUserName;
        public DateTime? AssignedDate;
    }
}
