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

## Déployer sur Vercel (avec admin qui sauvegarde vraiment)

Le site détecte automatiquement où il tourne : en local il écrit dans `data/content.json` et `public/uploads/` ; sur Vercel il bascule vers **Vercel Blob**, un stockage persistant, dès que la variable `BLOB_READ_WRITE_TOKEN` existe. Sans cette variable, l'admin fonctionnerait mais vos modifications disparaîtraient au déploiement suivant — suivez donc bien l'étape 3.

**1. Mettre le code sur GitHub**

```bash
git remote add origin https://github.com/<votre-compte>/<votre-repo>.git
git branch -M main
git push -u origin main
```

*(Créez d'abord un dépôt vide sur [github.com/new](https://github.com/new), sans README ni .gitignore.)*

**2. Importer le projet dans Vercel**

Sur [vercel.com/new](https://vercel.com/new), connectez votre compte GitHub et importez ce dépôt. Vercel détecte Next.js automatiquement — laissez les réglages par défaut.

**3. Activer le stockage persistant (Vercel Blob)**

Dans votre projet Vercel → onglet **Storage** → **Create Database** → **Blob** → créez le store et connectez-le au projet. Vercel ajoute automatiquement la variable `BLOB_READ_WRITE_TOKEN`. Sans cette étape, l'admin ne pourra pas enregistrer durablement.

**4. Définir les variables d'environnement**

Dans **Settings → Environment Variables**, ajoutez :
- `ADMIN_PASSWORD` — votre mot de passe admin définitif (ne gardez pas `admin123`)
- `SESSION_SECRET` — une longue chaîne aléatoire

Puis redéployez (**Deployments → ⋯ → Redeploy**) pour que les nouvelles variables prennent effet.

Vous obtiendrez alors un lien public du type `https://votre-projet.vercel.app`, avec un admin sur `/admin` qui enregistre vraiment vos photos, vidéos et textes.

## Alternative : hébergement avec disque persistant

Un VPS, Railway ou Render (avec `npm run build && npm start`) fonctionne aussi très bien et n'a pas besoin de Vercel Blob : le stockage local (`data/content.json` + `public/uploads/`) suffit puisque le disque n'est pas réinitialisé entre les requêtes.

## Structure

- `data/content.json` — tout le contenu du site (source de vérité, modifiable via l'admin)
- `public/uploads/` — fichiers importés depuis l'admin
- `app/` — pages publiques et routes d'API (Next.js App Router)
- `components/site/` — composants du site public
- `components/admin/` — composants du panneau d'administration
- `lib/auth.ts` — authentification par mot de passe + cookie de session signé
