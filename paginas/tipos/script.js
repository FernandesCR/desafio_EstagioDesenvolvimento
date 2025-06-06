document.addEventListener('DOMContentLoaded', function () {
    console.log('Página de tipos carregada');
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function () {
            this.querySelector('.dropdown-menu').style.display = 'block';
        });

        dropdown.addEventListener('mouseleave', function () {
            this.querySelector('.dropdown-menu').style.display = 'none';
        });
    });
});
