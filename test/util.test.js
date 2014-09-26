var assert = require('assert');
var Promise = require('promise');
var util = require('../lib/util');

describe('util', function() {

  it('should check whether an object is a Promise using ducktyping', function () {
    assert.equal(util.isPromise({}), false);
    assert.equal(util.isPromise('promise'), false);
    var obj = {
      'then': 'foo',
      'catch': 'bar'
    };
    assert.equal(util.isPromise(obj), false);

    assert.equal(util.isPromise(new Promise(function() {})), true);
    assert.equal(util.isPromise(Promise.resolve()), true);
    assert.equal(util.isPromise(Promise.reject()), true);

    var myPromise = {
      'then': function() {},
      'catch': function() {}
    };
    assert.equal(util.isPromise(myPromise), true);
  });

  it('should parse an url', function () {
    assert.deepEqual(util.parseUrl('http://example.com/path'),      {protocol: 'http', domain: 'example.com', path: 'path'});
    assert.deepEqual(util.parseUrl('http://example.com/some/path'), {protocol: 'http', domain: 'example.com', path: 'some/path'});
    assert.deepEqual(util.parseUrl('https://example.com/'),         {protocol: 'https', domain: 'example.com', path: ''});
    assert.deepEqual(util.parseUrl('a://b/c'),                      {protocol: 'a', domain: 'b', path: 'c'});
  });

  it ('should normalize an url', function () {
    assert.equal(util.normalizeURL('http://foo.com/bar'), 'http://foo.com/bar');
    assert.equal(util.normalizeURL('http://foo.com/bar/'), 'http://foo.com/bar');
    assert.equal(util.normalizeURL('http://foo.com/'), 'http://foo.com');
  });

});
