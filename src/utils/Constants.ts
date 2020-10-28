export default class {
    static OBJECT_ID_REGEX = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
    static PASSWORD_REGEX = /^(?=.*?[A-Za-z])(?=.*?[0-9]).*$/;
}
