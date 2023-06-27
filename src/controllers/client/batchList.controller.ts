import { Request, Response } from 'express'
import BatchListService from '../../services/client/batchList.service'
import { internalServerError } from '../../middleWares/handle_errors'

const BatchListController = {
  GetAllBatchList: async (req: Request, res: Response): Promise<Response> => {
    try {
      const response = await BatchListService.GetAllBatchList()
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  }
}

export default BatchListController
