# ShareTC

*share your file encrypted without server*

## Demonstration

The browser uploading file should be the same as the one receiving file. Upload and share the encryption key.

**[See the demo](https://flyersweb.github.io/sharetc)**

## To install:
(assuming you have [node](http://nodejs.org/) and NPM installed)

```
npm install
gulp
```

## To run tests:

Careful, it will run on **[demo website](https://flyersweb.github.io/sharetc)**.

```
npm test
```

## Using Docker :

```
docker build -t sharetc .
docker run -d -p 127.0.0.1:80:3000 sharetc
```

## Feedbacks

If you like this service and want to integrate more functionalities [contact me](contact@flyers-web.org). 
