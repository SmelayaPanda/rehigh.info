'use strict'
import * as cors from 'cors';

const corsHandler = cors({origin: true});

export const updateFcmTopicHandler = function (req, res, admin) {
  corsHandler(req, res, () => {
    console.log(req.body)
    const {token} = req.body
    const {topic} = req.body
    const {userId} = req.body
    const {subscribe} = req.body

    let query = admin.messaging()
    query = subscribe ? query.subscribeToTopic(token, topic) : query.unsubscribeFromTopic(token, topic);
    return query.then(function (response) {
      console.log('Subscribe response: ', response)
      return admin.firestore().collection('users').doc(userId).update({[`fcm.topics.${topic}`]: subscribe})
    })
      .then(() => res.sendStatus(200))
      .catch(err => {
        console.log(err)
        return res.sendStatus(500)
      })
  })
}

