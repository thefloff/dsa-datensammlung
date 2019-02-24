import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { NgxMdModule } from 'ngx-md';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './_shared/header/header.component';
import { SidebarComponent } from './_shared/sidebar/sidebar.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './start/start.component';
import { ShipsListComponent } from './ships-list/ships-list.component';
import { LocationsListComponent } from './locations-list/locations-list.component';
import { AdventuresListComponent } from './adventures-list/adventures-list.component';
import { CharacterComponent } from './character/character.component';
import { ShipComponent } from './ship/ship.component';
import { LoginFormComponent } from './_shared/login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterFormComponent } from './_shared/register-form/register-form.component';
import { DsaLinkComponent } from './_shared/dsa-link/dsa-link.component';
import { LocationComponent } from './location/location.component';
import { AdventureComponent } from './adventure/adventure.component';
import { InputBoxComponent } from './_shared/input-box/input-box.component';
import { ShipMovementViewComponent } from './_shared/ship-movement-view/ship-movement-view.component';
import { GroupComponent } from './group/group.component';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { PermissionsFormComponent } from './_shared/permissions-form/permissions-form.component';
import { EditEntryFormComponent } from './_shared/edit-entry-form/edit-entry-form.component';
import { LinkListBoxComponent } from './_shared/link-list-box/link-list-box.component';
import { DetailListBoxComponent } from './_shared/detail-list-box/detail-list-box.component';

const appRoutes: Routes = [
  { path: 'characters', component: CharacterListComponent },
  { path: 'characters/:id', component: CharacterComponent },
  { path: 'adventures', component: AdventuresListComponent },
  { path: 'adventures/:id', component: AdventureComponent },
  { path: 'ships', component: ShipsListComponent },
  { path: 'ships/:id', component: ShipComponent },
  { path: 'locations', component: LocationsListComponent },
  { path: 'locations/:id', component: LocationComponent },
  { path: 'start', component: StartComponent },
  { path: 'groups', component: GroupsListComponent },
  { path: 'groups/:id', component: GroupComponent },
  { path: '', component: StartComponent },
  { path: '**', component: StartComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    CharacterListComponent,
    StartComponent,
    ShipsListComponent,
    LocationsListComponent,
    AdventuresListComponent,
    CharacterComponent,
    ShipComponent,
    LoginFormComponent,
    RegisterFormComponent,
    DsaLinkComponent,
    LocationComponent,
    AdventureComponent,
    InputBoxComponent,
    ShipMovementViewComponent,
    GroupComponent,
    GroupsListComponent,
    PermissionsFormComponent,
    EditEntryFormComponent,
    LinkListBoxComponent,
    DetailListBoxComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    NgxMdModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginFormComponent,
    RegisterFormComponent,
    PermissionsFormComponent,
    EditEntryFormComponent,
  ]
})
export class AppModule { }
