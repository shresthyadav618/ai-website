
const express = require('express');
const app = express();
const cors = require('cors');

const OpenAI = require('openai');
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.listen('4000',()=>{
    console.log('listening to the server 4000');
});

app.get('/',(req,res)=>{
  res.send('this is manu the great');
})

app.post('/generate',async (req,res)=>{
    // console.log(req.body);
    const { data }  =  req.body;
    console.log('inside');
   

const openai = new OpenAI();

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: data }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0].message.content);
  res.status(200).json({data : completion.choices[0].message.content})
}

main();


    
});




    

