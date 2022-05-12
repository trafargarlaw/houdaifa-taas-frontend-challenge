<template>
  <div v-if="userStore.showSuccessAlert">
    <div
      class="flex ease-in-out justify-between items-center rounded-md bg-blue-200 space-x-2 text-white text-sm font-bold px-4 py-3 absolute z-20"
      role="alert"
    >
      <div class="flex items-center">
        <svg
          class="fill-current w-6 h-6 mr-2 bg-blue-600 p-1 rounded-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"
          />
        </svg>
        <p class="text-blue-500">
          {{ userStore.successMessage }}
        </p>
      </div>
      <button @click="userStore.showSuccessAlert = false">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="94.926px"
          height="94.926px"
          viewBox="0 0 94.926 94.926"
          class="w-4 h-4 text-blue-300 fill-blue-600"
        >
          <g>
            <path
              d="M55.931,47.463L94.306,9.09c0.826-0.827,0.826-2.167,0-2.994L88.833,0.62C88.436,0.224,87.896,0,87.335,0   c-0.562,0-1.101,0.224-1.498,0.62L47.463,38.994L9.089,0.62c-0.795-0.795-2.202-0.794-2.995,0L0.622,6.096   c-0.827,0.827-0.827,2.167,0,2.994l38.374,38.373L0.622,85.836c-0.827,0.827-0.827,2.167,0,2.994l5.473,5.476   c0.397,0.396,0.936,0.62,1.498,0.62s1.1-0.224,1.497-0.62l38.374-38.374l38.374,38.374c0.397,0.396,0.937,0.62,1.498,0.62   s1.101-0.224,1.498-0.62l5.473-5.476c0.826-0.827,0.826-2.167,0-2.994L55.931,47.463z"
            />
          </g>
        </svg>
      </button>
    </div>
  </div>
  <div v-else-if="userStore.showErrorAlert">
    <div
      class="flex ease-in-out justify-between items-center rounded-md bg-red-200 space-x-2 text-white text-sm font-bold px-4 py-3 absolute z-20"
      role="alert"
    >
      <div class="flex items-center">
        <svg
          class="fill-current w-6 h-6 mr-2 bg-red-600 p-1 rounded-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"
          />
        </svg>
        <p class="text-red-500">
          {{ userStore.errorMessage }}
        </p>
      </div>
      <button @click="userStore.showErrorAlert = false">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="94.926px"
          height="94.926px"
          viewBox="0 0 94.926 94.926"
          class="w-4 h-4 text-blue-300 fill-red-600"
        >
          <g>
            <path
              d="M55.931,47.463L94.306,9.09c0.826-0.827,0.826-2.167,0-2.994L88.833,0.62C88.436,0.224,87.896,0,87.335,0   c-0.562,0-1.101,0.224-1.498,0.62L47.463,38.994L9.089,0.62c-0.795-0.795-2.202-0.794-2.995,0L0.622,6.096   c-0.827,0.827-0.827,2.167,0,2.994l38.374,38.373L0.622,85.836c-0.827,0.827-0.827,2.167,0,2.994l5.473,5.476   c0.397,0.396,0.936,0.62,1.498,0.62s1.1-0.224,1.497-0.62l38.374-38.374l38.374,38.374c0.397,0.396,0.937,0.62,1.498,0.62   s1.101-0.224,1.498-0.62l5.473-5.476c0.826-0.827,0.826-2.167,0-2.994L55.931,47.463z"
            />
          </g>
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useUser } from "../stores/user";

export default defineComponent({
  name: "BaseAlert",
  setup() {
    const userStore = useUser();
    return {
      userStore,
    };
  },
});
</script>
