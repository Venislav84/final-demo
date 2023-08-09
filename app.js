let oneJoke = {
  type: 'general',
  setup: 'Why do bananas have to put on sunscreen before they go to the beach?',
  punchline: 'Because they might peel!',
  id: 346,
};
let tenJokesData = [
  {
    type: 'general',
    setup: 'Have you ever heard of a music group called Cellophane?',
    punchline: 'They mostly wrap.',
    id: 110,
  },
  {
    type: 'general',
    setup: 'Why do wizards clean their teeth three times a day?',
    punchline: 'To prevent bat breath!',
    id: 360,
  },
  {
    type: 'general',
    setup: 'What did one plate say to the other plate?',
    punchline: 'Dinner is on me!',
    id: 163,
  },
  {
    type: 'general',
    setup: 'Why are ghosts bad liars?',
    punchline: 'Because you can see right through them!',
    id: 305,
  },
  {
    type: 'general',
    setup: "I can't tell if i like this blender...",
    punchline: 'It keeps giving me mixed results.',
    id: 70,
  },
  {
    type: 'general',
    setup: 'Why did the chicken get a penalty?',
    punchline: 'For fowl play.',
    id: 323,
  },
  {
    type: 'general',
    setup: 'What do you call a bear with no teeth?',
    punchline: 'A gummy bear!',
    id: 193,
  },
  {
    type: 'general',
    setup: 'Did you hear about the runner who was criticized?',
    punchline: 'He just took it in stride',
    id: 94,
  },
  {
    type: 'general',
    setup: 'Why did the opera singer go sailing?',
    punchline: 'They wanted to hit the high Cs.',
    id: 338,
  },
  {
    type: 'general',
    setup: 'Why are graveyards so noisy?',
    punchline: 'Because of all the coffin.',
    id: 306,
  },
];

const solve = () => {
  const baseUrl = 'https://official-joke-api.appspot.com';
  const oneJokeQueary = '/random_joke';
  const getTenJokesQueary = '/random_ten';

  let flag = false;

  const sectionOne = document.getElementById('1');
  const sectionTwo = document.getElementById('2');

  const containerJokeOne = createElement('div', '', 'card');

  const headerOneJoke = createElement('h1', oneJoke.setup);

  const punchlineOneJoke = createElement('h2', oneJoke.punchline);
  const buttonOneJoke = createElement(
    'button',
    'Get Random Joke',
    'buttonOneJoke'
  );

  containerJokeOne.append(headerOneJoke, punchlineOneJoke, buttonOneJoke);

  buttonOneJoke.addEventListener('click', getRandomJokeHandler);

  sectionOne.appendChild(containerJokeOne);

  // section two
  const buttonTwoJoke = createElement(
    'button',
    'get random ten jokes',
    'buttonOneJoke'
  );

  buttonTwoJoke.addEventListener('click', getTenRandomJokesHandler);
  const div = createElement('div');
  tenJokesData.forEach((joke) => {
    const headerTwoJoke = createElement('h1', joke.setup);
    const punchlineTwoJoke = createElement('h2', joke.punchline);
    div.append(headerTwoJoke, punchlineTwoJoke);
  });

  sectionTwo.append(div, buttonTwoJoke);

  // functions
  function getRandomJokeHandler() {
    const url = baseUrl + oneJokeQueary;
    fetchOneJoke(url, 'oneJoke');
  }

  function getTenRandomJokesHandler() {
    const url = baseUrl + getTenJokesQueary;
    fetchOneJoke(url, 'tenJokes');
  }

  async function fetchOneJoke(url, action) {
    buttonOneJoke.disabled = true;
    let data;
    try {
      const respons = await fetch(url);
      data = await respons.json();
    } catch (error) {
      buttonOneJoke.disabled = false;
      alert(error);
    }

    const actionObj = {
      oneJoke: (data) => {
        oneJoke = data;
        headerOneJoke.innerText = oneJoke.setup;
        punchlineOneJoke.innerText = oneJoke.punchline;
      },
      tenJokes: (data) => {
        tenJokesData = data;
        const newDiv = createElement('div');
        tenJokesData.forEach((joke) => {
          const headerTwoJoke = createElement('h1', joke.setup);
          const punchlineTwoJoke = createElement('h2', joke.punchline);
          newDiv.append(headerTwoJoke, punchlineTwoJoke);
        });
        if (!flag) {
          div.remove();
          sectionTwo.prepend(newDiv);
          flag = true;
        } else {
          sectionTwo.firstChild.replaceWith(newDiv);
        }
      },
    };
    actionObj[action](data);
    buttonOneJoke.disabled = false;
  }

  function createElement(tag, text = '', styleClass = '') {
    const el = document.createElement(tag);
    el.innerText = text;

    if (styleClass !== '') {
      el.className += styleClass;
    }

    return el;
  }
};

window.addEventListener('load', solve);
