using System;
using System.Collections.Generic;
namespace DataAccess
{ 
    public class DashboardPack
    {
        public IEnumerable<ArticleRow> myArticles;
        public IEnumerable<ArticleRow> myLikedArticles;
        public IEnumerable<ArticleRow> myArticlesToEdit;
        public IEnumerable<ArticleRow> myArticlesToTutor;
        public IEnumerable<ArticleRow> myArticleRequestsToTutor;
        public IEnumerable<ArticleRow> myArticlesToDraw;
        public IEnumerable<ArticleRow> myArticleRequestsToDraw;
    }

}
