import { Component, OnInit } from '@angular/core';
import { PeerRtcService } from '../peer-rtc.service';
import { LzStringService } from '../lz-string.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

function ab2str(buf: ArrayBuffer): string {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  peer: any = null;
  isConnected: boolean = false;
  isLoading: boolean = false;
  isLoaded: boolean = false;
  
  uploadedFile: ArrayBuffer;
  uploadedFileName: string;

  configForm = new FormGroup({
    sdp_sender: new FormControl(''),
    sdp_receiver: new FormControl('')
  });

  uploadForm = new FormGroup({
    file: new FormControl('')
  });

  constructor(
    private peerRtcService: PeerRtcService,
    private lzStringService: LzStringService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    console.log('UPLOAD COMPONENT');
    this.generateSdp();
  }

  generateSdp() {
    this.peer = this.peerRtcService.createInitiator();
    this.peer.on('signal', data => {
      console.log('INITIATOR GENERATED SIGNAL');
      console.log(data);

      const compressedData = this.lzStringService.compress(JSON.stringify(data));
      this.configForm.setValue({
        sdp_sender: compressedData,
        sdp_receiver: this.configForm.value.sdp_receiver
      });

      return data;
    });

    this.peer.on('connect', () => {
      this.isConnected = true;
    });

    this.peer.on('data', (data: ArrayBuffer) => {
      console.log('RECEIVED DATA')
      console.log(data)

      const dataString = ab2str(data);
      
      if( dataString === 'DATA RECEIVED' ) {
        this._snackBar.open("FILE HAS BEEN RECEIVED SUCCESSFULLY", "Done", {
          duration: 5000
        });
      }
    });
  }

  onFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0] as File;
      const reader = new FileReader();

      reader.onloadstart = (function (e: ProgressEvent) {
        this.isLoading = true;
      }).bind(this);

      reader.onloadend = (function (e: ProgressEvent) {
        const target = e.target as FileReader;
        if (target.readyState == FileReader.DONE) {
          const data = target.result;
          this.uploadedFile = data;
          this.uploadedFileName = file.name;
          this.isLoading = false;
          this.isLoaded = true;
        }
      }).bind(this);

      reader.onprogress = (function (e: ProgressEvent) {
        if (e.lengthComputable) {
          let percentLoaded = Math.round((e.loaded / e.total) * 100);
          this.progress = percentLoaded;
        }
      }).bind(this)

      reader.readAsArrayBuffer(file);
    }
  }

  onSubmitUpload() {
    if (this.isConnected) {
      this.peer.send(this.uploadedFile);
    }
  }

  onSubmitConnect() {
    console.log('SENDER SIGNAL');
    let sdp_receiver = this.configForm.value.sdp_receiver;
    sdp_receiver = this.lzStringService.decompress(sdp_receiver);

    console.log(sdp_receiver)
    this.peer.signal(JSON.parse(sdp_receiver));
  }

}
