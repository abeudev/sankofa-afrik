<!--
* @Component:
* @Maintainer: J.K. Yang
* @Description:
-->
<script setup lang="ts">
import type { User, Ilot} from "./types";
import { faker } from "@faker-js/faker";
import moment from "moment";
import { searchUsersApi, searchIlotsApi } from "@/api/unsplashApi";
import CopyLabel from "@/components/common/CopyLabel.vue";
import axios from 'axios';

const loading = ref(true);
const totalRows = ref(0);

const queryOptions = reactive({
  query: "cat",
  page: 1,
  per_page: 25,
});

const chooseColor = () => {
  let colors = ["red", "indigo", "blue", "cyan", "teal"];
  let randomColor = colors[Math.floor(Math.random() * colors.length)];
  return randomColor;
};
const generateMessage = () => {
  return {
    // 生成4位id
    avatar: faker.internet.avatar(),
    username: faker.internet.userName(),
    usermail: faker.internet.email(),
    phone: faker.phone.number(),
    jdate: moment(faker.date.past()).format("YYYY/MM/DD"),
    role: faker.name.jobTitle(),
    rolestatus: chooseColor(),
  };
};

const list = () => {
  let list = [] as any[];
  list = Array.from({ length: 20 }, (value, index) => ({
    id: "#1000" + index + "",
    ...generateMessage(),
  }));
  return list;
};
const headers = ref([
  { title: "nom", key: "ilotName" },
  { title: "description", key: "description" },
  { title: "projet", key: "id" },
  { title: "nombre de lot", key: "name" },
  { title: "nombre de bornes", key: "location", width: "200px" },
  { title: "photo", key: "for_hire" },
  { title: "Action", key: "total_collections" },
 /* { title: "喜欢数", key: "total_likes" },
  { title: "照片数", key: "total_photos" },
  { title: "接受条款", key: "accepted_tos" },
  { title: "作品集", key: "portfolio_url" },*/
]);

const usersList = ref<Ilot[]>([]);


const dialog = ref(false);
const search = ref("");
const rolesbg = ref(["primary", "secondary", "error", "success", "warning"]);
const desserts = ref(list());
const editedIndex = ref(-1);
const refForm = ref();
const editedItem = ref({
  id: "",
  avatar: "1.jpg",
  username: "",
  usermail: "",
  phone: "",
  jdate: "",
  role: "",
  rolestatus: "",
});
const defaultItem = ref({
  id: "",
  avatar: faker.internet.avatar(),
  username: "",
  usermail: "",
  phone: "",
  jdate: "",
  role: "",
  rolestatus: "",
});
const getUsers = async () => {
  loading.value = true;
  const params = queryOptions;

  const usersResponse = await searchIlotsApi();
  console.log("retour", usersResponse);

  usersList.value = usersResponse.data.data.map((user) => {
    return {
      id: user.id,
      img: user.img,
      username: user.projectName,
      name: user.name,
      description: user.description,
      projectName: user.projectName,
      total_collections: user.ilotName,
      total_likes: user.ilotName,
      total_photos: user.ilotName,
      accepted_tos: user.ilotName,
      portfolio_url: user.ilotName,
    };
  });

  console.log("list ilot", usersList.value);

  totalRows.value = usersResponse.data.data.length;

  loading.value = false;
};

function editItem(item: any) {
  editedIndex.value = desserts.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialog.value = true;
}
function deleteItem(item: any) {
  const index = desserts.value.indexOf(item);
  confirm("Are you sure you want to delete this item?") &&
    desserts.value.splice(index, 1);
  ``;
}
const onUpdateOptions = async (options) => {
  if (!queryOptions.query) return;
  queryOptions.per_page = options.itemsPerPage;
  queryOptions.page = options.page;
  await getUsers();
};

const getLikesColor = (likes) => {
  if (likes > 400) return "red";
  else if (likes > 200) return "orange";
  else return "grey";
};
</script>

<template>
  <div class="pa-5">
    <v-card>
      <v-card-title class="font-weight-bold">
        <span> Liste des Ilots</span>
        <v-spacer></v-spacer>

        <div class="w-25">
          <v-text-field
            v-model="queryOptions.query"
            variant="solo"
            prepend-inner-icon="mdi-magnify"
            @click:append="getUsers"
            label="Search"
            single-line
            hide-details
            clearable
            density="compact"
          ></v-text-field>
        </div>
      </v-card-title>
      <v-divider />
      <v-card-text class="pa-0">
        <v-data-table-server
          :headers="headers"
          :items="usersList"
          :search="queryOptions.query"
          :loading="loading"
          :items-per-page="queryOptions.per_page"
          :items-length="totalRows"
          item-value="id"
          @update:options="onUpdateOptions"
          fixed-header
          height="900"
        >
          <template v-slot:item="{ item }">
            <tr class="">
              <td >{{item.name}}</td>
              <td>{{ item.description }}</td>
              <td>{{ item.projectName }}</td>

              <td>{{ item.name }}</td>
              <td>{{ item.description }}</td>

              <td>
                <v-avatar size="30">
                  <img :src="item.img" alt="alt" />
                </v-avatar>
              </td>
              <td>
                <div class="d-flex align-center">
                  <v-tooltip text="Edit">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        color="blue"
                        icon
                        variant="text"
                        @click="editItem(item)"
                        v-bind="props"
                      >
                        <v-icon>mdi-pencil-outline</v-icon>
                        <!-- <img
                          width="26"
                          src="https://img.icons8.com/fluency/48/null/edit.png"
                      /> -->
                      </v-btn>
                    </template>
                  </v-tooltip>
                  <v-tooltip text="Delete">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        icon
                        variant="text"
                        @click="deleteItem(item)"
                        v-bind="props"
                        color="error"
                      >
                        <v-icon>mdi-delete-outline</v-icon>
                        <!-- <img
                          width="26"
                          src="https://img.icons8.com/fluency/48/null/filled-trash.png"
                      /> -->
                      </v-btn>
                    </template>
                  </v-tooltip>
                </div>
              </td>




            </tr>
          </template>
        </v-data-table-server>
      </v-card-text>
    </v-card>
  </div class="pa-5">
</template>
<style lang="scss" scoped></style>
