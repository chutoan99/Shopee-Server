import { Request, Response } from 'express'
import { internalServerError } from '../../middleWares/handle_errors'
const db = require('../../models/index')

const OrderService = {
  GetAllOrder: () => {
    return new Promise((resolve, reject) => {
      try {
        resolve([])
      } catch (error) {
        reject(error)
      }
    })
  },
  GetOrderId: () => {
    return new Promise((resolve, reject) => {
      try {
        resolve(null)
      } catch (error) {
        reject(error)
      }
    })
  },
  AddOrder: (req: Request, res: Response) => {
    return new Promise((resolve, reject) => {
      try {
        resolve(null)
      } catch (error) {
        reject(error)
      }
    })
  },
  UpdateOrder: (req: Request, res: Response) => {
    return new Promise((resolve, reject) => {
      try {
        resolve(null)
      } catch (error) {
        reject(error)
      }
    })
  },
  DeleteOrder: (req: Request, res: Response) => {
    return new Promise((resolve, reject) => {
      try {
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }
}

export default OrderService
