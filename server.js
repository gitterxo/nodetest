const express = require('express');
const hbs = require('hbs'); // handlebars - e un fel de jade
const fs = require('fs');
const port = process.env.PORT || 3000; // heroku o sa isi puna singur; daca nu exista punem 3000

var app = express();

hbs.registerPartials(__dirname + '/views/partials'); // chestii folosite in toate templateurile

app.set('view engine', 'hbs');
//foloseste middleware din express, se pot face si thirdparty

//middleware pt express
//logger middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append log file');
        }
    });
    console.log(log);
    next(); // merge mai departe, altfel se blocheaza daca nu exista next
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
//     //pt ca nu dau next orice request se blocheaza
//     //app.use se executa in ordine. directorul public o sa fie accesibil chiar daca folosesc aici maintenance. daca vreau sa schimb asta trebuie sa pun callul de public sub asta
//
// });

app.use(express.static(__dirname + '/public')); // asa folosesti un folder static direct accesibil - merge cu images si cu orice - aici in exemplu deschide un fisier html asa: http://localhost:3000/help.html


hbs.registerHelper('getCurrentyear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// asa inregistrezi un handler
app.get('/', (req, res) => {
    // res.send('<h1>Hello Express</h1>');
    //  res.send({
    //     name: 'Dorin',
    //     likes: [
    //         'theatre',
    //         'music',
    //         'programming',
    //         'travel'
    //     ]
    //  });
    //home.hbs
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(port, () => {
    console.log('Server is up on port 3000');
});
