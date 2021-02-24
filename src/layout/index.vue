<template>
  <div id="app">
    <!-- <div id="nav" class="container">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>z
    </div> -->
    <nav
      class="fixed  w-full top-0 left-0 bg-gray-100 hover:bg-miku-100 px-6 shadow"
    >
      <div
        class="flex flex-col h-6 container mx-auto md:flex-row md:items-center md:justify-between"
      >
        <div class="flex justify-between items-center">
          <div>
            <a href="#" class="text-gray-800 hover:text-red-500 text-sm"
              >首页</a
            >
          </div>
          <div>
            <button
              type="button"
              class="block text-gray-800 hover:text-gray-600 focus:text-gray-600 focus:outline-none md:hidden"
            >
              <svg viewBox="0 0 24 24" class="h-6 w-6 fill-current">
                <path
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="md:flex flex-col md:flex-row md:-mx-4 hidden">
          <button
            href="#"
            class="my-1 px-2 bg-miku-500 text-gray-100 font-bold hover:bg-miku-400 md:mx-4 md:my-0"
          >
            发帖
          </button>
          <a
            href="#"
            class="my-1 text-gray-800 hover:text-red-500 md:mx-4 md:my-0"
            >User</a
          >
          <a
            href="#"
            class="my-1 text-gray-800 hover:text-red-500 md:mx-4 md:my-0"
            >Theme</a
          >
        </div>
      </div>
    </nav>
    <main>
      <h1 class="text-center mt-6 p-6 text-yellow-900 font-extrabold text-5xl">
        MikuChan233
      </h1>
      <router-view />
    </main>
    <footer
      class="bg-green-50 text-xs w-full border-solid border-gray-600 border-t p-1 fixed left-0 bottom-0"
    >
      <div class="flex items-end">
        <img
          src="./assets/miku_fighting.png"
          alt=""
          class="w-4 h-4 inline-block"
        />
        <p class="divide-x divide-gray-400">
          <a href="#" class="text-blue-600 no-underline px-1">首页版规</a>
          <a href="/" class="text-blue-600 no-underline px-1">微博</a>
          <a href="/" class="text-blue-600 no-underline px-1">知乎</a>
        </p>
      </div>
      <div class="flex items-end">
        <img
          src="./assets/miku_happy.png"
          alt=""
          class="w-4 h-4 inline-block"
        />
        <a href="/" class="text-blue-600 no-underline px-1">lbwnb</a>
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
body {
  background: #d2ffee;
  font-family: arial, helvetica, sans-serif;
  color: black;
  font-size: 10pt;
}
main {
  background: url("../assets/fade-miku.png") top repeat-x;
}
</style>
