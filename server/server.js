const express = require('express')
const path = require('path')
const app = express()
const PORT = 3001;

const items = [
    {
        name:'mike',
        age:'18'
    },
    {
        name:'mark',
        age:'19'
    },
    {
        name:'marcus',
        age:'23'
    },
]

app.get('/api/items', (req, res) => {
    res.send(items)
})

app.listen(PORT,()=>{
    console.log(`Server is running at https://localhost:${PORT}`)
})