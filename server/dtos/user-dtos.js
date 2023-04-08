module.exports = class UserDto {
    nickname;
    id;

    constructor(model) {
        this.nickname = model.nickname;
        this.id = model._id;
    }
}