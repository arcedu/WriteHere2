using System;

namespace DataAccess
{
    public class Article
    {
        public Guid Id;
        public string Title;
        public string Subtitle;
        public string Summary;
        public string Content;
        public string EditorReviewNote;
        public string Genre;

        public Guid OwnerUserId;
        public bool AuthorIsPublicProfile;
        public string AuthorDisplayName;
        public string FirstName;
        public string LastName;
        public string ArticleStatus;
        
        public int ViewedCount;
        public int UpVote;
        public int DownVote;
        public int CommentCount;
        public Guid? EditorUserId;
        public string EditorUserName;
        public DateTime? AssignedDate;
    }


    public class ArticleQuery
    {
        public string Genre;
        public Guid? OwnerUserId;
        public Guid? EditorUserId;
        public string StatusName;
    }

    public class ArticleSearch
    {
        public string field; // title, subtitle, summary, authorDisplayName, genre, editorUserName, viewedCount, upvote, downVote
        public string optor; //  Contain, greater than, equal, less than
        public string value;
    }

    public class ArticleOrderby
    {
        public string field; // title, subtitle, summary, authorDisplayName, genre, editorUserName, viewedCount, upvote, downVote
        public bool asc; // 1: asc, 0: desc
    }
}
