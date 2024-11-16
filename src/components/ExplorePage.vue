<template>
    <div class="explore">
      <h1>Explore Sniff-Worthy Spots</h1>
      <p>Check out some of the top spots and hydrants shared by our community!</p>
  
      <div class="spot-list">
        <div v-for="spot in spots" :key="spot.id" class="spot-item">
          <img :src="require(`@/assets/${spot.image}`)" alt="spot image" class="spot-image" />
          <h2>{{ spot.name }}</h2>
          <p>{{ spot.description }}</p>
          <button class="like-button" @click="likeSpot(spot.id)">🐾 Like</button>
          <div v-if="spot.comments" class="comments">
            <h3>Other dogs who liked this spot:</h3>
            <ul>
              <li v-for="comment in spot.comments" :key="comment.id">{{ comment }}</li>
            </ul>
          </div>
          <p v-if="spot.error" class="error">{{ spot.error }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import * as Sentry from "@sentry/vue";

  export default {
    name: "ExplorePage",
    data() {
      return {
        spots: [
          {
            id: 1,
            name: "Big Red Hydrant",
            description: "A favorite spot in the neighborhood with the perfect sniff factor!",
            image: "fire-hydrant.webp",
            comments: null,
            likes: 0,
            error: null
          },
          {
            id: 2,
            name: "Shady Oak Park",
            description: "Great for running and sniffing with plenty of trees.",
            image: "shady-oak-hydrant.webp",
            comments: null,
            likes: 0,
            error: null
          },
          {
            id: 3,
            name: "Sunny Dog Beach",
            description: "A sandy paradise where you can dig, roll, and splash in the waves.",
            image: "beach-hydrant.webp",
            comments: null,
            likes: 0,
            error: null
          },
        ],
      };
    },
    methods: {
      async likeSpot(spotId) {
        const spot = this.spots.find((s) => s.id === spotId);
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/hydrants/${spotId}/like`, {
            method: "POST",
          });
          if (!response.ok) {
            throw new Error(`Failed to like hydrant with ID ${spotId}`);
          }
          const data = await response.json();
          spot.comments = data.comments;
          spot.error = null;
        } catch (error) {
          spot.error = "An error occurred while liking the hydrant.";
          Sentry.captureException(error)
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .explore {
    text-align: center;
    padding: 2em;
    color: #2c3e50;
  }
  
  .spot-list {
    display: flex;
    flex-wrap: wrap;
    gap: 2em;
    justify-content: center;
  }
  
  .spot-item {
    background-color: #f9f9f9;
    border-radius: 10px;
    width: 250px;
    padding: 1em;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .spot-image {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }
  
  .like-button {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 0.5em 1em;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    margin-top: 1em;
  }
  
  .like-button:hover {
    background-color: #2980b9;
  }
  </style>