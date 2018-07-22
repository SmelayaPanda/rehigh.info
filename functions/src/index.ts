import {updateFcmTopicHandler} from "./https/updateFcmTopic";
import {sendFcmHandler} from "./https/sendFcm";

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp()
admin.firestore().settings({timestampsInSnapshots: true})

export const updateFcmTopic = functions.https.onRequest((req, res) => {
  updateFcmTopicHandler(req, res, admin)
})

export const sendFcm = functions.https.onRequest((req, res) => {
  sendFcmHandler(req, res, admin)
})
