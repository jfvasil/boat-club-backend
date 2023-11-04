const whitelist = [
   
    'http://localhost:3002',
    'http://localhost:3500',
    'http://localhost:3000',
    'http://localhost:3001',
    'https://wickaboagboatclub.netlify.app',
    'https://wickaboagboatclub.netlify.app/login',
    
    
];

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true
}

module.exports = corsOptions;