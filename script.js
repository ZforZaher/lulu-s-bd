// Create floating petals
      const petalsContainer = document.getElementById("petals");
        const petalIcons = ["❀", "✿", "🌸", "💮", "🏵️"];

        function createPetal() {
        const petal = document.createElement("div");
        petal.className = "petal";
        petal.textContent =
            petalIcons[Math.floor(Math.random() * petalIcons.length)];
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.fontSize = `${15 + Math.random() * 15}px`;
        // Faster animation: shorter duration and delay
        petal.style.animationDuration = `${5 + Math.random() * 8}s`;
        petal.style.animationDelay = `${Math.random() * 2}s`;
        petalsContainer.appendChild(petal);

        setTimeout(() => {
            petal.remove();
        }, 10000); // Remove sooner since petals fall faster
        }

        // Create more initial petals, more quickly
        for (let i = 0; i < 40; i++) {
        setTimeout(createPetal, i * 100);
        }

        // Continue creating petals more frequently
        setInterval(createPetal, 250);

      // Promise button interaction
      document
        .getElementById("promiseBtn")
        .addEventListener("click", function () {
          // Create a burst of petals
          for (let i = 0; i < 20; i++) {
            setTimeout(createPetal, i * 100);
          }

          // Show a sweet message
          const promises = [
            "I Positve i'll always choose you, every day",
            "I vow to be your safe harbor in every storm",
            "I pledge to grow with you through all seasons of life",
            "I commit to loving you more each day than the last",
            "I am sure our love story will be timeless",
          ];

          alert(promises[Math.floor(Math.random() * promises.length)]);

          // Add elegant animation to button
          this.style.transform = "scale(1.1)";
          setTimeout(() => {
            this.style.transform = "";
          }, 300);
        });

      document
        .getElementById("kissEnvelope")
        .addEventListener("click", function () {
          this.style.transform = "scale(0.9)";
          setTimeout(() => {
            this.style.transform = "scale(1)";
            document.getElementById("flyingKiss").style.display = "block";

            // Show the real gift hint after kiss animation
            setTimeout(() => {
              document.getElementById("realGiftHint").style.display = "block";
            }, 1000);
          }, 500);
        });



    function setupMicrophone() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const audioContext = new AudioContext();
            const microphone = audioContext.createMediaStreamSource(stream);
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            microphone.connect(analyser);

            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            // Visual feedback before blowing
            const candles = document.querySelectorAll('.candle');
            candles.forEach(candle => {
                candle.addEventListener('mouseover', () => {
                    candle.classList.add('blow-effect');
                    setTimeout(() => candle.classList.remove('blow-effect'), 500);
                });
            });

            function checkBlow() {
                analyser.getByteFrequencyData(dataArray);
                let sum = dataArray.reduce((a, b) => a + b, 0);
                if (sum > 8000) { // Higher sensitivity
                    blowCandles();
                }
                requestAnimationFrame(checkBlow);
            }
            checkBlow();
        })
        .catch(err => {
            console.log("Microphone access denied:", err);
            // Fallback: Click to blow
            document.querySelectorAll('.candle').forEach(candle => {
                candle.addEventListener('click', blowCandles);
            });
        });
}

function blowCandles() {
    const flames = document.querySelectorAll('.flame');
    flames.forEach(flame => {
        flame.style.animation = 'none';
        flame.style.opacity = '0';
        flame.style.transition = 'opacity 0.5s';
    });

    // Confetti explosion
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F8E3E3', '#ffd700', '#ffffff']
    });
}

// Initialize
window.onload = function() {
    // Create candles
    const candlesContainer = document.querySelector('.candles');
    for (let i = 0; i < 20; i++) {
        const candle = document.createElement('div');
        candle.className = 'candle';
        const flame = document.createElement('div');
        flame.className = 'flame';
        candle.appendChild(flame);
        candlesContainer.appendChild(candle);
    }

    setupMicrophone();
};

const birthdaySong = document.getElementById("birthdaySong");
  const section = document.getElementById("birthdaySection");

  // Use IntersectionObserver to detect when section enters view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        birthdaySong.play();
      } else {
        birthdaySong.pause();
        birthdaySong.currentTime = 0; // reset if you want it to restart
      }
    });
  }, { threshold: 0.5 });

  observer.observe(section);

  