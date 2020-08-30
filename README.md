<h1  align="center">
<img  alt="GoStack"  src="https://storage.googleapis.com/golden-wind/bootcamp-gostack/header-desafios.png" />
</h1>
<h3  align="center">
Project GoBarber: Bootcamp GoStack
</h3>

<p  align="center">
<a  href="https://github.com/WillMuzyka">
<img  alt="Made with Love"  src="https://img.shields.io/badge/made%20with-love-%2304D361">
</a>
<a  href="LICENSE">
<img  alt="License"  src="https://img.shields.io/badge/license-MIT-%2304D361">
</a>
</p>

<p  align="center">
<a  href="#joystick-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a  href="#hourglass_flowing_sand-installation">Installation</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a  href="#warning-rocketseat">Rocketseat</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a  href="#cop-remarks">Remarks</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a  href="#handshake-thanks">Thanks</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a  href="#memo-license">License</a>
</p>

<p  align="center">
Read in other languages:&nbsp&nbsp&nbsp&nbsp
<a  href="README.ptBR.md">Português</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a  href="README.md">English</a>
</p>
<br />

This is an application for barbershops to manage their schedules. The user can make an appointment with the desired barber, while the barber can define the available hours to work and check all the appointments that he has.

- Project developed during the GoStack Bootcamp.

## :joystick: Technologies

This project used a lot of technologies and concepts. A few of them are listed below.
(Also some languages, libraries and frameworks):

* [TypeScript](https://www.typescriptlang.org/)
* [Node.js](https://nodejs.org/)
* [ReactJS](https://reactjs.org/)
* [React Native](https://reactnative.dev/)
* [CSS](https://developer.mozilla.org/docs/Web/CSS)
* [Styled Components](https://styled-components.com/)
* [JSX](https://reactjs.org/docs/introducing-jsx.html)
* [JWT](https://jwt.io/)
* [Express](https://expressjs.com/)
* [Multer](https://github.com/expressjs/multer)
* [PostgreSQL](https://www.postgresql.org/)
* [MongoDB](https://www.mongodb.com/)
* [Redis](https://redis.io/)

## :hourglass_flowing_sand: Installation:

To install and use this application, first be sure that you have node, npm and/or yarn installed (you can run everything with npm, if you prefer, but I recommend yarn). They are essential for running the application.

The whole project was made based on Node.js and react. If you want to emulate the mobile app, you also will need the packages for the plataform that you'll use, that being Android or iOS. If you want to use this library, please clone this repository and check the following steps.

**Steps**

1. Open your computer's terminal and change for the directory that you want to keep this application. Run the code `git clone https://github.com/WillMuzyka/GoBarber.git`.

2. In the backend, web and mobile folder (you can use `cd GoBarber`), run the command `yarn` or `npm install` to install all the required packages listed on the file *`package.json`*.

3. The backend consumes a Postgres, MongoDB and Redis Database, so you will need have them running. I used docker, but feel free to use any other service. The configurations for the databases can be found at `ormconfig.json` and `/src/conf/cache.ts` .

4. You'll now run all the migrations for the database, *in the backend folder*, with the command `yarn typeorm migrations:run`. Be sure to have the database already created with the proper name.

5. After installing the packages, run the command `yarn start` *in the backend folder* to start the backend. This will keep running until you end the application (Ctrl + C) or close the window that is running. It will not run in the background, so you need to keep the window open. This application uses the port `:3333`, so be careful to not have another application trying to run on the same port.

6. To start the web application, *in the web folder* run the command `yarn start`. This will pop-up a new tab in your browser with the GoBarber running.

7. For the mobile app, please have a emulator connected to your computer and, *in the mobile folder*, run the command `yarn android` or `yarn ios`, depending on your emulator.

9. Enjoy the application!

## :cop: Remarks

Please notice that this project was made during a bootcamp for better understanding the concepts of the node.js, reactjs, reactnative and typescript, focusing in learning more about web development.

This is not a deploy version of the application and may have some bugs and errors. The whole purpose of this code is for learning and I do not have any guaranty if you want to deploy or use it commercially.

## :handshake: Thanks

I want to thank the Rocketseat team for making this amazing bootcamp, full of videos, exercises and challenges. I learned so much during these weeks, both with the subjects being taught as well as the community that is always helping each other. If anyone wants to learn more about them, the link for their website is [this](https://rocketseat.com.br/). Please notice that the subjects are taught in portuguese (BR).

## :memo: LICENSE

This project is under the MIT License. For more information, please refer to [LICENSE](LICENSE).
