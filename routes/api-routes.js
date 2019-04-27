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
        res.redirect('/');
    });
}