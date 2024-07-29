const gridContainer = document.getElementById('gridContainer');
const gridItems = [];

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            const gridItem = document.createElement('div');
            gridItem.classList.add('file3-grid-item');

            const title = document.createElement('h2');
            const percentage = document.createElement('span');
            percentage.textContent = '0';
            percentage.classList.add('percentage');
            title.appendChild(percentage);
            title.innerHTML += '%';
            gridItem.appendChild(title);

            const text = document.createElement('p');
            text.textContent = item.text;
            gridItem.appendChild(text);

            gridContainer.appendChild(gridItem);

            gridItems.push({
                element: gridItem,
                start: item.start,
                end: item.end,
                duration: 1300 // Animation duration in milliseconds
            });
        });

        // Initialize Intersection Observer
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateGridItems();
                    observer.unobserve(entry.target);
                }
            });
        });

        // Observe the grid container
        observer.observe(gridContainer);
    })
    .catch(error => console.error(error));

function animateGridItems() {
    gridItems.forEach(item => {
        const startTime = performance.now();

        function update() {
            const elapsed = performance.now() - startTime;
            const progress = Math.min(1, elapsed / item.duration);
            const value = Math.floor(progress * (item.end - item.start) + item.start);
            item.element.querySelector('.percentage').textContent = value;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                item.element.querySelector('.percentage').textContent = item.end;
                item.element.classList.add('file3-animate');
            }
        }

        update();
    });
}
