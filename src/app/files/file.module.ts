import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesListComponent } from './files-list/files-list.component';
import { RouterModule, Routes } from '@angular/router';
import { CreateFileComponent } from './create-file/create-file.component';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: 'update/file/:id',
    component: CreateFileComponent
  },
  {
    path: 'create/file',
    component: CreateFileComponent
  },
  {
    path: 'file-list',
    component: FilesListComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    FilesListComponent,
    CreateFileComponent],
  exports: [RouterModule]
})
export class FileModule { }
