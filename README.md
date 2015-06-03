sphero-bluemix-speech
================================================================================

This [project](https://github.com/IBM-Bluemix/sphero-bluemix-speech) is a simple sample that shows how to use the Watson [Speech to Text](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/speech-to-text.html) service in [IBM Bluemix](https://bluemix.net) to steer a [Sphero](http://www.gosphero.com/sphero/) ball. The [web application](https://raw.githubusercontent.com/IBM-Bluemix/sphero-bluemix-speech/master/images/app.png) in this project is an extension to the projects [sphero-bluemix-android](https://github.com/IBM-Bluemix/sphero-bluemix-android) and [sphero-bluemix-ios](https://github.com/IBM-Bluemix/sphero-bluemix-ios) which contain the mobile apps that communicate with the ball.

The [Watson Speech to Text](https://github.com/watson-developer-cloud/speech-to-text-nodejs) Node.js sample has been extended to send the spoken words as text via the [MQTT](http://mqtt.org) protocol to the [IBM Internet of Things](https://console.ng.bluemix.net/?ace_base=true#/store/serviceOfferingGuid=8e3a9040-7ce8-4022-a36b-47f836d2b83e&fromCatalog=true) service. A Node-RED flow is used to receive the spoken words and to trigger the specific flows.

![alt text](https://raw.githubusercontent.com/IBM-Bluemix/sphero-bluemix-speech/master/images/flow.png "Flow")

Authors: Mark VanderWiele, Bryan Boyd


Setup of the Node-RED Flow
================================================================================

In order to send commands to the mobile app a Node-RED flow in IBM Bluemix is used in combination with the IBM Internet of Things Foundation. 

Log in to Bluemix and create a new application, e.g. MySphero, based on the [Internet of Things Foundation Starter](https://console.ng.bluemix.net/?ace_base=true#/store/appType=web&cloudOEPaneId=store&appTemplateGuid=iot-template&fromCatalog=true). Additionally add the [Internet of Things](https://console.ng.bluemix.net/?ace_base=true#/store/serviceOfferingGuid=8e3a9040-7ce8-4022-a36b-47f836d2b83e&fromCatalog=true) service to it.

In the next step you have to register your own device. Open the dashboard of the Internet of Things service and navigate to 'Add Device'. As device type choose 'Watson' and an unique device id - [screenshot](https://raw.githubusercontent.com/IBM-Bluemix/sphero-bluemix-speech/master/images/registerdevice1.png). As result you'll get an org id and password - [screenshot](https://raw.githubusercontent.com/IBM-Bluemix/sphero-bluemix-speech/master/images/registerdevice2.png).

In order to import the flow open your newly [created Bluemix application](https://raw.githubusercontent.com/IBM-Bluemix/sphero-bluemix-android/master/images/nodered1.png) and open the Node-RED editor, e.g. http://mysphero.mybluemix.net/red, and choose [import from clipboard]((https://raw.githubusercontent.com/IBM-Bluemix/sphero-bluemix-android/master/images/nodered4.png). You find the flow in the sub-directory 'noderedflow'. 

If you want to actually steer a Sphero ball you have to also set up the Android or iOS app. Alternatively you can modify the flow to do whatever you like to do based on the received spoken words.



Setup of the Node.js Application
================================================================================

1. Create a Bluemix Account. [Sign up](https://apps.admin.ibmcloud.com/manage/trial/bluemix.html) in Bluemix, or use an existing account. 

2. Download and install the [Cloud-foundry CLI](https://github.com/cloudfoundry/cli) tool

3. Download the application and change to that directory. Run "npm install".

4. Modify the file [demo.js](https://raw.githubusercontent.com/IBM-Bluemix/sphero-bluemix-speech/master/images/demojs.png). Replace the text in the screenshot with your org id, device id and auth-token that you received when you registered the device. Note that in a real production application you should not put the password in the JavaScript file.

5. Edit the [manifest.yml](https://raw.githubusercontent.com/IBM-Bluemix/sphero-bluemix-speech/master/images/manifest.png) file and change the application name and service name to something unique. The name you use will determinate your application url initially, e.g. sphero-watson-nik.mybluemix.net.

6. Connect to Bluemix in the command line tool.
```
$ cf api https://api.ng.bluemix.net
$ cf login -u <your user ID>
```

7. Create the Speech to Text service in Bluemix.
```
$ cf create-service speech_to_text free speech-to-text-service-nik
```

8. Push it live!
```
$ cf push
```
These steps created the [application](https://raw.githubusercontent.com/IBM-Bluemix/sphero-bluemix-speech/master/images/bluemixapp.png) in Bluemix including the service.