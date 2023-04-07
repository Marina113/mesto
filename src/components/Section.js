export default class Section{
  constructor({renderer}, container){    
    this._renderer = renderer;
    this._container = document.querySelector(container);
    // this._container = container;
  }

  renderItems(items) {
    this._renderedItems = items;
    this._renderedItems.reverse().forEach((item) => {
      this._renderer(item)
    });
  }
  
  addItem(item) {  //готовая разметка
    this._container.prepend(item);
  }

  // addItem(element, isInversed = false) {
  //   if (isInversed) {
  //     this._container.prepend(element);
  //   } else {
  //     this._container.append(element);
  //   };
  // };
}

