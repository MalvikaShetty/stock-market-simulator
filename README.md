# Stock Market Simulator- Java Spring, Maven and ReactJs

This application functions as a simulated stock trading platform, providing users with an initial virtual budget to buy and sell stocks. Participants can track their profits or losses and see how they rank against other players. It offers an engaging way to practice trading strategies and compete within a virtual marketplace.

## File Structure-

##### _stock-market-simulator_ folder - Spring
##### _stock-simulator_ folder - React App

## Installations
### Java Spring
#### On Windows-
Install Node.js: Go to the official Node.js website. Download the Windows Installer for the version you need. There are usually two versions available: LTS (Long Term Support) and Current. The LTS version is recommended for most users.

Install Java:
Download a Java JDK (Java Development Kit) if you haven't already. You can download it from Oracle or use an OpenJDK version.
Install Java by running the downloaded installer and following its instructions.
#### On Linux-
```
sudo apt install nodejs
node -v or node --version
sudo apt install npm 
npm -v or npm --version 
```
Then installing Java and Sping-
```
sudo apt install openjdk-11-jdk -y
java -version
sudo apt install maven -y
```

I used IntelliJ IDEA to start a project instead of manually adding Spring Initializr commands.
Open IntelliJ IDEA and select New Project on the welcome screen, or go to File > New > Project... if you have another project open.
In the New Project window, select Spring Initializr from the left sidebar. IntelliJ IDEA uses Spring Initializr in the background to generate the project.
Choose your Project SDK (Java version). If you don't have the JDK installed, IntelliJ can download it for you. Spring Boot 2.x requires Java 8 or later. It's recommended to use Java 11 or later for new projects.

### React
To install all dependencies-
```
npm install @fortawesome/free-solid-svg-icons@6.5.1 @fortawesome/react-fontawesome@0.2.0 @testing-library/jest-dom@5.17.0 @testing-library/react@13.4.0 @testing-library/user-event@13.5.0 @types/jest@27.5.2 @types/node@16.18.41 @types/react@18.2.20 @types/react-dom@18.2.7 axios@1.4.0 chart.js@4.4.1 react@18.2.0 react-chartjs-2@5.2.0 react-dom@18.2.0 react-router-dom@6.15.0 react-scripts@5.0.1 recharts@2.12.0 typescript@4.9.5 web-vitals@2.1.4
```
You can change to updated versions while installing

To install directly after cloning the project-
``` 
npm install
```

## Commands to run the project
### Java Spring Boot
For a better development experience, use an IDE like IntelliJ IDEA, Eclipse, or Visual Studio Code with Spring Boot extensions.
Import your project into the IDE to start development.

### React
```
npm start
```
## Landing Page-
http://localhost:3000/
![image](https://github.com/MalvikaShetty/stock-market-simulator/assets/66647891/14d91509-39ca-4294-a609-b83eaa5c768b)

## Dashboard- 
http://localhost:3000/home
![image](https://github.com/MalvikaShetty/stock-market-simulator/assets/66647891/fde983fa-5120-44f9-8ced-966ae0d6170b)

## List of Stocks
http://localhost:3000/stocks
![image](https://github.com/MalvikaShetty/stock-market-simulator/assets/66647891/54ade630-c7fd-4c99-baaa-622ce43903d5)

On Clicking Buy-
![image](https://github.com/MalvikaShetty/stock-market-simulator/assets/66647891/5e64be88-bd2d-4e0f-902e-3257d01a8c35)

## Ranks of all Users
http://localhost:3000/ranks
![image](https://github.com/MalvikaShetty/stock-market-simulator/assets/66647891/244589e7-885b-4169-9ad7-3274a5fd74e0)

## Login and Sign up Pages-
http://localhost:3000/login
![image](https://github.com/MalvikaShetty/stock-market-simulator/assets/66647891/e6a9e562-3873-46ce-baa6-f3fcd3af7a2d)

http://localhost:3000/signup
![image](https://github.com/MalvikaShetty/stock-market-simulator/assets/66647891/0d706ce1-e309-4750-a16c-0e45ad637ed2)

