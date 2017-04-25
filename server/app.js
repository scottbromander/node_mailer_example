var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

app.set('port', (process.env.PORT || 5000));

app.use(express.static('./server/public/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '', //YOUR GMAIL USER HERE -> EXAMPLE@gmail.com
        pass: ''  //YOUR GMAIL PASSWORD, DO NOT HOST THIS INFO ON GITHUB!
    }
});

app.post('/mail', function(req,res){
    var mailer = req.body;

    var mailOptions = {
        from: '', // sender address -> //YOUR GMAIL USER HERE -> EXAMPLE@gmail.com
        to: mailer.toEmail, // list of receivers
        subject: mailer.subject, // Subject line
        text: mailer.message, // plain text body
        html: '<b>' + mailer.message + '</b>' // html body
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });

    res.send(200);
});



app.get('/', function(req,res){
    res.sendFile(path.resolve('./server/public/views/index.html'));
});

app.listen(app.get('port'), function(){
    console.log('Listening on port: ', app.get('port'));
});
