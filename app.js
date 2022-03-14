const express = require('express')
const app = express()
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/rider/images', express.static('./images'))
app.use('/api/rider/',require('./src/routes/routes'))
const PORT = process.env.PORT || 3004;

app.listen(PORT,()=>{
    console.log(`Run!!! ${PORT}`);
})