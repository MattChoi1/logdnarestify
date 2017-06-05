# logdnarestify

This is done based on instructions from Challenge.txt from LogDNA. <br />
I have adjusted some of the API calls to make it more intuitive however. <br />
I gained a great insight into how API works and the basic fuctionality of Restify.js. <br />

First install tools  <br/>

```
npm install restify
npm install mongoose
```

This program is designed to perform the following functions.
1. /time/set   (POST Method)
-Originially I was supposed to input id as well as UTC time in parameters.
-But I thought that inputting required variables in body will be more intuitive.
Following is the schema of the data object.

```
{
	"_id"(required): Number, 
	"UTCTime"(required [format hh:mm:ss]): String,
	"Zone"(required): String,
	"CurrentTime"(not required): String 
}
```

2. /time/get/:id (GET Method)
-given the value of a unique id, it searches the database and displays a document that matches with the ID
3. /time/delete/:id (DELETE Method)
-given the value of a unique id, it searches the database and removes a document that matches with the ID
<br />
All tests were performed with Postman.<br />
If you have any questions please let me know via:<br />
email: kjw9411@berkeley.edu<br />
phone: 415-909-8188<br />
<br />
<br />
Thank you!
