import { Request, Response } from 'express'
import Joi from 'joi'
const cloudinary = require('cloudinary').v2

import OverviewService from '../../services/client/overview.service'
import { internalServerError, badRequest } from '../../middleWares/handle_errors'
import { image, name, price } from '../../helpers/validate'

const OverviewController = {
  GetAllOverview: async (req: Request, res: Response) => {
    const query = req.query
    try {
      const response = await OverviewService.GetAllOverview(query)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },

  AddOverview: async (req: any, res: Response) => {
    const fileData = req.file
    const payload = req.body
    try {
      const { error } = Joi.object({ image, name, price }).validate({
        name: req.body.name,
        price: req.body.price,
        image: fileData.path
      })
      if (error) {
        if (fileData) cloudinary.uploader.destroy(fileData.filename)

        return badRequest(error.details[0].message, res)
      }
      const response = await OverviewService.AddOverview(payload, fileData)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },

  GetOverviewId: async (req: Request, res: Response) => {
    const { itemid } = req.params
    try {
      const response = await OverviewService.GetOverviewId(itemid)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },

  UpdateOverview: async (req: any, res: Response) => {
    const { itemid } = req.params
    const fileData = req.file
    const payload = req.body
    try {
      const response = await OverviewService.UpdateOverview(itemid, payload, fileData)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },

  DeleteOverview: async (req: Request, res: Response) => {
    const { itemid } = req.params
    const { fileName } = req.query
    try {
      const response = await OverviewService.DeleteOverview(itemid, fileName)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },

  GetAllId: async (req: Request, res: Response) => {
    try {
      // const response = await OverviewService.GetAllid()
      // return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  }
}

export default OverviewController
