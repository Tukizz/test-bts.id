<template>
  <main>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand" :to="{ name: 'home' }"
          >BTS.id Test</router-link
        >

        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'home' }"
              >Home
            </router-link>
          </li>
          <li class="nav-item">
            <button @click="logout" class="btn btn-text">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container py-4">
      <div class="row">
        <div v-if="alert.on" class="row justify-content-center">
          <div
            class="alert alert-primary alert-dismissible fade show"
            role="alert"
          >
            {{ alert.message }}
            <button
              @click="alert.on = false"
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-12">
          <button
            class="btn btn-primary mb-3"
            @click="createListForm = true"
          >
            Buat List Baru
          </button>
          <div class="card mb-3" v-if="createListForm">
            <div class="card-body">
              <div class="mb-3">
                <label for="TaskName" class="form-label"
                  >Task Name</label
                >
                <input
                  v-model="form.taskName"
                  type="text"
                  class="form-control"
                  id="TaskName"
                />
              </div>
              <button
                type="submit"
                @click="createListForm = false"
                class="btn text-link"
              >
                Cancel
              </button>
              <button
                @click="createList"
                type="submit"
                class="btn btn-primary"
              >
                Buat
              </button>
            </div>
          </div>
          <div
            class="card mb-5 shadow"
            v-for="list in data.slice().reverse()"
            :key="list.id"
          >
            <div class="card-body">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Task Name</th>
                    <th scope="col">
                      <button
                        class="btn btn-success"
                        @click="createNestedList = list.id"
                      >
                        Create Task
                      </button>

                      <button
                        class="btn btn-danger ms-2"
                        @click="deleteList(list.id)"
                      >
                        Delete
                      </button>

                      <div
                        v-if="createNestedList == list.id"
                        class="row g-3 align-items-center mt-2"
                      >
                        <div class="col-auto">
                          <input
                            v-model="form.nestedNameCreate"
                            type="text"
                            class="form-control"
                            placeholder="Task Name"
                          />
                        </div>
                        <div class="col-auto">
                          <button
                            class="btn btn-success"
                            @click="createListNested(list.id)"
                          >
                            Create
                          </button>
                          <button
                            class="btn btn-link"
                            @click="createNestedList = null"
                          >
                            cancel
                          </button>
                        </div>
                      </div>
                    </th>

                    <th scope="col">
                      Status
                      {{
                        list.checklistCompletionStatus ? "✔" : "❌"
                      }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ list.name }}</td>
                    <td>
                      <table class="table mb-0">
                        <thead>
                          <tr>
                            <th scope="col">Task</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="nested in list.items"
                            :key="nested.id"
                          >
                            <td>
                              <div
                                v-if="editNestedList == nested.id"
                                class="row g-3 align-items-center"
                              >
                                <div class="col-auto">
                                  <input
                                    v-model="form.nestedListEdit"
                                    type="text"
                                    class="form-control"
                                  />
                                </div>
                                <div class="col-auto">
                                  <button
                                    @click="
                                      editListNested(
                                        nested.id,
                                        list.id
                                      )
                                    "
                                    class="btn btn-success"
                                  >
                                    edit
                                  </button>
                                  <button
                                    @click="editNestedList = null"
                                    class="btn btn-link"
                                  >
                                    cancel
                                  </button>
                                </div>
                              </div>
                              <div v-else>
                                {{ nested.name }}
                              </div>
                            </td>
                            <td>
                              {{
                                nested.itemCompletionStatus
                                  ? "✔"
                                  : "❌"
                              }}
                            </td>

                            <td>
                              <button
                                class="btn btn-success me-2"
                                @click="
                                  (editNestedList = nested.id),
                                    (form.nestedListEdit =
                                      nested.name)
                                "
                              >
                                Edit
                              </button>
                              <button
                                class="btn btn-primary me-2"
                                @click="
                                  changeStatusListNested(nested.id)
                                "
                              >
                                Change Status
                              </button>
                              <button
                                class="btn btn-danger"
                                @click="
                                  deleteListNested(nested.id, list.id)
                                "
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      data: [],
      alert: {
        on: false,
        message: ""
      },
      form: {
        taskName: null,
        taskNameNested: null,
        nestedListEdit: null,
        nestedNameCreate: null
      },
      createListForm: false,
      editNestedList: null,
      createNestedList: null
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      axios.get(process.env.VUE_APP_API + "/checklist").then(res => {
        this.data = res.data.data;
        console.log(res);
      });
    },
    createList() {
      axios
        .post(process.env.VUE_APP_API + "/checklist", {
          name: this.form.taskName
        })
        .then(() => {
          this.load();
          this.alert.on = true;
          this.alert.message = "Task List Terbuat";
          this.form.taskName = null;
        })
        .catch(() => {
          this.alert.on = true;
          this.alert.message = "Server Error";
          document.documentElement.scrollTop = 0;
        });
    },
    deleteList(id) {
      axios
        .delete(process.env.VUE_APP_API + "/checklist/" + id)
        .then(() => {
          this.load();
          this.alert.on = true;
          this.alert.message = "Task List di hapus";
        })
        .catch(() => {
          this.alert.on = true;
          this.alert.message = "Server Error";
          document.documentElement.scrollTop = 0;
        });
    },
    changeStatusListNested(id) {
      axios
        .put(process.env.VUE_APP_API + "/item/" + id)
        .then(() => {
          this.load();
          this.alert.on = true;
          this.alert.message = "Task List status diganti";
        })
        .catch(() => {
          this.alert.on = true;
          this.alert.message = "Server Error";
          document.documentElement.scrollTop = 0;
        });
    },
    createListNested(id) {
      axios
        .post(process.env.VUE_APP_API + "/item", {
          checklistId: id,
          itemName: this.form.nestedNameCreate
        })
        .then(() => {
          this.load();
          this.alert.on = true;
          this.alert.message = "Task Terbuat";
          this.form.nestedNameCreate = null;
          this.createNestedList = false;
        })
        .catch(() => {
          this.alert.on = true;
          this.alert.message = "Server Error";
          document.documentElement.scrollTop = 0;
        });
    },
    editListNested(id, en) {
      console.log(id);
      axios
        .put(process.env.VUE_APP_API + "/item/rename/" + id, {
          checklistId: en,
          itemName: this.form.nestedListEdit
        })
        .then(() => {
          this.form.nestedListEdit = null;
          this.editNestedList = null;
          this.alert.on = true;
          this.alert.message = "Nama Task diganti";
          this.load();
        })
        .catch(() => {
          this.alert.on = true;
          this.alert.message = "Server Error";
          document.documentElement.scrollTop = 0;
        });
    },
    deleteListNested(id, en) {
      axios
        .delete(process.env.VUE_APP_API + "/item/" + en, {
          checklistId: id
        })
        .then(() => {
          this.load();
          this.alert.on = true;
          this.alert.message = "List Task di hapus";
        })
        .catch(() => {
          this.alert.on = true;
          this.alert.message = "Server Error";
          document.documentElement.scrollTop = 0;
        });
    },
    logout() {
      this.$store
        .dispatch("logout")
        .then(() => {
          this.$router.push("/?status=true");
        })
        .catch(() => {
          this.error = true;
        });
    }
  }
};
</script>
