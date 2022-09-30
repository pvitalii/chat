import express from "express";
import "dotenv/config";

const app = express();
const port = process.env.PORT;

function bootstrap() {
    app.listen(port, () => console.log(`Server started on port ${port}`))
}

bootstrap();