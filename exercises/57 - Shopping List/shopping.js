const shoppingForm = document.querySelector(".shopping");
const list = document.querySelector(".list");

// we need an array to hold our state
let items = [];

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
    <input value="${item.id}" type="checkbox" ${item.complete ? 'checked' : ''}>
    <span class="itemName">${item.name}</span>
    <button
    aria-label="Remove ${item.name}"
    value="${item.id}">&times;</button>
    </li>`).join('');
  // console.log(html);
  list.innerHTML = html;
}

function mirrorToLocalStorage() {
  console.info('Saving items to localstorage');
  localStorage.setItem('items', JSON.stringify(items));
}

function restoreFromLocalStorage() {
  console.info('Restoring from local storage');
  // pull the items from local storage
  const lsItems = JSON.parse(localStorage.getItem('items'));
  if(lsItems.length) {
    items.push(...lsItems);
    list.dispatchEvent(new CustomEvent('itemsUpdated'))
  }
}

function deleteItem(id) {
  console.log('DELETING ITEM', id);
  // update our items array without this one
  items = items.filter(item => item.id !== id)
  console.log(items);
  list.dispatchEvent(new CustomEvent('itemsUpdated'))
}

function markAsComplete(id) {
  console.log('marking as complete', id);
  const itemRef = items.find(item => item.id === id);
  console.log(itemRef);
  itemRef.complete = !itemRef.complete;
  list.dispatchEvent(new CustomEvent('itemsUpdated'))
}

shoppingForm.addEventListener('submit', handleSubmit);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorToLocalStorage);

// Event Delegation: We listen on the click on the list URL but then delegate the click over to the button if that is what was clicked.

list.addEventListener('click', function(e) {
  console.log(e.target, e.currentTarget);

  const id = parseInt(e.target.value);
  if(e.target.matches('button')) {
    deleteItem(id);
  }

  if(e.target.matches('input[type="checkbox"]')) {
    markAsComplete(id);
  }
})

restoreFromLocalStorage()
