
import { Injectable } from '@angular/core';

Injectable()


// Dev Note: Variable names must match these in api side, expcet make the first letter lower case


export class ArticleComment {
  id: string;
  comment: string;
  commentOwnerId: string;
  commentOwnerPenName: string;
  articleId: string;
  articleTitle: string;
  showOwner: boolean;
  commentOwnerShowProfile: boolean;
  commentDate: string;
}

export class ArticleCommentQuery {
  commentOwnerId: string;
  articleId: string;
  pastMonths: number;
}

export class ArticleVote {
  vote: number;
  userId: string;
  articleId: string;
  }

export class Article {
  comments: ArticleComment[];
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  content: string;
  editorReviewNote: string;
  genre: string;
  genreId: number;   // a short

  authorUserId: string;  // a GUID
  authorIsPublicProfile: boolean;
  authorPenName: string;
  articleStatus: string;

  requestDrawer: boolean;
  bookCover: string;
  viewedCount: number;
  upVote: number;
  downVote: number;
  commentCount: number;

  viewerVote: number;
 
  editorUserId: string;
  editorUserName: string;
  editorAssignedDate: Date;
  tutorUserId: string;
  tutorUserName: string;
  tutorAssignedDate: Date;
  drawerUserId: string;
  drawerUserName: string;
  drawerAssignedDate: Date;
}

export class ArticleRow {
  id: string;
  title: string;
  genre: string;

  authorPenName: string;
  authorIsPublicProfile : boolean;
  authorUserId: string;
  articleStatus: string;

  viewedCount: number;
  upvote: number;
  downVote: number;
  commentCount: number;
}

export class ArticleQuery {
  genre: string;
  authorUserId: string;
  editorUserId: string;
  votedUpByUserId: string;
  commentedByUserId: string;
  isViewerAdmin: boolean;
  statusName: string;
}
export class ArticleSearch {
  field: string; // title, subtitle, summary, authorPenName, genre, editorUserName, viewedCount, upvote, downVote
  optor: string; //  Contain, greater than, equal, less than
  value: string;
}

export class ArticleOrderby{
  field: string; // title, subtitle, summary, authorPenName, genre, editorUserName, viewedCount, upvote, downVote
  asc: boolean; // 1: asc, 0: desc
}

export class Lookup {
  value: number;
  text: string;
}
export class User {
  id: string;
  userName: string;
  penName: string;
  inactive: boolean;
  showProfile: boolean;
  showInHall: boolean;

  email: string;
  showEmail:boolean
  loginPassword: string;
  firstName: string;
  lastName: string;
  showName: boolean;
  grade: number;
  showGrade: boolean;
  country: string;
  showCountry: boolean;
  state: string;
  showState: boolean;
  

  isAdmin: boolean;
  isReader: boolean;
  isWriter: boolean;
  writerAd: string;
  requestingWriter: boolean;
  requestWriterDeclined: boolean;
  isEditor: boolean;
  editorAd: string;
  requestingEditor: boolean;
  requestEditorDeclined: boolean;
  isAuditor: boolean;
  requestingAuditor: boolean;
  requestAuditorDeclined: boolean;
  isDrawer: boolean;
  drawerAd: string;
  requestingDrawer: boolean;
  requestDrawerDeclined: boolean;
  isTutor: boolean;
  tutorAd: string;
  requestingTutor: boolean;
  requestTutorDeclined: boolean;
}


export class StandardResponse {
  success: boolean;
  message: string;
}

export class ArticleStatusHistory {
  articleID: string;
  articleStatusID: string;
}

export class HallOfFame {
  articleId: string;
  authorUserId: string;
  articleTitle: string;
  personName: string;
  rankCount: number;
  rowNumber: number;
}

export class HallOfFamePack {
    mostVoteUp: HallOfFame[];
    mostVoteDown: HallOfFame[];
    mostCommented: HallOfFame[];
    mostViewed: HallOfFame[];
    mostPublished: HallOfFame[];
    mostRejected: HallOfFame[];
}
export class ArticleAssignment
{
  articleId: string;
  articleTitle: string;
  authorId: string;
  authorPenName: string;
  authorIsPublicProfile: boolean;
  assignedDate:string
  assignPurpose: string;  // lookup
  assignPurposeCode: number;
  assignedUserId: string; // according to value in assignPurpose , display different
}

export class DashboardPack {
  writerArticles: ArticleRow[]      // Writer Role
  readerLikedArticles: ArticleRow[]  // Reader Role
  editorAssignments: ArticleAssignment[]  // Editor Role
  tutorAssignments: ArticleAssignment[]  // Tutor Role
  drawerAssignments: ArticleAssignment[]  // Drawer Role
  auditorAssignments: ArticleAssignment[]  // Auditor Role
  adminRoleRequests: ArticleAssignment[]  // Admin Role
}
export class LookupPack {
  genre:Lookup[]
  assignPurpose: Lookup[]
}
