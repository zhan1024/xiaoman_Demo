function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  updateDigit('hourTens', hours.charAt(0));
  updateDigit('hourUnits', hours.charAt(1));
  updateDigit('minuteTens', minutes.charAt(0));
  updateDigit('minuteUnits', minutes.charAt(1));
  updateDigit('secondTens', seconds.charAt(0));
  updateDigit('secondUnits', seconds.charAt(1));
}

function updateDigit(digitId, newValue) {
  const digitElement = document.getElementById(digitId);
  const currentValue = digitElement.textContent;

  if (currentValue !== newValue) {
    digitElement.textContent = newValue;
    digitElement.classList.remove('flip');
    void digitElement.offsetWidth; // Trigger reflow
    digitElement.classList.add('flip');
  }
}

// Update clock every second
setInterval(updateClock, 1000);

// Initial update
updateClock();
