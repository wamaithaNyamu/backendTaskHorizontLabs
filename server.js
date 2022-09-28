import {secrets} from "./config/config.config.js";
import {notFound} from "./middleware/middleware.notFound.js";
import app from './server.APIRoutes.js'


app.use(notFound)
const PORT = secrets.PORT || 3000

// start server
app.listen(PORT,
          console.log(`Server running in ${secrets.NODE_ENV} mode on port ${PORT}`))