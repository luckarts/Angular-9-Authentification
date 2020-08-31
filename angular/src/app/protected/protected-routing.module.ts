import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from '../core/guards/user.guard';
import { HomeComponent } from './home/home.component';
import { UserResolverService } from '../core/services/auth/user-resolver.service';
import { EditProfileComponent } from './profil/edit-profile/edit-profile.component';
const routes: Routes = [
  {
    path: 'profile/edit',
    component: EditProfileComponent,
    canActivate: [UserGuard],
    resolve: {
      user: UserResolverService,
    },
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [UserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProtectedRoutingModule {}
