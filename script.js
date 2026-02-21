// =============================
// Activity Database
// =============================
const activities = {
    Lazy: {
        Classroom: [
            "Review one formula 📘",
            "Organize notebook 🗂️",
            "Highlight key points 🖍️",
            "Rewrite one definition ✍️"
        ],
        Office: [
            "Clean your desk 🧹",
            "Drink water 💧",
            "Reply to one email ✉️"
        ],
        Home: [
            "Stretch 2 minutes 🧘",
            "Tidy your table",
            "Read 2 pages 📖"
        ],
        Outside: [
            "Slow walk 🚶",
            "Observe surroundings 🌿",
            "Take deep breaths 🌬️"
        ]
    },

    Normal: {
        Classroom: [
            "Revise notes 📚",
            "Solve one question ✍️",
            "Organize bag 🎒"
        ],
        Office: [
            "Finish one small task ✅",
            "Review meeting notes 📄"
        ],
        Home: [
            "Read 3 pages 📖",
            "Plan tomorrow 📝"
        ],
        Outside: [
            "Walk 5 minutes 🚶",
            "Listen to music 🎧"
        ]
    },

    Motivated: {
        Classroom: [
            "Solve 3 problems ✍️",
            "Practice coding 10 minutes 💻"
        ],
        Office: [
            "Complete a pending task ✅",
            "Start a new idea 💡"
        ],
        Home: [
            "Do 20 pushups 💪",
            "Work on your project 🚀"
        ],
        Outside: [
            "Brisk walk 🏃",
            "Jog 5 minutes 🏃‍♂️"
        ]
    },

    Stressed: {
        Classroom: [
            "Take 5 deep breaths 🌿",
            "Close eyes for 30 seconds 👀"
        ],
        Office: [
            "Stretch shoulders 🧘",
            "Stand and relax 🧍"
        ],
        Home: [
            "Listen to calm music 🎵",
            "Sit quietly 2 minutes 🌤️"
        ],
        Outside: [
            "Slow breathing 🌬️",
            "Sit peacefully 🌿"
        ]
    }
};
// Daily Challenge Pool
const dailyChallenges = [
    "Complete 5 productive actions today 🚀",
    "Drink 8 glasses of water 💧",
    "Avoid social media for 1 hour 📵",
    "Walk at least 5000 steps 🚶",
    "Read 10 pages of a book 📖",
    "Help someone today 🤝",
    "Practice gratitude 🌟"
];function setDailyChallenge() {

    const today = new Date().toDateString();
    const storedDate = localStorage.getItem("challengeDate");

    if (storedDate !== today) {
        const randomIndex = Math.floor(Math.random() * dailyChallenges.length);
        localStorage.setItem("todayChallenge", dailyChallenges[randomIndex]);
        localStorage.setItem("challengeDate", today);
    }

    document.getElementById("dailyChallenge").innerText =
        localStorage.getItem("todayChallenge");
}

// =============================
// Streak System
// =============================
let streak = parseInt(localStorage.getItem("tap2act_streak")) || 0;
let totalTaps = parseInt(localStorage.getItem("tap2act_total")) || 0;
let bestStreak = parseInt(localStorage.getItem("tap2act_best")) || 0;

document.addEventListener("DOMContentLoaded", function () {
    const streakElement = document.getElementById("streakCount");
    if (streakElement) {
        streakElement.innerText = streak;
    }
    document.getElementById("totalTaps").innerText = totalTaps;
document.getElementById("bestStreak").innerText = bestStreak;
    updateProgressBar();
    setDailyChallenge();
    checkBadges();
    // Restore saved theme
const savedTheme = localStorage.getItem("tap2act_theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}
});

// =============================
// Screen Navigation
// =============================
document.getElementById("screen1").addEventListener("click", function () {
    document.getElementById("screen1").classList.remove("active");
    document.getElementById("screen2").classList.add("active");
});

function goToBuzzer() {
    document.getElementById("screen2").classList.remove("active");
    const screen3 = document.getElementById("screen3");
    screen3.classList.add("active");

    // Add entrance animations
    document.querySelector(".daily-box").classList.add("fade-in");
    document.querySelector(".stats-box").classList.add("fade-in");
    document.querySelector(".badge-box").classList.add("fade-in");
    document.querySelector(".buzzer").classList.add("zoom-in");
}

function goBack() {
    document.getElementById("screen3").classList.remove("active");
    document.getElementById("screen2").classList.add("active");
}

// =============================
// Prevent Repeating Same Activity
// =============================
let lastActivity = "";

// =============================
// Main Buzzer Function
// =============================
function suggestTask() {

    // 🔊 Simple Beep Sound
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.15);

    // 📳 Vibration
    if (navigator.vibrate) {
        navigator.vibrate(100);
    }

    // 🎯 Activity Logic
    const mood = document.getElementById("mood").value;
    // 🎨 Change background based on mood
const body = document.body;

if (mood === "Lazy") {
    body.style.background = "linear-gradient(135deg, #a1c4fd, #c2e9fb)";
}
else if (mood === "Normal") {
    body.style.background = "linear-gradient(135deg, #89f7fe, #66a6ff)";
}
else if (mood === "Motivated") {
    body.style.background = "linear-gradient(135deg, #f6d365, #fda085)";
}
else if (mood === "Stressed") {
    body.style.background = "linear-gradient(135deg, #d4a5ff, #fbc2eb)";
}
    const location = document.getElementById("location").value;

    const list = activities[mood][location];

    let selectedActivity;
    do {
        const random = Math.floor(Math.random() * list.length);
        selectedActivity = list[random];
    } while (selectedActivity === lastActivity && list.length > 1);

    lastActivity = selectedActivity;

    const result = document.getElementById("resultText");
    result.innerText = selectedActivity;

    result.classList.remove("show");
    void result.offsetWidth;
    result.classList.add("show");
    document.getElementById("completionBox").style.display = "block";

    // 🔥 Increase Streak
    streak++;
localStorage.setItem("tap2act_streak", streak);
document.getElementById("streakCount").innerText = streak;
updateProgressBar();

totalTaps++;
localStorage.setItem("tap2act_total", totalTaps);
document.getElementById("totalTaps").innerText = totalTaps;

if (streak > bestStreak) {
    bestStreak = streak;
    localStorage.setItem("tap2act_best", bestStreak);
    document.getElementById("bestStreak").innerText = bestStreak;
}


checkBadges();
    // 🎉 Celebrate every 5 streaks
if (streak % 5 === 0) {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}
}
function updateProgressBar() {
    const progressFill = document.getElementById("progressFill");

    if (!progressFill) return;

    // Every 5 streaks = full bar
    let progress = (streak % 5) * 20;
    progressFill.style.width = progress + "%";
}
function resetStreak() {

    streak = 0;
    localStorage.setItem("tap2act_streak", streak);

    document.getElementById("streakCount").innerText = streak;

    updateProgressBar();

    // Small confirmation animation
    alert("Progress reset successfully!");
}
function toggleTheme() {

    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    if (isDark) {
        localStorage.setItem("tap2act_theme", "dark");
    } else {
        localStorage.setItem("tap2act_theme", "light");
    }
}
function checkBadges() {

    const badgeText = document.getElementById("badgeText");

    if (!badgeText) return;

    if (totalTaps >= 30) {
        badgeText.innerText = "🥇 Action Master (30+ taps)";
    }
    else if (totalTaps >= 15) {
        badgeText.innerText = "🥈 Consistent Performer (15+ taps)";
    }
    else if (totalTaps >= 5) {
        badgeText.innerText = "🥉 Beginner Achiever (5+ taps)";
    }
    else {
        badgeText.innerText = "No achievements yet";
    }
}
function completeTask() {

    // 🔥 Increase streak
    streak++;
    localStorage.setItem("tap2act_streak", streak);
    document.getElementById("streakCount").innerText = streak;
    updateProgressBar();

    // 📊 Increase total taps
    totalTaps++;
    localStorage.setItem("tap2act_total", totalTaps);
    document.getElementById("totalTaps").innerText = totalTaps;

    // 🏆 Update best streak
    if (streak > bestStreak) {
        bestStreak = streak;
        localStorage.setItem("tap2act_best", bestStreak);
        document.getElementById("bestStreak").innerText = bestStreak;
    }

    checkBadges();

    // 🎉 Small celebration
    confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
    });

    document.getElementById("completionBox").style.display = "none";
}

function skipTask() {

    // Break streak
    streak = 0;
    localStorage.setItem("tap2act_streak", streak);
    document.getElementById("streakCount").innerText = streak;
    updateProgressBar();

    document.getElementById("completionBox").style.display = "none";
}