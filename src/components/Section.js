export default class Section{
  constructor({renderer}, container){    
    this._renderer = renderer;
    this._container = document.querySelector(container);
    // this._container = container;
  }

  renderItems(items) {
    items.reverse().forEach((item) => {
      this._renderer(item)
    });
  }
  
  addItem(item) {  //готовая разметка
    this._container.prepend(item);
  }
}