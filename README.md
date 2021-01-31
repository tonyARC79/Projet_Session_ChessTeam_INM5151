# Projet Session ChessTeam

  ## Description

  Dans le cadre du cours du INM5151, nous allons concevoir un site web qui nous permet de jouer une partie d'échec avec d'autres joueurs en simultané. Le site contiendra plusieurs fonctionnalité qui sera mentionné dans le ConOPS.

  ## Auteur(e)s
  
  Arcand, Anthony (ARCA05099600)

  Plante, Antoine (PLAA03089707)

  Zerak, Rodolphe  (ZERR21038408)

  ## Contenu du projet
   ### Client
   Ce répertoire contient tous les éléments du site web construit en React, il est le front-end du projet et aucun élément de back-end n'y est présent.
   + `src/`
   Ceci contient tout le code js de notre application web.
   + `src/assets/`
   Où vous placez les ressources importées dans vos composants
   + `src/components`
   Tous les composants des projets qui ne sont pas les vues principales
   ### Server
   Ce répertoire contient les éléments de l'Api de notre application, les requètes qui vont effectuer sur notre site web vont fait sur cet Api (Ex: l'inscription, le login..etc)
   + `server.js`
   Ceci est le fichier principale de notre Api, il permet de démarrer notre Api
   + `routes/`
   Ceci contient tous les routes de notre Api , GET, POST, PUT et plus...

## Installation
  ### Client
  Le client demande quelque installation nécessaire. Il demande premièrement l'utilisation de ***Visual Studio code*** : https://code.visualstudio.com/

  3 extensions sont demandées à être installé:

  1. Vetur - https://marketplace.visualstudio.com/items?itemName=octref.vetur - Vue tooling for VS Code.

  2. Vue 3 Snippets - https://marketplace.visualstudio.com/items?itemName=hollowtree.vue-snippets

  3. Vue Peek - https://marketplace.visualstudio.com/items?itemName=dariofuzinato.vue-peek - This extension extends Vue code editing with Go To Definition and Peek Definition support for components and filenames in single-file components with a .vue extension

  4. ESLint - https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint- Permet d'intégrer Eslint dans VsCode

  5. EditorConfig for Vs Code - https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig - Permet l'utilsation de fichier .editorConfig dans VsCode

  Ensuite, il est nécessaire d'avoir ***Nodejs*** https://nodejs.org/en/.
   
  En ligne de commande situé sur Client, entrer la commande `npm install`

  Pour démarrer l'application, entrer `npm run serve`

  ### Server

  Il est seulement nécessaire de faire `npm install` en ligne de commande dans le répertoire Server/.
