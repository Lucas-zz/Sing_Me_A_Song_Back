<h1 align="center">
   🎵 <a href="#"> Sing Me A Song API </a>
</h1>

<h3 align="center">
    Have you ever asked someone for a music recommendation? 
</h3>

<h4 align="center"> 
	 Status: <b>Finished</b>
</h4>

<p align="center">
 <a href="#about">About</a> •
 <a href="#how-it-works">How It Works</a> • 
 <a href="#pre-requisites">Pre-requisites</a> • 
 <a href="#tech-stack">Tech Stack</a> • 
 <a href="#how-to-contribute">How to contribute</a> • 
 <a href="#author">Author</a>
</p>


## About

<b>Sing Me A Song</b> is an API for anonymous song recommendation. The more people like a recommendation, the more likely it is to be recommended to others 🙂 .

---

## How It Works

### POST /recommendations

``` jsx
POST /recommendations
```

#### Expected Body

``` jsx
{
  "name": String, required,
  "youtubeLink": String, must be a valid youtube link, required,
}
```

#### Possible Response Status

``` jsx
422: 'The request body contains invalid elements';
201: 'Successfully created!';
409: 'Recommendations names must be unique';
500: 'Error on Recommendations: Unable to post recommendation - (error message here)'
```

---

### POST /recommendations/:id/upvote

``` jsx
POST /recommendations/:id/upvote
```

#### Expected Body

``` jsx
None
```

#### Possible Response Status

``` jsx
400: 'Id is invalid';
200: 'Successfully updated! +1';
404: 'Recommendation not found';
500: 'Error on Recommendations: Unable to update recommendation - (error message here)'
```

---

### POST /recommendations/:id/downvote

``` jsx
POST /recommendations/:id/downvote
```

#### Expected Body

``` jsx
None
```

#### Possible Response Status

``` jsx
400: 'Id is invalid';
200: 'Successfully updated! -1';
404: 'Recommendation not found';
500: 'Error on Recommendations: Unable to update recommendation - (error message here)'
```

---

### GET recommendations/random

``` jsx
GET recommendations/random
```

#### Expect to receive

``` jsx
// 70% chance
{
	"id": 1,
	"name": "The Trail - The Witcher 3 Trailer Music",
	"youtubeLink": "https://www.youtube.com/watch?v=s3L0_ez0Dg4",
	"score": Good score ( > 10 )
}

// 30% chance
{
	"id": 1,
	"name": "Toss A Coin to Your Witcher",
	"youtubeLink": "https://www.youtube.com/watch?v=waMkFIzvDpE",
	"score": Bad score ( <= 10 )
}
```

#### Possible Response Status

``` jsx
400: 'Id is invalid';
200: 'Object with expected body'
404: 'No recommendations yet';
500: 'Error on Recommendations: Unable to get recommendation - (error message here)'
```

---

### GET recommendations/top/:amount

``` jsx
GET recommendations/top/:amount
```

#### Expect to receive

``` jsx
[
  {
    "id": 1,
    "name": "The Trail - The Witcher 3 Trailer Music",
    "youtubeLink": "https://www.youtube.com/watch?v=s3L0_ez0Dg4",
    "score": 0
  },
  {
    "id": 2,
    "name": "Toss A Coin to Your Witcher",
    "youtubeLink": "https://www.youtube.com/watch?v=waMkFIzvDpE",
    "score": 0
  },
  {
    "id": 3,
    "name": "Netflix The Witcher - Full Original Soundtrack",
    "youtubeLink": "https://www.youtube.com/watch?v=uv54ec8Pg1k",
    "score": 0
  }
]
```

#### Possible Response Status

``` jsx
400: 'Invalid amount';
200: 'Object with expected body'
404: 'No recommendations yet';
500: 'Error on Recommendations: Unable to get top recommendations - (error message here)'
```

---

## Pre-requisites

Before you begin, you will need to have the following tools installed on your machine:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [VSCode](https://code.visualstudio.com/).

### Initial configs

``` jsx

// Clone this repository
$ git clone git@github.com:Lucas-zz/Sing_Me_A_Song_Back.git

// Access the project folder cmd/terminal
$ cd Sing_Me_A_Song_Back

// Install the dependencies
$ npm install

// Create a .env file and fill it using your environment variables following the .env.example

// Create the Database (designed with Prisma)
$ npx prisma migrate dev

// Run the application in development mode
$ npm run dev

// The server will start at port of your choice, as determined by the .env file

```
You can find the .env.example <a href="https://github.com/Lucas-zz/Sing_Me_A_Song_Back/blob/main/.env.example">here</a>

---

### Testing

To run the <b>integration</b> and <b>unit</b> tests, some minor configurations will need to be done first

``` jsx
// Create a .env.test file and fill it using your environment variables following the .env.test.example

// Create a new database made for testing
$ npx dotenv -e .env.test prisma migrate dev

// Populate the test database with the seed
$ npm run seed

// Run the application in the test mode
$ npm run dev:test

// Run the automated tests
$ npm run test

```
You can find the .env.test.example <a href="https://github.com/Lucas-zz/Sing_Me_A_Song_Back/blob/main/.env.test.example">here</a>

## Tech Stack

The following tools were used in the construction of the project-api:

**Server**  ([NodeJS](https://nodejs.org/en/))

-   **[Express](https://expressjs.com/)**
-   **[CORS](https://expressjs.com/en/resources/middleware/cors.html)**
-   **[Prisma](https://github.com/prisma/prisma)**
-   **[DotENV](https://github.com/motdotla/dotenv)**
-   **[Joi](https://github.com/hapijs/joi)**
-   **[Faker-js](https://github.com/faker-js/faker)**
-   **[Supertest](https://github.com/visionmedia/supertest)**
<!-- -   **[NTL](https://github.com/ruyadorno/ntl)** -->
<!-- -   **[Pg](https://github.com/brianc/node-postgres)** -->
<!-- -   **[Eslint - Airbnb](https://github.com/airbnb/javascript)** -->

> See the file  [package.json](https://github.com/Lucas-zz/Sing_Me_A_Song_Back/blob/main/package.json)

**Utilities**

-   Editor:  **[Visual Studio Code](https://code.visualstudio.com/)**
-   API Test:  **[Jest](https://github.com/facebook/jest)**
-   Front Test: **[Cypress](https://www.cypress.io/)**


---


## How to contribute

1. Fork the project.
2. Create a new branch with your changes: `git checkout -b feat/myFeatureName`
3. For each feature implemented, make a commit specifying what was done
4. Submit your changes: `git push -u origin feat/myFeatureName`

---

## Author

[<img src="https://avatars.githubusercontent.com/Lucas-zz" width=150 title="Lucas-zz"><br>Lucas Azzolini Vieira](https://github.com/Lucas-zz)
