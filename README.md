- Description de l'application:
  Liste de films que l'on peut ajouter à sa liste de favoris (id du film) si on a créé un compte.
  La liste par défaut est une liste de films populaire qui peut être modifiée suivant le filtre séléctionné ou on peut directement chercher un film dans la barre de recherche.
  Un utilisateur peut modifier son profil et il y a des controles pour eviter des valeurs invalides (charactères spéciaux, espaces, ... ) ou un nom ou un email identique à un autre utilisateur.

- Lancez l'application avec la commande: npm run dev

- Utilisateurs test: victorleman@gmail.com, Berenice_Pfeffer21@gmail.com, victorleman1@gmail.fr, ...

- API utilisées:
  Pour les films: https://www.themoviedb.org/ GET
  Pour les utilisateurs: https://mockapi.io GET PUT POST

- Store: Store utilisé pour gérer l'authentification et récuperer les infos de l'utilisateur connecté (username, liste de films, ...)

(Ajouter l'utilisateur connecté au local storage serait plus pratique pour rester connecté au rafraîchissement de la page mais j'ai laissé le useAuth dans le but de suivre les instructions du TP)
