<template>
  <div>
    <app-router-name name="Documents"/>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm6 md4 @click="$bus.$emit('opeDogovorDialog')">
          <v-card color="secondary" class="doc_card" dark>
            <dogovor/>
            <v-card-title primary class="title">Договор на оказание услуг</v-card-title>
            <v-card-text>Типовой договор оказания услуг по созданию сайта предполагает, что Исполнитель обязуется
              оказать услуги по созданию сайта Заказчику, на условиях, определяемых Договором, а Заказчик обязуется
              принять услуги и оплатить их. <br>
              Оказание услуг по созданию сайта является возмездным. Разработка сайта производится на основании
              Технического Задания к Договору.
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3>
          <v-layout row wrap>
            <v-flex d-flex>
              <v-card color="success" class="doc_card" dark>
                <v-card-title class="title">Дополнительное соглашение к договору на оказание услуг</v-card-title>
              </v-card>
            </v-flex>
            <v-flex d-flex>
              <v-layout row wrap>
                <v-flex d-flex xs12>
                  <v-card color="secondary" class="doc_card" dark>
                    <v-card-title class="title">Стек используемых технологий</v-card-title>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex d-flex xs12 sm6 md2 child-flex>
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
  </div>
</template>

<script>
  import AppRouterName from '../theme/AppRouterName'
  import Dogovor from './dialogs/Dogovor'

export default {
    name: 'Documents',
    components: {Dogovor, AppRouterName}
  }
</script>

<style scoped>
  .doc_card {
    transition: .3s all
  }

  .doc_card:hover {
    cursor: pointer;
    transform: scale(1.01);
  }
</style>
