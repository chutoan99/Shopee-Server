import { Request, Response } from 'express'
import { internalServerError } from '../../middleWares/handle_errors'
const db = require('../../models/index')

const OrderService = {
  GetAllOrder: async (req: Request, res: Response) => {
    try {
      return []
    } catch (error) {
      throw new Error(`Failed to Delete Overview`)
    }
  },

  GetOrderId: async (req: Request, res: Response) => {
    {
      try {
        return null
      } catch (error) {
        throw new Error(`Failed to Delete Overview`)
      }
    }
  },

  AddOrder: async (req: Request, res: Response) => {
    {
      try {
        return null
      } catch (error) {
        throw new Error(`Failed to Delete Overview`)
      }
    }
  },

  UpdateOrder: async (req: Request, res: Response) => {
    {
      try {
        return null
      } catch (error) {
        throw new Error(`Failed to Delete Overview`)
      }
    }
  },

  DeleteOrder: async (req: Request, res: Response) => {
    {
      try {
        return true
      } catch (error) {
        throw new Error(`Failed to Delete Overview`)
      }
    }
  }
}

export default OrderService
