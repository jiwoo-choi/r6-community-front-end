import { RouterStore } from "mobx-react-router";

export default class RootStoreExtend<T> {
    root: T;
    constructor(root: T) {
        this.root = root;
    }
}