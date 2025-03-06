document.addEventListener("DOMContentLoaded", function() {
    const weddingDate = new Date("2026-04-18T00:00:00").getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = weddingDate - now;
        
        
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const months = Math.floor(days / 31);
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        document.getElementById("timer").innerHTML = `${months}m ${days}d ${hours}h ${minutes}m ${seconds}s`;
        
        if (months == 1) {
            document.getElementById("timer").innerHTML = "Faltam 1 meses! 🎉";
        } else 
        if (months == 2) {
            document.getElementById("timer").innerHTML = "Faltam 2 meses! 🎉";
        } else   if (months == 3) {
            document.getElementById("timer").innerHTML = "Faltam 3 meses! 🎉";
        } else  if (months == 4) {
            document.getElementById("timer").innerHTML = "Faltam 4 meses! 🎉";
        } else  if (months == 5) {
            document.getElementById("timer").innerHTML = "Faltam 5 meses! 🎉";
        }else  if (months == 6) {
            document.getElementById("timer").innerHTML = "Faltam 6 meses! 🎉";
        }else  if (months == 7) {
            document.getElementById("timer").innerHTML = "Faltam 7 meses! 🎉";
        } else  if (months == 8) {
            document.getElementById("timer").innerHTML = "Faltam 8 meses! 🎉";
        } else  if (months == 9) {
            document.getElementById("timer").innerHTML = "Faltam 9 meses! 🎉";
        } else  if (months == 10) {
            document.getElementById("timer").innerHTML = "Faltam 10 meses! 🎉";
        } else  if (months == 11) {
            document.getElementById("timer").innerHTML = "Faltam 11 meses! 🎉";
        } else  if (months <= 12) {
            document.getElementById("timer").innerHTML = "Faltam um pouco mais de 1 ano! 🎉";
        }

        if (timeLeft < 0) {
            document.getElementById("timer").innerHTML = "Já Casamos! 🎉";
        }
    }
    
    setInterval(updateCountdown, 1000);
});
