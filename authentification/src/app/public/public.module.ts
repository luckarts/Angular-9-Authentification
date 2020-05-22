import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PublicRoutingModule } from './public-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [CommonModule, PublicRoutingModule, ReactiveFormsModule, SharedModule],
})
export class PublicModule {}
