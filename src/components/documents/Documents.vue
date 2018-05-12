<template>
  <div>
    <app-router-name :name="msg.contacts[LANG]"/>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm6 md5 @click="$bus.$emit('opeDogovorDialog')">
          <v-card color="secondary" class="doc_card" dark>
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
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md4>
          <v-layout row wrap>
            <v-flex d-flex>
              <v-card color="success" class="doc_card" dark>
                <v-card-title class="title">Дополнительное соглашение к договору на оказание услуг
                </v-card-title>
              </v-card>
            </v-flex>
            <v-flex d-flex>
              <v-layout row wrap @click="$bus.$emit('openTechnologyStackDialog')">
                <v-flex d-flex xs12>
                  <v-card color="secondary" class="doc_card" dark>
                    <v-card-title class="title">Стек используемых технологий</v-card-title>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3 child-flex>
          <v-card color="success" class="doc_card" dark>
            <v-card-text class="title">Важно знать</v-card-text>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3>
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
    <dogovor/>
    <technology-stack/>
  </div>
</template>

<script>
  import AppRouterName from '../theme/AppRouterName'
  import Dogovor from './dialogs/Dogovor'
  import TechnologyStack from "./dialogs/TechnologyStack";

  export default {
    name: 'Documents',
    components: {TechnologyStack, Dogovor, AppRouterName},
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
    transform: scale(1.01);
  }
</style>
