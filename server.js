const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://anima:usabilidade@muito-gostoso.svlyl.mongodb.net/?retryWrites=true&w=majority";
var idReceita;

MongoClient.connect(uri, (err, client) => {
    if (err) return console.log(err);
    db = client.db('muito-gostoso');

    app.listen(3000, function () {
        console.log('server running on port 3000');
    });
});

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {

    db.collection('a1Data').findOne(req.body, (err, result) => {
        console.log(result._id)
        db.collection('a1Data').findOne(result._id, (err, result) => {
            res.render('index.ejs', {
                rnome: result.nome_receita,
                rporcoes: result.porcoes,
                rcategoria: result.categoria,
                ringredientes: result.ingredientes,
                rpreparo: result.modo_preparo,
                tppreparo: result.tpreparo
            })
        })
    })
});

app.get('/cadastro-receita', (req, res) => {
    var cursor = db.collection('a1Data').find()
})

app.get('/show', (req, res) => {
    db.collection('a1Data').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show.ejs', {
            data: results
        })

    })
})

app.get('/vocesEnv', (req, res) => {
    db.collection('a1Data').findOne(req.body, (err, result) => {
        res.render('vocesEnv.ejs', {
            rnome: result.nome_receita,
            rporcoes: result.porcoes,
            rcategoria: result.categoria,
            ringredientes: result.ingredientes,
            rpreparo: result.modo_preparo,
            tppreparo: result.tpreparo
        })
    })
});

app.get('/pe-de-moleque-microondas', (req, res) => {
    res.render('pe-de-moleque-microondas.ejs');
});

app.get('/pudim-leite-em-po', (req, res) => {
    res.render('pudim-leite-em-po.ejs');
});

app.get('/canelone-invertido', (req, res) => {
    res.render('canelone-invertido.ejs');
});

app.get('/enroladinho-presunto-queijo', (req, res) => {
    res.render('enroladinho-presunto-queijo.ejs');
});

app.get('/couve-refogada', (req, res) => {
    res.render('couve-refogada.ejs');
});

app.get('/bolo-umido-limao', (req, res) => {
    res.render('bolo-umido-limao.ejs');
});

app.get('/bacon-sem-fumaca', (req, res) => {
    res.render('bacon-sem-fumaca.ejs');
});

app.get('/blog', (req, res) => {
    res.render('blog.ejs');
});

app.get('/cadastro-receitas', (req, res) => {
    res.render('cadastro-receita.ejs');
});

app.get('/cadastro-sucesso', (req, res) => {
    res.render('cadastro-sucesso.ejs');
});

app.post('/success', (req, res) => {
    db.collection('a1Data').insertOne(req.body, (err, result) => {
        if (err) return console.log(err);
        console.log('Salvo com sucesso')
        res.render('cadastro-sucesso.ejs', {
            rnome: req.body.nome_receita,
            rporcoes: req.body.porcoes,
            rcategoria: req.body.categoria,
            ringredientes: req.body.ingredientes,
            rpreparo: req.body.modo_preparo,
            tppreparo: req.body.tpreparo
        })
    })
})

app.get('/delete', (req, res) => {
    db.collection('a1Data').findOne(req.body, (err, result) => {
        console.log(result._id)
        var id = result._id
        db.collection('a1Data').deleteOne({
            _id: id
        }, (err, result) => {
            if (err) return console.log(err);
            console.log('Deletado com sucesso')
        })
    })
    db.collection('a1Data').findOne(req.body, (err, result) => {
        res.render('index.ejs', {
            rnome: result.nome_receita,
            rporcoes: result.porcoes,
            rcategoria: result.categoria,
            ringredientes: result.ingredientes,
            rpreparo: result.modo_preparo,
            tppreparo: result.tpreparo
        })
    })
});