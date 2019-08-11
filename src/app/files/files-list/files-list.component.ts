import { Component, OnInit } from '@angular/core';
import { FileService } from '../../../app/services/file.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FileModel } from '../../../app/models/file.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.css']
})
export class FilesListComponent implements OnInit {

  fileModel: FileModel = new FileModel();
  $fileListSubscription: Subscription;
  $deleteTodoByIdSubscription: Subscription;

  constructor(
    private fileService: FileService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getFileList();
  }

  getFileList() {
    this.$fileListSubscription = this.fileService.getFileListData().subscribe(
      (result: FileModel) => {
        // console.log('result is', result);
        this.fileModel = result;
      },
      (err: HttpErrorResponse) => {
        console.log('error while fetching file list');
      }
    );
  }

  deleteToDoFromFile(id: number) {
    if (confirm('Are you sure you want to delete ' + id + '?')) {
      this.$deleteTodoByIdSubscription = this.fileService.deleteFileData(id).subscribe(
        (result: FileModel) => {
          // console.log('result is', result);
        },
        (err: HttpErrorResponse) => {
          console.log('error while fetching file list');
        }
      );
    } else {
      console.log('id is not available', id);
    }
  }

  updateToDoFromFile(id: string) {
    // console.log('id is', id);
    this.router.navigate(['file', 'update', 'file', id]);
  }

  ngOnDestroy(): void {
    if (this.$fileListSubscription) {
      this.$fileListSubscription.unsubscribe();
    }
    if (this.$deleteTodoByIdSubscription) {
      this.$deleteTodoByIdSubscription.unsubscribe();
    }
  }
}
