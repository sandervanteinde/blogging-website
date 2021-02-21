import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { HttpClientModule } from '@angular/common/http';
import { HomeModule } from './home/home.module';
import { MarkdownOptions } from './utils/markdown-options';
import { TitlesModule } from './utils/titles/titles.module';
import { EnvironmentService } from './environment.service';
import { API_URL } from './utils/api-url';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    MarkdownModule.forRoot(),
    HttpClientModule,
    HomeModule,
    TitlesModule
  ],
  providers: [
    {
      provide: MarkedOptions,
      useClass: MarkdownOptions
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (env: EnvironmentService) => env.initialize(),
      deps: [EnvironmentService],
      multi: true
    },
    {
      provide: API_URL,
      useFactory: (env: EnvironmentService) => env.apiHost,
      deps: [EnvironmentService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
