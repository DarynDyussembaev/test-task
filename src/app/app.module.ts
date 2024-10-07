import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MetalDetectorComponent } from './components/metal-detector/metal-detector.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { StoreModule } from '@ngrx/store';
import { metalDetectorReducer, metalDetectorFeatureKey } from './store/metal-detector.reducers';
import {EffectsModule} from '@ngrx/effects';
import { MetalDetectorEffects } from './store/metal-detector.effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {AsyncPipe} from "@angular/common";
import {ToastModule} from "primeng/toast";
import {ConfirmationService, MessageService} from "primeng/api";
import { CreateEditMetaldetectorsComponent } from './components/create-edit-metaldetectors/create-edit-metaldetectors.component';
import {DialogModule} from "primeng/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { InputTextModule } from 'primeng/inputtext';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef} from "primeng/dynamicdialog";
import {DropdownModule} from "primeng/dropdown";
import {LanguageService} from "./services/language.service";
import {LanguageInterceptor} from "./services/LanguageInterceptor";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    MetalDetectorComponent,
    CreateEditMetaldetectorsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AsyncPipe,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ButtonModule,
    TableModule,
    ToastModule,
    InputTextModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    StoreModule.forRoot(
      {[metalDetectorFeatureKey]: metalDetectorReducer},
    ),
    EffectsModule.forRoot([MetalDetectorEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
  ],
  providers: [
    DialogService,
    DynamicDialogRef,
    DynamicDialogConfig,
    MessageService,
    ConfirmationService,
    LanguageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LanguageInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

