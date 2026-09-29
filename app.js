const express = require('express');
const app = express();


app.use(express.json());

// Je mets les données dans un tableau en mémoire.
let products = [
  {
    id: 1,
    name: "pixel 10",
    description: "This is a phone",
    price: 899,
    category: "phone"
  }
];


// 1. LISTER : Récupérer tous les produits
app.get('/products', (req, res) => {
  res.status(200).json(products);
});

// 2. CONSULTER : Récupérer un seul produit via son ID (retourner 200 si trouvé, 404 sinon).
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Produit introuvable" });
  }
});

// 3. AJOUTER : Créer un nouveau produit
app.post('/products', (req, res) => {
  const newProduct = {
    id: products.length > 0 ? products[products.length - 1].id + 1 : 1, // Génère un ID unique basique
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category
  };
  
  products.push(newProduct);
  res.status(201).json(newProduct); // 201 = Created (Créé)
});

// 4. REMPLACER : Écraser totalement un produit existant (PUT)
app.put('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === productId);

  if (index !== -1) {
    // On remplace tout l'objet, mais on garde le même ID
    products[index] = {
      id: productId,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category
    };
    res.status(200).json(products[index]);
  } else {
    res.status(404).json({ message: "Produit introuvable" });
  }
});

// 5. MODIFIER : Mettre à jour seulement quelques champs d'un produit (PATCH)
app.patch('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);

  if (product) {
    // On modifie uniquement si la valeur est fournie dans la requête
    if (req.body.name) product.name = req.body.name;
    if (req.body.description) product.description = req.body.description;
    if (req.body.price) product.price = req.body.price;
    if (req.body.category) product.category = req.body.category;
    
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Produit introuvable" });
  }
});

// 6. SUPPRIMER : Retirer un produit
app.delete('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === productId);

  if (index !== -1) {
    products.splice(index, 1); // Supprime 1 élément à cet index
    res.status(204).send(); // 204 = No Content (Action réussie, pas de texte à renvoyer)
  } else {
    res.status(404).json({ message: "Produit introuvable" });
  }
});


app.listen(3000, () => {
  console.log("Le serveur écoute sur le port 3000...");
});