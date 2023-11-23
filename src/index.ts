import Express from "express"
import { router_livros } from "./routes/livro"

const app = Express()

console.clear()

app.use( Express.json() )

app.use( "/livros", router_livros )

app.listen( 3000,
	() => console.log("Server Started!") )