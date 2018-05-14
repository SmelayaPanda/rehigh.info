<template>
  <div>
    <app-router-name :name="msg.contacts[LANG]"/>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm6 md5>
          <v-card color="secondary" dark>
            <v-card-title primary class="title">Договор на оказание услуг</v-card-title>
            <v-card-text>Типовой договор оказания услуг по созданию сайта предполагает, что Исполнитель
              обязуется
              оказать услуги по созданию сайта Заказчику, на условиях, определяемых Договором, а Заказчик
              обязуется
              принять услуги и оплатить их. <br>
              Оказание услуг по созданию сайта является возмездным. Разработка сайта производится на
              основании
              Технического Задания к Договору.
            </v-card-text>
            <v-container id="dogovor_wrap">
              <a href="https://docs.google.com/document/d/1lZ1uJQnpSqgZkeb8YRx73UTJcXatIC1_sto7-LBwTcg/edit?ts=5aa03102"
                 target="_blank">
                <v-icon class="primary--text">insert_drive_file</v-icon>
                <span id="dogovor">Документ</span></a>
            </v-container>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md4>
          <v-layout row wrap>
            <v-flex d-flex @click="$bus.$emit('openAdditionalWorksDialog')">
              <v-card color="success" class="doc_card" dark>
                <v-card-title class="title">Порядок оказания дополнительных услуг</v-card-title>
              </v-card>
            </v-flex>
            <v-flex d-flex>
              <v-layout row wrap>
                <v-flex d-flex xs12 @click="$bus.$emit('openTechnologyStackDialog')">
                  <v-card color="secondary" class="doc_card" dark>
                    <v-card-title class="title">Стек используемых технологий</v-card-title>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3 child-flex @click="$bus.$emit('openImportantToKnowDialog')">
          <v-card color="success" class="doc_card" dark>
            <v-card-text class="title">Важно знать</v-card-text>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3 @click="$bus.$emit('openInteractionPrinciplesDialog')">
          <v-card color="secondary" class="doc_card" dark>
            <v-card-text class="title">Принципы взаимодейсвия</v-card-text>
          </v-card>
        </v-flex>
        <v-flex d-flex>
          <v-card color="secondary" class="doc_card" dark>
            <v-card-text class="title">Электронная подпись документов</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <!--DIALOGS-->
    <technology-stack/>
    <additional-works/>
    <important-to-know/>
    <interaction-principles/>
  </div>
</template>

<script>
  import AppRouterName from '../theme/AppRouterName'
  import TechnologyStack from './dialogs/TechnologyStack'
  import AdditionalWorks from './dialogs/AdditionalWorks'
  import ImportantToKnow from './dialogs/ImportantToKnow'
  import InteractionPrinciples from './dialogs/InteractionPrinciples'

export default {
    name: 'Documents',
    components: {InteractionPrinciples, ImportantToKnow, AdditionalWorks, TechnologyStack, AppRouterName},
    data () {
      return {
        msg: {
          contacts: {en: 'Documents', ru: 'Документы'}
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .doc_card {
    transition: .3s all
  }

  .doc_card:hover {
    cursor: pointer;
    transform: scale(1.015);
  }

  #dogovor_wrap {
    margin-top: 0;
    padding-top: 0;
  }

  #dogovor:hover {
    text-decoration: underline;
  }

</style>
