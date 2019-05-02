const db = require('../models');
// console.log(db);
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

    app.post('/_api/user', (req, res) => {
        console.log("Will create user soon");
        db.User.create(req.body)
        .then( dbUser => {
            console.log(dbUser);
            res.json(dbUser);
        })
        .catch( error => {
            console.log(error);
            res.json({"message": "Make sure that this noise does not drive me nuts!"});
        });
        
    });

    app.post('/_api/user/login', (req, res) => {
        // we will fill this in with passport
    });

    app.get('/_api/user', (req, res) => {
        // req.user comes from passport
        if(req.user){
            let temp = {};
            // a secure way to filter your object properties
            // only expose what you need to expose
            temp.email = req.user.email;
            temp.name = req.user.name;
            res.json(temp);
        }
        else{
            res.json(false);
        }
    });
}