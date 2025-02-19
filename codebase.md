# .github\workflows\ML_SEV_TEST.yml

```yml
name: Demo Day 1 ML Sev Testing

on:
  push:
    branches:
      - zander
      - main
  pull_request:
    branches:
      - main
      - zander

jobs:
  test:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [macos-latest, windows-latest]

    steps:
      # Step 1 -> Checkout the repository
      - name: Checkout repository
        uses: actions/checkout@v3

      # Step 2 -> Set up Node.js
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 22

      # Step 3 -> Install dependencies
      - name: Install dependencies
        run: npm install

      # Step 4: Disable SSL verification
      - name: Disable SSL verification
        run: echo "NODE_TLS_REJECT_UNAUTHORIZED=0" >> $GITHUB_ENV

      # Step 5 -> Run tests
      - name: Run tests
        run: npm run dd1_TESTS

```

# .gitignore

```
# Node modules
node_modules/

# Build output
dist/
build/

# Logs
logs
*.log
npm-debug.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE and editor files
.vscode/
.idea/
*.sublime-project
*.sublime-workspace

# OS generated files
.DS_Store
Thumbs.db

# Coverage directory
/coverage/

# Cache directories
/.cache/


# ML DIRS
ml/node_modules
ml/sev/cert.pem
ml/sev/key.pem
ml/sev/node_modules/
ml/sev/package-lock.json
```

# .vite\deps\_metadata.json

```json
{
  "hash": "757c3ac6",
  "configHash": "f61a6d94",
  "lockfileHash": "5271664c",
  "browserHash": "dd4886f9",
  "optimized": {},
  "chunks": {}
}
```

# .vite\deps\package.json

```json
{
  "type": "module"
}

```

# .vscode\settings.json

```json
{
    "tailwindCSS.includeLanguages": {
    "html": "html",
    "javascript": "javascript",
    "css": "css"
    },
    "editor.quickSuggestions": {
        "strings": true
    },
    "git.ignoreLimitWarning": true,
    "editor.inlineSuggest.enabled": true,
    "css.validate": false,
}
```

# components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/App.css",
    "baseColor": "neutral",
    "cssVariables": false,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

# index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <!-- <link rel="icon" href="/favicon.ico" /> -->
    <link href="/dist/styles.css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <!-- public/index.html -->
    <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <title>Focus Feed</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script type="module" src="/src/index.jsx"></script>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>
</html>

```

# jest.config.js

```js
module.exports = {
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!axios)/',  // Add axios to be transformed by Babel
    ],
  };
  
```

# ml\README.md

```md
# Server Setup and Testing Guide

Local instance server setup and testing guide. Follow these steps to get your server up and running, or test it using predefined scenarios.

---

## 📋 Prerequisites

Before starting, ensure you have the following installed on your machine:
- **Node.js** (Stable build on Node 22)

---

## 🚀 Setup Instructions

1. **Clone the Repository**  
   Clone the repository to your local machine:
   \`\`\`bash
   git clone <repo url>

2. **Navigate to server directory**  

   \`\`\`bash
   cd ml/sev

3. **Generate SSH Key and Certificate**  
   Run the following terminal command to generate an SSH key and certificate [***NOTE***: You will be prompted to fill out optional information about it]:
   \`\`\`bash
   openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365

4. **Set Environment Variables**  
    Copy the generated key and certificate paths into the appropriate environment variables:

    a. locate the newly created key.pem and cert.pem

    b. copy the contents into a .env file
        - Create new .env file and copy contents

    \`\`\`bash
    touch .env

5. **Install dependencies**  
   Install required dependencies:
   \`\`\`bash
   npm install

------

## ✅ Testing
To run premade testing, run:

\`\`\`bash
npm run dd1_TESTS
\`\`\`

----------
## ⌛️ Running
To run local instance after everything is set up:

\`\`\`bash
node index.js
\`\`\`



```

# ml\sev\index.js

```js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const https = require('https');
require('dotenv').config();



// Server initialization [DD1]
const app = express();
const CONNECT_PORT = 7050;
const sslOptions = 
{
    key: process.env.SSL_KEY,
    cert: process.env.SSL_CERT,
};

app.use(cors());

// Used for parsing information from the incoming data from the web-scrapper team
app.use(bodyParser.json());


//1 = train, 2 = test, 3 = prod, 0 = idle
const SERVER_STATES = {
    IDLE: 0,
    TRAIN: 1,
    VAL: 2,
    PROD: 3,
};
let serverStat = SERVER_STATES.IDLE;


/**
 * 
 * @define: routeHander() -> function for determening which model, frozen or not, to send the pre-processed data to
 * 
 * @param: data -> text: this is the formated news articles
 * @returns: STATUS -> returns status based on if it was successfully able to redirect the data
 */
const routeHander = async (formattedNews) => 
{
    // 0 = testing, 1 = successfully done, 2 = failed @ {insert step}
    let ENDING_STATUS = 0;
    
    // Data and server validation
    //  -> EXTEND OUT MORE POST DD1

    // EXTEND OUT MORE POST DD1
    if (typeof formattedNews !== 'string' || formattedNews.trim === '' || serverStat == 0)
    {
            ENDING_STATUS = 2;
            console.error("Should not be here, you are literally coding this thing right now...")
            return ENDING_STATUS;
    }
    
    // /train routing
    if(serverStat == 1)
    {
        try {

            const NEWS = await axios.post('http://localhost:7000/train', {
                data: formattedNews
            });

            if (NEWS.status === 200)
            {
                ENDING_STATUS = 1;
            } else {
                ENDING_STATUS = 2;
            }

        } catch (error) {
            ENDING_STATUS = 2;
        }
        return serverStat
    };

}

/* 
 * 
 * Route Instantiation
 * 
 * /preProcess: Pipeline for taking the raw information from frontend requests and running the data through a
 *              formatting pipeline that removes semi-irrelenvent information, such as ads, from the request, via running
 *              the text via sentece iteration, then ran on a pretrained model of common phrases associated with ads. This
 *              model further formats the data which is then sent to either the /training, /val, /prod depending on the server STATE
 * 
 *              TLDR: correctly formats data and sends where it needs to go
 *
 * /filter: route for deciding where the data will go to, if server status is on train send data to /train to be
 *          used as training data for clustering training and feature extraction, if server is on prod will get sent to weight locked ML model
 *          to shown in train lantent space.
 * 
 *          TLDR: This saves me from having to rewrite direction functions in the route listeners
 * 
 * /train: route hosting model training funcitons. takes in data from /preProcess, and uses that as input to the model
 *          then goes and converts each sentence to the train latents space, "high dimensional space", and then be used in training a clustering algorithm
 *          for divifing up latent space for mean extraction, which is what (via statstics) decides on what are "truthful" points
 *          about the article. These statements are then taken and a direction pointing to that that statements position in latent space
 *          then checks the cosine similaritys between it and testing data; tries to optimize via smallest cosine similarity
 * 
 *          TLDR: Takes data and uses it to train model based on cosine similarity in high dimensional space
 * 
<<<<<<< HEAD
 * /prod: Route which users will interact with, this is the route that pulls from the frozen graph for model weights
 *          and is only concerned about providing news articles for users. The information will go into here, each sentence will be extracted from the json.body
 *          and these will be converted into latent space using pre-trained model, then a clustering algorithm will be used to disect latent space and then the mean of
 *          cluster will check which sentence vec is closest to it, via cosine similarity, then extract that sentence to be used in prompt engineering
 * 
 *          TLDR: ML production route
*/

// /preProcess -> The route that preprocesses the raw text
app.post('/preProcess', (req, res) => {
    let data = req.body;
    res.json({message: "process up", data});
})

// /train -> route for training clustering model
app.post('/train', (req, res) => {
    let data = req.body
    res.json({message: "train route receive: ", data})
})

// /prod -> production server where users will interact
app.post('/prod', (req, res) => {
    let data = req.body
    res.json({message: "train route receive: ", data})
})

// /filter -> route for filtering incoming data to prevent multi tagging and save space
app.post('/filter', (req, res) => {
    let data = req.body
    res.json({message: "train route receive: ", data})
})



/**
 * 
 * @define: Instantiation of the HTTPS server for local/hosting instances
 * 
 * @return: log back to terminal for local instance to testing
 * 
 * NOTE: This server was tested for /preProcesser using
 *        "curl -k -X https://localhost:7050/preProcess -d {}"
 *          -> '-k' is necessary because we are self-cerififying for HTTPS
 *          -> '-d {}' is telling the server what they are sending in response.body()
 *          
 */
if (require.main === module) {
    https.createServer(sslOptions, app).listen(CONNECT_PORT, () => {
        console.log(`HTTPS server running at https://localhost:${CONNECT_PORT}`);
    });
}

module.exports = app;



```

# ml\sev\package.json

```json
{
  "name": "sev",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "dd1_TESTS": "jest"
  },
  "keywords": [],
  "author": "Zander Raycraft",
  "license": "MIT",
  "description": "Server instance for ML backend for news app",
  "type": "commonjs",
  "dependencies": {
    "axios": "1.7.9",
    "body-parser": "1.20.3",
    "cors": "2.8.5",
    "dotenv": "16.4.7",
    "express": "4.21.2"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "supertest": "^7.0.0"
  }
}

```

# ml\sev\test\mlsev.test.js

```js
/**
 * 
 * Necessary Packages:
 * - supertest: for automated HTTP requests to test endpoints
 * - https: to simulate an HTTPS server
 * - fs: for reading SSL certificates
 * - app: the server instance exported from index.js
 */
const TEST_REQUESTS = require('supertest');
const https = require('https');
const app = require('../index');

/**
 * SSL configuration for the test server
 */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const HTTPS_SYS_ENVS = {
    key: process.env.SSL_KEY,
    cert: process.env.SSL_CERT,
};

/**
 * 
 * @define: Test suite initialization
 * 
 * Tests for:
 * - /preProcess route (valid and invalid JSON requests)
 * - /train route (valid and invalid JSON requests)
 * - /filter route (valid and invalid JSON requests)
 * - /prod route (valid and invalid JSON requests)
 */
describe('DemoDay1 Tests', () => {

    let server;

    // Initialize the HTTPS server before running tests
    beforeAll(() => {
        server = https.createServer(HTTPS_SYS_ENVS, app).listen(7050);
    });

    // Close the HTTPS server after running tests
    afterAll(() => {
        server.close();
    });

    /**
     * @define: DemoDay1_Test1 -> Testing /preProcess route
     * 
     * @Test1a: Valid JSON
     *          1) Sends valid JSON to /preProcess
     *          2) Expects HTTP status code 200
     *          3) Checks the response body for correct message and data
     */
    test('POST /preProcess with valid JSON', async () => {
        const res = await TEST_REQUESTS(server)
            .post('/preProcess')
            .send({ key: 'value' })
            .set('Content-Type', 'application/json');

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('process up');
        expect(res.body.data).toEqual({ key: 'value' });
    });

    /**
     * @Test1b: Invalid JSON
     *          1) Sends improperly formatted JSON to /preProcess
     *          2) Expects HTTP status code 200
     *          3) Checks if server handles errors gracefully
     */
    test('POST /preProcess with invalid JSON', async () => {
        const res = await TEST_REQUESTS(server)
            .post('/preProcess')
            .send('Invalid JSON String')
            .set('Content-Type', 'application/json');

        expect(res.statusCode).toBe(400); // Assuming server responds with 400 for invalid JSON
    });

    /**
     * @define: DemoDay1_Test2 -> Testing /train route
     * 
     * @Test2a: Valid JSON
     *          1) Sends valid JSON to /train
     *          2) Expects HTTP status code 200
     *          3) Checks the response body for correct message and data
     */
    test('POST /train with valid JSON', async () => {
        const res = await TEST_REQUESTS(server)
            .post('/train')
            .send({ trainingData: [1, 2, 3] })
            .set('Content-Type', 'application/json');

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('train route receive: ');
        expect(res.body.data).toEqual({ trainingData: [1, 2, 3] });
    });

    /**
     * @Test2b: Invalid JSON
     *          1) Sends improperly formatted JSON to /train
     *          2) Expects HTTP status code 400 or relevant error
     */
    test('POST /train with invalid JSON', async () => {
        const res = await TEST_REQUESTS(server)
            .post('/train')
            .send('Invalid JSON')
            .set('Content-Type', 'application/json');

        expect(res.statusCode).toBe(400); // Assuming server responds with 400 for invalid JSON
    });

    /**
     * @define: DemoDay1_Test3 -> Testing /filter route
     * 
     * @Test3a: Valid JSON
     *          1) Sends valid JSON to /filter
     *          2) Expects HTTP status code 200
     *          3) Checks the response body for correct message and data
     */
    test('POST /filter with valid JSON', async () => {
        const res = await TEST_REQUESTS(server)
            .post('/filter')
            .send({ filterKey: 'value' })
            .set('Content-Type', 'application/json');

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('train route receive: ');
        expect(res.body.data).toEqual({ filterKey: 'value' });
    });

    /**
     * @Test3b: Invalid JSON
     *          1) Sends improperly formatted JSON to /filter
     *          2) Expects HTTP status code 400 or relevant error
     */
    test('POST /filter with invalid JSON', async () => {
        const res = await TEST_REQUESTS(server)
            .post('/filter')
            .send('Invalid JSON')
            .set('Content-Type', 'application/json');

        expect(res.statusCode).toBe(400);
    });

    /**
     * @define: DemoDay1_Test4 -> Testing /prod route
     * 
     * @Test4a: Valid JSON
     *          1) Sends valid JSON to /prod
     *          2) Expects HTTP status code 200
     *          3) Checks the response body for correct message and data
     */
    test('POST /prod with valid JSON', async () => {
        const res = await TEST_REQUESTS(server)
            .post('/prod')
            .send({ prodKey: 'value' })
            .set('Content-Type', 'application/json');

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('train route receive: ');
        expect(res.body.data).toEqual({ prodKey: 'value' });
    });

    /**
     * @Test4b: Invalid JSON
     *          1) Sends improperly formatted JSON to /prod
     *          2) Expects HTTP status code 400 or relevant error
     */
    test('POST /prod with invalid JSON', async () => {
        const res = await TEST_REQUESTS(server)
            .post('/prod')
            .send('Invalid JSON')
            .set('Content-Type', 'application/json');

        expect(res.statusCode).toBe(400);
    });
});

```

# package.json

```json
{
  "name": "tldr-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@agney/react-loading": "^0.1.2",
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.0",
    "@mui/icons-material": "^6.4.1",
    "@mui/material": "^6.4.1",
    "@radix-ui/react-label": "^2.1.2",
    "@radix-ui/react-navigation-menu": "^1.2.4",
    "@radix-ui/react-slot": "^1.1.2",
    "@react-email/components": "^0.0.33",
    "@react-email/html": "^0.0.11",
    "axios": "^1.7.9",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cors": "^2.8.5",
    "cra-template": "1.2.0",
    "dotenv": "^16.4.7",
    "embla-carousel-react": "^8.5.2",
    "express": "^4.21.2",
    "firebase": "^11.3.1",
    "https": "^1.0.0",
    "lucide-react": "^0.474.0",
    "node-cron": "^3.0.3",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.1.3",
    "react-scripts": "5.0.1",
    "resend": "^4.1.2",
    "supertest": "^7.0.0",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    "web-vitals": "^4.2.4"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "start": "vite",
    "dd1_TESTS": "jest"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "@babel/preset-env": "^7.26.7",
    "@babel/preset-react": "^7.26.3",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.2.0",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "babel-jest": "^29.7.0",
    "postcss": "^8.5.1",
    "shadcn-ui": "^0.9.4",
    "tailwindcss": "^3.4.17",
    "vite": "^6.0.11"
  },
  "jest": {
    "transformIgnorePatterns": [
      "/node_modules/(?!axios)/"
    ]
  }
}

```

# postcss.config.js

```js
module.exports = {
  plugins: {
    // "@tailwindcss/postcss": {},
    "tailwindcss": {},
    autoprefixer: {},
  },
};  
```

# public\favicon.ico

This is a binary file of the type: Binary

# public\favicon.svg

This is a file of the type: SVG Image

# public\home_images\image1.webp

This is a binary file of the type: Image

# public\home_images\image2.webp

This is a binary file of the type: Image

# public\home_images\image3.webp

This is a binary file of the type: Image

# public\home_images\image4.webp

This is a binary file of the type: Image

# public\home_images\image5.webp

This is a binary file of the type: Image

# public\home_images\image6.webp

This is a binary file of the type: Image

# public\home_images\image7.webp

This is a binary file of the type: Image

# public\home_images\image8.webp

This is a binary file of the type: Image

# public\home_images\image9.webp

This is a binary file of the type: Image

# public\home_images\image10.webp

This is a binary file of the type: Image

# public\home_images\image11.webp

This is a binary file of the type: Image

# public\home_images\image12.webp

This is a binary file of the type: Image

# public\home_images\image13.webp

This is a binary file of the type: Image

# public\home_images\image14.webp

This is a binary file of the type: Image

# public\home_images\image15.webp

This is a binary file of the type: Image

# public\home_images\image16.webp

This is a binary file of the type: Image

# public\images\image 3.png

This is a binary file of the type: Image

# public\images\image 4.png

This is a binary file of the type: Image

# public\images\image.png

This is a binary file of the type: Image

# public\index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="/logo192.png" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>React App</title>
    <script type="module" crossorigin src="/assets/index-Xmagp0V_.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-C_2h9ZDt.css">
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>
</html>

```

# public\logo192.png

This is a binary file of the type: Image

# public\logo512.png

This is a binary file of the type: Image

# public\manifest.json

```json
{
  "short_name": "React App",
  "name": "Create React App Sample",
  "icons": [
    {
      "src": "favicon.svg",
      "type": "image/svg+xml",
      "sizes": "any"
    },
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}

```

# public\robots.txt

```txt
# https://www.robotstxt.org/robotstxt.html
User-agent: *
Disallow:

```

# public\textures\blackice.jpg

This is a binary file of the type: Image

# public\textures\blacksand.jpg

This is a binary file of the type: Image

# public\textures\coal.jpg

This is a binary file of the type: Image

# public\textures\concrete.jpg

This is a binary file of the type: Image

# public\textures\concrete2.jpg

This is a binary file of the type: Image

# public\textures\grain.jpeg

This is a binary file of the type: Image

# public\textures\gray.jpg

This is a binary file of the type: Image

# public\textures\paint.jpg

This is a binary file of the type: Image

# public\textures\slate.jpg

This is a binary file of the type: Image

# README.md

```md
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

```

# src\App.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html, body {
  background-color: #191718;
}

.App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.heebo-text {
  font-family: 'Heebo', sans-serif;
}

@keyframes dropBounce {
  0% {
    transform: translateY(-300%);
  }
  60% {
    transform: translateY(30px);
  }
  80% {
    transform: translateY(-5px);
  }
  93% {
    transform: translateY(2px);
  }
  100% {
    transform: translateY(0px);
  }
}

.header-animation {
  animation: dropBounce 0.6s forwards;
}

@layer base {
  :root {
    --radius: 0.5rem;
  }
}

.fade-in-content {
  animation: fadeIn 0.5s ease-in forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

```

# src\App.jsx

```jsx
import React, { useEffect, useState, memo } from "react";
import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import "./App.css";

// Import pages
import Home from "./pages/Home";
import Preferences from "./pages/Preferences";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

// Auth pages
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Onboarding from "./pages/Auth/Onboarding";

// Firebase
import { auth, db } from "./lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

// Loader
import { Grid } from "@agney/react-loading";

// Import memoized Header and Footer components
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Listen for auth state changes.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      // When auth state changes, show loader.
      setLoading(true);
      console.log("Current user:", currentUser);
      setUser(currentUser);
      if (currentUser) {
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            console.log("Initial user document data:", docSnap.data());
            setUserData(docSnap.data());
          } else {
            console.log("No user document found.");
            setUserData(null);
          }
        } catch (error) {
          console.error("Error fetching user document:", error);
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
      // When done, remove loader.
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Listen for real-time updates to the user's document.
  useEffect(() => {
    if (!user) {
      setUserData(null);
      return;
    }
    const unsub = onSnapshot(
      doc(db, "users", user.uid),
      (docSnap) => {
        if (docSnap.exists()) {
          console.log("Realtime user document data:", docSnap.data());
          setUserData(docSnap.data());
        } else {
          console.log("No user document found in real-time listener.");
          setUserData(null);
        }
      },
      (error) => {
        console.error("Error listening to user document:", error);
        setUserData(null);
      }
    );
    return () => unsub();
  }, [user]);

  // PrivateRoute ensures the user is authenticated and onboarded.
  const PrivateRoute = ({ children }) => {
    if (loading) return null; // Show nothing until auth state is resolved.
    if (!user) {
      console.log("PrivateRoute: No user found, redirecting to /auth/signin");
      return <Navigate to="/auth/signin" replace />;
    }
    if (!userData || !userData.onboarded) {
      console.log("PrivateRoute: User not onboarded, redirecting to /onboarding");
      if (location.pathname !== "/onboarding") {
        return <Navigate to="/onboarding" replace />;
      }
    }
    return children;
  };

  // Render the loader overlay while loading.
  return (
    <div className="relative min-h-screen">
      {loading && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50 bg-[#131112]"
          style={{ transition: "opacity 200ms" }}
        >
          <Grid width="40" color="#F51555" />
        </div>
      )}

      {!loading && (
        <div className="fade-in-content flex flex-col justify-between bg-[#131112] heebo-text">
          <div className="flex justify-center w-[80%] mx-auto bg-[#242122] shadow-lg relative overflow-hidden">
            <div className="absolute inset-0">
              <img
                src={"../textures/concrete2.jpg"}
                alt="Grainy Texture"
                className="w-full h-full object-cover mix-blend-multiply opacity-30"
              />
            </div>
            {/* Render the header */}
            <Header />
            <main className="w-[100%] pt-24 z-10">
              <Routes>
                {/* Auth and onboarding routes (public) */}
                <Route path="/auth/signin" element={<SignIn />} />
                <Route path="/auth/signup" element={<SignUp />} />
                <Route
                  path="/onboarding"
                  element={
                    <PrivateRoute>
                      <Onboarding />
                    </PrivateRoute>
                  }
                />
                {/* Private routes */}
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/preferences"
                  element={
                    <PrivateRoute>
                      <Preferences />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <PrivateRoute>
                      <About />
                    </PrivateRoute>
                  }
                />
                {/* Catch-all for unknown routes */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;

```

# src\App.test.js

```js
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

```

# src\components\Footer.jsx

```jsx
// Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-gray-300 text-center py-4 mt-8 border-t border-[#F51555]">
      <p>&copy; {new Date().getFullYear()} Focus Feed. All rights reserved.</p>
      <div className="flex justify-center gap-4 mt-2">
        <Link
          to="/"
          className="hover:text-[#F51555] transition-colors duration-300"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="hover:text-[#F51555] transition-colors duration-300"
        >
          About
        </Link>
        <Link
          to="/preferences"
          className="hover:text-[#F51555] transition-colors duration-300"
        >
          Preferences
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

```

# src\components\Header.jsx

```jsx
// Header.jsx
import React, { useEffect, useState, memo, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

const Header = memo(() => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);

  // Only show header if not on auth or onboarding pages.
  const headerVisible = !(
    location.pathname.startsWith("/auth") || location.pathname === "/onboarding"
  );
  if (!headerVisible) return null;

  // Update isShrunk on scroll.
  useEffect(() => {
    const handleScroll = () => {
      setIsShrunk(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle dropdown menu.
  const handleToggle = () => setOpen((prev) => !prev);

  // Close menu when clicking outside.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sign out function: closes menu, then signs out and reloads.
  const handleSignOut = async () => {
    try {
      setOpen(false);
      await signOut(auth);
      window.location.reload();   
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header
      className={`flex justify-end fixed w-[75%] h-[50px] rounded-[25px] text-white z-50 transition-all duration-300 ease-in-out ${
        isShrunk
          ? "shadow-none bg-none top-0"
          : "shadow-lg bg-[#FFFFFF1A] top-6"
      }`}
    >
      <nav className="leading-none flex gap-4 items-center w-[calc(100%-1.5rem)] h-full">
        <div
          className={`flex items-center text-[22px] font-black transition-all duration-300 ease-in-out pointer-events-none select-none ${
            isShrunk ? "max-w-full opacity-100" : "max-w-0 opacity-0"
          }`}
        >
          <span>FOCUS.</span>
          <span className="text-[#F51555]">FEED</span>
        </div>
        <div
          className={`w-[2px] bg-white transition-all duration-300 ease-in-out ${
            isShrunk ? "h-6" : "h-0"
          }`}
        ></div>
        <div
          className={`flex grow justify-between items-center transition-all duration-300 ease-in-out ${
            isShrunk ? "ml-0" : "-ml-8"
          }`}
        >
          <div className="flex gap-3 font-bold text-lg">
            <Link to="/">HOME</Link>
            <Link to="/about">ABOUT</Link>
          </div>
          <div className="flex items-center">
            <LightModeRoundedIcon sx={{ height: 24, width: 24 }} />
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                id="menu-button"
                aria-expanded={open}
                aria-haspopup="true"
                onClick={handleToggle}
                className="cursor-pointer"
              >
                <AccountCircleRoundedIcon
                  sx={{
                    height: 46,
                    width: 46,
                    marginLeft: 1,
                    marginRight: "2px",
                  }}
                />
              </button>
              <div
                className={`absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-none transition-all delay-100 duration-200 ease-in-out ${
                  open
                    ? "opacity-100 pointer-events-auto scale-100"
                    : "opacity-0 pointer-events-none scale-95"
                }`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
              >
                <div className="py-1" role="none">
                  <Link
                    to="/preferences"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 text-sm text-black hover:bg-gray-200"
                    role="menuitem"
                  >
                    Preferences
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      handleSignOut();
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-200"
                    role="menuitem"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
});

export default Header;

```

# src\components\Navbar.js

```js
// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
          {/* <h1>navbar af</h1> */}
        <li><Link to="/">Home</Link></li>
        <li><Link to="/preferences">Preferences</Link></li>
        <li><Link to="/about">About Us</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;

```

# src\components\ui\button 2.tsx

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-neutral-300",
  {
    variants: {
      variant: {
        default:
          "bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90",
        destructive:
          "bg-red-500 text-neutral-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90",
        outline:
          "border border-neutral-200 bg-white shadow-sm hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        secondary:
          "bg-neutral-100 text-neutral-900 shadow-sm hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80",
        ghost: "hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        link: "text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

```

# src\components\ui\button.tsx

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-neutral-300",
  {
    variants: {
      variant: {
        default:
          "bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90",
        destructive:
          "bg-red-500 text-neutral-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90",
        outline:
          "border border-neutral-200 bg-white shadow-sm hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        secondary:
          "bg-neutral-100 text-neutral-900 shadow-sm hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80",
        ghost: "hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        link: "text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

```

# src\components\ui\card 2.tsx

```tsx
import * as React from "react"

import { cn } from "../../lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-[15px] border border-neutral-200 bg-white text-neutral-950 shadow dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-neutral-500 dark:text-neutral-400", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

```

# src\components\ui\card.tsx

```tsx
import * as React from "react"

import { cn } from "../../lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-[15px] border border-neutral-200 bg-white text-neutral-950 shadow dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-neutral-500 dark:text-neutral-400", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

```

# src\components\ui\carousel 2.tsx

```tsx
import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "../../lib/utils";
import { Button } from "./button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)

      return () => {
        api?.off("select", onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute  h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-8 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ChevronLeft className="h-12 w-12 text-white" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-8 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ChevronRight className="h-12 w-12 text-white" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
})
CarouselNext.displayName = "CarouselNext"

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}

```

# src\components\ui\carousel.tsx

```tsx
import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "../../lib/utils";
import { Button } from "./button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)

      return () => {
        api?.off("select", onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute  h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-8 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ChevronLeft className="h-12 w-12 text-white" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-8 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ChevronRight className="h-12 w-12 text-white" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
})
CarouselNext.displayName = "CarouselNext"

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}

```

# src\components\ui\input.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

```

# src\components\ui\label.tsx

```tsx
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }

```

# src\components\ui\navigation-menu 2.tsx

```tsx
import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "relative z-10 flex max-w-max flex-1 items-center justify-center",
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className
    )}
    {...props}
  />
))
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = NavigationMenuPrimitive.Item

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus:bg-neutral-100 focus:text-neutral-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-neutral-100/50 data-[state=open]:bg-neutral-100/50 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 dark:focus:bg-neutral-800 dark:focus:text-neutral-50 dark:data-[active]:bg-neutral-800/50 dark:data-[state=open]:bg-neutral-800/50"
)

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}{""}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
))
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto",
      className
    )}
    {...props}
  />
))
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

const NavigationMenuLink = NavigationMenuPrimitive.Link

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border border-neutral-200 bg-white text-neutral-950 shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)] dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50",
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
))
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-neutral-200 shadow-md dark:bg-neutral-800" />
  </NavigationMenuPrimitive.Indicator>
))
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}

```

# src\components\ui\navigation-menu.tsx

```tsx
import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "relative z-10 flex max-w-max flex-1 items-center justify-center",
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className
    )}
    {...props}
  />
))
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = NavigationMenuPrimitive.Item

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus:bg-neutral-100 focus:text-neutral-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-neutral-100/50 data-[state=open]:bg-neutral-100/50 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 dark:focus:bg-neutral-800 dark:focus:text-neutral-50 dark:data-[active]:bg-neutral-800/50 dark:data-[state=open]:bg-neutral-800/50"
)

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}{""}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
))
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto",
      className
    )}
    {...props}
  />
))
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

const NavigationMenuLink = NavigationMenuPrimitive.Link

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border border-neutral-200 bg-white text-neutral-950 shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)] dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50",
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
))
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-neutral-200 shadow-md dark:bg-neutral-800" />
  </NavigationMenuPrimitive.Indicator>
))
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}

```

# src\components\ui\skeleton.tsx

```tsx
import React from "react";
import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-white/5 ", className)}
      {...props}
    />
  );
}

export { Skeleton };

```

# src\constants\preferences.js

```js
export const topicsOptions = [
  "Business",
  "Tech",
  "Fashion",
  "World",
  "Entertainment",
];

export const sourceOptions = [
  {
    name: "Economist",
    endpoint: "/economist-pick-of-day",
    image: "image1.webp",
  },
  { name: "AP", endpoint: "/AP-pick-of-day", image: "image2.webp" },
  { name: "Vogue", endpoint: "/vogue-pick-of-day", image: "image3.webp" },
  {
    name: "Rolling Stone",
    endpoint: "/rolling-stone-movies-tv-pick-of-day",
    image: "image4.webp",
  },
  { name: "People", endpoint: "/people-pick-of-day", image: "image5.webp" },
  {
    name: "Democracy Now",
    endpoint: "/democracy-now-pick-of-day",
    image: "image6.webp",
  },

  { name: "Weather News", endpoint: "/weather-news", image: "image7.webp" },
  { name: "SCMP", endpoint: "/SCMP-pick-of-day", image: "image8.webp" },
  {
    name: "SCMP China Top Story",
    endpoint: "/SCMP-china-top-story",
    image: "image9.webp",
  },
  {
    name: "Cosmo Style",
    endpoint: "/cosmo-style-pick-of-day",
    image: "image10.webp",
  },
  { name: "World News", endpoint: "/world-news", image: "image11.webp" },
  {
    name: "TechCrunch",
    endpoint: "/techcrunch-pick-of-day",
    image: "image12.webp",
  },
  { name: "ZDNet", endpoint: "/zdnet-pick-of-day", image: "image13.webp" },
  { name: "Yahoo Sports", endpoint: "/yahoo-sports", image: "image14.webp" },
  {
    name: "Weather Channel",
    endpoint: "/weather-channel-pick-of-day",
    image: "image15.webp",
  },
  {
    name: "Weather Gov",
    endpoint: "/weather-gov-pick-of-day",
    image: "image16.webp",
  },
  {
    name: "Yahoo Sports Recap",
    endpoint: "/yahoo-sports-recap",
    image: "image17.webp",
  },
//   {
//     name: "Yahoo Finance",
//     endpoint: "/yahoo-finance-pick-of-day",
//     image: "image18.webp",
//   }, // Getting 404
  {
    name: "Entertainment News",
    endpoint: "/entertainment-news",
    image: "image29.webp",
  },
  { name: "Forbes", endpoint: "/forbes-pick-of-day", image: "image20.webp" },
//   { name: "Finance News", endpoint: "/finance-news", image: "image21.webp" }, // Getting 404
  { name: "Fashion News", endpoint: "/fashion-news", image: "image22.webp" },
  { name: "Tech News", endpoint: "/tech-news", image: "image23.webp" },
];
```

# src\index.css

```css
/* @import "tailwindcss"; */

/* body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
} */

```

# src\index.jsx

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter> {/* Wrap App with BrowserRouter */}
      <App />
    </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


```

# src\lib\emails\FocusFeedNewsletter.tsx

```tsx
import { Html, Head, Body, Container, Text, Img, Link } from "@react-email/components";

export default function FocusFeedNewsletter({ article }) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#000", color: "#fff", padding: "20px" }}>
        <Container>
          {/* Focus Feed Header */}
          <Text style={{ fontSize: "28px", fontWeight: "bold", color: "#F51555" }}>
            FOCUS.FEED
          </Text>

          {/* Hero Section */}
          <Img src={article.image} alt="Hero" width="600" height="300" />
          <Text style={{ fontSize: "24px", fontWeight: "bold" }}>{article.title}</Text>
          <Text>{article.summary}</Text>
          <Link href={article.link} style={{ color: "#F51555", fontWeight: "bold" }}>
            Read More →
          </Link>
        </Container>
      </Body>
    </Html>
  );
}

```

# src\lib\emails\resendClient.ts

```ts
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

export const resend = new Resend(process.env.RESEND_API_KEY);

```

# src\lib\emails\sendEmail.ts

```ts
import { resend } from "./resendClient";

async function sendTestEmail() {
  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "sean.d.onamade@vanderbilt.edu",
      subject: "🚀 Welcome to Focus Feed!",
      text: "This is a test email from Resend. You're all set up!",
    });

    console.log("✅ Email sent successfully!");
    console.log("📩 Resend Response:", response);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
}

sendTestEmail();

```

# src\lib\emails\sendNewsletter.ts

```ts
import { resend } from "./resendClient";
import FocusFeedNewsletter from "./FocusFeedNewsletter";
import React from "react";
import ReactDOMServer from "react-dom/server";

async function fetchLatestArticle() {
  const response = await fetch("https://newsapi-r8fr.onrender.com/wired-pick-of-day");
  const data = await response.json();
  return {
    title: data.article_title,
    image: data.article_image,
    summary: data.article_text,
    link: data.article_link,
  };
}

async function sendNewsletter() {
  const article = await fetchLatestArticle();

  await resend.emails.send({
    from: "FocusFeed <news@focusfeed.com>",
    to: ["your-email@example.com"], // Replace with real subscribers
    subject: `🚀 ${article.title} – Your Daily Focus Feed`,
    html: ReactDOMServer.renderToStaticMarkup(<FocusFeedNewsletter article={article} />),
  });

  console.log("✅ Newsletter sent successfully!");
}

sendNewsletter();

```

# src\lib\emails\server.ts

```ts
import cron from "node-cron";
import { sendNewsletter } from "./sendNewsletter";

cron.schedule("0 8 * * *", async () => {
  console.log("Sending daily newsletter...");
  await sendNewsletter();
});
```

# src\lib\firebase.ts

```ts
// /lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRMVdnzDl6UrsTFZ8lmx0BCwQ7lj8naOc",
  authDomain: "focus-feed-132f8.firebaseapp.com",
  projectId: "focus-feed-132f8",
  storageBucket: "focus-feed-132f8.firebasestorage.app",
  messagingSenderId: "1027651751495",
  appId: "1:1027651751495:web:0232aae2971deed8caeb62",
  measurementId: "G-DCXB98HGWX",
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export const auth = getAuth();
export const db = getFirestore();

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Auth persistence set to local");
  })
  .catch((error) => {
    console.error("Error setting auth persistence:", error);
  });
```

# src\lib\utils.ts

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```

# src\logo.svg

This is a file of the type: SVG Image

# src\pages\About.jsx

```jsx
import React from 'react';

function About() {
  return (
    <div className="min-h-screen text-white p-4">
      <div className="max-w-4xl mx-auto rounded-2xl">
        <h1 className="text-4xl font-black text-center text-white mb-6">ABOUT US</h1>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-[#F51555]">Our Mission</h2>
          <p className="mt-2 text-gray-300">
            At Focus Feed, we believe that information is power — but only when it's accessible, reliable, and tailored to you. Our mission is to cut through the noise of the digital world, delivering concise, validated news summaries from trusted sources, all in one place.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-[#F51555]">What We Do</h2>
          <ul className="list-disc list-inside mt-2 text-gray-300">
            <li><strong>Summarize Topics:</strong> Using advanced AI models like LLAMA 3.1, we distill complex news stories into digestible summaries.</li>
            <li><strong>Validate Information:</strong> Our multi-source verification ensures the news you read is accurate and credible.</li>
            <li><strong>Personalize Content:</strong> Get news tailored to your interests with personalized newsletters and recommendations.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-[#F51555]">How It Works</h2>
          <ol className="list-decimal list-inside mt-2 text-gray-300">
            <li><strong>Web Scraping:</strong> We collect news from top outlets like Wired, AP, Vogue, and more.</li>
            <li><strong>AI-Powered Summarization:</strong> Sophisticated AI models provide concise, easy-to-read summaries.</li>
            <li><strong>Customizable Experience:</strong> Adjust preferences, subscribe to newsletters, and see friend recommendations.</li>
          </ol>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-[#F51555]">Meet the Team</h2>
          <p className="mt-2 text-gray-300">
            Focus Feed is crafted by a passionate team dedicated to revolutionizing news consumption through technology and innovation.
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-300">
            <li>Aidan Wendorf</li>
            <li>Zander Raycraft</li>
            <li>Brandon Chandler</li>
            <li>Jane Sun</li>
            <li>Sean Onamade</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-[#F51555]">Technologies We Use</h2>
          <p className="mt-2 text-gray-300">
            We utilize cutting-edge technologies like Next.js, Tailwind CSS, LLAMA 3.1, PyTorch, Firebase, and Vercel to bring Focus Feed to life.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#F51555]">Join Us on This Journey</h2>
          <p className="mt-2 text-gray-300">
            Focus Feed isn't just a news platform; it's a movement towards smarter, more efficient information consumption. Stay connected, stay informed, and let's reshape the future of news together.
          </p>
          <p className="mt-4 text-center text-[#F51555] font-bold">Your news. Your way. Every day.</p>
        </section>
      </div>
    </div>
);
}

export default About;
```

# src\pages\Auth\Onboarding.jsx

```jsx
// src/pages/Onboarding.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { topicsOptions, sourceOptions } from "@/constants/preferences";

const ListItem = React.forwardRef(({ title, isSelected, onClick }, ref) => (
  <button
    ref={ref}
    onClick={onClick}
    className={`m-1 text-sm px-4 py-1 rounded-full border transition-all duration-200 ${
      isSelected
        ? "bg-[#F51555] text-white hover:bg-[#e7284e]"
        : "bg-gray-200 text-black hover:bg-gray-300"
    }`}
  >
    {title}
  </button>
));
ListItem.displayName = "ListItem";

const Onboarding = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);
  const navigate = useNavigate();

  const toggleSelection = (item, selection, setSelection) => {
    // topics are simple strings; sources are objects
    if (typeof item === "string") {
      if (selection.includes(item)) {
        setSelection(selection.filter((i) => i !== item));
      } else {
        setSelection([...selection, item]);
      }
    } else {
      if (selection.some((i) => i.endpoint === item.endpoint)) {
        setSelection(selection.filter((i) => i.endpoint !== item.endpoint));
      } else {
        setSelection([...selection, item]);
      }
    }
  };

  const handleFinish = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      alert("You need to be signed in to complete onboarding.");
      return;
    }
    try {
      await setDoc(
        doc(db, "users", currentUser.uid),
        {
          topics: selectedTopics,
          sources: selectedSources,
          onboarded: true,
        },
        { merge: true }
      );
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Error saving onboarding preferences:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mt-[-6rem]">
      <h1 className="text-3xl font-bold mb-6 text-white">Onboarding</h1>
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">
          Select Your Topic Preferences
        </h2>
        <div className="flex flex-wrap">
          {topicsOptions.map((topic) => (
            <ListItem
              key={topic}
              title={topic}
              isSelected={selectedTopics.includes(topic)}
              onClick={() =>
                toggleSelection(topic, selectedTopics, setSelectedTopics)
              }
            />
          ))}
        </div>

        <h2 className="text-xl font-semibold mt-6 mb-4">
          Select Your News Source Preferences
        </h2>
        <div className="flex flex-wrap">
          {sourceOptions.map((source) => (
            <ListItem
              key={source.endpoint}
              title={source.name}
              isSelected={selectedSources.some(
                (s) => s.endpoint === source.endpoint
              )}
              onClick={() =>
                toggleSelection(source, selectedSources, setSelectedSources)
              }
            />
          ))}
        </div>

        <button
          onClick={handleFinish}
          className="mt-8 w-full rounded-md bg-[#F51555] px-3 py-2 text-sm font-semibold text-white shadow hover:bg-[#f74f7f] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Finish Onboarding
        </button>
      </div>
    </div>
  );
};

export default Onboarding;

```

# src\pages\Auth\SignIn.jsx

```jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";

// Adjust these import paths as needed based on your project structure
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      console.error("SignIn error:", err);
      setError(err.message || "Failed to sign in");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mt-[-6rem]">
      <h1 className="mt-4 mb-8 text-4xl font-black">
        <span className="text-white">FOCUS.</span>
        <span className="text-[#F51555]">FEED</span>
      </h1>
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow">
        <h1 className="text-2xl font-bold text-center">Sign In</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Sign In</Button>
        </form>
        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/auth/signup" className="text-[#F51555]">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

```

# src\pages\Auth\SignUp.jsx

```jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";

// Adjust these import paths as needed based on your project structure
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // In SignUp.jsx (excerpt)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Redirect to onboarding instead of home
      navigate("/onboarding");
    } catch (err) {
      console.error("SignUp error:", err);
      setError(err.message || "Failed to sign up");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mt-[-6rem]">
      <h1 className="mt-4 mb-8 text-4xl font-black">
        <span className="text-white">FOCUS.</span>
        <span className="text-[#F51555]">FEED</span>
      </h1>
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Sign Up</Button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/auth/signin" className="text-[#F51555]">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
```

# src\pages\Home.jsx

```jsx
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import axios from "axios";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

function Home() {
  const [isShrunk, setIsShrunk] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataArray, setDataArray] = useState([]);
  const [endpoints, setEndpoints] = useState([]);

  const handleScroll = () => {
    if (window.scrollY > 40) {
      setIsShrunk(true);
    } else {
      setIsShrunk(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch a primary article (wired-pick-of-day)
  useEffect(() => {
    axios
      .get("https://newsapi-r8fr.onrender.com/wired-pick-of-day")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  // Fetch the user's preferred sources from Firebase
  useEffect(() => {
    const fetchSources = async () => {
      try {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setEndpoints(userData.sources || []);
        }
      } catch (error) {
        console.error("Error fetching user sources:", error);
      }
    };
    fetchSources();
  }, []);

  // Once endpoints are loaded, fetch each source's data
  useEffect(() => {
    if (endpoints.length > 0) {
      Promise.all(
        endpoints.map(({ endpoint }) =>
          axios.get(`https://newsapi-r8fr.onrender.com${endpoint}`)
        )
      )
        .then((responses) => {
          const combinedData = responses.map((response, index) => ({
            data: response.data,
            endpoint: endpoints[index],
          }));
          setDataArray(combinedData);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [endpoints]);

  return (
    <div className="flex-col">
      <header className="text-center">
        <h1
          className={`mt-4 mb-8 text-4xl font-black transition-all duration-300 ease-in-out ${
            isShrunk ? "opacity-0" : "opacity-100"
          }`}
        >
          <span className="text-white">FOCUS.</span>
          <span className="text-[#F51555]">FEED</span>
        </h1>
      </header>

      <main className="flex-col justify-center px-[50px]">
        <section className="h-auto md:h-[390px] bg-[#FFFFFF1A] rounded-[15px] shadow-lg mb-5">
          <div className="flex flex-col md:flex-row w-full h-full p-1.5">
            <img
              src="../../images/image.png"
              alt="placeholder"
              className="object-cover w-full md:w-[50%] h-full rounded-[10px]"
            />
            <div className="w-full h-full p-4">
              {loading && (
                <div>
                  <Skeleton className="h-8 w-[80%] mb-5" />
                  <Skeleton className="h-20 w-full mb-3" />
                  <Skeleton className="h-24 w-full mb-3" />
                  <Skeleton className="h-16 w-[90%] mb-4" />
                  <Skeleton className="h-4 w-20 mb-2" />
                </div>
              )}
              <div
                className={`transition-opacity delay-50 duration-300 ease-in-out ${
                  loading ? "opacity-0" : "opacity-100"
                }`}
              >
                <h1 className="text-white text-2xl font-bold mb-4 line-clamp-[1]">
                  {data && data.article_title}
                </h1>
                <div className="text-white text-[16px] line-clamp-[10] mb-4">
                  {data &&
                    data.article_text.split("\n").map((line, index) => {
                      const bulletLine = line
                        .replace(/\*/g, "")
                        .replace(/^\d+\.\s*/, "• ");
                      return (
                        <p key={index} className="mb-2">
                          {bulletLine}
                        </p>
                      );
                    })}
                </div>
              </div>
              <a
                href={data ? data.article_link : ""}
                className={`text-[#F51555] text-[14px] font-bold transition-opacity delay-50 duration-300 ease-in-out ${
                  loading ? "opacity-0" : "opacity-100"
                }`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more {">"}
              </a>
            </div>
          </div>
        </section>
        <div className="font-bold text-white mt-12">TRENDING</div>
        <div className="h-[2px] w-full bg-[#ffffff7e]"></div>
        <section className="flex justify-center">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {dataArray.length === 0 &&
                Array.from({ length: endpoints.length }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="w-full py-4">
                      <Card className="h-[300px] bg-[#FFFFFF1A] border-none shadow-lg">
                        <CardContent className="flex-column h-full items-center justify-center p-1.5">
                          <Skeleton className="h-[50%] w-full mb-2 rounded-[10px]" />
                          <Skeleton className="h-[30px] w-full mb-1" />
                          <Skeleton className="h-[70px] w-full mb-2" />
                          <Skeleton className="h-[10px] w-20" />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              {dataArray.length > 0 &&
                dataArray.map((item, index) => (
                  <CarouselItem
                    key={index}
                    className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="w-full py-4">
                      <Card className="h-[300px] bg-[#FFFFFF1A] border-none shadow-lg">
                        <CardContent className="flex-column h-full items-center justify-center p-1.5">
                          <img
                            src={`../../home_images/${item.endpoint.image}`}
                            alt={`Image ${index + 1}`}
                            className="object-cover w-full h-[50%] rounded-[10px] mb-2"
                          />
                          <h1 className="text-white text-[13px] font-bold ml-1 line-clamp-[1]">
                            {item.data && item.data.article_title}
                          </h1>
                          <div className="text-white text-[12px] line-clamp-[5] m-1 mb-0">
                            {item.data?.article_text
                              ? item.data.article_text
                                  .split("\n")
                                  .map((line, index) => {
                                    const bulletLine = line
                                      .replace(/\*/g, "")
                                      .replace(/^\d+\.\s*/, "• ");
                                    return <p key={index}>{bulletLine}</p>;
                                  })
                              : `${item.endpoint.name} failed to fetch.`}
                          </div>
                          <a
                            href={item.data ? item.data.article_link : ""}
                            className="text-[#F51555] text-[12px] ml-1 font-bold"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Read more {">"}
                          </a>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious variant={"null"} />
            <CarouselNext variant={"null"} />
          </Carousel>
        </section>
        <div className="font-bold text-white mt-8">RECENT</div>
        <div className="h-[2px] w-full bg-[#ffffff7e]"></div>
        <section className="flex justify-center">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {dataArray.length === 0 &&
                Array.from({ length: endpoints.length }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="w-full py-4">
                      <Card className="h-[300px] bg-[#FFFFFF1A] border-none shadow-lg">
                        <CardContent className="flex-column h-full items-center justify-center p-1.5">
                          <Skeleton className="h-[50%] w-full mb-2 rounded-[10px]" />
                          <Skeleton className="h-[30px] w-full mb-1" />
                          <Skeleton className="h-[70px] w-full mb-2" />
                          <Skeleton className="h-[10px] w-20" />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              {dataArray.length > 0 &&
                dataArray.map((item, index) => (
                  <CarouselItem
                    key={index}
                    className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="w-full py-4">
                      <Card className="h-[300px] bg-[#FFFFFF1A] border-none shadow-lg">
                        <CardContent className="flex-column h-full items-center justify-center p-1.5">
                          <img
                            src={`../../home_images/${item.endpoint.image}`}
                            alt={`Image ${index + 1}`}
                            className="object-cover w-full h-[50%] rounded-[10px] mb-2"
                          />
                          <h1 className="text-white text-[13px] font-bold ml-1 line-clamp-[1]">
                            {item.data && item.data.article_title}
                          </h1>
                          <div className="text-white text-[12px] line-clamp-[5] m-1 mb-0">
                            {item.data?.article_text
                              ? item.data.article_text
                                  .split("\n")
                                  .map((line, index) => {
                                    const bulletLine = line
                                      .replace(/\*/g, "")
                                      .replace(/^\d+\.\s*/, "• ");
                                    return <p key={index}>{bulletLine}</p>;
                                  })
                              : `${item.endpoint.name} failed to fetch.`}
                          </div>
                          <a
                            href={item.data ? item.data.article_link : ""}
                            className="text-[#F51555] text-[12px] ml-1 font-bold"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Read more {">"}
                          </a>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious variant={"null"} />
            <CarouselNext variant={"null"} />
          </Carousel>
        </section>
      </main>
    </div>
  );
}

export default Home;
```

# src\pages\NotFound.jsx

```jsx
import React from 'react';

function NotFound() {
  return <h1>404 - Page Not Found</h1>;
}

export default NotFound;

```

# src\pages\Preferences.jsx

```jsx
// src/pages/Preferences.jsx
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { db, auth } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { topicsOptions, sourceOptions } from "@/constants/preferences";

function Preferences() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("");
  const [topics, setTopics] = useState([]);
  const [sources, setSources] = useState([]);
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const user = auth.currentUser; // Get authenticated user
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    language: "",
    topics: [],
    sources: [],
  });

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      const fetchUserData = async () => {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setInitialValues({
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            email: user.email || "",
            language: userData.language || "",
            topics: userData.topics || [],
            sources: userData.sources || [],
          });
          setFirstName(userData.firstName || "");
          setLastName(userData.lastName || "");
          setLanguage(userData.language || "");
          setTopics(userData.topics || []);
          setSources(userData.sources || []);
        }
      };
      fetchUserData();
    }
  }, [user]);

  const toggleSelection = (item, setSelection, selection) => {
    // topics are strings; sources are objects
    if (typeof item === "string") {
      if (selection.includes(item)) {
        setSelection(selection.filter((i) => i !== item));
      } else {
        setSelection([...selection, item]);
      }
    } else {
      if (selection.some((i) => i.endpoint === item.endpoint)) {
        setSelection(selection.filter((i) => i.endpoint !== item.endpoint));
      } else {
        setSelection([...selection, item]);
      }
    }
  };

  const ListItem = React.forwardRef(({ title, isSelected, onClick }, ref) => (
    <button
      ref={ref}
      onClick={onClick}
      className={`m-1 text-sm px-4 py-1 rounded-full border transition-all duration-200 ${
        isSelected
          ? "bg-[#F51555] text-white hover:bg-[#e7284e] active:bg-gray-200 active:text-black"
          : "bg-gray-200 text-black hover:bg-gray-300 active:bg-[#F51555] active:text-white"
      }`}
    >
      {title}
    </button>
  ));

  const handleSave = async () => {
    if (user) {
      try {
        const userRef = doc(db, "users", user.uid);
        await setDoc(
          userRef,
          {
            firstName,
            lastName,
            language,
            topics,
            sources,
          },
          { merge: true }
        );
        if (newPassword) {
          if (!currentPassword) {
            alert("Please enter your current password to update.");
            return;
          }
          const credential = EmailAuthProvider.credential(
            user.email,
            currentPassword
          );
          await reauthenticateWithCredential(user, credential);
          await updatePassword(user, newPassword);
          alert("Password updated successfully.");
        }
        alert("Preferences saved!");
      } catch (error) {
        if (error.code === "auth/wrong-password") {
          alert("Incorrect current password. Please try again.");
        } else if (error.code === "auth/too-many-requests") {
          alert("Too many failed attempts. Please try again later.");
        } else {
          console.error("Error updating preferences:", error);
          alert("Failed to update preferences.");
        }
      }
    }
  };

  return (
    <div className="flex-col px-[50px] space-y-12">
      <header className="text-center">
        <h1 className="mt-4 mb-8 text-4xl font-black text-white">
          PREFERENCES
        </h1>
      </header>

      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="font-semibold text-2xl text-white">
          Personal Information
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm/6 font-medium text-white"
            >
              First name
            </label>
            <div className="mt-2">
              <input
                id="first-name"
                name="first-name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="last-name"
              className="block text-sm/6 font-medium text-white"
            >
              Last name
            </label>
            <div className="mt-2">
              <input
                id="last-name"
                name="last-name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-white"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                disabled
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="language"
              className="block text-sm/6 font-medium text-white"
            >
              Language
            </label>
            <div className="mt-2 grid grid-cols-1">
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900"
              >
                <option value="">Select Language</option>
                <option>English</option>
                <option>Spanish</option>
                <option>Mandarin</option>
              </select>
            </div>
          </div>
          {/* Change Password Section */}
          <div className="col-span-full">
            <h2 className="text-white text-2xl font-semibold mb-4">
              Change Password
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-8">
              <div className="sm:col-span-3">
                <label
                  htmlFor="current-password"
                  className="block text-sm font-medium text-white"
                >
                  Current Password
                </label>
                <div className="mt-2">
                  <input
                    id="current-password"
                    type="password"
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white"
                >
                  New Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="font-semibold text-2xl text-white">News Preferences</h2>
        <div className="mt-10">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className="cursor-default"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  Topics
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="gap-3 p-1 md:w-[400px] lg:w-[500px] flex-wrap">
                    {topicsOptions.map((topic) => (
                      <ListItem
                        key={topic}
                        title={topic}
                        isSelected={topics.includes(topic)}
                        onClick={() =>
                          toggleSelection(topic, setTopics, topics)
                        }
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className="cursor-default"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  News Sources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="gap-3 p-1 md:w-[400px] lg:w-[500px] max-h-40 flex-wrap overflow-y-auto">
                    {sourceOptions.map((source) => (
                      <ListItem
                        key={source.endpoint}
                        title={source.name}
                        isSelected={sources.some(
                          (s) => s.endpoint === source.endpoint
                        )}
                        onClick={() =>
                          toggleSelection(source, setSources, sources)
                        }
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6 pb-12">
        <button
          type="button"
          onClick={() => {
            setFirstName(initialValues.firstName);
            setLastName(initialValues.lastName);
            setLanguage(initialValues.language);
            setTopics(initialValues.topics);
            setSources(initialValues.sources);
          }}
          className="text-sm/6 font-semibold text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleSave}
          className="rounded-md bg-[#F51555] px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-[#f74f7f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Preferences;

```

# src\pages\sev_test_ml.js

```js
import React from 'react';

function SEV_TEST_ML() {
  return <h1>Testing compaitbility w/ backend</h1>;
}

export default SEV_TEST_ML;


```

# src\reportWebVitals.js

```js
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;

```

# src\setupTests.js

```js
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

```

# tailwind.config.js

```js
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

```

# tldr-app\src\pages\About.jsx

```jsx
import React from 'react';

function About() {
  return (
    <div className="min-h-screen text-white p-8">
      {/* <div className="max-w-4xl mx-auto mx-auto bg-[#1a1a1a] shadow-xl rounded-2xl p-8"> */}
      <div className="max-w-4xl mx-auto mx-auto rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-center text-[#F51555] mb-6">About Us</h1>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-[#F51555]">Our Mission</h2>
          <p className="mt-2 text-gray-300">
            At Focus Feed, we believe that information is power — but only when it's accessible, reliable, and tailored to you. Our mission is to cut through the noise of the digital world, delivering concise, validated news summaries from trusted sources, all in one place.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-[#F51555]">What We Do</h2>
          <ul className="list-disc list-inside mt-2 text-gray-300">
            <li><strong>Summarize Topics:</strong> Using advanced AI models like LLAMA 3.1, we distill complex news stories into digestible summaries.</li>
            <li><strong>Validate Information:</strong> Our multi-source verification ensures the news you read is accurate and credible.</li>
            <li><strong>Personalize Content:</strong> Get news tailored to your interests with personalized newsletters and recommendations.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-[#F51555]">How It Works</h2>
          <ol className="list-decimal list-inside mt-2 text-gray-300">
            <li><strong>Web Scraping:</strong> We collect news from top outlets like Wired, AP, Vogue, and more.</li>
            <li><strong>AI-Powered Summarization:</strong> Sophisticated AI models provide concise, easy-to-read summaries.</li>
            <li><strong>Customizable Experience:</strong> Adjust preferences, subscribe to newsletters, and see friend recommendations.</li>
          </ol>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-[#F51555]">Meet the Team</h2>
          <p className="mt-2 text-gray-300">
            Focus Feed is crafted by a passionate team dedicated to revolutionizing news consumption through technology and innovation.
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-300">
            <li>Aidan Wendorf</li>
            <li>Zander Raycraft</li>
            <li>Brandon Chandler</li>
            <li>Jane Sun</li>
            <li>Sean Onamade</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-[#F51555]">Technologies We Use</h2>
          <p className="mt-2 text-gray-300">
            We utilize cutting-edge technologies like Next.js, Tailwind CSS, LLAMA 3.1, PyTorch, Firebase, and Vercel to bring Focus Feed to life.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#F51555]">Join Us on This Journey</h2>
          <p className="mt-2 text-gray-300">
            Focus Feed isn't just a news platform; it's a movement towards smarter, more efficient information consumption. Stay connected, stay informed, and let's reshape the future of news together.
          </p>
          <p className="mt-4 text-center text-[#F51555] font-bold">Your news. Your way. Every day.</p>
        </section>
      </div>
    </div>
);
}

export default About;
```

# tsconfig.app.json

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "jsx": "react-jsx"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}

```

# tsconfig.json

```json
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.node.json"
    }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "target": "es5",
    "module": "commonjs",
    "jsx": "react", // or "react-jsx" for React 17+
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}

```

# tsconfig.node.json

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "target": "ESNext",
    "module": "CommonJS",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

# vite.config.js

```js
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "index.html",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

```

