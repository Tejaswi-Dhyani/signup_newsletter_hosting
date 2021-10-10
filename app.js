const { Console } = require('console');
const { response } = require('express');
const express=require('express');
const app=express();
// native node module 
const https=require('https');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/signup.html");
});
app.post("/",(req,res)=>{
    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const Emails = req.body.email;
    const data={
        members: [
            {
            email_address: Emails,
              status: "subscribed",
                merge_fields: {
                FNAME: firstname,
                LNAME: lastname
                            }
            }
                ]
                 }
           
const jsondata=JSON.stringify(data);
const url="https://us5.api.mailchimp.com/3.0/lists/4e9b045bbd";
const options={
    method: "POST",
    auth: "tejaswi12:a0deef9c684fb9ebb79da8af2fa90c42-us5"
}

const request=https.request(url,options,(response)=>{
    if(response.statusCode===200){
    res.sendFile(__dirname + "/success.html") }
       else{
        res.sendFile(__dirname + "/failure.html");
    } 
response.on("data",(data)=>{
console.log(JSON.parse(data))
})
})
request.write(jsondata);
request.end();
});


app.post("/failure",(req,res)=>{
res.redirect("/")
});

app.listen(process.env.PORT || 3000, ()=>{
    console.log("server listening at port ");
    });

    // a0deef9c684fb9ebb79da8af2fa90c42-us5             ----mailchimp API key
    // 4e9b045bbd            -----unique id for audience/list id
