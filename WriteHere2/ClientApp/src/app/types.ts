
import { Injectable } from '@angular/core';

Injectable()
// Dev Note: Variable names must match these in api side, expcet make the first letter lower case


export class Article {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  content: string;
  editorReviewNote: string;
  genre: string;

  ownerUserId: string;
  authorIsPublicProfile: boolean;
  authorDisplayName: string;
  firstName: string;
  lastName: string;
  articleStatus: string;

  viewedCount: number;
  upvote: number;
  downVote: number;
  commentCount: number;

  editorUserId: string;
  editorUserName: string;
  assignedDate: Date;
}

export class ArticleQuery {
  genre: string;
  ownerUserId: string;
  editorUserId: string;
  statusName: string;
}
export class ArticleSearch {
  field: string; // title, subtitle, summary, authorDisplayName, genre, editorUserName, viewedCount, upvote, downVote
  optor: string; //  Contain, greater than, equal, less than
  value: string;
}

export class ArticleOrderby{
  field: string; // title, subtitle, summary, authorDisplayName, genre, editorUserName, viewedCount, upvote, downVote
  asc: boolean; // 1: asc, 0: desc
}

export class User {
  id: string;
  userName: string;
  loginPassword: string;
  firstName: string;
  lastName: string;
  grade: number;
  showGrade: boolean;
  country: string;
  showCountry: boolean;
  state: string;
  showState: boolean;
  showProfile: boolean;
  showInHall: boolean;
  isAdmin: boolean;
  isReader: boolean;
  isWriter: boolean;
  isEditor: boolean;
  isAuditor: boolean;
  isDrawer: boolean;
  isTutor: boolean;
}


export class Assignment {
  id: string;
  title: string;
  subtitle: string;
  articleStatus: string;
  authorDisplayName: string;
  assignedDate: Date;
  authorUserId: string;
  authorUserName: string;
  editorUserId: string;
  editorUserName: string;
  acceptDecline: number;
  genre: string;
  summary: string;
  editorReasonNote: string; 
}


