# static.phaninder.com [![Build Status](https://secure.travis-ci.org/pasupulaphani/static.phaninder.com.png?branch=master)](http://travis-ci.org/pasupulaphani/static.phaninder.com) [![Code Climate](https://codeclimate.com/github/pasupulaphani/static.phaninder.com/badges/gpa.svg)](https://codeclimate.com/github/pasupulaphani/static.phaninder.com) [![Test Coverage](https://codeclimate.com/github/pasupulaphani/static.phaninder.com/badges/coverage.svg)](https://codeclimate.com/github/pasupulaphani/static.phaninder.com)

> This is a web client application [phaninder.com](http://phaninder.com) for [api.phaninder.com](http://api.phaninder.com)

## Stack
###### Main dependencies
* [angular](http://angularjs.org/)
* [angular-socialsharing](http://pasupulaphani.github.io/angular-socialsharing)
* [angular-ui-router](http://angular-ui.github.io/ui-router/site/#/api/ui.router)

###### Tests dependencies
* [jasmine](http://pivotal.github.com/jasmine/)
* [Karma](http://karma-runner.github.io)

Requires [node.js](http://nodejs.org/), Karma (`sudo npm install -g karma`) and a local or remote browser.

#### Setting up:
```
npm install grunt-cli bower -g
npm install && bower install
grunt serve
```
#### Testing:
```
npm install -g karma
grunt test
```
#### Build:
```
grunt build
```