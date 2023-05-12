import express from 'express'
/* import morgan from 'morgan' */
import fileUpload from 'express-fileupload'
import productsRoutes from './routes/products.routes.js'

const app = express()
/* app.use(morgan('dev')) */

// middlewares
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload'
}))

// routes
app.use(productsRoutes)

export default app