import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'image-classification';

  model;
  loading: boolean;
  isVideo: boolean;
  imgSrc: string;
  @ViewChild('img') imageEl: ElementRef;
  @ViewChild('video') video: ElementRef;
  predictions: Prediction[];

  ngOnInit(){
    this.loading = true;
    console.log('loading mobilenet model...');
    tf.setBackend('cpu').then(async () => {
      this.model = await mobilenet.load();
    });
    console.log('Sucessfully loaded model');
    this.loading = false;
  }

  streamVideo(){
    this.isVideo = true;
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          this.video.nativeElement.srcObject = stream;
        })
        .catch((error) => {
          console.log('Something went wrong!');
        });
    }
    setInterval(async () => {
      this.predictions = await this.model.classify(this.video.nativeElement);
      await tf.nextFrame();
    }, 3000);
  }

  turnOffWebcam(){
    this.video.nativeElement.srcObject.getVideoTracks()[0].stop();
    this.isVideo = false;
  }

  fileChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (res: any) => {
        this.imgSrc = res.target.result;
        setTimeout(async () => {
          this.predictions = await this.model.classify(this.imageEl.nativeElement);
        });
      };
    }
  }
}

export interface Prediction {
  className: string;
  probability: number;
}