const { createServer } = require('http')
const next = require('next')
const routes = require('./routes');

const port = parseInt(process.env.PORT, 10) || 5001;
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = routes.getRequestHandler(app)

app.prepare()
  .then(() => {
    createServer(handler)
      .listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
      })
  });
  

  // http://localhost:5001/topics/5f10351bb66878133420ef85/beautiful-village-nature-