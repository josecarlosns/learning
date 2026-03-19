const REACT_QUESTIONS = [
  {
    id: "q1",
    text: "Which of the following definitions best describes React.js?",
    correctAnswerId: "q1a1",
    answers: [
      { id: "q1a1", text: "A library to build user interfaces with help of declarative code." },
      { id: "q1a2", text: "A library for managing state in web applications." },
      { id: "q1a3", text: "A framework to build user interfaces with help of imperative code." },
      { id: "q1a4", text: "A library used for building mobile applications only." }
    ]
  },
  {
    id: "q2",
    text: "What purpose do React hooks serve?",
    correctAnswerId: "q2a1",
    answers: [
      {
        id: "q2a1",
        text: "Enabling the use of state and other React features in functional components."
      },
      { id: "q2a2", text: "Creating responsive layouts in React applications." },
      { id: "q2a3", text: "Handling errors within the application." },
      { id: "q2a4", text: "Part of the Redux library for managing global state." }
    ]
  },
  {
    id: "q3",
    text: "Can you identify what JSX is?",
    correctAnswerId: "q3a1",
    answers: [
      { id: "q3a1", text: "A JavaScript extension that adds HTML-like syntax to JavaScript." },
      { id: "q3a2", text: "A JavaScript library for building dynamic user interfaces." },
      { id: "q3a3", text: "A specific HTML version that was explicitly created for React." },
      { id: "q3a4", text: "A tool for making HTTP requests in a React application." }
    ]
  },
  {
    id: "q4",
    text: "What is the most common way to create a component in React?",
    correctAnswerId: "q4a1",
    answers: [
      { id: "q4a1", text: "By defining a JavaScript function that returns a renderable value." },
      { id: "q4a2", text: "By defining a custom HTML tag in JavaScript." },
      { id: "q4a3", text: "By creating a file with a .jsx extension." },
      { id: "q4a4", text: 'By using the "new" keyword followed by the component name.' }
    ]
  },
  {
    id: "q5",
    text: 'What does the term "React state" imply?',
    correctAnswerId: "q5a1",
    answers: [
      {
        id: "q5a1",
        text: "An object in a component that holds values and may cause the component to render on change."
      },
      { id: "q5a2", text: "The lifecycle phase a React component is in." },
      {
        id: "q5a3",
        text: "The overall status of a React application, including all props and components."
      },
      { id: "q5a4", text: "A library for managing global state in React applications." }
    ]
  },
  {
    id: "q6",
    text: "How do you typically render list content in React apps?",
    correctAnswerId: "q6a1",
    answers: [
      {
        id: "q6a1",
        text: "By using the map() method to iterate over an array of data and returning JSX."
      },
      {
        id: "q6a2",
        text: "By using the for() loop to iterate over an array of data and returning JSX."
      },
      {
        id: "q6a3",
        text: "By using the forEach() method to iterate over an array of data and returning JSX."
      },
      {
        id: "q6a4",
        text: "By using the loop() method to iterate over an array of data and returning JSX."
      }
    ]
  },
  {
    id: "q7",
    text: "Which approach can NOT be used to render content conditionally?",
    correctAnswerId: "q7a1",
    answers: [
      { id: "q7a1", text: "Using a the #if template syntax." },
      { id: "q7a2", text: "Using a ternary operator." },
      { id: "q7a3", text: "Using the && operator." },
      { id: "q7a4", text: "Using an if-else statement." }
    ]
  }
];

const LOTR_QUESTIONS = [
  {
    id: "q1",
    text: "Who is the author of The Lord of the Rings?",
    correctAnswerId: "q1a1",
    answers: [
      { id: "q1a1", text: "J.R.R. Tolkien" },
      { id: "q1a2", text: "C.S. Lewis" },
      { id: "q1a3", text: "George R.R. Martin" },
      { id: "q1a4", text: "J.K. Rowling" }
    ]
  },
  {
    id: "q2",
    text: "What is the name of the ring that Frodo must destroy?",
    correctAnswerId: "q2a1",
    answers: [
      { id: "q2a1", text: "The One Ring" },
      { id: "q2a2", text: "The Ring of Power" },
      { id: "q2a3", text: "The Dark Ring" },
      { id: "q2a4", text: "The Ring of Sauron" }
    ]
  },
  {
    id: "q3",
    text: "In which location must the One Ring be destroyed?",
    correctAnswerId: "q3a1",
    answers: [
      { id: "q3a1", text: "Mount Doom in the land of Mordor." },
      { id: "q3a2", text: "The fires of Isengard." },
      { id: "q3a3", text: "The depths of Mirkwood forest." },
      { id: "q3a4", text: "The fountains of Rivendell." }
    ]
  },
  {
    id: "q4",
    text: "What creature did Bilbo Baggins obtain the One Ring from?",
    correctAnswerId: "q4a1",
    answers: [
      { id: "q4a1", text: "Gollum, a corrupted hobbit-like creature living in a cave." },
      { id: "q4a2", text: "Smaug, a dragon living under the Lonely Mountain." },
      { id: "q4a3", text: "An orc captain in the mines of Moria." },
      { id: "q4a4", text: "A dark wraith serving Sauron in Mordor." }
    ]
  },
  {
    id: "q5",
    text: "What is the name of the fellowship's wizard companion?",
    correctAnswerId: "q5a1",
    answers: [
      { id: "q5a1", text: "Gandalf the Grey." },
      { id: "q5a2", text: "Saruman the White." },
      { id: "q5a3", text: "Radagast the Brown." },
      { id: "q5a4", text: "Alatar the Blue." }
    ]
  },
  {
    id: "q6",
    text: "What race does Legolas belong to?",
    correctAnswerId: "q6a1",
    answers: [
      { id: "q6a1", text: "Elf" },
      { id: "q6a2", text: "Dwarf" },
      { id: "q6a3", text: "Man" },
      { id: "q6a4", text: "Hobbit" }
    ]
  },
  {
    id: "q7",
    text: "What is the name of the elvish land where Frodo and the ring-bearers sail at the end of the story?",
    correctAnswerId: "q7a1",
    answers: [
      { id: "q7a1", text: "The Undying Lands (Valinor)." },
      { id: "q7a2", text: "Rivendell, the last homely house." },
      { id: "q7a3", text: "Lothlórien, the golden forest." },
      { id: "q7a4", text: "The Grey Havens of Middle-earth." }
    ]
  },
  {
    id: "q8",
    text: "What is the name of the ancient underground realm where the fellowship faces the Balrog?",
    correctAnswerId: "q8a1",
    answers: [
      { id: "q8a1", text: "The Mines of Moria." },
      { id: "q8a2", text: "The Caves of Helm's Deep." },
      { id: "q8a3", text: "The dungeons of Orthanc." },
      { id: "q8a4", text: "The pits of Isengard." }
    ]
  },
  {
    id: "q9",
    text: "What is the name of Aragorn's elvish love interest?",
    correctAnswerId: "q9a1",
    answers: [
      { id: "q9a1", text: "Arwen Undómiel, daughter of Elrond." },
      { id: "q9a2", text: "Galadriel, Lady of Lothlórien." },
      { id: "q9a3", text: "Éowyn, shieldmaiden of Rohan." },
      { id: "q9a4", text: "Tauriel, a woodland elf of Mirkwood." }
    ]
  },
  {
    id: "q10",
    text: "How many members make up the Fellowship of the Ring?",
    correctAnswerId: "q10a1",
    answers: [
      { id: "q10a1", text: "Nine — four hobbits, two men, one elf, one dwarf, and one wizard." },
      { id: "q10a2", text: "Seven — three hobbits, two men, one elf, and one wizard." },
      { id: "q10a3", text: "Eight — four hobbits, one man, one elf, one dwarf, and one wizard." },
      { id: "q10a4", text: "Ten — four hobbits, three men, one elf, one dwarf, and one wizard." }
    ]
  }
];

export { LOTR_QUESTIONS, REACT_QUESTIONS };
