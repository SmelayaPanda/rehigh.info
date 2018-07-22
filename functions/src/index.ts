import {updateFcmTopicHandler} from "./https/updateFcmTopic";

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp()
admin.firestore().settings({timestampsInSnapshots: true})

export const updateFcmTopic = functions.https.onRequest((req, res) => {
  updateFcmTopicHandler(req, res, admin)
})
