'use strict'
import * as cors from 'cors';

const corsHandler = cors({origin: true});

export const sendFcmHandler = function (req, res, admin) {
  corsHandler(req, res, () => {
    console.log(req.body)

    let message: any = {
      notification: {
        title: req.body.title,
        body: req.body.body
      }
    }

    if (req.body.token) {
      message.token = req.body.token
    }
    if (req.body.topic) {
      message.topic = req.body.topic
    }
    // Send a message to the device or topic
    admin.messaging().send(message)
      .then(() => res.sendStatus(200))
      .catch(err => {
        console.log(err)
        return res.sendStatus(500)
      })
  })
}
