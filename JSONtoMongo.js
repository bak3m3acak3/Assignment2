'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

/* Connect to your database using mongoose - remember to keep your key secret*/
//see https://mongoosejs.com/docs/connections.html
//See https://docs.atlas.mongodb.com/driver-connection/

mongoose.connect(config.db.uri);





// const MongoClient = require('mongodb').MongoClient;
// const uri = config.db.uri;
// const client = new MongoClient(uri, {useNewUrlParser: true});



// client.connect(err => {
//   const collection = client.db("").collection("");

//   client.close();
// })


/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
  //see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

  Remember that we needed to read in a file like we did in Bootcamp Assignment #1.
 */
var listingData;
function write_to_db(data) {
  var entries = data.entries;
  entries.forEach(function(element) {
    var listing = new Listing(element);
    listing.save(function(err) {if (err) console.log('Error! Didnt save!')});
  });
}

fs.readFile('listings.json', function(err, data) {
  if (err) throw err;
  listingData = JSON.parse(data);
  write_to_db(listingData);
});



/*  
  Check to see if it works: Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */