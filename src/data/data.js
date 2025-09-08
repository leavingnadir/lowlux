// Sample dashboard data
const sampleData = [
  {
    temperature: 25,
    humidity: 60,
    brightness: 75,
    peopleCount: 3,
    totalPeopleCount: 10,
    energySaving: 120
  },
  {
    temperature: 27,
    humidity: 55,
    brightness: 70,
    peopleCount: 4,
    totalPeopleCount: 14,
    energySaving: 130
  },
  {
    temperature: 28,
    humidity: 50,
    brightness: 65,
    peopleCount: 5,
    totalPeopleCount: 19,
    energySaving: 140
  },
  {
    temperature: 26,
    humidity: 57,
    brightness: 80,
    peopleCount: 2,
    totalPeopleCount: 21,
    energySaving: 125
  },
  {
    temperature: 29,
    humidity: 53,
    brightness: 60,
    peopleCount: 6,
    totalPeopleCount: 27,
    energySaving: 150
  }
];

// Example: update state with the first element
setData(sampleData[0]);

// Or loop through to simulate live updates
let index = 0;
setInterval(() => {
  setData(sampleData[index]);
  index = (index + 1) % sampleData.length;
}, 5000); // update every 5 seconds
