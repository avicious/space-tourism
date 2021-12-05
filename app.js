const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

let tabFocus = 0;

tabList.addEventListener('keydown', changeTabFocus)

for(let tab of tabs) {
    tab.addEventListener('click', changeTabPanel)
}

function changeTabFocus(e) {
    const keydownLeft = 37;
    const keyDownRight = 39;

    if(e.keyCode === keydownLeft || e.keyCode === keyDownRight) {
        tabs[tabFocus].setAttribute('tabindex', -1)

        if(e.keyCode === keyDownRight) {
            tabFocus++
            if(tabFocus >= tabs.length) {
                tabFocus = 0;
            }
        } else if (e.keyCode === keydownLeft) {
            tabFocus--
            if(tabFocus < 0) {
                tabFocus = tabs.length - 1;
            }
        }

        tabs[tabFocus].setAttribute('tabindex', 0);
        tabs[tabFocus].focus();
    }
}

function changeTabPanel(e) {
    const targetTab = e.target;
    const targetPanel = targetTab.getAttribute('aria-controls');
    const targetImage = targetTab.getAttribute('data-image')

    const tabContaner = targetTab.parentNode;
    const mainContainer = tabContaner.parentNode; 

    tabContaner.querySelector('[aria-selected="true"]').setAttribute('aria-selected', false)

    targetTab.setAttribute('aria-selected', true)

    const articles = mainContainer.querySelectorAll('article')

    for(let article of articles) {
            article.setAttribute('hidden', true);
            article.classList.add('hide')
    }

    const pictures = mainContainer.querySelectorAll('picture')

    for(let picture of pictures) {
        picture.setAttribute('hidden', true);
    }

    mainContainer.querySelector([`#${targetPanel}`]).removeAttribute('hidden');
    mainContainer.querySelector([`#${targetPanel}`]).classList.remove('hide');
    mainContainer.querySelector([`#${targetImage}`]).removeAttribute('hidden');
}