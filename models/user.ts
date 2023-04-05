/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access*/
import connection from '../db-config';
// import { ResultSetHeader } from 'mysql2';
import IUser from '../interfaces/IUser';
import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../helpers/errors';


const getAllUsers = async (): Promise<IUser[]> => {
    const sql = `SELECT id, firstname, lastname, email, isIntern FROM users`;
    const results = await connection.query(sql);
    return results.rows;
  };

  const getUserById = async (idUser: number): Promise<IUser> => {
    const results = await connection.query(
        'SELECT id, firstname, lastname, email, isIntern FROM users WHERE id = $1',
        [idUser]
      );
    return results.rows[0];
  };


  // route put 

  const updateUser = async (idUser: number, user: IUser, currentUser: IUser): Promise<boolean> => {
    // let sql = 'UPDATE users SET ';
    // const sqlValues: Array<string | number | boolean > = [];
    // let oneValue = false;
  
    // if (user.firstname) {
    //   sql += 'firstname = ? ';
    //   sqlValues.push(user.firstname);
    //   oneValue = true;
    // }
    // if (user.lastname) {
    //   sql += oneValue ? ', lastname = ? ' : ' lastname = ? ';
    //   sqlValues.push(user.lastname);
    //   oneValue = true;
    // }
    // if (user.email) {
    //   sql += oneValue ? ', email = ? ' : ' email = ? ';
    //   sqlValues.push(user.email);
    //   oneValue = true;
    // }
    // if (user.password) {
    //   sql += oneValue ? ', password = ? ' : ' password = ? ';
    //   sqlValues.push(user.password);
    //   oneValue = true;
    // }
    // if (user.isIntern) {
    //   sql += oneValue ? ', isIntern = ? ' : ' isIntern = ? ';
    //   sqlValues.push(user.isIntern);
    //   oneValue = true;
    // }
    // sql += ' WHERE id = ?';
    // sqlValues.push(idUser);
  
    // const results = await connection
    //   .promise()
    //   .query<ResultSetHeader>(sql, sqlValues);
    const results = await connection.query(
      'UPDATE users SET firstname = $1, lastname = $2, email = $3, password = $4, isIntern = $5 WHERE id = $6',
      [
        user.firstname || currentUser.firstname,
        user.lastname || currentUser.lastname,
        user.email || currentUser.email,
        user.password || currentUser.password,
        user.isintern || currentUser.isintern,
        idUser
      ]
    );
    return results.rowCount === 1;
  };

const getUserByEmail = async (email: string): Promise<IUser> => {
  const results = await connection.query(
      'SELECT id, firstname, lastname, email, password, isIntern FROM users WHERE email = $1',
      [email]
    );
  return results.rows[0];
};



const emailIsFree = async (req: Request, res: Response, next: NextFunction) => {
  // Récupèrer l'email dans le req.body
  const user = req.body as IUser;
  // Vérifier si l'email appartient déjà à un user
  const userExists: IUser = await getUserByEmail(user.email);
  // Si oui => erreur
  if (userExists) {
    next(new ErrorHandler(409, `This user already exists`));
  } else {
    // Si non => next
    next();
  }
};

const addUser = async (user: IUser): Promise<number> => {
  const results = await connection.query(
      'INSERT INTO users (firstname, lastname, email, password, isIntern) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [user.firstname, user.lastname, user.email, user.password, user.isIntern]
    );
  return results.rows[0].id;
};



const deleteUser = async (idUser: number): Promise<boolean> => {
  const results = await connection.query('DELETE FROM users WHERE id = $1', [idUser]);
  return results.rowCount === 1;
};

export {
  getUserByEmail,
  deleteUser,
  
  emailIsFree,
  
  addUser,
  getAllUsers,
  getUserById,
  updateUser
};

