import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { MarkdownModule } from 'ngx-markdown';
import { WebStorageModule } from 'ngx-store';
import { AppComponent } from './app.component';
import { CampaignComponent } from './campaign/campaign.component';
import { CharacterComponent } from './character/character.component';
import { EnemyComponent } from './enemy/enemy.component';
import { HomeComponent } from './home/home.component';
import { QuestCardComponent } from './quests/quest-card/quest-card.component';
import { QuestModalComponent } from './quests/quest-modal/quest-modal.component';
import { QuestsComponent } from './quests/quests.component';
import { SearchComponent } from './search/search.component';
import { ClickStopPropagation } from './_shared/directives/click-stop-propagation.directive';
import { NewBadgeComponent } from './_shared/new-badge/new-badge.component';
import { HighlightPipe } from './_shared/pipes/highlight.pipe';
import { DatabaseService } from './_shared/services/database.service';
import { StateService } from './_shared/services/state.service';

@NgModule({
  declarations: [
    AppComponent,
    NewBadgeComponent,
    QuestsComponent,
    QuestModalComponent,
    QuestCardComponent,
    SearchComponent,
    CharacterComponent,
    ClickStopPropagation,
    CampaignComponent,
    HomeComponent,
    HighlightPipe,
    EnemyComponent,
  ],
  entryComponents: [
    QuestModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    WebStorageModule,
    MarkdownModule.forRoot(),
    IonicModule.forRoot(),
    RouterModule.forRoot([{
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    }, {
      path: 'home',
      component: HomeComponent
    }, {
      path: 'search',
      component: SearchComponent
    }, {
      path: 'campaign',
      component: CampaignComponent,
      children: [{
        path: '',
        redirectTo: 'quests',
        pathMatch: 'full'
      }, {
        path: 'quests',
        component: QuestsComponent
      }]
    }])
  ],
  providers: [
    StatusBar,
    SplashScreen,
    StateService,
    DatabaseService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
