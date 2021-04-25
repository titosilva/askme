const express = require('express');
const QuizCreateCommand = require('../models/quiz.createCommand');
const QuizService = require('../services/quizService');
const TokenService = require('../services/tokenService');
const UserService = require('../services/userService');
const apiResponse = require('./apiResponse');

// eslint-disable-next-line new-cap
const quizRouter = express.Router();

quizRouter.get('', async (req, res, next) => {
  let quizzes = [];
  try {
    const token = TokenService.getRequiredTokenFromRequest(req);
    const creatorId = TokenService.getUserIdFromToken(token);

    // Check user existance
    await UserService.getUserById(creatorId);

    quizzes = await QuizService.getQuizzesByCreatorId(
        creatorId, req.query.offset, req.query.limit);

    if (!quizzes) {
      quizzes = [];
    }
  } catch (err) {
    next(err);
  }

  res.status(200);
  res.send(apiResponse(true, 'Questionários listados com sucesso!', quizzes));
});

quizRouter.post('', async (req, res, next) => {
  let result = null;
  try {
    const token = TokenService.getRequiredTokenFromRequest(req);
    const creatorId = TokenService.getUserIdFromToken(token);

    // Check user existance
    await UserService.getUserById(creatorId);

    result = await QuizService.createQuiz(new QuizCreateCommand(
        creatorId, req.body.title, req.body.isAnonymous,
    ));

    if (!result) {
      throw new Error('Received null as result');
    }
  } catch (err) {
    next(err);
  }

  res.status(200);
  res.send(apiResponse(true,
      'Questionário criado com sucesso!', result.toObject()));
});

module.exports = quizRouter;
