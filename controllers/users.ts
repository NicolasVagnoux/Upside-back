import { NextFunction, Request, RequestHandler, Response } from 'express';
import * as User from '../models/user';
import IUser from '../interfaces/IUser';
import { ErrorHandler } from '../helpers/errors';


// USERS //

// get all users
const getAllUsers = (async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
     
      const users = await User.getAllUsers();
  
      res.setHeader(
        'Content-Range',
        `users : 0-${users.length}/${users.length + 1}`
      );
      return res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }) as RequestHandler; 


  // get one user
  const getOneUser = (async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { idUser } = req.params;
      const user = await User.getUserById(Number(idUser));
      user ? res.status(200).json(user) : res.sendStatus(404);
    } catch (err) {
      next(err);
    }
  }) as RequestHandler;

  // put user into
  // updates a user
const updateUser = ( async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { idUser } = req.params;
      const currentUser = await User.getUserById(Number(idUser));
      const userUpdated = await User.updateUser(
        Number(idUser),
        req.body as IUser,
        currentUser 
      );
      if (userUpdated) {
        const user = await User.getUserById(Number(idUser));
        res.status(200).send(user); // react-admin needs this response
      } else {
        throw new ErrorHandler(500, `User cannot be updated`);
      }
    } catch (err) {
      next(err);
    }
  }) as RequestHandler;
  

// Sends an error if the email is already registered in the database
const emailIsFree = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // get email from req.body
    const { email } = req.body as IUser;
    // Checks if email already belongs to a registered user
    const userExists = await User.getUserByEmail(email);
    // If email isn't free = Send an error
    if (userExists) {
      next(new ErrorHandler(400, `This user already exists`));
    } else {
      // if email is free, next
      next();
    }
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

// checks if user exists
const userExists = (async (req: Request, res: Response, next: NextFunction) => {
  // Récupèrer l'id user de req.params
  const { idUser } = req.params;
  // Vérifier si le user existe
  try {
    const userExists = await User.getUserById(Number(idUser));
    // Si non, => erreur
    if (!userExists) {
      next(new ErrorHandler(404, `This user doesn't exist`));
    }
    // Si oui => next
    else {
      next();
    }
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

// adds a user
const addUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body as IUser;
    user.id = await User.addUser(user);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

// delete one user
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Récupèrer l'id user de req.params
    const { idUser } = req.params;
    // Vérifier si le user existe
    const user = await User.getUserById(Number(idUser));
    const userDeleted = await User.deleteUser(Number(idUser));
    if (userDeleted) {
      res.status(200).send(user); // react-admin needs this response
    } else {
      throw new ErrorHandler(500, `This user cannot be deleted`);
    }
  } catch (err) {
    next(err);
  }
};

export default {
  userExists,
  emailIsFree,
  deleteUser,
  addUser,
  getAllUsers,
  getOneUser,
  updateUser
};
