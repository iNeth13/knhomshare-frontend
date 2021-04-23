import bookLogo from "../assets/topicImage/art-entertainment/bookLogo.jpeg";
import filmLogo from "../assets/topicImage/art-entertainment/filmLogo.jpeg";
import gamingLogo from "../assets/topicImage/art-entertainment/gamingLogo.jpeg";
import musicLogo from "../assets/topicImage/art-entertainment/musicLogo.jpeg";
import foodLogo from "../assets/topicImage/culture/foodLogo.jpeg";
import styleLogo from "../assets/topicImage/culture/styleLogo.jpeg";
import travelLogo from "../assets/topicImage/culture/travelLogo.jpeg";
import coronaVirusLogo from "../assets/topicImage/health/coronaVirusLogo.png";
import fitnessLogo from "../assets/topicImage/health/fitnessLogo.jpeg";
import healthLogo from "../assets/topicImage/health/healthLogo.jpeg";
import mentalHeathLogo from "../assets/topicImage/health/mentalHealthLogo.jpeg";
import programmingLogo from "../assets/topicImage/programming/programmingLogo.jpeg";
import jsLogo from "../assets/topicImage/programming/jsLogo.png";

const topics = [
  {
    category: "Art & Entertainment",
    topicList: [
      {
        topic: "Book",
        imageUrl: bookLogo,
      },
      {
        topic: "Film",
        imageUrl: filmLogo,
      },
      {
        topic: "Gaming",
        imageUrl: gamingLogo,
      },
      {
        topic: "Music",
        imageUrl: musicLogo,
      },
    ],
  },
  {
    category: "Culture",
    topicList: [
      {
        topic: "Food",
        imageUrl: foodLogo,
      },
      {
        topic: "Style",
        imageUrl: styleLogo,
      },
      {
        topic: "Travel",
        imageUrl: travelLogo,
      },
    ],
  },
  {
    category: "Health",
    topicList: [
      {
        topic: "Coronavirus",
        imageUrl: coronaVirusLogo,
      },
      {
        topic: "Fitness",
        imageUrl: fitnessLogo,
      },
      {
        topic: "Health",
        imageUrl: healthLogo,
      },
      {
        topic: "Mental Health",
        imageUrl: mentalHeathLogo,
      },
    ],
  },
  {
    category: "Programming",
    topicList: [
      {
        topic: "Javascript",
        imageUrl: jsLogo,
      },
      {
        topic: "Programming",
        imageUrl: programmingLogo,
      },
    ],
  },
];

export default topics;
