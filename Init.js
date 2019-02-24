import app from "./app";
import "./db"

const PORT = 4001;

const handleListening = () => console.log(`Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);