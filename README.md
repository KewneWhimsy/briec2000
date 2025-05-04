# Briec2000 - Site de l'Association

Site officiel de l'association Briec2000, basé sur Astro et Tailwind CSS.

![Astro](https://img.shields.io/badge/Astro-5.7.10-orange)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.5-38bdf8)

## 🎯 À propos de l'association

Briec2000 est une association locale basée à Briec-de-l'Odet (29510) qui organise des événements communautaires et culturels. Parmi nos activités :

- **Cantines solidaires** : repas mensuels le premier dimanche du mois à Ti Glazik
- **CarnaBal des monstres et créatures** : événement festif financé par les cantines solidaires
- **Événements culturels** : diverses animations pour la communauté locale

## ✨ Fonctionnalités du site

- **Performance optimale** : Grâce à l'approche zero-JS d'Astro pour des chargements rapides
- **Design moderne avec Tailwind** : Interface utilisateur élégante avec Tailwind CSS v4
- **Responsive** : Adaptation parfaite à tous les appareils
- **SEO-Friendly** : Optimisé pour les moteurs de recherche
- **Facile à mettre à jour** : Architecture simple et intuitive

## 🚀 Project Structure

```text
/
├── public/               # Static assets
│   └── favicon.svg       # Site favicon
├── src/
│   ├── components/       # Reusable UI components
│   ├── layouts/          # Page layouts
│   ├── pages/            # Page routes
│   │   └── index.astro   # Home page
│   └── styles/           # Global styles
│       └── global.css    # Global CSS with Tailwind imports
├── astro.config.mjs      # Astro configuration
├── package.json          # Project dependencies
├── tailwind.config.js    # Tailwind configuration
└── tsconfig.json         # TypeScript configuration
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:4321`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |

## 📅 Nos événements

### Cantine solidaire à Ti Glazik

Chaque premier dimanche du mois, nous proposons une cantine solidaire :

- **Lieu** : Ti Glazik, Place de Ruthin, 29510 Briec
- **Horaires** : Retrait des plats entre 18h et 20h
- **Tarifs** : 
  - 8€ (menu végétarien)
  - 12€ (menu carné)
  - Demi-portions à demi-prix pour les petits mangeurs
  - Sur place, desserts au choix à 1€

**Menu type** : Petite salade, plat principal "façon tajine" avec semoule (amandes, abricots, raisins secs, légumes, protéine de soja ou poulet)

**Réservations** : Par mail à briec2000@emailasso.net

*Pensez à apporter vos contenants propres pour les repas à emporter !*

## 🧠 Développement du site

1. Cloner ce dépôt
2. Installer les dépendances :
   ```bash
   npm install
   ```
3. Démarrer le serveur de développement :
   ```bash
   npm run dev
   ```
4. Ouvrir votre navigateur à l'adresse `http://localhost:4321`

## 🎨 Customizing Tailwind

This project uses Tailwind CSS v4, which offers improved performance and new features. You can customize your Tailwind configuration in `tailwind.config.js`.

## 📚 Learn More

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🔧 Tech Stack

- [Astro](https://astro.build/) - The web framework for content-driven websites
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types

## 📢 Contact

- **Email** : briec2000@emailasso.net

## 🤝 Soutenir l'association

Vous pouvez soutenir nos actions de différentes façons :
- Participer à nos cantines solidaires
- Devenir bénévole lors de nos événements
- Faire un don à l'association

Les fonds collectés financent nos projets communautaires comme le CarnaBal des monstres et créatures.

## 🙏 Remerciements

- La municipalité de Briec-de-l'Odet
- Ti Glazik pour l'accueil de nos événements
- Tous nos bénévoles et soutiens
- [Astro](https://astro.build/) et [Tailwind CSS](https://tailwindcss.com/) pour les outils de développement web