import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../../../app/services/file.service';
import { FileModel } from '../../../app/models/file.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-file',
  templateUrl: './create-file.component.html',
  styleUrls: ['./create-file.component.css']
})
export class CreateFileComponent implements OnInit {

  id: number;
  fileModel: FileModel = new FileModel();

  $createFileSubscription: Subscription;
  $getFileDataSubscription: Subscription;
  $updateFileSubscription: Subscription;

  constructor(
    private fileService: FileService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit() {
    if (this.id) {
      this.getFileData(this.id);
    } else {
      this.fileModel = new FileModel();
    }
  }

  getFileData(id: number) {
    this.$getFileDataSubscription = this.fileService.getFileDataById(id).subscribe(
      (result: FileModel) => {
        // console.log('result is', result);
        this.fileModel = result;
      },
      (err: HttpErrorResponse) => {
        console.log('error while fetching file list');
      }
    );
  }

  submit(data: any) {
    this.fileModel.to_do_list.push(data);
    if (this.id) {
      this.createFileData(this.fileModel);
    } else {
      this.updateFileData(this.fileModel);
    }
  }

  createFileData(fileModel: FileModel) {
    this.$createFileSubscription = this.fileService.createFileData(fileModel).subscribe(
      (result: FileModel) => {
        // console.log('result is', result);
        this.fileModel = result;
      },
      (err: HttpErrorResponse) => {
        console.log('error while fetching file list');
      }
    );
  }

  updateFileData(fileModel: FileModel) {
    this.$updateFileSubscription = this.fileService.updateFileData(fileModel).subscribe(
      (result: any) => {
        // console.log('result is', result);
        this.fileModel = result;
      },
      (err: HttpErrorResponse) => {
        console.log('error while fetching file list');
      }
    );
  }

  ngOnDestroy(): void {
    if (this.$createFileSubscription) {
      this.$createFileSubscription.unsubscribe();
    }
    if (this.$updateFileSubscription) {
      this.$updateFileSubscription.unsubscribe();
    }
    if (this.$getFileDataSubscription) {
      this.$getFileDataSubscription.unsubscribe();
    }
  }

}
