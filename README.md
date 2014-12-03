ClientState JS Client
====================

Launch a clientstate-redis App from a clienstate-master instance,
then you can use this library to talk to Redis from a static webpage.

Installation
------------

    # TODO?
    bower install clientstate-js

Setup
-----

Create a Github app: https://github.com/settings/applications
If you are using clientstate.io, the OAuth callback url will be (TODO):

    https://<GITHUB_CLIENT_ID.clientstate.io/auth_callback/github

A [clientstate-master](https://github.com/ClientState/clientstate-master)
instance can be created anywhere, for instance, https://clientstate.local/
In that case, the OAuth callback url for the Github app will be:

    https://<GITHUB_CLIENT_ID.clientstate.local/auth_callback/github

Go to your clienstate-master instance (clientstate.local or clientstate.io)
and input you Github credentials in a new app and launch the service.

Usage
-----

    cs = new ClientState("GITHUB_CLIENT_ID", "clientstate.local");
    cs.github_auth_popup(function(err, provider_data) {
        // csr.access_token is now set to provider_data.access_token
    });

Once the auth_popup has comeback, `cs.access_token` will exist.
You can then make calls to the get and post methods to read and write data,
respectively.

    // get the value of the string, foobar
    cs.get("GET", "foobar", function(err, req) {
        console.log(req.responseText);
    })

    // write the value of the string, foobar, to "baz"
    cs.post("SET", "foobar", "baz", function(err, req) {
        console.log(req.responseText);
    })


Developing
----------

Install dependencies
____________________

    npm install
    bower install

Run the test suite
__________________

    grunt test
