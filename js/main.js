document.querySelectorAll('.card-seta').forEach(seta => {
    seta.addEventListener('click', function() {
        const cardInfo = this.parentElement;
        cardInfo.classList.toggle('open');
    });
});
















