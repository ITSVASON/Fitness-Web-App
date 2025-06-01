
const form = document.getElementById("planForm");
const exerciseList = document.getElementById("exerciseList");
const timerDisplay = document.getElementById("timerDisplay");
const progressChart = document.getElementById("progressChart");
const motivationalText = document.getElementById("motivationalText");
const startWorkoutButton = document.getElementById("startWorkoutButton");


const exercises = [
  { name: "Push-ups", duration: 30, repetitions: 15 },
  { name: "Squats", duration: 40, repetitions: 20 },
  { name: "Jumping Jacks", duration: 20, repetitions: 30 },
  { name: "Plank", duration: 60, repetitions: 1 },
  { name: "Lunges", duration: 30, repetitions: 10 },
];


let userPlan = {
  goal: "",
  exercises: [],
  completedSessions: 0,
};


function generateMotivationalMessage() {
  const messages = [
    "Je më i fortë se sa mendon!",
    "Vazhdo të shtysh përpara!",
    "Çdo përsëritje ka rëndësi!",
    "Qëndro i qëndrueshëm dhe rezultatet do të vijnë!",
    "E ardhmja jote do të të falënderojë!",

  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

function startTimer(duration, onComplete) {
  let timeLeft = duration;
  timerDisplay.textContent = `Time left: ${timeLeft}s`;

  const timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      onComplete();
    }
  }, 1000);
}

function updateProgressChart() {
  const progress = Math.min((userPlan.completedSessions / 10) * 100, 100);
  progressChart.style.width = `${progress}%`;
  progressChart.textContent = `${Math.round(progress)}%`;
}


form.addEventListener("submit", (e) => {
  e.preventDefault();

  const goal = form.goal.value;
  const selectedExercises = Array.from(form.exercises.selectedOptions).map(
    (option) => exercises.find((exercise) => exercise.name === option.value)
  );

  if (goal && selectedExercises.length > 0) {
    userPlan.goal = goal;
    userPlan.exercises = selectedExercises;

    exerciseList.innerHTML = "";
    selectedExercises.forEach((exercise, index) => {
      const li = document.createElement("li");
      li.textContent = `${index + 1}. ${exercise.name} - ${exercise.repetitions} reps (${exercise.duration}s)`;
      exerciseList.appendChild(li);
    });

    motivationalText.textContent = generateMotivationalMessage();
  }
});


startWorkoutButton.addEventListener("click", () => {
  if (userPlan.exercises.length > 0) {
    let currentIndex = 0;

    function runExercise() {
      const currentExercise = userPlan.exercises[currentIndex];
      alert(`Starting: ${currentExercise.name}`);

      startTimer(currentExercise.duration, () => {
        alert(`${currentExercise.name} completed!`);
        currentIndex++;

        if (currentIndex < userPlan.exercises.length) {
          runExercise();
        } else {
          alert("Workout complete! Great job!");
          userPlan.completedSessions++;
          updateProgressChart();
        }
      });
    }

    runExercise();
  } else {
    alert("Please select exercises to start.");
  }
});


motivationalText.textContent = generateMotivationalMessage();
updateProgressChart();
