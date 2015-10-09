Gohan Web UI
============

Web UI project for Gohan project
(https://github.com/cloudwan/gohan)

[![Join the chat at https://gitter.im/cloudwan/gohan](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/cloudwan/gohan?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Getting started
------------------------------------

See getting started in Gohan

https://github.com/cloudwan/gohan

Setup development environment
------------------------------------

- Run gohan
- Install compass
```
    $ gem install compass
```
- Install karma
```
    $ npm install -g karma
```
- Install webpack
```
    $ npm install -g webpack webpack-dev-server
```
- Install jscs
```
    $ npm install -g jscs
```
- Install all npm dependencies
```
    $ npm install
```
- Install all bower dependencies
```
    $ bower install
```
- Copy configurations files
```
    $ cp app/config.json.sample app/config.json
```
- Build application for development
```
    $ npm run build-dev
```
- Start dev server with auto refresh
```
    $ npm run dev-server
```
- Start dev server with auto refresh and options  
<https://webpack.github.io/docs/webpack-dev-server.html#webpack-dev-server-cli>

```
    $ npm run dev-server -- --host 0.0.0.0 --https
```
- Start dev server with inline mode
```
    $ npm run dev-server-inline
```
 Server starts on 
```
    http://localhost:8080/webpack-dev-server/
```
- Start test dev server with auto refresh
```
    $ npm run test-dev-server
```
 Server starts on 
```
    http://localhost:8081/webpack-dev-server/
```
- Start tests
```
    $ npm run test
```
- Build application for production
```
    $ npm run build
```