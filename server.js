const express = require('express')
const app = express();
const db =require('./db');


const bodyParser=require('body-parser');
const menuroutes=require('./routes/menuroute');
const personRoutes=require('./routes/personroute');
app.use(bodyParser.json());//we are just using json data this time thats why were are writing json data


const menu=require('./models/menu');

 app.get('/', function (req, res) {
  res.send('Hello World priansh  is here')
})

app.use('/person',personRoutes);
//post method for menu


app.use('/menu',menuroutes);


app.listen(3000,()=>{
    console.log('listining on 3000');

})//3000 is port
