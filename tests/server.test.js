const request = require('supertest');
const app = require('../server');

describe('API server', () => {
    test('GET / retourne un message de bienvenue', async() => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toContain('Bienvenue');
    });

    test('GET / health retourne le statut du serveur', async() => {
        const response = await request(app).get('/health');
        expect(response.body.status).toBe('OK');
        expect(response.body).toHaveProperty('uptime');
    });

    test('GET / /api/calculator/add/5/3 retourne 8', async() => {
        const response = await request(app).get('/api/calculator/add/5/3');
        expect(response.statusCode).toBe(200);
        expect(response.body.result).toBe(8);
        expect(response.body.operation).toBe('addition');
    });

    test('GET /api/calculator/add/invalid/invalid retourne une éreur', async() => {
        const response = await request(app).get('/api/calculator/add/invalid/invalid');
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('paramètres invalides');
    });

    test('Route inexistante retourne 404', async() => {
        const resonse = await request(app).get('/inexistant');
        expect(resonse.statusCode).toBe(404);
    })
})