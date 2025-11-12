import express from "express";

const app = express();

// Inclusão de um middleware para ter acesso às requisiçòes e poder modificar objetos, além do express.json existem outros
//No nosso caso, queremos que a string json que virá no POST seja convertido para objeto json para incluirmos no array no método app.post.
app.use(express.json());

const livros = [
    {
        id: 1,
        titulo: "Patriarcas e Profetas"
    },
    {
        id: 2,
        titulo: "Profetas e Reis"
    }
]

function buscaLivro(id){
    return livros.findIndex(livro => {
        return livro.id === Number(id);
    });
}

app.get("/", (req, res) => {
    res.status(200).send("Curso de Node.js pelo Express Web Framework.");
});

app.get("/livros", (req, res) => {
    res.status(200).json(livros);
});

app.post("/livros", (req, res) =>{
    livros.push(req.body);
    res.status(201).send("Livro cadastrado com sucesso!")
})

app.get("/livros/:id", (req, res) =>{
    const index = buscaLivro(req.params.id);
    res.status(200).json(livros[index]);
})

app.put("/livros/:id", (req, res) =>{
    const index = buscaLivro(req.params.id);
    livros[index].titulo = req.body.titulo;
    res.status(200).json(livros);
})

app.delete("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    livros.splice(index, 1);
    res.status(200).send("Livro removido com sucesso!");
})

export default app;

