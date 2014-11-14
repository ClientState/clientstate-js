class ClientState

  constructor: (@serviceid, @address="http://api.clientstate.io") ->
    # @serviceid is the uuid given by the clientstate-master
    # instance given by the optional @address argument

  auth_popup: (@provider, @clientid, cb) ->
    # cb should have signature (err, provider_data)
    # @access_token will be populated after successful OAuth
    # TODO - cache in localStorage? logout?

    if arguments.length is 2
      # default callback for debugging
      cb = (err, provider_data) ->
        console.log arguments

    OAuth.initialize @clientid
    OAuth.setOAuthdURL @address
    self = this
    OAuth.popup provider, (err, provider_data) ->
      if err?
        cb err
        return
      self.access_token = provider_data.access_token
      cb null, provider_data
    return


class ClientStateRedis extends ClientState

  make_request: () ->
    request = new XMLHttpRequest()
    request.setRequestHeader("access_token", @access_token)
    request.setRequestHeader("provider", @provider)
    request.setRequestHeader("serviceid", @serviceid)
    return request

  get: () ->
    if arguments.length is 3
      [command, key, cb] = arguments
    if arguments.length is 4
      # args must be an array
      [command, key, args, cb] = arguments

    request = @make_request()
    url = "#{@address}/#{command}/#{key}"
    if args isnt undefined
      url += "?args=#{args.join ','}"
    request.open 'GET', url, true
    request.onload = (e) ->
      cb null, request
    request.send()

  post: () ->
    # must supply callback as last arg
    if arguments.length is 4
      [command, key, value, cb] = arguments
    if arguments.length is 5
      [command, key, value, args, cb] = arguments

    request = @make_request()
    url = "#{@address}/#{command}/#{key}"
    if args isnt undefined
      url += "?args=#{args.join ','}"
    request.open 'POST', url, true
    request.onload = (e) ->
      cb null, request
    request.send value

window.ClientStateRedis = ClientStateRedis
