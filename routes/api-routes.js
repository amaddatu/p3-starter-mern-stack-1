// const db = require('../models');
// db ???
module.exports = function (app, passport){
    app.get("/_api/non-cached", (req, res) => {
        res.json({ random: Math.random() });
    });
    app.get("/api/cached", (req, res) => {
        res.json({ random: Math.random() });
    });

    app.get('/_auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));
    
    app.get('/_auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect(process.env.GOOGLE_CALLBACK_REDIRECT);
    });

    app.get('/_api/user', (req, res) => {
        if(req.user){
            let temp = {};
            temp.email = req.user.email;
            res.json(temp);
        }
        else{
            res.json(false);
        }
    });
}