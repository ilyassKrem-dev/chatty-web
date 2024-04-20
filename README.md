
### About

Chatty a messaging website built using nextjs,

![Chatty][Chatty] ![Chatty1][Chatty1] 


### Built With
* [![Next][Next.js]][Next-url]  [![React][React.js]][React-url]
* [![TailwindCSS][TailwindCss]][TailwindCss-url]  [![Framer][Framer]][Framer-url]
* [![NodeJS][NodeJS]][NodeJS-url]  [![MongoDB][MongoDB]][MongoDB-url]
* [![Socket.io][Socket.io]][Socket.io-url]
 
###  Features
- Simple design
- Responsive.
- Real-time
- User Account System
- and others
  

  
### Start the website
1. Clone the repo
   ```sh
   gh repo clone ilyassKrem-dev/chatty-web
   ```
2. Add a MONGO_URL from [mongoDB](https://www.mongodb.com/) to the `.env.local` file
3. Add from [NextAuth](https://next-auth.js.org/) to the `.env.local` file
   ```sh
     NEXTAUTH_SECRET=
     NEXTAUTH_URL=(Your website url)
   ```
4. Add from [Uploadthing](https://uploadthing.com/) to the `.env.local` file
    ```sh
     UPLOADTHING_APP_ID=
     UPLOADTHING_SECRET=
   ```
5. Add from [Google-recaptcha](https://www.google.com/recaptcha) to the `.env.local` file
   
    ```sh
     RECAPTCHA_SECRET_KEY=
     NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
   ```
6. Add from [Google-console](https://console.cloud.google.com/) to the `.env.local` file and add (Your url)/api/auth/callback/google to google console (Authorized redirect URIs)
   
    ```sh
     GOOGLE_CLIENT_ID=
     GOOGLE_CLIENT_SECRET=
   ```
7. Add a NEXT_PUBLIC_BASE_URL= (Full Url of the site) for the share button to the `.env.local` file
8. Run
   ```sh
   npm install
   npm run dev
   ```




<!-- MARKDOWN LINKS & IMAGES -->
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Framer]:https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue
[Framer-url]:https://www.framer.com/motion/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TailwindCss]:https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCss-url]:https://tailwindcss.com/
[NodeJS]:https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[NodeJS-url]:https://nodejs.org/
[MongoDB]:https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]:https://www.mongodb.com/
[Socket.io]:https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101
[Socket.io-url]:https://socket.io/
[Chatty]:https://www.dropbox.com/scl/fi/14ac5ikz3db35aq9fm8c7/homePage.jpg?rlkey=d5lr9m7qjde5kd8lgz0ndhoky&st=eqxmbvib&raw=1
[Chatty1]:https://www.dropbox.com/scl/fi/m4qbyacf6p52rx8lmcvdg/Site.jpg?rlkey=fik94l922tjbk5pwy44llkqs0&st=ut149shi&raw=1

