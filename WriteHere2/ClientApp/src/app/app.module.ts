import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'


@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }
}

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';
import { writearticleComponent } from './writearticle/writearticle.component';
import { AboutUsComponent } from './aboutus/aboutus.component';
import { MyAccountComponent } from './myaccount/myaccount.component';
import { MemberdashboardComponent } from './memberdashboard/memberdashboard.component';
import { PublishedComponent } from './published/published.component';
import { PublishedTestComponent } from './published/publishedtest.component';
import { RegisterComponent } from './register/register.component';
import { UnpublishedtestComponent } from './published/unpublishedtest.component';
import { MyArticlesComponent } from './myarticles/myarticles.component';
import { MyAssignmentsComponent } from './myassignments/myassignments.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { FileUploadComponent } from './fileupload/fileupload.component';
import { HallOFameComponent } from './hallofame/hallofame.component';
import { ArticleDetailsComponent } from './articledetails/articledetails.component';
import { AssignmentDetailsComponent } from './assignmentdetails/assignmentdetails.component';
import { UserListComponent } from './userlist/userlist.component';
import { UserDetailsComponent } from './userdetails/userdetails.component';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    MemberdashboardComponent,
    FetchDataComponent,
    PublishedComponent,
    PublishedTestComponent,
    LoginComponent,
    ForgotComponent,
    writearticleComponent,
    AboutUsComponent,
    RegisterComponent,
    UnpublishedtestComponent,
    MyAccountComponent,
    MyAssignmentsComponent,
    MyArticlesComponent,
    FileUploadComponent,
    ArticleDetailsComponent,
    AssignmentDetailsComponent,
    HallOFameComponent,
    UserListComponent,
    UserDetailsComponent,

   
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'forgot', component: ForgotComponent },
      { path: 'writearticle', component: writearticleComponent },
      { path: 'fileupload', component: FileUploadComponent },
      { path: 'unpublishedtest', component: UnpublishedtestComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'aboutus', component: AboutUsComponent },
      { path: 'myaccount', component: MyAccountComponent },
      { path: 'published', component: PublishedComponent },
      { path: 'publishedtest', component: PublishedTestComponent },
      { path: 'memberdashboard', component: MemberdashboardComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'myarticles', component: MyArticlesComponent },
      { path: 'myassignments', component: MyAssignmentsComponent },
      { path: 'articledetails', component: ArticleDetailsComponent },
      { path: 'assignmentdetails', component: AssignmentDetailsComponent },
      { path: 'hallofame', component: HallOFameComponent },
      { path: 'userlist', component: UserListComponent },
      { path: 'userdetails', component: UserDetailsComponent }


    ])
  ],
  providers: [
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
