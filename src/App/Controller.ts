import Model from './Model';
import View from './View';

class Controller {
    model: Model;
    view: View;

    constructor(model: Model, view: View) {
        this.model = model;
        this.view = view;
    }
}

export default Controller;
