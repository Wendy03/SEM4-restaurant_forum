const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

const port = 3000

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})