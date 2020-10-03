const shoppingForm = document.querySelector(".shopping");
const list = document.querySelector(".list");

// we need an array to hold our state
const items = [];

function handleSubmit(e) {
  e.preventDefault();
  console.log("submitted!");
  // console.log(e.currentTarget);
  const name = e.currentTarget.item.value;
  // console.log(name);
  const item = {
    name: name,
    id: Date.now(),
    complete: false,
  };
  // Push the items into our state
  items.push(item);
  console.log(`There are now ${items.length} in your state`);
  // clear the form
  // e.currentTarget.item.value = '';
  e.target.reset();
  // fire off a custom event that will tell anyone else who cares that the items have been updated.
  // displayItems();
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function displayItems() {
  const html = items.map(
    item => `<li class="shopping-item">
    <input type="checkbox">
    <span class="itemName">${item.name}</span>
    <button aria-label="Remove ${item.name}">&times;</button>
    </li>`).join('');
  // console.log(html);
  list.innerHTML = html;
}

function mirrorToLocalStorage() {
  console.info('Saving items to localstorage');
}

shoppingForm.addEventListener('submit', handleSubmit);
list.addEventListener('itemsUpdated', displayItems)
list.addEventListener('itemsUpdated', mirrorToLocalStorage)
