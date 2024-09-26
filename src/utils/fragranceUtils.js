export const fragranceList = [
  "Chanel No. 5", "Dior J'adore", "Guerlain Shalimar", "Yves Saint Laurent Opium",
  "Tom Ford Black Orchid", "Giorgio Armani Acqua di Gio", "Thierry Mugler Angel",
  "Calvin Klein CK One", "Dolce & Gabbana Light Blue", "Versace Bright Crystal",
  "Lancôme La Vie Est Belle", "Paco Rabanne 1 Million", "Creed Aventus",
  "Viktor & Rolf Flowerbomb", "Marc Jacobs Daisy", "Hermès Terre d'Hermès",
  "Gucci Bloom", "Dior Sauvage", "Chloé Eau de Parfum", "Burberry Her",
  "Jo Malone London Peony & Blush Suede", "Maison Margiela Jazz Club",
  "Byredo Gypsy Water", "Le Labo Santal 33", "Frederic Malle Portrait of a Lady",
  "Diptyque Do Son", "Atelier Cologne Orange Sanguine", "Kilian Love, Don't Be Shy",
  "Parfums de Marly Delina", "Amouage Reflection Man", "Xerjoff Naxos",
  "Mancera Cedrat Boise", "Roja Dove Elysium", "Tiziana Terenzi Kirke",
  "Nasomatto Black Afgano", "Serge Lutens La Fille de Berlin", "Penhaligon's The Tragedy of Lord George",
  "Zoologist Tyrannosaurus Rex", "Etat Libre d'Orange You or Someone Like You",
  "Juliette Has a Gun Not a Perfume", "Maison Francis Kurkdjian Baccarat Rouge 540",
  "Initio Parfums Privés Oud for Greatness", "Nishane Hacivat",
  "Vilhelm Parfumerie Dear Polly", "Imaginary Authors Memoirs of a Trespasser",
  "Montale Intense Cafe", "Acqua di Parma Colonia", "Clive Christian No. 1",
  "Bond No. 9 New York Nights",
  // New fragrances added below
  "Yves Saint Laurent Black Opium", "Chanel Bleu de Chanel", "Dior Miss Dior",
  "Tom Ford Tobacco Vanille", "Gucci Guilty", "Armani Sì", "Versace Eros",
  "Hermès Un Jardin sur le Nil", "Maison Margiela By the Fireplace",
  "Jo Malone Wood Sage & Sea Salt", "Creed Green Irish Tweed",
  "Byredo Bal d'Afrique", "Diptyque Philosykos", "Frederic Malle Musc Ravageur",
  "Kilian Angels' Share", "Amouage Jubilation XXV", "Xerjoff Nio",
  "Mancera Roses Vanille", "Roja Dove Enigma", "Tiziana Terenzi Orion",
  "Nasomatto Pardon", "Serge Lutens Chergui", "Penhaligon's Halfeti",
  "Zoologist Bat", "Etat Libre d'Orange Fat Electrician",
  "Juliette Has a Gun Lady Vengeance", "Maison Francis Kurkdjian Grand Soir",
  "Initio Parfums Privés Side Effect", "Nishane Ani",
  "Vilhelm Parfumerie Moon Carnival", "Imaginary Authors A City on Fire",
  "Montale Honey Aoud", "Acqua di Parma Fico di Amalfi", "Clive Christian X",
  "Bond No. 9 Scent of Peace"
];

export const initializeLocalStorage = () => {
  if (!localStorage.getItem('fragrances')) {
    localStorage.setItem('fragrances', JSON.stringify(fragranceList));
  }
};

export const getFragranceSuggestions = (input) => {
  const fragrances = JSON.parse(localStorage.getItem('fragrances')) || [];
  return fragrances.filter(fragrance => 
    fragrance.toLowerCase().includes(input.toLowerCase())
  );
};