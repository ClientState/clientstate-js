# {assert} = require "chai"

fake_provider_data = {
  access_token: "fake-access-token"
}


beforeEach () ->
  window.OAuth = (() ->

    class MockOAuth

      @calledCounts: {
        initialize: 0
        setOAuthdURL: 0
        popup: 0
      }
      @calledWith: {
        initialize: []
        setOAuthdURL: []
        popup: []
      }

      @initialize: (clientid) ->
        @calledCounts.initialize += 1
        @calledWith.initialize.push arguments

      @setOAuthdURL: (address) ->
        @calledCounts.setOAuthdURL += 1

      @popup: (provider, cb) ->
        @calledCounts.popup += 1
        @calledWith.popup.push arguments
        if not @err?
          cb null, fake_provider_data
        else
          cb {
            stack: 'this is an error stack'
          }

    return MockOAuth
  )()


class MockXMLHttpRequest

  headers: {}

  setRequestHeader: (key, value) ->
    @headers[key] = value

  open: (method, url, bool) =>
    @responseText = "JSON DATA"
    @method = method
    @url = url

  send: (value) =>
    @value = value
    @onload()

window.XMLHttpRequest = MockXMLHttpRequest


describe 'Call ClientStateRedis.auth_popup', () ->
  it 'calls OAuth appropriately', (done) ->
    csr = new ClientStateRedis("uuid", "http://localhost:4444")
    csr.auth_popup "github", "github-client-id", (err, provider_data) ->
      chai.assert.equal provider_data.access_token, "fake-access-token"
      chai.assert.equal OAuth.calledCounts.initialize, 1
      done()

  it 'handles no callback case', (done) ->
    chai.assert.equal OAuth.calledCounts.initialize, 0
    csr = new ClientStateRedis("uuid", "http://localhost:4444")
    # TODO: promisify and assert
    csr.auth_popup "github", "github-client-id"
    done()

  it 'handles error from popup', (done) ->
    OAuth.err = true
    csr = new ClientStateRedis("uuid", "http://localhost:4444")
    csr.auth_popup "github", "clientid", (err, provider_data) ->
      chai.assert.equal err.stack, "this is an error stack"
      done()


describe 'ClientStateRedis.get method', () ->
  # command, key, callback
  it 'calls JSONP with correct url and gets back data with 3 arguments', (done) ->
    csr = new ClientStateRedis("uuid", "http://localhost:4444")
    csr.auth_popup "github", "client-id", (err, provider_data) ->
      csr.get "GET", "foobar", (err, req) ->
        chai.assert.equal req.responseText, "JSON DATA"
        chai.assert.equal(
          req.url, 'http://localhost:4444/GET/foobar'
        )
        done()

  it 'calls opens request with correct url with lrange and args', (done) ->
    csr = new ClientStateRedis("uuid", "http://localhost:4444")
    csr.auth_popup "github", "client-id", (err, provider_data) ->
      csr.get "lrange", "foobar", [0, 1], (err, req) ->
        chai.assert.equal(
          req.url, 'http://localhost:4444/lrange/foobar?args=0,1'
        )
        done()


describe 'ClientStateRedis.post method', () ->
  it 'opens request and makes callback with 4 arguments', (done) ->
    csr = new ClientStateRedis("uuid", "http://localhost:4444")
    csr.auth_popup "github", "client-id", (err, provider_data) ->
      csr.post "command", "key", "value", (err, req) ->
        chai.assert.equal(req.url, 'http://localhost:4444/command/key')
        done()

  it 'opens request and makes callback with 5 arguments', (done) ->
    csr = new ClientStateRedis("uuid", "http://localhost:4444")
    csr.auth_popup "github", "client-id", (err, provider_data) ->
      csr.post "command", "key", "value", ["arg1", "arg2"], (err, req) ->
        chai.assert.equal(req.url, 'http://localhost:4444/command/key?args=arg1,arg2')
        done()


