var path = require('path'),
    routes = require('./routes'),
    exphbs = require('express-handlebars'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    moment = require('moment'),
    multer = require('multer');

fs = require('fs');

module.exports = function (app) {
    app.engine('handlebars', exphbs.create({
        defaultLayout: 'main',
        layoutsDir: app.get('views') + '/layouts',
        partialsDir: [app.get('views') + '/partials'],
        helpers: {
            timeago: function (timestamp) {
                console.log(timestamp);
                return moment(timestamp).startOf('minute').fromNow();
            }
        }
    }).engine);
    app.set('view engine', 'handlebars');

    app.use(morgan('dev'));






    // app.use(bodyParser()); //Now deprecated
    // You now need to call the methods separately

    // If you're still getting a warning with urlencoded you need to use 'extended' option
    // https://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());








    app.use(multer({ dest: path.join(__dirname, 'public/upload/temp') }));

    app.use(methodOverride());
    app.use(cookieParser('some-secret-value-here'));
    routes.initialize(app);

    //	Ensure	the	temporary	upload	folders	exist
    // uncomment when deploying to cloud	
    /* fs.mkdir(path.join(__dirname, '../public/upload'),
        (err) => {
            console.log(err);
            fs.mkdir(path.join(__dirname,
                '../public/upload/temp'),
                (err) => {
                    console.log(err);
                });
        });
     */

    app.use('/public/', express.static(path.join(__dirname, '../public')));

    if ('development' === app.get('env')) {
        app.use(errorHandler());
    }

    return app;
};

