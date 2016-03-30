'use strict';
var test = require("tape");

var isWin = /^win/.test(process.platform);
const psep = (isWin) ? "\\" : "/";
const baseUrl = "https://flyersweb.github.com/sharetc";
const basePath = __dirname+psep+".."+psep+".."+psep;

username = os.environ["SAUCE_USERNAME"]
access_key = os.environ["SAUCE_ACCESS_KEY"]
capabilities["tunnel-identifier"] = os.environ["TRAVIS_JOB_NUMBER"]
capabilities["build"] = os.environ["TRAVIS_BUILD_NUMBER"]
capabilities["tags"] = [os.environ["TRAVIS_PYTHON_VERSION"], "CI"]
hub_url = "%s:%s@localhost:4445" % (username, access_key)

var assert = require('chai').assert;

var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;

// var driver = new webdriver.Builder()
//     .forBrowser('firefox')
//     .build();

var driver = webdriver.Remote(desired_capabilities=capabilities, command_executor="http://%s/wd/hub" % hub_url);

// var driver2 = new webdriver.Builder()
//     .forBrowser('firefox')
//     .build();

var driver2 = webdriver.Remote(desired_capabilities=capabilities, command_executor="http://%s/wd/hub" % hub_url);

test('is form accessible', function (t) {

    var vKey = "";
    var vLink = "";

    driver.get(baseUrl+"/index.html")
    .then(function(){
      return driver.findElement(By.id('archive'));
    })
    .then(function(element){
      return element.sendKeys(basePath+psep+"Test_document_PDF.pdf");
    })
    .then(function(){
      return driver.findElement(By.id("key"));
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
      },3000);
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
      return driver2.get(baseUrl+vLink);
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
