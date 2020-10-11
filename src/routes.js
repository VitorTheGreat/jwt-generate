module.exports = (app) => {
    const token = require('./controllers/tokenController');

    //- aviseMe Routes
    app.route('/jwttoken').get(token.createJwt);
    
}