'use strict'
// @ts-ignore
import * as cors from 'cors';
// @ts-ignore
const corsHandler = cors({origin: true});

// @ts-ignore
export const subscribeToTopicHandler = function (req, res, admin) {
  corsHandler(req, res, () => {
    console.log(req.body)
    const topic = 'restTime'
    const {token} = req.body
    const {userId} = req.body
    return admin.messaging().subscribeToTopic(token, topic)
      .then(function (response) {
        // See the MessagingTopicManagementResponse reference documentation
        // for the contents of response.
        console.log('Successfully subscribed to topic: ', response)
        return admin.firestore().collection('users').doc(userId).update({
          'fcm.token': token,
          'fcm.topics': { // db data mirror as admin.messaging().subscribeToTopic()
            // standUp: true,
            // taskStatus: true,
            [topic]: true
          }
        })
      })
      .then(() => {
        return res.sendStatus(200)
      })
      .catch(function (error) {
        console.log('Error subscribing to topic:', error)
        return res.sendStatus(500)
      })
  })
}

