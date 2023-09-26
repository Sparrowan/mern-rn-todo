import { AnyObjectSchema } from 'yup'
import { Request, Response, NextFunction } from 'express'

const validateRequest = (schema: AnyObjectSchema) => async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params
        })
        next()
    }
    catch (e: any) {
        return res.status(400).send(e)

    }

}


export  {validateRequest}
