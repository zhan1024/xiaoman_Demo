let currentNumber = 100; // 初始数字
const numberDisplay = document.getElementById('numberDisplay');

function updateNumber(newNumber) {
  const diff = newNumber - currentNumber;
  currentNumber = newNumber;

  if (diff !== 0) {
    const animationElement = document.createElement('span');
    animationElement.textContent = `+${diff}`;
    animationElement.className = 'increase';

    numberDisplay.appendChild(animationElement);

    void animationElement.offsetWidth;

    animationElement.style.transform = 'translateY(-100%)';
    animationElement.addEventListener('animationend', () => {
      animationElement.remove();
    });
  }

  numberDisplay.textContent = currentNumber;
}

// 示例：每隔一秒增加一次数字
setInterval(() => {
  updateNumber(currentNumber + 1);
}, 1000);
