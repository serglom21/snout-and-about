<template>
    <nav class="navbar">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/explore" class="nav-link">Explore</router-link>
    </nav>
  </template>
  
  <script>
  export default {
    name: "NavBar",
  };
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-around;
    padding: 1em;
    background-color: #f8f9fa;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 50px;
  }
  
  .nav-link {
    color: #2c3e50;
    font-weight: bold;
    text-decoration: none;
    font-size: 1.1em;
  }
  
  .nav-link:hover {
    color: #3498db;
  }
  </style>