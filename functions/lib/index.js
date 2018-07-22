"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const updateFcmTopic_1 = require("./https/updateFcmTopic");
const sendFcm_1 = require("./https/sendFcm");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
admin.firestore().settings({ timestampsInSnapshots: true });
exports.updateFcmTopic = functions.https.onRequest((req, res) => {
    updateFcmTopic_1.updateFcmTopicHandler(req, res, admin);
});
exports.sendFcm = functions.https.onRequest((req, res) => {
    sendFcm_1.sendFcmHandler(req, res, admin);
});
//# sourceMappingURL=index.js.map