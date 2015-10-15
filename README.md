# TKJR Personal Site

## Developer Environment Setup
- clone the git repository (https://github.com/TaeKimJR/taekimjr.git)
- open terminal
- navigate to the project's root directory
- run the following commands:
  + `npm install`
  + `npm run start`
- open a browser and go to `http://localhost:2368`
- create a local ghost account and sign in
- in the admin dashboard...
  + click general (under SETTINGS)
  + change the theme to taekimjr (under Theme)
- start developing!!!

### Grunt Setup
- navigate to the theme's root directory (/content/themes/taekimjr/)
- run the following command if you have never used Grunt before
  + `npm install -g grunt-cli`
  + `npm install`
- run the following command to run Grunt tasks:
  + `grunt`

- If you would like to have grunt watch your LESS files, run the following command:
  + `grunt watch`

## Deployment
- navigate to the project's root directory
- if this is your first time deploying, run this command to add the heroku git to your local project directory
  + `git remote add heroku git@heroku.com:taekimjr.git`
- commit and push any changes you have to the master branch
- run the following commands:
  + `git push heroku master`
  + `open https://taekimjr.herokuapp.com/`

## Resources
- http://support.ghost.org/
- https://www.howtoinstallghost.com/how-to-install-ghost-on-heroku/
- https://github.com/cobyism/ghost-on-heroku