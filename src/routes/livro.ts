import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const router = Router()

router.get("/", async (_:Request, res:Response) => {
	console.log( "[GET] - /livros" )
	const data = await prisma.livros.findMany()
	res.json( data )
})

router.get("/id/:id", async (req:Request, res:Response) => {
	console.log( "[GET] - /livros/[id]" )
	const req_id = parseInt( req.params.id )

	const data = await prisma.livros.findUnique( {
		where: {
			id: req_id
		}
	} )

	res.json( data )
})

router.post("/", async (req:Request, res:Response) => {
	console.log("[POST] - /livros")
	const { titulo, autor, ano_de_publicacao, tags, descricao, capa } = req.body

	const data = await prisma.livros.create( {
		data: {
			titulo: titulo,
			autor: autor,
			ano_de_publicacao: ano_de_publicacao,
			tags: tags,
			descricao: descricao,
			capa: capa
		}
	} )

	res.json( data )
})

router.put("/:id", async (req:Request, res:Response) => {
	console.log("[PUT] - /livros/[id]")

	const req_id = parseInt( req.params.id )
	const update_data = req.body

	const data = await prisma.livros.update( {
		where: {
			id: req_id
		},
		data: update_data
	} )

	res.json( data )
})

router.delete("/:id", async (req:Request, res:Response) => {
	console.log("[DELETE] - /livros/[id]")

	const req_id = parseInt( req.params.id )

	const data = await prisma.livros.delete( {
		where: {
			id: req_id
		}
	} )

	res.json( data )
})

export { router as router_livros }