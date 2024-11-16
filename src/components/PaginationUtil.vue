<template>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "PaginationUtil",
    props: {
      totalItems: {
        type: Number,
        required: true, // Total number of items in the dataset
      },
      pageSize: {
        type: Number,
        default: 10, // Number of items per page
      },
      currentPage: {
        type: Number,
        default: 1, // Current page number
      },
    },
    emits: ["updatePage"], // Emit an event when the page changes
    computed: {
      totalPages() {
        return Math.ceil(this.totalItems / this.pageSize); // Calculate total pages
      },
    },
    methods: {
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.$emit("updatePage", this.currentPage + 1); // Emit new page number
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.$emit("updatePage", this.currentPage - 1); // Emit new page number
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  
  button {
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
  }
  
  button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  </style>