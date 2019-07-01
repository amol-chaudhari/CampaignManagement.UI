import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { routerTransition } from '../../router.animations';
import { VideoService } from '../../shared/services/video.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Video } from '../../shared/models/video.model';
import { debug } from 'util';

@Component({
    selector: 'app-videos',
    templateUrl: './videos.component.html',
    styleUrls: ['./videos.component.scss'],
    animations: [routerTransition()]
})
export class VideosComponent implements OnInit {
    video: Video;
    videos: Video[];
    modalRef: any;
    fileToUpload: File = null;

    constructor(private videoService: VideoService,
        private activeModal: NgbActiveModal,
        private modalService: NgbModal) { 
    }

    ngOnInit() {
        this.loadVideos();
        this.resetForm();
    }

    loadVideos(){
        this.videoService.getVideos().subscribe(videos => { this.videos = videos; });
    }

    resetForm(form?: NgForm) {
        if (form != null)
        form.reset();
        this.video = {
        VideoId: 0,
        VideoName: '',
        FileName: '',
        VideoPath: '',
        VideoLength: 0,
        Active: false
        }
    }
    
    closeModal() {
        this.modalRef.close('Modal Closed');
    }

    openFormModal(content) {
        this.modalRef = this.modalService.open(content, {size: 'lg'});
        
        this.modalRef.result.then((result) => {
        console.log(result);
        }).catch((error) => {
        console.log(error);
        });
    }

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
    }

    addVideo(content) {
        this.resetForm();
        this.openFormModal(content);
    }

    editVideo(videoId: number, content) {
        this.video = this.videos.filter(x => x.VideoId == videoId)[0];
        this.openFormModal(content);
    }

    OnSubmit(form: NgForm) {
        this.modalRef.close('modal closed');
        if(this.video.VideoId > 0)
        {
            this.videoService.updateVideo(this.video.VideoId, this.video)
            .subscribe((data: any) => {
                if (data == true) {
                    this.resetForm(form);
                    this.loadVideos();
                }
            });
        }
        else
        {
            this.videoService.postFile(this.fileToUpload).subscribe(data =>
                {
                    if (data.Response == true) {
                            this.video.FileName = data.FileName;
                            this.video.VideoPath = "assets/" + data.FileName;
                            this.videoService.createVideo(this.video)
                            .subscribe((data: any) => {
                                if (data == true) {
                                    this.resetForm(form);
                                    this.loadVideos();
                                }
                            });
                        }
                }, error => { console.log(error); });
        }
    }
}