# MathQuestionSite

[Online Demo](https://alan-yin.github.io/MathQuestionSite/)

**About:**

A Math Question Site. Teachers can establish and choose exam questions to generate exam paper. Each Question can be labeled with different year, grade or topic. By uploading specific answer csv file, the site can also calculate each student's score.


**Tech Stack:**

Frontend:
* React
* React Router 5
* html2pdf.js
* material-ui

Backend:
* Node.js/Express
* MongoDB

Screenshots:

![](https://i.imgur.com/oWfl80Y.png)
![](https://i.imgur.com/udKcMOc.png)




## **Getting started**

**Backend:**
```
cd backend && yarn install
```
Then generate .env in backend repository and enter datebase url (MongoDB)
```
DATABASE_URL=mongodb+srv://<clusterName>:<password>@cluster0.qtfrr.mongodb.net/?retryWrites=true&w=majority
```
After define datebase url, run server.js
```
yarn start
```

**Frontend:**
```
cd frontend && yarn install
```
```
yarn start
```


















