"use strict"

const bookmark = {
  header: document.querySelector("header"),
  menuOpenButton: document.querySelector("button[aria-label='Open menu']"),
  menuCloseButton: document.querySelector("button[aria-label='Close menu']"),
  mainMenu: document.querySelector("#menu"),
  tablist: document.querySelector(".tablist"),
  tabItems: document.querySelectorAll("[data-position]"),
  faq: document.querySelector(".faq-container"),
  form: document.querySelector("form[name='newsletter-form']"),

  init() {
    this.header.addEventListener("click", this.toggleMobileMenu.bind(this));
    this.tablist.addEventListener("click", this.changeTabOnClick.bind(this));
    this.faq.addEventListener("click", this.toggleFaqBlockOnClick.bind(this));
    this.form.addEventListener("submit", this.showMessageForSuccessfulSubmit.bind(this))
  },

  toggleMobileMenu(event) {
    let target = event.target.closest("button[aria-label='Open menu'], button[aria-label='Close menu']");
    if (!target) return;

    if (target == this.menuOpenButton) {
      this.openMenu();
    } else if (target == this.menuCloseButton) {
      this.closeMenu();
    }
  },
  
  openMenu() {
    this.mainMenu.classList.add("mobile-menu-active");
    this.menuOpenButton.setAttribute("aria-expanded", "true");
    this.closeMenuByResize = this.closeMenu.bind(this);
    window.addEventListener("resize", this.closeMenuByResize);
    this.closeMenuByEscape = this.closeMenuForKeydown.bind(this);
    window.addEventListener("keydown", this.closeMenuByEscape);
    this.menuCloseButton.focus();

  },

  closeMenu() {
    this.mainMenu.classList.remove("mobile-menu-active");
    this.menuOpenButton.setAttribute("aria-expanded", "false");
    window.removeEventListener("resize", this.closeMenuByResize);
    window.removeEventListener("keydown", this.closeMenuByEscape);
    this.menuOpenButton.focus();
  },

  closeMenuForKeydown(event) {
    if (event.key === "Escape") {
      this.closeMenu()
    }
  },

  changeTabOnClick(event) {
    const target = event.target.closest("[data-position]");
    if (target.matches(".tab-active")) return;

    for(let tabItem of this.tabItems) {
      if (tabItem.matches(".tab-active")) {
        tabItem.classList.remove("tab-active");
        const tab = tabItem.firstElementChild;
        tab.setAttribute("aria-selected", "false");

        const tabpanel = document.querySelector(`[aria-labelledby='${tab.id}']`);
        tabpanel.classList.remove("tabpanel-active");
      }

      if (tabItem === target) {
        tabItem.classList.add("tab-active");
        const tab = tabItem.firstElementChild;
        tab.setAttribute("aria-selected", "true");

        const tabpanel = document.querySelector(`[aria-labelledby='${tab.id}']`);
        tabpanel.classList.add("tabpanel-active");
      }
    }
  },

  toggleFaqBlockOnClick(event) {
    const button = event.target.closest('.faq-toggle-btn');
    if (!button) return

    let newValue;
    if (button.getAttribute("aria-expanded") === "true") {
      newValue = "false";
    } else if (button.getAttribute("aria-expanded") === "false") {
      newValue = "true";
    }
    button.setAttribute("aria-expanded", newValue)

    const id = button.getAttribute("aria-controls");
    document.querySelector(`#${id}`).classList.toggle("open");
  },

  showMessageForSuccessfulSubmit(event) {
    event.preventDefault();
    alert("thanks");
    this.form.querySelector(".newsletter-field").value = "";
  }
}

bookmark.init();
