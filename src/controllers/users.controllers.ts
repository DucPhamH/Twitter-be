import usersService from '~/services/users.services'
import { NextFunction, Request, Response } from 'express'
import { RegisterReqBody } from '~/models/requests/User.requests'
import { ParamsDictionary } from 'express-serve-static-core'
import { USERS_MESSAGES } from '~/constants/messages'
import { ObjectId } from 'mongodb'
import User from '~/models/schemas/User.schema'

export const loginController = async (req: Request, res: Response) => {
  // console.log(req.body.email)
  const user = req.user as User
  const user_id = user._id as ObjectId
  // const { user_id }: any = req
  const result = await usersService.login(user_id.toString())
  return res.json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result
  })
}

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await usersService.register(req.body)
  // await databaseService.users.find({})
  return res.json({
    message: USERS_MESSAGES.REGISTER_SUCCESS,
    result
  })
}
