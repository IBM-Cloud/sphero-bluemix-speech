# Speech to Text plus MQTT for IoT Demos

This project is an extension of the [Watson Speech to Text Browser Application](https://github.com/watson-developer-cloud/speech-to-text-nodejs) to send received text via MQTT so that this data can be used in Node-RED flows.

In order to set up the application follow the original readme below. The only extra step is to set up MQTT.

Log in to Bluemix and create a new application based on the [Internet of Things Foundation Starter](https://console.ng.bluemix.net/catalog/starters/internet-of-things-foundation-starter/). Additionally add the [Internet of Things](https://console.ng.bluemix.net/catalog/services/internet-of-things-foundation/) service to it.

In the next step you have to register your own device. Open the dashboard of the Internet of Things service and navigate to 'Add Device'. As device type choose 'watson' and an unique device id, for example 'speech'. As result you'll get an org id and password.

Paste this information in app.js:
- deviceId
- deviceType
- apiToken
- orgId

Only the files app.js, src/views/displaymetadata.js, package.json, views/index.ejs and README.md have been modified from the orginial project. 

The following text is the description from the original project.


# Speech to Text Browser Application

  The [Speech to Text][service_url] service uses IBM's speech recognition capabilities to convert speech in multiple languages into text. The transcription of incoming audio is continuously sent back to the client with minimal delay, and it is corrected as more speech is heard. The service is accessed via a WebSocket interface; a REST HTTP interface is also available;

Node.js is also used to provide the browser client's authentication token.

Give it a try! Click the button below to fork into IBM DevOps Services and deploy your own copy of this application on Bluemix.

[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/watson-developer-cloud/speech-to-text-nodejs)

## Getting Started

1. Create a Bluemix Account

    [Sign up][sign_up] in Bluemix, or use an existing account. Watson Services in Beta are free to use.

2. Download and install the [Cloud-foundry CLI][cloud_foundry] tool

3. Edit the `manifest.yml` file and change the `<application-name>` to something unique.
  ```none
  applications:
  - services:
    - speech-to-text-service-standard
    name: <application-name>
    command: node app.js
    path: .
    memory: 512M
  ```
  The name you use will determinate your application url initially, e.g. `<application-name>.mybluemix.net`.

4. Install [Node.js](http://nodejs.org/)

5. Install project dependencies and build browser application:
  ```sh
  $ npm install && npm run build
  ```

6. Connect to Bluemix in the command line tool.
  ```sh
  $ cf api https://api.ng.bluemix.net
  $ cf login -u <your user ID>
  ```

7. Create the Speech to Text service in Bluemix.
  ```sh
  $ cf create-service speech_to_text standard speech-to-text-service-standard
  ```

8. Push it live!
  ```sh
  $ cf push
  ```

See the full [Getting Started][getting_started] documentation for more details, including code snippets and references.

## Running locally

  The application uses [Node.js](http://nodejs.org/) and [npm](https://www.npmjs.com/) so you will have to download and install them as part of the steps below.

1. Copy the credentials from your `speech-to-text-service-standard` service in Bluemix to `app.js`, you can see the credentials using:

    ```sh
    $ cf env <application-name>
    ```
    Example output:
    ```sh
    System-Provided:
    {
    "VCAP_SERVICES": {
      "speech_to_text": [{
          "credentials": {
            "url": "<url>",
            "password": "<password>",
            "username": "<username>"
          },
        "label": "speech-to-text",
        "name": "speech-to-text-service-standard",
        "plan": "standard"
     }]
    }
    }
    ```

    You need to copy `username`, `password` and `url`. Then you need to pass those values in app.js

    ```
    var config = {
      version: 'v1',
      url: 'https://stream.watsonplatform.net/speech-to-text/api',
      username: '<username>',
      password: '<password>'  
    };
    ```

2. Install [Node.js](http://nodejs.org/)

3. To install project dependencies, go to the project folder in a terminal and run:
    ```sh
    $ npm install
    ```

4. Then, build the browser application using [Browserify][browserify]:
    ```sh
    $ npm run build
    ```

5. Start the application:
    ```sh
    $ node app.js
    ```

6. Go to: [http://localhost:3000](http://localhost:3000)

## Troubleshooting

To troubleshoot your Bluemix app the main useful source of information are the logs, to see them, run:

  ```sh
  $ cf logs <application-name> --recent
  ```

For problems with recording audio, you can play back the audio you just recorded for debugging purposes.
To do that, add '?debug=true' (without the quotations) in the URL.

## License

  This sample code is licensed under Apache 2.0. Full license text is available in [LICENSE](LICENSE).

## Contributing

  See [CONTRIBUTING](CONTRIBUTING.md).

## Open Source @ IBM
  Find more open source projects on the [IBM Github Page](http://ibm.github.io/)

[service_url]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/speech-to-text.html
[cloud_foundry]: https://github.com/cloudfoundry/cli
[getting_started]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/getting_started/
[sign_up]: https://console.ng.bluemix.net/registration/
[browserify]: http://browserify.org/
