<!--
* @Component:
* @Maintainer: J.K. Yang
* @Description:
-->
<script setup lang="ts">
import configs from "@/configs";
import MainMenu from "@/components/navigation/MainMenu.vue";
import { useCustomizeThemeStore } from "@/stores/customizeTheme";
import { Icon } from "@iconify/vue";
const customizeTheme = useCustomizeThemeStore();
const navigation = ref(configs.navigation);

const openGithubSite = () => {
  window.open("https://github.com/yangjiakai", "_blank");
};

onMounted(() => {
  scrollToBottom();
});

const scrollToBottom = () => {
  const contentArea = document.querySelector(".v-navigation-drawer__content");
  const activeItem = document.querySelector(
    ".v-list-item--active"
  ) as HTMLElement;

  setTimeout(() => {
    contentArea?.scrollTo({
      top: activeItem?.offsetTop,
    });
  }, 100);
};
</script>

<template>
  <v-navigation-drawer
    elevation="1"
    v-model="customizeTheme.mainSidebar"
    id="mainMenu"
  >
    <!-- ---------------------------------------------- -->
    <!---Top Area -->
    <!-- ---------------------------------------------- -->
    <template v-if="!customizeTheme.miniSidebar" v-slot:prepend>
      <v-card height="50" class="logo-card">
       <img
          v-if="customizeTheme.darkTheme"
          width="200"
          src="@/assets/logo_web.png"
          alt=""
        />
         <img
          v-else="customizeTheme.lightTheme"
          width="300"
          src="@/assets/logo_web.png"
          alt=""
        />
        <!--<h1 class="logo-text h-full">
          <Icon class="mr-2" width="40" icon="solar:plain-bold-duotone" />
          <span>Sankofa-afrik</span>
        </h1>-->
      </v-card>
    </template>

    <!-- ---------------------------------------------- -->
    <!---Nav List -->
    <!-- ---------------------------------------------- -->
    <div class="main-menu">
      <main-menu :menu="navigation.menu"></main-menu>
    </div>
    <!-- ---------------------------------------------- -->
    <!---Bottom Area -->
    <!-- ---------------------------------------------- -->

  </v-navigation-drawer>
</template>

<style scoped lang="scss">
.gradient-card {
  // background: linear-gradient(
  //   to bottom,
  //   rgba(var(--v-theme-primary), 1),
  //   rgba(var(--v-theme-primary), 0.9)
  // );
  background: linear-gradient(
    270deg,
    rgba(var(--v-theme-primary), 0.7) 0,
    rgb(var(--v-theme-primary)) 100%
  );
  box-shadow: 0 2px 6px rgba(var(--v-theme-primary), 0.3);
}

.logo-card {
  .logo-text {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: 600;
    color: rgba(var(--v-theme-primary));
  }
}
</style>
