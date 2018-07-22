import {subscribeToTopicHandler} from "./https/subscribeToTopic";

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp()
// admin.firestore().settings({timestampsInSnapshots: true})

export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

export const subscribeToTopic = functions.https.onRequest((req, res) => {
  subscribeToTopicHandler(req, res, admin)
})
