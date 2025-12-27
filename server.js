import express from 'express';
import path from 'path';    
import pkg from '@prisma/client';

const app = express();

const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static('public'));


app.get('/', (req, res) => {   

    res.sendFile(path.resolve('public/index.html'));

});

app.get('/all/devs', async (req, res) => {
    const devs = await prisma.dev.findMany();
    res.json(devs)
});

app.post('/cret/dev', async (req, res) => {
    const {nome , skills, img} = req.body;
    const newDev = await prisma.Dev.create({
        data: {nome, skills, img}
    });
    res.json(newDev);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});