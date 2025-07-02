app.use(express.static(path.join(__dirname, "dist")));

// --- ROTA CATCH-ALL PARA O REACT ROUTER ---
// Deve ser a ÚLTIMA rota antes do app.listen
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

