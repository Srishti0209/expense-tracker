import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template'

// modules for server side rendering
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import MainRouter from './../client/MainRouter'
import { StaticRouter } from 'react-router-dom'

import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles'
import mainUserRoutes from './routes/expense-router'


//comment out before building for production
import devBundle from './devBundle'

const CURRENT_WORKING_DIR = process.cwd()
const app = express()

//comment out before building for production
devBundle.compile(app)

// parse body params and attach them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())

// secure apps by setting various HTTP headers -- will use this --
app.use(helmet())

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

// mount routes
app.use('/', mainUserRoutes)

/*
app.use('/', authRoutes)
*/
app.get('*', (req, res) => {
  const sheets = new ServerStyleSheets()
  const context = {}
  const markup = ReactDOMServer.renderToString(
    sheets.collect(
          <StaticRouter location={req.url} context={context}>
           
              <MainRouter />
            
          </StaticRouter>
        )
    )
    if (context.url) {
      return res.redirect(303, context.url)
    }
    const css = sheets.toString()
  res.status(200).send(Template({
      markup: markup,
      css: css
    }))
})

// To Catch unauthorised errors -- write code to catch all unauthorized errors.


export default app
