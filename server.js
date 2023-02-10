const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const handlebars = require('express-handlebars');

app.set('view engine', 'handlebars');

app.engine('handlebars', handlebars({
    layoutsDir: `${__dirname}/views/layouts`
}));
app.use(express.static('public'));



app.get('/', (req,res) => {
    res.render('homepage', {layout: 'main'})
})

app.listen(PORT, () =>
console.log(
  `\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`
)
);


// app.use(express.static(path.join(__dirname, 'public')));
// app.engine('handlebars', hbs.engine);

// const hbs = exphbs.create({ helpers });
// const exphbs = require('express-handlebars');