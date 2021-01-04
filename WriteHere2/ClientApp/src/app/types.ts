
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
  authorDisplayName: string;
  ownerUserId: string;
  authorIsPublicProfile: boolean;
  firstName: string;
  lastName: string;
  editorUserId: string;
  editorUserName: string;
  assignedDate: Date;
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

