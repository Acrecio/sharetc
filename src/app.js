'use strict';

const config = require("./config");
const crel = require("crel");

const DEBUG = true;

const opts = {
  accept: false,
  readAsDefault : 'ArrayBuffer',
  on : {
    progress (e, file) {
      if(DEBUG) console.log("progress")
      let progressbar = document.getElementById("progress");
      if(e.lengthComputable) {
        let total = e.total;
        let loaded = e.loaded;
        let percent = (loaded*100)/total;
        if(DEBUG) console.log(percent)
        progressbar.style.width = percent+"%";
      }
    },
    loadstart (e, file) {
      if(DEBUG) console.log("loadstart")
    },
    load (e, file) {
      if(DEBUG) console.log("loaded")

      const blob = e.target.result;
      const vrdm = window.crypto.getRandomValues(new Uint8Array(12));

      // @TODO find a way to remove this ugly global
      let key;

      // @TODO first encrypt try
      window.crypto.subtle.generateKey(
        {
          name: "AES-GCM",
          length: 256
        },
        true,
        ["encrypt","decrypt"]
      )
      .then(function(k){
        if(DEBUG) console.log("generateKey")
        key = k;

        return window.crypto.subtle.exportKey(
          "jwk",
          key
        )
      })
      .then(function(keyData){
        document.getElementById("key").value = keyData.k;
        document.getElementById("key").style.display = 'block';

        return window.crypto.subtle.encrypt(
          {
            name: "AES-GCM",
            iv: vrdm,
            tagLength: 128
          },
          key,
          blob
        )
      })
      .then(function(encrypted){
        if(DEBUG) console.log("encrypted")

        return new Promise(function(resolve, reject){

          const peer = new Peer({key: config.apiKey, debug: 3});
          peer.on('open', function(id) {
            if(DEBUG) console.log('My peer ID is: ' + id);

            crel(document.getElementById("link"), {'value': window.location.href+'uploaded.html#'+id});
            document.getElementById("displayLink").style.display = 'block';

            peer.on('connection', function(conn){
              if(DEBUG) console.log("connected")

              conn.on('open', function() {
                if(DEBUG) console.log("opened")
                conn.send({'iv':vrdm, 'encrypted':encrypted});
                resolve(peer);
              });

              conn.on('error', function(err){
                // @TODO manage peer connection error
                if(DEBUG) console.log(err)
                reject(err);
              })
            });

            peer.on('error', function(err){
              // @TODO manage peer error
              if(DEBUG) console.log(err);
              reject(err);
            });
          });
        });
      })
      // @TODO add close connection after successful send
      .catch(function(err){
        if(DEBUG) console.log(err);
        throw err;
      });
    },
    error (e, file) {
      // @TODO manage upload error
      if(DEBUG) console.log(e,file);
      throw e;
    }
  }
}



document.addEventListener("DOMContentLoaded", function() {

  var clipboard = new Clipboard('#copy-btn');

  FileReaderJS.setupInput(document.getElementById("archive"), opts);

});
