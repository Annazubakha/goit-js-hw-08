import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items.js';
// Add imports above this line

// Change code below this line
const refs = {
  list: document.querySelector('.gallery'),
};

const listItemsMarkup = createListItemsMarkup(galleryItems);

refs.list.innerHTML = listItemsMarkup;

function createListItemsMarkup(items) {
  return items
    .map(
      ({ preview, original, description }) => `
      <li class="gallery__item">
   <a class="gallery__link" href="${original}">
      <img class="gallery__image"
      src="${preview}" 
      alt="${description}" />
   </a>
</li>
`
    )
    .join('');
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

console.log(galleryItems);
