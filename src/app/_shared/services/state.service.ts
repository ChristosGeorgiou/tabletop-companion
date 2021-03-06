import { Injectable } from '@angular/core';
import { LocalStorage } from 'ngx-store';
import { BehaviorSubject } from 'rxjs';
import { CampaignData, Preferences as CampaignPrefs, Preferences } from './models.all';

@Injectable()
export class StateService {

  constructor() { }

  @LocalStorage() last = '';
  @LocalStorage() campaigns: { [key: string]: CampaignPrefs } = {};

  campaign$: BehaviorSubject<CampaignData & Preferences> = new BehaviorSubject<CampaignData & Preferences>(null);
  active$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  loadCampaign(campaign: string) {
    if (!this.campaigns[campaign]) {
      this.campaigns[campaign] = {
        isMaster: false
      };
    }
    this.activate(campaign);
  }

  activate(campaign: string) {
    console.log('activating', campaign);
    this.last = campaign;
    this.active$.next(campaign);
    const _campaign = this._load(campaign);
    this.campaign$.next(_campaign);
  }

  updatePrefs(prefs: CampaignPrefs, campaign?: string) {
    const campaignName = campaign || this.last;
    const _campaigns = { ...this.campaigns };
    _campaigns[campaignName] = { ..._campaigns[campaignName], ...prefs };
    this.campaigns = _campaigns;
    const _campaign = this._load(campaignName);
    console.log('new config', prefs, _campaign);
    this.campaign$.next(_campaign);
  }

  private _load(campaign): CampaignData & Preferences {
    const _campaign: CampaignData = {
      title: campaign
    };
    const _prefs = this.campaigns[campaign];
    return { ..._campaign, ..._prefs };
  }
}
