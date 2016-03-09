'use strict';

const config = require("./config");
const crel = require("crel");

const DEBUG = true;

const callback = function(e) {
  const ikey = document.getElementById("key");
  if(ikey.value.length <= 0) return;

  const vkey = ikey.value;

  const cryptoKey = {
    alg: "A256GCM",
    ext: true,
    k: vkey,
    kty: "oct"
  };

  const url = window.location.href;
  const idx = url.indexOf("#");
  const hash = idx != -1 ? url.substring(idx+1) : "";

  let peer = new Peer({key: config.apiKey, debug: 3});
  let conn = peer.connect(hash);
  conn.on('data', function(data) {
    if(DEBUG) console.log("receiving");

    const vrdm = data.iv;
    const encrypted = data.encrypted;

    window.crypto.subtle.importKey(
        "jwk",
        cryptoKey,
        { name: "AES-GCM" },
        false,
        ["encrypt", "decrypt"]
    )
    .then(function(key){
      if(DEBUG) console.log("importKey")
      if(DEBUG) console.log(key)

      return window.crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv: vrdm,
          tagLength: 128,
        },
        key,
        encrypted
      )
    })
    .then(function(decrypted){
      if(DEBUG) console.log("decrypted")

      const blob = new Blob([decrypted], {type: 'application/octet-binary'});
      const url = URL.createObjectURL(blob);
      crel( document.getElementById("resultinglink"),
        crel('a',{'href':url,'download':'document.pdf'},"Download me")
      );

      conn.close();
    })
    .catch(function(err){
      // @TODO manage importKey error
      console.log(err)
      throw err;
    })
  });

  conn.on('err',function(err){
    // @TODO manage peer connection error
    console.log(err)
    throw err;
  })

};

const ilaunch = document.getElementById("launch");
ilaunch.addEventListener("click", callback);
