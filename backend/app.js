import express from 'express'
import fs from 'node:fs/promises'
import bodyParser from 'body-parser'

const app = express();
app.use(express.static('images'));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.get('/films',async(req,res)=>{
    const fileContent = await fs.readFile('./films.json')
    const filmData = JSON.parse(fileContent)
    res.status(200).json({films:filmData})
})
app.get('/user-films',async(req,res)=>{
    const fileContent = await fs.readFile('./user-films.json')
    const films = JSON.parse(fileContent)
    res.status(200).json({films})
})
app.put('/user-films', async (req, res) => {
    const films = req.body.films;
  
    await fs.writeFile('./user-films.json', JSON.stringify(films));
  
    res.status(200).json({ message: 'User places updated!' });
  });
  
app.use((req,res,next)=>{
    if(req.method === 'OPTIONS'){
        return next();
    }
    res.status(404).json({message:'404 - Not Found'})
});
app.listen(3000)