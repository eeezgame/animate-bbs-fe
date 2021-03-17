import TDropdown from "vue-tailwind/dist/t-dropdown";

const setting = {
  "t-dropdown": {
    component: TDropdown,
    props: {
      fixedClasses: {
        button:
          "flex items-center block   transition duration-100 ease-in-out border border-transparent rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed",
        wrapper: "inline-flex flex-col",
        dropdownWrapper: "relative z-10",
        dropdown: "origin-top-left absolute left-0 w-56 rounded shadow mt-1",
        enterClass: "",
        enterActiveClass:
          "transition ease-out duration-100 transform opacity-0 scale-95",
        enterToClass: "transform opacity-100 scale-100",
        leaveClass: "transition ease-in transform opacity-100 scale-100",
        leaveActiveClass: "",
        leaveToClass: "transform opacity-0 scale-95 duration-75"
      },
      classes: {
        button: "text-white bg-blue-500 hover:bg-blue-600 py-2 px-4",
        dropdown: "bg-white"
      },
      variants: {
        danger: {
          button: "text-white bg-red-500 hover:bg-red-600 py-2 px-4",
          dropdown: "bg-red-50"
        },
        text: {
          button: "text-black hover:text-pink-500 py-0 px-0",
          dropdown: "bg-white"
        }
      }
    }
  }
};

export default setting;
