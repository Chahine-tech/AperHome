require('dotenv').config()

import { Router } from 'express'
const api = Router()
const cookieParser = require('cookie-parser')

// Google Auth
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '333642631602-h2l1m29lfb5c1d0dta76nvv4so4bjeo4.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);



// Middleware

api.set('view engine', 'ejs');
api.use(express.json());
api.use(cookieParser());
api.use(express.static('public'));

api.get('/', (req, res)=>{
    res.render('index')
})

api.get('/login', (req,res)=>{
    res.render('login');
})

api.post('/login', (req,res)=>{
    let token = req.body.token;

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
      }
      verify()
      .then(()=>{
          res.cookie('session-token', token);
          res.send('success')
      })
      .catch(console.error);

})

api.get('/profile', checkAuthenticated, (req, res)=>{
    let user = req.user;
    res.render('profile', {user});
})

api.get('/protectedRoute', checkAuthenticated, (req,res)=>{
    res.send('This route is protected')
})

api.get('/logout', (req, res)=>{
    res.clearCookie('session-token');
    res.redirect('/login')

})


function checkAuthenticated(req, res, next){

    let token = req.cookies['session-token'];

    let user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        user.name = payload.name;
        user.email = payload.email;
        user.picture = payload.picture;
      }
      verify()
      .then(()=>{
          req.user = user;
          next();
      })
      .catch(err=>{
          res.redirect('/login')
      })

}

export default api