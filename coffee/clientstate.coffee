class ClientState

  constructor: (@appid, @host="clientstate.io") ->
    # @appid is the uuid given by the clientstate-master instance
    # running at the optional @host argument
    # https required
    @address = "https://#{@appid}.#{@host}"

  github_auth_popup: (cb) ->
    # support other providers later with different clientids
    # for, now only github and the appid is the clientid
    @auth_popup "github", @appid, cb

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

  # redis
  #######

  make_request: (method, url, cb) ->
    request = new XMLHttpRequest()
    request.open(method, url)
    request.setRequestHeader("access_token", @access_token)
    request.setRequestHeader("provider", @provider)

    request.onload = (e) ->
      cb null, request
    return request

  get: () ->
    if arguments.length is 3
      [command, key, cb] = arguments
    if arguments.length is 4
      # args must be an array
      [command, key, args, cb] = arguments

    url = "#{@address}/#{command}/#{key}"
    if args isnt undefined
      url += "?args=#{args.join ','}"
    request = @make_request "GET", url, cb
    request.send()

  post: () ->
    # must supply callback as last arg
    if arguments.length is 4
      [command, key, value, cb] = arguments
    if arguments.length is 5
      [command, key, value, args, cb] = arguments

    url = "#{@address}/#{command}/#{key}"
    if args isnt undefined
      url += "?args=#{args.join ','}"
    request = @make_request 'POST', url, cb
    request.send(value)

window.ClientState = ClientState
