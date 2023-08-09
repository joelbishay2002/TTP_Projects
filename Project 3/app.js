const express = require("express");
const morgan = require("morgan");
const pokeBank = require("./pokeBank");

const app = express();
const session = require("express-session");

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(morgan("dev"));
app.use(express.static("public")); // Serve static files from the 'public' directory

// Main route
app.get("/", (req, res) => {
  const pokemonList = pokeBank.list();
  const darkModeClass = req.session.darkMode ? "dark-mode" : "light-mode";
  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>My Pokedex</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body class="${darkModeClass}">
      <div class="pokemon-list">
        <header>
          <img src="/logo.png" style="max-width: 100px; height: auto;" />
          Pokedex
          <form method="post" action="/dark-mode-toggle">
        <button class="button button5">Toggle Dark Mode</button>
      </form>
        </header>
        
        ${pokemonList
          .map(
            (pokemon) => `
          <div class="pokemon-item">
            <a href="/pokemon/${pokemon.id}">
              <img class="pokemon-img" src=${pokemon.image} />
              <p>
                <span class="pokemon-position">${pokemon.id}. ▲</span>${pokemon.name}
                <small>(Trained by ${pokemon.trainer})</small>
              </p>
            </a>
          </div>
        `
          )
          .join("")}
      </div>
      <form method="post" action="/dark-mode-toggle">
        <button class="button button5">Toggle Dark Mode</button>
      </form>
    </body>
    </html>`;
  res.send(html);
});

// Route for individual Pokemon details
app.get("/pokemon/:id", (req, res) => {
  const id = req.params.id;
  const pokemon = pokeBank.find(id);
  if (!pokemon) {
    res.status(404).send("Pokemon not found");
  } else {
    let html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${pokemon.name} Details</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <div class="pokemon-details">
          <header>
            <img src="/logo.png" style="max-width: 100px; height: auto;" />
            Pokedex
          </header>
          <h1>${pokemon.name}</h1>
          <img class="pokemon-img" src=${pokemon.image} />
          <p>Type: ${pokemon.type}</p>
          <p>Trainer: ${pokemon.trainer}</p>
          <p>Date: ${pokemon.date}</p>
        </div>
      </body>
      </html>`;
    res.send(html);
  }
});

// Route for toggling dark mode
app.post("/dark-mode-toggle", (req, res) => {
  req.session.darkMode = !req.session.darkMode;
  res.redirect("back");
});

// Error handler for handling 404 cases
app.use((req, res) => {
  res.status(404).send("Not Found");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
