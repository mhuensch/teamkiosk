#Team Kiosk
An advanced build monitor for Team City that focuses on providing a strong user experience to developers working in environments that have a large number of projects.

Note: this project is still in ALPHA status.  We are currently working at rewriting the UI.

##Overview
There are three primary views that Team Kiosk uses to display information:
 - Dashboard: displays statistics about your [favorite](README.md#favorites) builds in a carousel and the five most recent builds.
 - Failures: displays any failing builds and the relevant information for that failure. When failures occur, this is the view shown in kiosk mode.
 - Settings: allows the customization of certain behaviors in Team Kiosk

Additionally, using [pyre](https://github.com/BillowLabs/pyre), we currently build Team Kiosk as a:
 - [Desktop Application](https://github.com/run00/TeamKiosk-Releases/releases) for Windows 32/62, OSX 32/64, and Linux 32/64.
 - [NPM package](https://www.npmjs.com/package/teamkiosk) to be hosted as a website in node


##Getting Started
###Desktop Application
 - [Download the latest version for your OS](https://github.com/run00/TeamKiosk-Releases/releases/latest)
 - Unzip to the directory of your choice
 - Run TeamKiosk.exe
 - Create a shortcut (optional)
[placeholder]

###Hosted in Node
Team Kiosk is hosted as an [NPM package](https://www.npmjs.com/package/teamkiosk).  To install it, simply use:
```
npm install teamkiosk
```
[placeholder]

###Running the Source Code
- [Get the latest source code](https://github.com/BillowLabs/teamkiosk)
- Run ''' npm install '''
- Run ''' gulp '''
- Run ''' gulp host '''
- Navigate to: [localhost:19770](http://localhost:19770/)

For more gulp command options, see the [pyre](https://github.com/BillowLabs/pyre) documentation.


##Documentation

###Error: EPERM, unlink
If you are building the source code and using Sublime Text and getting an error that looks like "rimraf Error: EPERM, unlink", be sure to [exclude the .bin folder](https://www.sublimetext.com/docs/2/projects.html)  at the root of the Team Kiosk source from Sublime Text.

###Where can I learn more about the Team City API that you are using?
The best place to start is the [documentation](https://confluence.jetbrains.com/display/TCD8/REST+API) available from jetbrains.  If you are looking to explore the API and don't want to set up your own Team City Server, [codebetter.com](http://codebetter.com/) offers [a free hosted instance of Team City](http://teamcity.codebetter.com/) to open source projects. Additionally here are some useful examples from the codebetter.com Team City API:

- [/projects](http://teamcity.codebetter.com/guestAuth/app/rest/projects)
- [/projects/id:NHibernate](http://teamcity.codebetter.com/guestAuth/app/rest/projects/id:NHibernate)
- [/builds](http://teamcity.codebetter.com/guestAuth/app/rest/builds)
- [/builds/193203](http://teamcity.codebetter.com/guestAuth/app/rest/builds/304925)
- [/builds/id:193203](http://teamcity.codebetter.com/guestAuth/app/rest/builds/id:192409)
- [/builds?count=1000](http://teamcity.codebetter.com/guestAuth/app/rest/builds?count=1000)
- [/builds?count=1000&project=Builds&fields=build%28id,buildTypeId,status%29&sinceBuild=193203](http://teamcity.codebetter.com/guestAuth/app/rest/builds?count=1000&project=Builds&fields=build%28id,buildTypeId,status%29&sinceBuild=193203)
- [/buildTypes/id:bt876](http://teamcity.codebetter.com/guestAuth/app/rest/buildTypes/id:bt876)
- [/rest/buildQueue](http://teamcity.codebetter.com/guestAuth/app/rest/buildQueue)
- [/changes/id:263576](http://teamcity.codebetter.com/guestAuth/app/rest/changes/id:263576)
- [/changes?locator=build:(id:193138)](http://teamcity.codebetter.com/guestAuth/app/rest/changes?locator=build:(id:193138))
- [/builds/193138/statistics](http://teamcity.codebetter.com/guestAuth/app/rest/builds/193138/statistics)



