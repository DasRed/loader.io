# loader.io [![Build Status](https://travis-ci.com/DasRed/loader.io.svg?branch=master)](https://travis-ci.com/DasRed/loader.io) [![Coverage Status](https://coveralls.io/repos/github/DasRed/loader.io/badge.svg)](https://coveralls.io/github/DasRed/loader.io)

loader.io api wrapper for nodejs.


# Installation
```$ npm install loaderio```

# API

## get all applications
```javascript
import LoaderIO from './src/index.js';

try {
    const loaderIO = new LoaderIO('bb7cabe565ec0059b4fecbfa846b31ee');
    const applications = await loaderIO.applications.list();

    console.log(applications);
}
catch (error) {
    console.error(error.message);
}
```

## create an application
```javascript
import LoaderIO from './src/index.js';

try {
    const loaderIO = new LoaderIO('bb7cabe565ec0059b4fecbfa846b31ee');
    const application = await loaderIO.applications.create('xxx.xxx.de');

    console.log(application);
}
catch (error) {
    console.error(error.message);
}
```

## get an application
```javascript
import LoaderIO from './src/index.js';

try {
    const loaderIO = new LoaderIO('bb7cabe565ec0059b4fecbfa846b31ee');
    const application = await loaderIO.applications.get('fd929d9f1211a7721233c297e804406b');

    console.log(application);
}
catch (error) {
    console.error(error.message);
}
```

## delete an application
```javascript
import LoaderIO from './src/index.js';

try {
    const loaderIO = new LoaderIO('bb7cabe565ec0059b4fecbfa846b31ee');
    const application = await loaderIO.applications.get('fd929d9f1211a7721233c297e804406b');
    const result = await application.delete();

    console.log(result);
}
catch (error) {
    console.error(error.message);
}
```
## verify an application
```javascript
import LoaderIO from './src/index.js';

try {
    const loaderIO = new LoaderIO('bb7cabe565ec0059b4fecbfa846b31ee');
    const application = await loaderIO.applications.get('fd929d9f1211a7721233c297e804406b');
    const result = await application.verify();

    console.log(result);
}
catch (error) {
    console.error(error.message);
}
```

## get all tests
```javascript
import LoaderIO from './src/index.js';

try {
    const loaderIO = new LoaderIO('bb7cabe565ec0059b4fecbfa846b31ee');
    const tests = await loaderIO.tests.list();

    console.log(tests);
}
catch (error) {
    console.error(error.message);
}
```

## create a test
```javascript
import LoaderIO from './src/index.js';
import Test from './src/Tests/Test.js';

try {
    const loaderIO = new LoaderIO('bb7cabe565ec0059b4fecbfa846b31ee');
    const test = await loaderIO.tests.create({
        name:           'NPM Loader IO Test',
        type:           Test.TYPE.CLIENTS_PER_TEST,
        duration:       60,
        initial:        1,
        total:          15,
        callback_email: 'xxx@xxx.de',
        urls:           [{url: 'https://xxx.xxx.xx/api/v1/xxx'}]
    });

    console.log(test);
}
catch (error) {
    console.error(error.message);
}
```

## get a test
```javascript
import LoaderIO from './src/index.js';

try {
    const loaderIO = new LoaderIO('bb7cabe565ec0059b4fecbfa846b31ee');
    const test = await loaderIO.tests.get('9723cfd4ec75e536c3da09c52278a9eb');

    console.log(test);
}
catch (error) {
    console.error(error.message);
}
```


## start a test run
```javascript
import LoaderIO from './src/index.js';

try {
    const loaderIO = new LoaderIO('bb7cabe565ec0059b4fecbfa846b31ee');
    const test = await loaderIO.tests.get('9723cfd4ec75e536c3da09c52278a9eb');
    const result = await test.run();

    console.log(result);
}
catch (error) {
    console.error(error.message);
}
```

## stop a test run
```javascript
import LoaderIO from './src/index.js';

try {
    const loaderIO = new LoaderIO('bb7cabe565ec0059b4fecbfa846b31ee');
    const test = await loaderIO.tests.get('9723cfd4ec75e536c3da09c52278a9eb');
    const result = await test.stop();

    console.log(result);
}
catch (error) {
    console.error(error.message);
}
```

## get all results of a test 
```javascript
import LoaderIO from './src/index.js';

try {
    const loaderIO = new LoaderIO('bb7cabe565ec0059b4fecbfa846b31ee');
    const test = await loaderIO.tests.get('9723cfd4ec75e536c3da09c52278a9eb');
    const results = await loaderIO.tests.results.list();

    console.log(results);
}
catch (error) {
    console.error(error.message);
}
```

## get one result of a test 
```javascript
import LoaderIO from './src/index.js';

try {
    const loaderIO = new LoaderIO('bb7cabe565ec0059b4fecbfa846b31ee');
    const test = await loaderIO.tests.get('9723cfd4ec75e536c3da09c52278a9eb');
    const result = await loaderIO.tests.results.get('e2844894902937962f506c23ef60860c');

    console.log(result);
}
catch (error) {
    console.error(error.message);
}
```

## get all servers
```javascript
import LoaderIO from './src/index.js';

try {
    const loaderIO = new LoaderIO('bb7cabe565ec0059b4fecbfa846b31ee');
    const servers = await loaderIO.servers.list();

    console.log(servers);
}
catch (error) {
    console.error(error.message);
}
```
