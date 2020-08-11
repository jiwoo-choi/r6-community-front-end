
import { RouterStore } from 'mobx-react-router';
import ForumStore from './ForumStore';
import LoginStore from './LoginStore';
import RegisterStore from './RegisterStore';
import EditorStore from './EditorStore';
import PostStore from './PostStore';


class RootStore {

    router : RouterStore;
    forum : ForumStore;
    login : LoginStore;
    register: RegisterStore;
    editor: EditorStore;
    post: PostStore;

    constructor() {
        this.forum = new ForumStore(this);
        this.login = new LoginStore(this);
        this.register = new RegisterStore(this);
        this.editor = new EditorStore(this);
        this.post = new PostStore(this);
        this.router = new RouterStore();
    }
}

export default RootStore;
