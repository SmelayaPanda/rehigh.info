export const data = {
  data: function () {
    return {
      USER_ROLES: {
        admin: {value: 'admin', en: 'Admin', ru: 'Администратор'},
        developer: {value: 'developer', en: 'Developer', ru: 'Разработчик'},
        client: {value: 'client', en: 'Client', ru: 'Клиент'},
        guest: {value: 'guest', en: 'Guest', ru: 'Гость'}
      },
      RUB: '&nbsp;&#8381',
      TASK_STATUSES: {
        created: {value: 'created', en: 'Created', ru: 'Создан'},
        pending: {value: 'pending', en: 'Pending', ru: 'Ожидает'}, // only client can switch to status pending
        started: {value: 'started', en: 'Started', ru: 'В процессе'},
        finished: {value: 'finished', en: 'Finished', ru: 'Завершен'},
        accepted: {value: 'accepted', en: 'Accepted', ru: 'Принят'},
        stopped: {value: 'stopped', en: 'Stopped', ru: 'Приостановлено'}
      },
      TASK_TYPES: [ // TODO: to dictionaries
        'vue', 'vuex', 'vue-router', 'vuetify', 'elements-ui',
        'cloud-functions', 'firebase', 'firestore', 'algolia',
        'js', 'html', 'css',
        'design', 'logo', 'booklet', 'psd', 'ai', 'ae', 'ap'
      ],
      TASK_PRIORITY: {
        low: {value: 'low', en: 'Low', ru: 'Низкий'},
        middle: {value: 'middle', en: 'Middle', ru: 'Средний'},
        high: {value: 'high', en: 'High', ru: 'Высокий'}
      },
      PROJECT_TYPES: [ // TODO: to dictionaries
        'store', 'landing-page', 'presentation', 'presentation-store', 'info',
        'blog', 'card-site', 'personal', 'gallery', 'company', 'promo',
        'news', 'content', 'services'
      ]
    }
  }
}
