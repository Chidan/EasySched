module.exports = {
    development: {
        //db: 'mongodb://localhost/passport-tut',
        app: {
            name: 'Taskimos'
        },
        facebook: {
            clientID: "652785881439646",
            clientSecret: "514fb612ccf3ee4b69c4a5b9da3be3ac",
            callbackURL: "http://localhost:8001/auth/facebook/callback"
        }
    },
    production: {
        db: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL,
        app: {
            name: ''
        },
        facebook: {
            clientID: "clientID",
            clientSecret: "clientSecret",
            callbackURL: "{{production callbackURL}}"
        }
    }
}