# ShareTC [![Build Status](https://travis-ci.org/FlyersWeb/sharetc.svg?branch=master)](https://travis-ci.org/FlyersWeb/sharetc)

*share your file securely without server*

## Introduction

This project demonstrate how to securely share files using WebRTC whithout any server (not even a signal server). WebRTC will send your file through a secured communication channel but for it to know to whom you'll send the file, you need to share your generated configuration with receiver.

## Demonstration

The sender and the recipient should use different browsers for this demo to make sense.

**[See the demo](https://flyersweb.github.io/sharetc)**

## To install:

(assuming you have [node](http://nodejs.org/) and NPM installed)

```
npm install
ng serve
```

## To run tests:

```
npm run test
```

## How it works ?

We generate the configuration when loading the pages. You need to share it with recipient so it can connect. Then you need to enter recipient configuration too and connect. When connected you can begin file sharing. Configuration is compressed using lz-string algorithme.

## Buy me a coffe

[![Buy me a coffee](https://raw.githubusercontent.com/FlyersWeb/sharetc/master/buy-me-a-coffee.png)](https://paypal.me/nac1dbois)

I'm working on this project in my free time and offering it free of charges. To help me work more on this you can send me tips to buy more coffee :)

## License

This software is under MIT License. It comes without any warranty, to the extent permitted by applicable law.

