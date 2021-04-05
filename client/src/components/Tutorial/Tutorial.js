class Tutorial {
  constructor(title, description, link, img) {
    this.title = title;
    this.description = description;
    this.link = link;
    this.img = img;
  }
}
const tutorials = [
  new Tutorial(
    'Comment bouger ces pièces',
    'Apprendre à connaître les diffèrentes pièces des échecs',
    'localhost:8080/move',
    'https://vuejs.org//images/logo.png'
  ),
  new Tutorial(
    'Jouer une partie d\'échecs',
    'Apprendre les diffèrents règlements des échecs',
    'localhost:8080/rules',
    'https://daynin.github.io/clojurescript-presentation/img/react-logo.png'
  ),
  new Tutorial(
    'Gagner une partie d\'échec',
    'Apprendre les conditions pour pouvoir gagner dans une partie d\'échecs',
    'localhost:8080/checkMate',
    'https://angularjs.org/img/ng-logo.png'
  ),
]
export default tutorials;
