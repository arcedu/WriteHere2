import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { LoginComponent } from './login/login.component';
import { AboutUsComponent } from './aboutus/aboutus.component';
import { MyAccountComponent } from './myaccount/myaccount.component';
import { MemberdashboardComponent } from './memberdashboard/memberdashboard.component';
import { PublishedComponent } from './published/published.component';
import { PublishedTestComponent } from './published/publishedtest.component';
import { RegisterComponent } from './register/register.component';
import { UnpublishedtestComponent } from './published/unpublishedtest.component';
import { MyArticlesComponent } from './myarticles/myarticles.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

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
    AboutUsComponent,
    RegisterComponent,
    UnpublishedtestComponent,
    MyAccountComponent,
    MyArticlesComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'unpublishedtest', component: UnpublishedtestComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'aboutus', component: AboutUsComponent },
      { path: 'myaccount', component: MyAccountComponent },
      { path: 'published', component: PublishedComponent },
      { path: 'publishedtest', component: PublishedTestComponent },
      { path: 'memberdashboard', component: MemberdashboardComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'myarticles', component:MyArticlesComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
