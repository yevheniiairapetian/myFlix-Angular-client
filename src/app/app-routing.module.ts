import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule, // Add HttpClientModule to the imports array
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
