# Portfolio Demonde Alex — avec panneau d'administration

Portfolio professionnel inspiré de [alex-demonde-portfolio.vercel.app](https://alex-demonde-portfolio.vercel.app/), reconstruit avec Next.js et doté d'un espace d'administration privé pour tout modifier sans toucher au code : photos, vidéos, expériences, textes, logo, photo de profil et couleurs du site.

## Démarrer en local

```bash
npm install
npm run dev
```

Le site est disponible sur http://localhost:3000 et l'administration sur http://localhost:3000/admin.

## Accéder à l'administration

- URL : `/admin` (redirige vers la connexion si nécessaire)
- Mot de passe par défaut : `admin123` (défini dans `.env.local`)

**Changez ce mot de passe avant de mettre le site en ligne** en modifiant `ADMIN_PASSWORD` dans `.env.local` (créez le fichier à partir de `.env.example` s'il n'existe pas). Changez aussi `SESSION_SECRET` pour une valeur aléatoire longue.

## Ce que vous pouvez modifier depuis l'admin

- **Profil & Marque** : nom du site, logo, CV (PDF), photo de profil, texte d'accroche, description.
- **Couleurs** : toute la palette du site (couleur principale, fonds, textes) avec aperçu en direct.
- **Expertise** : les 4 cartes de compétences (ajout/suppression/édition).
- **Projets** : les études de cas (défi/solution) et leur galerie de photos/vidéos.
- **Galerie** : la galerie générale de médias avec étiquettes (photos et vidéos).
- **Expérience** : le parcours professionnel avec missions détaillées.
- **Contact** : adresse, téléphones, e-mail, réseaux sociaux.

Chaque onglet a un bouton **Enregistrer** commun en haut de page : les modifications ne sont écrites sur le site qu'après clic sur ce bouton.

## Mise en production

```bash
npm run build
npm start
```

### ⚠️ Important si vous déployez sur Vercel

Le contenu et les fichiers importés (photos/vidéos/logo) sont stockés sur le disque du serveur (`data/content.json` et `public/uploads/`). Sur Vercel (comme sur toute plateforme *serverless*), le système de fichiers est réinitialisé à chaque déploiement : les modifications faites depuis l'admin **ne seront pas conservées durablement**.

Pour un site avec administration persistante, préférez un hébergement avec disque permanent (VPS, Railway, Render, un serveur Node classique) où vous lancez `npm run build && npm start`. Si vous tenez à rester sur Vercel, il faudra faire évoluer le stockage vers une base de données (ex. Postgres) et un service de stockage d'objets (ex. S3/Vercel Blob) — dites-le si vous voulez que ce soit fait.

## Structure

- `data/content.json` — tout le contenu du site (source de vérité, modifiable via l'admin)
- `public/uploads/` — fichiers importés depuis l'admin
- `app/` — pages publiques et routes d'API (Next.js App Router)
- `components/site/` — composants du site public
- `components/admin/` — composants du panneau d'administration
- `lib/auth.ts` — authentification par mot de passe + cookie de session signé
