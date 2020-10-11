const axios = require('axios');
const env = require('../env');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const dirPath = path.join(__dirname, './private.key');
const privateKey = fs.readFileSync(dirPath, 'utf8');


exports.createJwt = (req, res) => {

    let now = (Date.now() / 1000).toFixed(0)
    let hourNow = new Date().getHours()

    let exp = (new Date().setHours(hourNow + 1) / 1000).toFixed(0)

    let jwt_playload = `{
            "iss": "minisomexico@minisomexico-1563313715343.iam.gserviceaccount.com",
            "scope": "https://www.googleapis.com/auth/business.manage",
            "aud": "https://oauth2.googleapis.com/token",
            "exp": ${exp},
            "iat": ${now}
        }`

    let token = jwt.sign(jwt_playload, privateKey, { algorithm: 'RS256' });
    
    let url = {
        method: 'post',
        url: 'https://oauth2.googleapis.com/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: 'grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=' + token
    };

    axios(url)
        .then((response) => {
            console.log('Get realizado com Sucesso => ', response.data)
            return res.json(response.data)
        })
        .catch((error) => { return res.json(error) })
}