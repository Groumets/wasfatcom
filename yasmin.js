app.get('/login', loginPage);
app.get('/BMI', setInfo);
app.get('/search', setSearch);
app.post('/test', bmi);

function loginPage(req, response) {
    response.render('login');

}
function setInfo(req, response) {
    response.render('info');
}
function setSearch(req, response) {
    response.render('search');

}

function bmi(req, response) {
    let weightForm = (req.body.weight)
    let heightForm = (req.body.height)
    console.log(`${weightForm} , ${heightForm} this is`);

    var unirest = require("unirest");
    var req = unirest("GET", "https://gabamnml-health-v1.p.rapidapi.com/bmi");
    req.query({
        "height": heightForm,
        "weight": weightForm

    });
    req.headers({
        "x-rapidapi-host": "gabamnml-health-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.X_RAPIDAPI_KEY
    });
    req.end(function (res) {
        if (res.error) throw new Error(res.error);
        console.log(res.body);
        response.render('test', { obj: res.body });
    });

}