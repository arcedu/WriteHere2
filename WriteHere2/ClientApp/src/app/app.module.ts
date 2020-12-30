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
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { FileUploadComponent } from './fileupload/fileupload.component';
import { HallOFameComponent } from './hallofame/hallofame.component';
import { ArticleDetailsComponent } from './articledetails/articledetails.component';

//import { PaymentDetailsComponent } from './payment-details/payment-details.component';
//import { PaymentDetailComponent } from './payment-details/payment-detail/payment-detail.component';
//import { PaymentDetailListComponent } from './payment-details/payment-detail-list/payment-detail-list.component';
//import { PaymentDetailService } from './shared/payment-detail.service';

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
    MyArticlesComponent,
    FileUploadComponent,
    ArticleDetailsComponent,
    HallOFameComponent,
    //PaymentDetailsComponent,
    //PaymentDetailComponent,
    //PaymentDetailListComponent
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
      { path: 'articledetails', component: ArticleDetailsComponent },
      { path: 'hallofame', component: HallOFameComponent }

    ])
  ],
  providers:[], // [PaymentDetailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
