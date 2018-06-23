const express = require('express'),
      hbs = require('hbs'),
      fs = require('fs');

const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// next - when does the middleware ends, allow you to use more than one middlewares
// it will not move on with the app until next is called
// keeps track on how to app works
app.use((req, res, next) => {
    let now = new Date().toString();
    let log = console.log(`${now}: ${req.method} ${req.url}`);
    
    console.log(log);
    fs.appendFileSync('server.log', log + '\n', (err) => {
        if(err) {console.log('unable to append to server.log');}
    });
    next();
});

// app.use((req, res, next) => { 
//     res.render('maintenance.hbs', {
//         pageTitle: 'maintenance'
//     });
//     // next();
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// app.get('/', (request, response) =>{
//   //  response.send('<h1>Hello express!</h1>')
// //   response.send({
// //       name: 'Sarit',
// //       likes: [
// //           'Dogs',
// //           'Yoga',
// //           'Node'
// //       ]
// //   })
// });

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About',
    });
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcome: 'Hi, feel free to look around',
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'projects',
        welcome: 'All of my personal projects',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        err: 'Oh god I have no idea what happened!'
    });
})

// binds the app to a port on the machine
app.listen(port, () =>{
    console.log(`Serve is up on port ${port}`);
});