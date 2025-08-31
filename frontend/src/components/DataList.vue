<template>
  <v-card class="mx-auto" max-width="600">
    <v-toolbar flat dense>
      <v-toolbar-title>Data List</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon @click="closeDialog">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container>
      <v-data-table :items="dataList" :headers="headers" class="elevation-1">

        <template v-slot:item="{ item, index }">
          <tr>
            <td>{{ item.firstName }}</td>
            <td>{{ item.lastName }}</td>
            <td>{{ item.birthDate }}</td>
            <td>{{ item.hobbies }}</td>
            <td class="d-flex align-center">
              <v-btn icon @click="$emit('editPerson', index)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>

              <v-btn icon @click="$emit('deletePerson', index)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-container>
  </v-card>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  dataList: Array,
  headers: Array,
  closeDialog: Function,
});
</script>

<script>
export default {
  data() {
    return {
      headers: [
        // { title: "Person Id", value: "personId" },
        { title: "First Name", value: "firstName" },
        { title: "Last Name", value: "lastName" },
        { title: "Birth Date", value: "birthDate" },
        { title: "Hobbies", value: "hobbies" },
      ],
    };
  },
  computed: {
    visibleHeaders() {
      return this.headers.filter((header) => header.value !== "personId");
    },
  },
};
</script>
