const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.json({
        message: 'Bienvenue sur mon API Node.js de test jenkins',
        version: '1.0.0', 
        timestamp: new Date().toISOString()
    });
});

app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

app.get('/api/calculator/add/:a/:b', (req, res) => {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);

    if(isNaN(a) || isNaN(b)){
        return res.status(400).json({error: 'paramètres invalides'});
    }

    res.json({
        operation: 'addition',
        a: a,
        b: b,
        result: a + b
    });
});

app.get('/api/calculator/multiply/:a/:b', (req, res) => {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);

    if(isNaN(a) || isNaN(b)){
        return res.status(400).json({error: 'Paramètres invalides'});
    }

    res.json({
        operation: 'multiplication',
        a: a,
        b: b,
        result: a * b
    });
});

app.use('*', (req, res) => {
    res.status(404).json({error: 'Route non trouvée'})
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`)
});


module.exports = app;