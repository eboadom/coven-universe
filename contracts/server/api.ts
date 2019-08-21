import * as express from "express"
import * as cookieParser from "cookie-parser"
import * as bodyParser from "body-parser"
import * as cors from "cors"
import * as helmet from "helmet"
import router from "./routes/routes"

export const createServer = () => {
  const PORT = 12040

  const app = express()
  app.use(cors())
  app.use(helmet())
  app.use(cookieParser())
  app.use(bodyParser.json())
  app.use(router)

  app.listen(PORT, () => {
    console.log(`App is running at http://localhost:${PORT}`)
  })
}
