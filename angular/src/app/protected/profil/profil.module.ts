import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from './edit-profile/';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [EditProfileComponent],
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
})
export class ProfilModule {}
