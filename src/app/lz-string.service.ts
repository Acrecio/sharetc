import { Injectable } from '@angular/core';

import lzString from 'lz-string';

@Injectable({
  providedIn: 'root'
})
export class LzStringService {

  constructor() { }

  compress(data: string): string {
    return lzString.compressToEncodedURIComponent(data);
  }

  decompress(data: string): string {
    return lzString.decompressFromEncodedURIComponent(data);
  }
}
