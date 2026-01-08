import express from 'express';
import path from 'path';    
import cors from "cors";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static('public'));


app.get('/', (req, res) => {   

    res.sendFile(path.resolve('public/index.html'));

});

app.get('/all/produtos', async (req, res) => {
    const produtos = req.params;
    try{

        const response = await fetch(`${process.env.API_URL}`);

   
    const data = await response.json();
    res.json(data);
       }catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar dados externos" });
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});