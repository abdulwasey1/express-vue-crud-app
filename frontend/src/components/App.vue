<!-- eslint-disable vue/no-unused-vars -->
<template>
  <v-toolbar density="compact">
    <v-toolbar-title>Add Person</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon @click="showDataList = !showDataList">
      <v-icon>mdi-account-circle</v-icon>
    </v-btn>
  </v-toolbar>

  <v-card class="mx-auto" max-width="500" title="Person Details">
    <v-container>
      <v-text-field
        color="primary"
        label="First Name"
        v-model="formData.firstName"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        color="primary"
        label="Last Name"
        v-model="formData.lastName"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        color="primary"
        label="Birth Date"
        v-model="formData.birthDate"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        color="primary"
        label="Hobbies"
        v-model="formData.hobbies"
        variant="underlined"
      ></v-text-field>
    </v-container>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn @click="submitForm">Submit</v-btn>
      <v-btn @click="clearForm">clear</v-btn>
    </v-card-actions>
  </v-card>

  <v-dialog v-model="showDataList" persistent max-width="600">
    <template v-slot:default="dialog">
      <DataList
        :closeDialog="closeDialog"
        :dataList="dataList"
        @deletePerson="deletePerson"
        @editPerson="editPerson"
      />
    </template>
  </v-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DataList from "./DataList.vue";
import axios from "axios";

const showDataList = ref(false);

const formData = ref({
  personId: null,
  firstName: "",
  lastName: "",
  birthDate: "",
  hobbies: "",
});

const dataList = ref([]);

const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:8086/persons");
    dataList.value = response.data;
  } catch (err) {
    console.log(err);
  }
};

onMounted(fetchData);

const submitForm = async () => {
  if (
    !formData.value.firstName ||
    !formData.value.lastName ||
    !formData.value.birthDate ||
    !formData.value.hobbies
  ) {
    alert("Fill all the fields.");
    return;
  }

  if (formData.value.personId) {
    await axios.put("http://localhost:8086/person", formData.value);
  } else {
    await axios.post("http://localhost:8086/person", formData.value);
  }
  fetchData();
  clearForm();
  showDataList.value = true;
};

const clearForm = () => {
  formData.value = {
    personId: null,
    firstName: "",
    lastName: "",
    birthDate: "",
    hobbies: "",
  };
};

const closeDialog = () => {
  showDataList.value = false;
};

const deletePerson = async (index) => {
  const personId = dataList.value[index].personId;
  try {
    await axios.delete(`http://localhost:8086/person?personId=${personId}`);
    fetchData();
  } catch (err) {
    console.log(err);
  }
};

const editPerson = (index) => {
  const person = dataList.value[index];
  formData.value = { ...person };
  showDataList.value = false;
};
</script>
