import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProtectedRoutingModule } from './protected-routing.module';
import { ProfilModule } from './profil/profil.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/core/interceptor/token.interceptor';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, ProtectedRoutingModule, ProfilModule, ReactiveFormsModule, SharedModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
})
export class ProtectedModule {}
