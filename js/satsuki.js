console.log("Satsuki JS Loaded");
document.addEventListener("DOMContentLoaded", () => {
    const satsuki = document.getElementById("satsuki-sprite");
    const dialogue = document.getElementById("satsuki-dialogue");
    if (!satsuki) return;

    const sprites = {
        greeting: "image/character/greeting.png",
        idle1: "image/character/idle-1.png",
        idle2: "image/character/idle-2.png",
        work: "image/character/work.png",
        break: "image/character/break.png",
        reading: "image/character/read.png"
    };

    const dialogueBank = { //DIALOGUES SON! my best creation so far O_O

        greeting: [
            "Hello! Let's do some tasks! ✨",
            "Welcome back!",
            "Ready to study together?"
        ],

        idle: [
            "I'll keep you company.",
            "Take your time.",
            "One step at a time."
        ],

        work: [
            "Let's stay focused!",
            "Time to get busy, here we go!",
            "Let's do our best together!"
        ],

        break: [
            "Take a short break ☕",
            "Stretch a little!",
            "Don't forget to drink water!"
        ],

        finish: [
            "Great job today!",
            "You did amazing!",
            "Time to relax!"
        ]

    };

    function randomDialogue(type) {
        const list = dialogueBank[type];
        if (!list) return;
        const text =
            list[Math.floor(Math.random() * list.length)];
        say(text);
    }

    let currentMode = "idle";
    let idleTimer = null;
    let greetingTimer = null;
    let idleFlip = false;

    function setSprite(key) { //transition per sprites
        if (!sprites[key]) return;
        satsuki.style.opacity = "0"; //invisible
        setTimeout(() => {
            satsuki.src = sprites[key];
            satsuki.style.opacity = "1";
        }, 175);

    }

    function clearTimers() {
        if (idleTimer) {
            clearTimeout(idleTimer);
            idleTimer = null;
        }
        if (greetingTimer) {
            clearTimeout(greetingTimer);
            greetingTimer = null;
        }
    }

    function scheduleIdleSwap() { //sprite switch by random
        clearTimeout(idleTimer);

        const delay = 10000 + Math.random() * 5000;

        idleTimer = setTimeout(() => {
            if (currentMode !== "idle") return;

            idleFlip = !idleFlip;
            setSprite(idleFlip ? "idle2" : "idle1");
            scheduleIdleSwap();
        }, delay);
    }

    function enterGreeting() {
        console.log("Greeting");
        clearTimers();
        currentMode = "greeting";
        setSprite("greeting");
        greetingTimer = setTimeout(() => {
            console.log("Going Idle");
            enterIdle();
        }, 3000);
    }

    function enterIdle() {
        console.log("Idle");
        clearTimers();
        currentMode = "idle";
        idleFlip = false;
        setSprite("idle1");
        randomDialogue("idle");
        scheduleIdleSwap();
    }

    function enterWork() { //work mode flips
        clearTimers();
        currentMode = "work";
        idleFlip = false;
        setSprite("work");
        randomDialogue("work");
        workSwap();
    }

    function workSwap() {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
            if (currentMode !== "work") return;
            idleFlip = !idleFlip;
            setSprite(idleFlip ? "reading" : "work");
            workSwap();
        }, 10000 + Math.random() * 5000);
    }

    function enterBreak() {
        clearTimers();
        currentMode = "break";
        setSprite("break");
        randomDialogue("break");
    }

    function say(text, time = 3000) {
        dialogue.textContent = text;
        dialogue.classList.add("show");
        setTimeout(() => {
            dialogue.classList.remove("show");
        }, time);
    }

    window.setSatsukiMode = function (mode) {
        if (mode === "greeting") {
            enterGreeting();
        } else if (mode === "work") {
            enterWork();
        } else if (mode === "break") {
            enterBreak();
        } else {
            enterIdle();
        }
    };

    //start with greeting, then fall back to idle
    enterGreeting();
    randomDialogue("greeting");
});