const path = require('path');
const rootDir = require('../util/path');

exports.signUp = (req, res, next)=>{

    res.sendFile(path.join(rootDir, "views", "sign_up.html"));
    
}