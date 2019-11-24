import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PeerRtcService } from '../peer-rtc.service';
import { LzStringService } from '../lz-string.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {
  peer: any = null;
  isConnected: boolean = false;
  configForm = new FormGroup({
    sdp_sender: new FormControl(''),
    sdp_receiver: new FormControl('')
  });

  constructor(
    private peerRtcService: PeerRtcService,
    private lzStringService: LzStringService,
  ) { }

  ngOnInit() {
    console.log('DOWNLOAD COMPONENT');
    this.generateSdp();
  }

  generateSdp() {
    this.peer = this.peerRtcService.createReceiver();
    this.peer.on('signal', data => {
      console.log('RECEIVER GENERATED SIGNAL');
      console.log(data);

      const compressedData = this.lzStringService.compress(JSON.stringify(data));
      this.configForm.setValue({
        sdp_receiver: compressedData,
        sdp_sender: this.configForm.value.sdp_sender
      });

      return data;
    });

    this.peer.on('connect', () => {
      this.isConnected = true;
    });

    this.peer.on('data', (data: ArrayBuffer) => {
      console.log('RECEIVED DATA');

      const blob = new Blob([data]);

      const link = document.createElement('a');
      // Browsers that support HTML5 download attribute
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'file.dat');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      this.peer.send('DATA RECEIVED');
    });
  }

  onSubmitConnect() {
    console.log('RECEIVER SIGNAL');
    let sdp_sender = this.configForm.value.sdp_sender;
    sdp_sender = this.lzStringService.decompress(sdp_sender);

    this.peer.signal(JSON.parse(sdp_sender));
  }

}
