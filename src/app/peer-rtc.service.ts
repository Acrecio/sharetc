import { Injectable } from '@angular/core';
import SimplePeer from 'simple-peer';

@Injectable({
  providedIn: 'root'
})
export class PeerRtcService {

  constructor() { }

  createInitiator() {
    const peer = new SimplePeer({ initiator: true, trickle: false });
    return peer;
  }

  createReceiver() {
    const peer = new SimplePeer({ trickle: false });
    return peer;
  }
}
