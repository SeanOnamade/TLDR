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


