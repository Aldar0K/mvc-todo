import Model from './Model';
import View from './View';
import Controller from './Controller';

const app = new Controller(new Model(), new View());

export default app;
