'use strict';
var test = require("tape");

var isTravis = process.env.TRAVIS || false;

var isWin = /^win/.test(process.platform);
const psep = (isWin) ? "\\" : "/";
const baseUrl = "http://flyers-web.org/sharetc";
const basePath = __dirname+psep+".."+psep;

var username = process.env.SAUCE_USERNAME || "";
var access_key = process.env.SAUCE_ACCESS_KEY || "";
var capabilities = {};
capabilities["tunnel-identifier"] = process.env.TRAVIS_JOB_NUMBER
capabilities["build"] = process.env.TRAVIS_BUILD_NUMBER
var hub_url = username+":"+access_key+"@localhost:4445";

var assert = require('chai').assert;

var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;

if(isTravis) {
  var driver = new webdriver.Builder()
      .withCapabilities(capabilities)
      .forBrowser('firefox')
      .usingServer("http://"+hub_url+"/wd/hub")
      .build();

  var driver2 = new webdriver.Builder()
      .withCapabilities(capabilities)
      .forBrowser('firefox')
      .usingServer("http://"+hub_url+"/wd/hub")
      .build();
} else {
 var driver = new webdriver.Builder()
     .withCapabilities(capabilities)
     .forBrowser('firefox')
     .build();

 var driver2 = new webdriver.Builder()
     .withCapabilities(capabilities)
     .forBrowser('firefox')
     .build();
}

test('is form accessible', function (t) {

    var vKey = "";
    var vLink = "";

    driver.get(baseUrl+"/")
    .then(function(){
      return driver.findElement(By.id('archive'));
    })
    .then(function(element){
      var file = basePath+"Test_document_PDF.pdf";
      return element.sendKeys(file);
    })
    .then(function(){
      var d = webdriver.promise.defer();
      setTimeout(function(){
        d.fulfill( driver.findElement(By.id("key")) );
      },10000);
      return d.promise;
    })
    .then(function(element){
      return element.getAttribute("value");
    })
    .then(function(val){
      var d = webdriver.promise.defer();
      assert.isAtLeast(val.length, 1, "key was generated with at least one char");
      vKey = val;
      setTimeout(function(){
        d.fulfill( driver.findElement(By.id("link")) );
      },10000);
      return d.promise;
    })
    .then(function(link){
      return link.getAttribute("value");
    })
    .then(function(val){
      assert.isAtLeast(val.length, 1, "link was generated with at least one char");
      vLink = val;
      return driver.findElement(By.id('copy-btn'));
    })
    .then(function(){
      return driver2.get(vLink);
    })
    .then(function(){
      return driver2.findElement(By.id('key')).sendKeys(vKey);
    })
    .then(function(){
      return driver2.findElement(By.id('launch')).click()
    })
    .then(function(){
      var d = webdriver.promise.defer();
      setTimeout(function(){
        d.fulfill( driver2.findElement(By.id('resultinglink')) );
      }, 3000);
      return d.promise;
    })
    .then(function(link){
      return link.findElement(By.xpath(".//a")).getAttribute("href");
    })
    .then(function(val){
      assert.isAtLeast(val.length, 1, "link was generated with at least one char");
      return driver.quit();
    })
    .then(function(){
      return driver2.quit();
    })
    .then(function(){
      t.end();
    });

});
