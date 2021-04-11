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
    '/move',
    'https://images.pexels.com/photos/277124/pexels-photo-277124.jpeg?cs=srgb&dl=pexels-pixabay-277124.jpg&fm=jpg'
  ),
  new Tutorial(
    'Jouer une partie d\'échecs',
    'Apprendre les diffèrents règlements des échecs',
    '/rules',
    'https://images.pexels.com/photos/4027658/pexels-photo-4027658.jpeg?cs=srgb&dl=pexels-joshua-miranda-4027658.jpg&fm=jpg'
  ),
  new Tutorial(
    'Gagner une partie d\'échec',
    'Apprendre les conditions pour pouvoir gagner dans une partie d\'échecs',
    '/checkMate',
    'https://images.pexels.com/photos/411207/pexels-photo-411207.jpeg?cs=srgb&dl=pexels-sebastian-voortman-411207.jpg&fm=jpg'
  ),
]
export default tutorials;
