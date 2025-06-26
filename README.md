# Briec2000 - Site de l'Association

Site officiel de l'association Briec2000, basé sur Astro et Tailwind CSS.

![Astro](https://img.shields.io/badge/Astro-5.7.10-orange)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.5-38bdf8)

## 🎯 À propos de l'association

Briec2000 est une association locale basée à Briec-de-l'Odet (29510) qui organise des événements communautaires et culturels. Parmi nos activités :

- **Cantines mensuelles** : repas mensuelles le premier dimanche du mois à Ti Glazik
- **CarnaBal des monstres et créatures** : événement festif financé par les cantines mensuelles
- **Événements culturels** : diverses animations pour la communauté locale

## ✨ Fonctionnalités du site

- **Performance optimale** : Grâce à l'approche zero-JS d'Astro pour des chargements rapides
- **Design moderne avec Tailwind** : Interface utilisateur élégante avec Tailwind CSS v4
- **Responsive** : Adaptation parfaite à tous les appareils
- **SEO-Friendly** : Optimisé pour les moteurs de recherche
- **Facile à mettre à jour** : Architecture basée sur des fichiers Markdown facilement éditables

## 🚀 Structure du projet

src/
├── content/
│   ├── config.ts           # Configuration des collections
│   ├── events/             # Événements
│   │   ├── 2025-06-02-cantine-juin.md
│   │   └── 2025-10-25-carnabal.md
│   ├── cantines/          # Informations sur les cantines
│   │   └── cantines-info.md
│   └── pages/             # Pages générales
│       └── about.md
├── pages/                 # Pages Astro
│   ├── index.astro        # Page d'accueil
│   ├── about.astro        # Page À propos
│   ├── cantines.astro     # Page Cantines
│   └── events/
│       ├── index.astro    # Liste des événements
│       └── [slug].astro   # Page de détail d'événement
├── layouts/               # Layouts
├── components/            # Composants
└── styles/                # Styles CSS

## 🧞 Commandes

Toutes les commandes sont exécutées depuis la racine du projet, à partir d'un terminal :

| Commande             | Action                                           |
| :------------------- | :----------------------------------------------- |
| `npm install`        | Installe les dépendances                         |
| `npm run dev`        | Démarre le serveur de dev sur `localhost:4321`   |
| `npm run build`      | Construit le site pour la production dans `./dist/` |
| `npm run preview`    | Prévisualise le build localement                 |
| `npm run astro ...`  | Exécute les commandes CLI comme `astro add`, `astro check` |

## 📝 Modification du contenu

### Pour les non-développeurs

Le contenu du site est principalement stocké dans des fichiers Markdown (.md) dans le dossier `src/content`. Ces fichiers peuvent être modifiés directement via l'interface GitHub :

1. Accédez au dépôt GitHub
2. Naviguez jusqu'au fichier que vous souhaitez modifier
3. Cliquez sur l'icône "crayon" (Edit this file)
4. Effectuez vos modifications
5. Cliquez sur "Commit changes"

Chaque fichier Markdown est composé de deux parties :
- **En-tête** : section entre `---` contenant les métadonnées (titre, date, etc.)
- **Corps** : contenu principal avec formatage Markdown

### Pour ajouter une image

1. Téléversez votre image dans le dossier approprié dans `src/images/`
2. Référencez l'image dans vos fichiers Markdown

## 📅 Nos événements

### Cantine mensuelle à Ti Glazik

Chaque premier dimanche du mois, nous proposons une cantine mensuelle :

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

## 🔧 Stack technique

- [Astro](https://astro.build/) - Framework web pour sites à contenu statique
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitaire
- [Markdown](https://www.markdownguide.org/) - Format de contenu simple et lisible

## 📢 Contact

- **Email** : briec2000@emailasso.net

## 🤝 Soutenir l'association

Vous pouvez soutenir nos actions de différentes façons :
- Participer à nos cantines mensuelles
- Devenir bénévole lors de nos événements
- Faire un don à l'association

Les fonds collectés financent nos projets communautaires comme le CarnaBal des monstres et créatures.

## 🙏 Remerciements

- La municipalité de Briec-de-l'Odet
- Ti Glazik pour l'accueil de nos événements
- Tous nos bénévoles et soutiens
- [Astro](https://astro.build/) et [Tailwind CSS](https://tailwindcss.com/) pour les outils de développement web