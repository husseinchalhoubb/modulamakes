const gridContainer = document.getElementById('gridContainer');

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      const gridItem = document.createElement('div');
      gridItem.classList.add('grid-item');

      const title = document.createElement('h2');
      title.textContent = item.title;
      gridItem.appendChild(title);

      const text = document.createElement('p');
      text.textContent = item.text;
      gridItem.appendChild(text);

      gridContainer.appendChild(gridItem);
    });
  })
  .catch(error => console.error(error));  // Handle errors if JSON fetching fails
