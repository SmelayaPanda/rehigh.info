export const data = {
  data: function () {
    return {
      ROLES: {
        admin: {val: 'admin', en: 'Admin', ru: 'Администратор'},
        developer: {val: 'developer', en: 'Developer', ru: 'Разработчик'},
        client: {val: 'client', en: 'Client', ru: 'Клиент'},
        guest: {val: 'guest', en: 'Guest', ru: 'Гость'}
      },
      RUB: '&nbsp;&#8381',
      TASK_STATUSES: {
        created: {val: 'created', en: 'Created', ru: 'Создан'},
        pending: {val: 'pending', en: 'Pending', ru: 'Ожидает'}, // only client can switch to status pending
        process: {val: 'process', en: 'Process', ru: 'В процессе'},
        finished: {val: 'finished', en: 'Finished', ru: 'Завершен'},
        accepted: {val: 'accepted', en: 'Accepted', ru: 'Принят'},
        stopped: {val: 'stopped', en: 'Stopped', ru: 'Приостановлен'}
      },
      TASK_TYPES: [ // TODO: to dictionaries
        'vue', 'vuex', 'vue-router', 'vuetify', 'elements-ui',
        'cloud-functions', 'firebase', 'firestore', 'algolia',
        'js', 'html', 'css',
        'design', 'logo', 'booklet', 'psd', 'ai', 'ae', 'ap'
      ],
      TASK_PRIORITY: {
        low: {val: 'low', en: 'Low', ru: 'Низкий'},
        middle: {val: 'middle', en: 'Middle', ru: 'Средний'},
        high: {val: 'high', en: 'High', ru: 'Высокий'}
      },
      PROJECT_TYPES: [ // TODO: to dictionaries
        'store', 'landing-page', 'presentation', 'presentation-store', 'info',
        'blog', 'card-site', 'personal', 'gallery', 'company', 'promo',
        'news', 'content', 'services'
      ]
    }
  }
}
