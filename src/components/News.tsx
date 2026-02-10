import React from 'react';

const articles = [
  {
    title: "Top 10 Strongest Fire-Type Pokémon",
    description: "Discover which Fire-type Pokémon pack the most punch in competitive battles.",
    category: "Guides",
    categoryColor: "bg-primary/20 text-primary",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCI9WaeduIAP0il1Z0P7KrFbNBAR9xkQqikaJmtPLcocfh9B7S0j0EK4qfKVwRAJOukJXKuzCgjT_MLAJCjAk0hZ6Wl-RK6QclkzSW6G2j6EJww6HkEbdthdMuhsqnjeRdKUUMuUb4Xvcq9SiA-jZ-RUYp6HvwS_Maq0iVb_d0rECpmIB7ZbTxaP0AY75fF8EeOoCOoj1an9J7yyJyQlIeZUxn_CMQcRcZJMdW7Orco2gXY4lKJiIoh3xzKYt0Kp6w2EIAuaf1VNQ"
  },
  {
    title: "A Beginner's Guide to Pokémon Breeding",
    description: "Learn the ins and outs of breeding to get the perfect IVs, natures, and egg moves.",
    category: "Lore",
    categoryColor: "bg-blue-500/20 text-blue-500 dark:text-blue-400",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCafEFcH7QHQTugq-Lh6tIAKlz_tAfibOhmSOsIGq5pZmu7AhdSzrf8iXth6cNJWqbZjlL2sbOkSgv_JwQYPGKYYRZa09YGIYukgDmFJbQ0tDtTJu4_QQEs4Zk9-WLvwNauQIgV0KiI2flJ_IFz17hIqouAnPPJd7qrcSbOIDhsE2naO659oh80JYbYLM307T7PB4qUWpu8hC85yJAGlJkO9x7BmX0J6K2pwA9eBAMTUsPur2tIqCReUPn5bRGRHshl90EOCdw_qg"
  },
  {
    title: "The Hidden Lore Behind the Legendary Birds",
    description: "Uncover the rich history and myths surrounding Articuno, Zapdos, and Moltres.",
    category: "News",
    categoryColor: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1DvCNYxpzcp362kXsN5ZPUVwajKd8PBM-cSxkFKHXZzTYzOiFDvdtIZ__WpqYvvu6omFds0SsGEeGoetmtdMEkofARtARog84Z84jPfH1Hr1BneXfjBI-t2iVJuKyM8vl9Zz0skfYu89cxNHD8lZFpI-s9NMAmDfVi03GgzSh3xF2VYASNW4xlRv_y899JHhyOuAcbQWc3PYjx19kNrGWYiP2vlLkGVI8gab_42D-ZgTFHUBXuzQMK1sGInQT5cFbeX7VCM7-9Q"
  }
];

const News: React.FC = () => {
  return (
    <div className="flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Latest from the Blog</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {articles.map((article, index) => (
            <div key={index} className="flex flex-col gap-4 rounded-xl bg-white dark:bg-background-dark/50 overflow-hidden shadow-sm transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg dark:hover:shadow-primary/20">
              <img className="h-48 w-full object-cover" src={article.image} alt={article.title} />
              <div className="flex flex-col gap-3 p-4 pt-0">
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${article.categoryColor}`}>{article.category}</span>
                </div>
                <h3 className="text-lg font-bold leading-tight text-gray-900 dark:text-white">{article.title}</h3>
                <p className="text-sm font-normal text-gray-600 dark:text-gray-300">{article.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
