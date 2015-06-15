#Team Kiosk
An advanced build monitor for Team City that focuses on providing a strong user experience to developers working in environments that have a large number of projects.


##Overview
There are three primary views that Team Kiosk uses to display information:
1. A Dashboard: displays statistics about your [favorite](README.md#favorites) builds in a carousel and the five most recent builds.
1. Failures: displays any failing builds and the relevant information for that failure.
1. Settings: allows the customization of certain behaviors in Team Kiosk

Additionally, using [pyre](https://github.com/BillowLabs/pyre), we currently build Team Kiosk as a:
1. [Desktop Application](https://github.com/run00/TeamKiosk-Releases/releases/latest) for Windows 32/62, OSX 32/64, and Linux 32/64
2. [NPM package](https://www.npmjs.com/package/teamkiosk) to be hosted as a website in node


##Getting Started
###Desktop Application
[placeholder]

###Hosted in Node
Team Kiosk is hosted as an [NPM package](https://www.npmjs.com/package/teamkiosk).  To install it, simply use:
```
npm install teamkiosk
```

###Running the Source Code
[placeholder]
npm install
gulp

To Run:
gulp exe
gulp host

To Watch:
gulp --watch   #if you run this the first time you build, parts of the application will continue to get rebuilt each time a webkit component is downloaded


##Documentation

###Why are you putting your releases in a separate project in GitHub?
We are currently using [CodeShip](http://codeship.com) as our build/CI server.  CodeShip insists on building each branch in the repository that it is linked to.  Normally, this is a good idea and shouldn't cause any problems.  However, as GitHub requires you to create a tag to upload files for a release, our CodeShip build process was building every time we tagged a release.  However, we continue to use CodeShip because it allows unlimited free builds, tests, and deployments for open source projects.

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



