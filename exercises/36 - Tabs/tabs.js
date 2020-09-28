const tabs = document.querySelector('.tabs');
const tabButtons = tabs.querySelectorAll('[role="tab"]');
const tabPanels = Array.from(tabs.querySelectorAll('[role="tabpanel"]'));

function handleTabClick(event) {
  // console.log(tabPanels);
  tabPanels.forEach(panel => {
    panel.hidden = true;
  });
  // hide all tab panels
  // mark all tabs as unselected
  tabButtons.forEach(tab => {
    // tab.ariaSelected = false;
    tab.setAttribute('aria-selected', false);
  })
  // mark the clicked tab as selected
  event.currentTarget.setAttribute('aria-selected', true);
  // find the associated tab panel and show it.

    // method 1

  const id = event.currentTarget.id;
  // const tabPanel = tabs.querySelector(`[aria-labelledby=${id}]`);
  // tabPanel.hidden = false;

  // method 2

  const tabPanel = tabPanels.find(
    panel => panel.getAttribute('aria-labelledby') === id
  );
  tabPanel.hidden = false;
}

tabButtons.forEach(button => button.addEventListener('click', handleTabClick));
