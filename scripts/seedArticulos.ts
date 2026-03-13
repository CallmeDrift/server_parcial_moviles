import db from "../src/shared/infrastructure/dbc/Database";

function seedArticulos() {

  const articulos = [
    ["Nike Air Max", "Nike Store", 4.5, "https://picsum.photos/200"],
    ["Adidas Ultraboost", "Adidas", 4.7, "https://picsum.photos/201"],
    ["Puma Runner", "Puma", 4.2, "https://picsum.photos/202"],
    ["Reebok Classic", "Reebok", 4.3, "https://picsum.photos/203"],
    ["New Balance 574", "New Balance", 4.6, "https://picsum.photos/204"],
    ["Converse All Star", "Converse", 4.8, "https://picsum.photos/205"],
    ["Vans Old Skool", "Vans", 4.4, "https://picsum.photos/206"],
    ["Nike Revolution", "Nike Store", 4.1, "https://picsum.photos/207"],
    ["Adidas Runfalcon", "Adidas", 4.0, "https://picsum.photos/208"],
    ["Puma Future Rider", "Puma", 4.3, "https://picsum.photos/209"]
  ];

  articulos.forEach((articulo) => {

    db.run(
      `
      INSERT INTO articulos (nombre, vendedor, calificacion, imagen)
      VALUES (?, ?, ?, ?)
      `,
      articulo
    );

  });

  console.log("Artículos insertados");

}

seedArticulos();