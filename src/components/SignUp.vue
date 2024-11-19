<template>
    <div class="signup-page">
      <div class="hero-section">
        <h1>Barkingly good? Woofingly bad? or feeling</h1>
        <p>You will find the pawfect hydrant for any mood!</p>
        <div v-if="bannerReady" class="large-image-placeholder">
          <div>
            <div class="hydrant-placeholder"></div>
          </div>
        </div>
        <div v-else>
          <div>
            <div class="hydrant-placeholder-loading">
              <p>Placeholder Image</p>
            </div>
          </div>
        </div>
      </div>
  
      <div class="signup-form">
        <h2>Start sniffing for free</h2>
        <p>Enjoy 3 days of ad-free sniffing. Cancel anytime.</p>
  
        <form @submit.prevent="signup">
          <label>
            <input
              type="text"
              v-model="dogName"
              placeholder="Your dog's full name"
              required
            />
          </label>
          <label>
            <input
              type="text"
              v-model="username"
              placeholder="Your pawfect username"
              required
            />
          </label>
          <label>
            <input
              type="password"
              v-model="password"
              placeholder="Barkword"
              required
            />
          </label>
          <label>
            <input
              type="password"
              v-model="confirmPassword"
              placeholder="Repeat barkword"
              required
            />
          </label>
  
          <div class="submit-container">
            <button type="submit" class="sniff-button">Sniff In</button>
          </div>
        </form>
  
      </div>
    </div>

    <div class="section how-it-works">
      <h2>How It Works</h2>
      <p>Joining Snout & About is as easy as fetching a stick! Here’s how you and your furry friends can get started:</p>
      <ul>
        <li><strong>Step 1:</strong> Sign up and create your profile – don’t forget to add your favorite hydrant!</li>
        <li><strong>Step 2:</strong> Start sniffing out exciting spots and marking them as your favorites.</li>
        <li><strong>Step 3:</strong> Share your daily adventures and bark-worthy discoveries with the community.</li>
      </ul>
    </div>

    <div class="section featured-spots">
      <h2>Featured Sniff-Worthy Spots</h2>
      <p>Explore these popular spots sniffed out by our top users!</p>
      <div class="spot-gallery">
        <!-- Images of popular spots, or if you don't have images yet, use placeholder text -->
        <div class="spot">
          <h3>Central Park’s Big Oak</h3>
          <p>A paw-some spot with the best trees for marking!</p>
        </div>
        <div class="spot">
          <h3>Beachside Driftwood</h3>
          <p>Perfect for splashing and digging in the sand.</p>
        </div>
        <div class="spot">
          <h3>The Hydrant at Dogwood Ave</h3>
          <p>Rumor has it, the best dogs hang out here!</p>
        </div>
      </div>
    </div>

    <div class="section meet-the-pack">
    <h2>Meet the Pack</h2>
    <p>Every member of Snout & About is special! Here’s a peek at some of our top sniffers:</p>
    <div class="pack-gallery">
      <div class="member">
        <img :src="require(`@/assets/bella-the-beagle.webp`)" alt="Bella the Beagle">
        <h4>Bella</h4>
        <p>Loves sniffing the best hydrants in town.</p>
      </div>
      <div class="member">
        <img :src="require(`@/assets/max-the-retriever.webp`)" alt="Max the Golden Retriever">
        <h4>Max</h4>
        <p>Always up for an adventure with his pals.</p>
      </div>
      <div class="member">
        <img :src="require(`@/assets/coco-the-spaniel.webp`)" alt="Coco the Cocker Spaniel">
        <h4>Coco</h4>
        <p>A hydrant connoisseur with exquisite taste.</p>
      </div>
    </div>
  </div>

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

  <div v-if="popularSpots.length > 0">
    <h1>Check out these popular spots!</h1>
    <div class="spots-container">
      <div class="spots-column">
        <SpotWrapper
          v-for="spot in popularSpots"
          :key="spot.id"
          :spotName="spot.name"
          :sniffCount="spot.sniffCount"
        />
      </div>
    </div>
  </div>


  </template>
  
  <script>
  import * as Sentry from "@sentry/vue";
  import SpotWrapper from "@/components/SpotWrapper.vue";

  export default {
    name: "SignUp",
    components: {
      SpotWrapper,
    },
    data() {
     // this.getBannerReady();
      return {
        dogName: "",
        username: "",
        password: "",
        confirmPassword: "",
        popularSpots: [],
        bannerReady: false,
        pageSize: 10,
        currentPage: 1,
        //
        activeSpan: null,
        backendUrl: null,
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
    mounted() {
      this.populateSpots();
      this.bannerReady = true
      this.activeSpan = Sentry.getActiveSpan() ?? null;
      this.backendUrl = process.env.VUE_APP_HYDRANT_BACKEND_URL;
    },
    computed: {
      currentPageSpots(){
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        return this.popularSpots.slice(start, end);
      }
    },
    methods: {
      async likeSpot(spotId) {
        const keyName = "comment"
        const spot = this.spots.find((s) => s.id === spotId);
        try {
          let response = await fetch(`${this.backendUrl}/api/hydrants/${spotId}/like`, {
            method: "POST",
            body: JSON.stringify({
              keyName
            }),
            headers: {
              "Content-Type": "application/json"
            }
          });
      
          if (!response?.ok) {
            throw new Error(`Failed to like hydrant with ID ${spotId}`);
          }
          const data = await response.json();
          spot[keyName] = data[keyName]
          spot.error = null;
        } catch (error) {
          spot.error = "An error occurred while liking the hydrant.";
          if (this.activeSpan) {
            Sentry.withActiveSpan(this.activeSpan, () => {
              Sentry.captureException(error)
            })
          } else {
            Sentry.captureException(error)
          }
        }
      },
      populateSpots(){
        const spots = Array.from({ length: 10000 }, (_, i) => ({
          id: i,
          name: `Spot ${i}`,
          sniffCount: Math.floor(Math.random() * 1000),
        }));
        this.popularSpots = spots;
      },
      signup() {
        // Logic for signing up goes here
        console.log("Dog Name:", this.dogName);
        console.log("Username:", this.username);
      },
      updatePage(newPage) {
        this.currentPage = newPage;
      },
    }
  };
  </script>
  
  <style scoped>
  .signup-page {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  .hero-section {
    width: 50%;
    padding: 20px;
  }
  
  .hero-section h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .hero-section p {
    font-size: 16px;
    margin-bottom: 20px;
  }
  
  .hydrant-placeholder, .hydrant-placeholder-loading {
    border: 1px dashed #ccc;
    width: 80%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-style: italic;
    
  }
  
  .hydrant-placeholder {
    background-image: url('../assets/dog-hydrant.jpg');
    background-size: cover;
  }
  .signup-form {
    width: 40%;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
  
  .signup-form h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  .signup-form p {
    font-size: 14px;
    margin-bottom: 20px;
  }
  
  .signup-form form {
    display: flex;
    flex-direction: column;
  }
  
  .signup-form input {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .sniff-button {
    margin-top: 30px;
    padding: 10px 50px 10px 50px;
    background-color: #ff6347;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .sniff-button:hover {
    background-color: #ff4500;
  }
  
  .social-buttons {
    display: flex;
    gap: 10px;
  }
  
  .social-button {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }
  
  .social-button.google {
    background-color: #4285f4;
    color: white;
  }
  
  .social-button.facebook {
    background-color: #4267b2;
    color: white;
  }

  .section {
    padding: 2em;
    text-align: center;
  }

  .section h2 {
    font-size: 1.8em;
    margin-bottom: 0.5em;
  }

  .section p, .section ul {
    font-size: 1em;
    margin: 0 auto 1.5em;
    max-width: 600px;
    color: #2c3e50;
    text-align: justify;
  }

  .spot-gallery, .pack-gallery {
    display: flex;
    gap: 1em;
    justify-content: center;
  }

  .spot, .member {
    background-color: #f9f9f9;
    padding: 1em;
    border-radius: 10px;
    width: 200px;
    text-align: center;
    overflow: hidden;
  }

  .member img {
    width: 100%;
  height: 200px; /* Sets a fixed height for consistency */
  object-fit: cover; /* Ensures the image covers the container */
  border-radius: 8px; /* Optional: Rounds image corners slightly */
  }

  .testimonials .testimonial, .faq .faq-item {
    background-color: #fff;
    border-radius: 8px;
    padding: 1em;
    margin-bottom: 1em;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

 

  .spots-container {
    display: flex;
    justify-content: center
  }

  .spots-column {
    flex-direction: column;
  }

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