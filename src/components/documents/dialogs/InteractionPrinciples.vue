<template>
  <dialog-frame open-event="openInteractionPrinciplesDialog">
    <div slot="title">Принципы взаимодействия</div>
    <div slot="version">
      <v-select v-model="version" :items="items" label="version" prepend-icon="description"></v-select>
    </div>
    <div slot="description">
      <ol>
        <li>
          Наша студия работает в <b>"свободном режиме"</b> и не дает гарантий Заказчику
          на доступность в какое-то определенное время суток. <br>
          Как правило мы связываемся с Заказчиком по просьбе моментально,
          но не исключаем возможность задержки до суток.
        </li>
        <li>
          Студия <b>не производит переговоры по рабочим вопросам в социальных сетях</b>
          (VK, Facebook, Однокласники, и т.д.) в виду большого кол-ва отвлекающих факторов данных платформ. <br>
          На данный момент мы использует <b>Google Hangouts</b> для переговоров с Заказчиком.
        </li>
        <li>
          Предложения по использование нелицензионного медиаконтента на наших сайтах не допускается.
        </li>
        <li>
          Студия имеет право не предоставлять полный или частичный доступ к админ панели сайта, его функционалу,
          интерфейсу до полного завершения работ. Контроль за выполнением ТЗ может осуществлять иными средствами:
          видеозвонок, скриншоты или индивидуальный показ при встрече.
        </li>
      </ol>
    </div>
  </dialog-frame>
</template>

<script>
  import DialogFrame from '../DialogFrame'

  export default {
    name: 'InteractionPrinciples',
    components: {DialogFrame},
    data () {
      return {
        version: '1.0',
        items: ['1.0']
      }
    }
  }
</script>

<style scoped>
</style>
