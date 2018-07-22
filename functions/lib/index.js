"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const updateFcmTopic_1 = require("./https/updateFcmTopic");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
admin.firestore().settings({ timestampsInSnapshots: true });
exports.updateFcmTopic = functions.https.onRequest((req, res) => {
    updateFcmTopic_1.updateFcmTopicHandler(req, res, admin);
});
//# sourceMappingURL=index.js.map