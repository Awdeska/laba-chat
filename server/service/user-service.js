const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const tokenService = require('./token-service');
const userDto = require('../dtos/user-dtos');
const ApiError = require('../exceptions/api-error');

class UserService {
    async registration(username, password) {
        const candidate = await UserModel.findOne({nickname: username})
        if (candidate) {
            throw ApiError.BadRequest('Пользователь с никнеймом: ' + username + ' уже существует')
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const user = await UserModel.create({nickname: username, password: hashPassword});

        const UserDto = new userDto(user);
        const tokens = tokenService.generateTokens({...UserDto});
        await tokenService.saveToken(UserDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: UserDto
        }
    }

    async login(username, password) {
        const user = await UserModel.findOne({nickname: username})
        if (!user) {
            throw ApiError.BadRequest('Пользователь с никнеймом: ' + username + ' не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль')
        }
        const UserDto = new userDto(user);
        const tokens = tokenService.generateTokens({...UserDto});
        await tokenService.saveToken(UserDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: UserDto
        }
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnautorizatedError();
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnautorizatedError();
        }
        const user = await UserModel.findById(userData.id);
        const UserDto = new userDto(user);
        const tokens = tokenService.generateTokens({...UserDto});
        await tokenService.saveToken(UserDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: UserDto
        }
    }
}

module.exports = new UserService();