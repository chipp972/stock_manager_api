import {DatabaseObject} from '../type/model.d.ts'
import {StockState} from '../lib/stock_state'
import {Router, Request, Response, NextFunction} from 'express'

export function getStockStateRoutes (model: DatabaseObject): Router {
  let router = Router()

  router.get('/', (req: Request, res: Response, next: NextFunction) => {
    model.place.find({}).exec()
    .then((documents) => {
      res.status(200).json(documents.map((e) => { return e._id }))
    }, (err) => {
      return next(err)
    })
  })

  // stock state for a specific place
  router.route('/:id')
  .get((req: Request, res: Response, next: NextFunction) => {
    let placeId = Number(req.params['id'])
    let stockState = new StockState(placeId)

    stockState.toObject()
    .then(obj => res.status(200).json(obj))
    .catch(err => {
      model.logger.error(err)
      return next(err)
    })
  })

  return router
}
