# 🛍️ AI Product Advisor (React Native)

A React Native application that acts as an **AI-powered product advisor**.  
Users can describe their needs in natural language (e.g., *“I need a lightweight laptop for travel with long battery life”*), and the app recommends the most suitable products from a **provided catalog**. Recommendations are powered by **Google Gemini** with fallback to a local keyword-based recommender.  

---

## 🚀 Architecture

### Component Flow
- **Navigation Layer**  
  - **Stack + Bottom Tabs** handle screen-to-screen navigation (Home, Search, Details, Bookmarks).  
- **Screens**
  - **HomeScreen** → Displays catalog overview.  
  - **SearchScreen** → User enters query, triggers AI recommendation, results displayed in cards.  
  - **DetailsScreen** → Detailed product view.  
- **UI Components**
  - **AnimatedCard** → Used for creative recommendation display with smooth animation.  
  - **ProductCard** → Reusable static display for catalog products.  

### Data Flow
- **Redux Toolkit** is the single source of truth.  
  - `productsSlice` → Stores the global product catalog.  
  - `searchSlice` → Manages query, recommendations, loading, and error states.  
- **Async Flow**
  - User inputs query → `fetchRecommendations` thunk calls Gemini API.  
  - AI compares query against product catalog → returns JSON recommendations.  
  - Redux updates → UI renders recommendations (with animation for top results).  
  - Fallback: Local keyword-based recommender if AI fails or JSON parsing breaks.  

---

## 🛠️ Approach

1. **State Management**  
   - Chose **Redux Toolkit** for predictable state updates and scalability.  
   - Keeps catalog, query, and recommendations globally accessible.  

2. **AI Integration**  
   - Used **Google Gemini** (`gemini-2.5-flash`) to parse natural queries.  
   - Crafted structured prompts to enforce **JSON output** (array of products + reasons).  
   - Built in **robust JSON parsing + fallback recommender** to ensure demo never breaks.  

3. **UI/UX Decisions**  
   - Simple, polished interface with search input and animated recommendation cards.  
   - Animated top recommendation card to highlight “best match.”  
   - Clear separation of concerns: screens vs components vs state.  

4. **Resilience**  
   - AI errors, bad responses, or empty results gracefully fallback to deterministic recommendations.  
   - This ensures the demo always works even without internet or API quota.  

---

## 📂 File Structure

```bash
AI-Product-Advisor/
├── app/                 # Main application folder
│   ├── navigation/      # Stack + Tab navigators
│   ├── screens/         # Screens (Home, Search, Details, etc.)
│   ├── components/      # Reusable UI components (AnimatedCard, ProductCard)
│   ├── redux/           # State management
│   │   ├── slices/
│   │   │   ├── productsSlice.js
│   │   │   └── searchSlice.js
│   │   └── store.js
│   └── utils/
│       └── constant.js  # PRODUCT_CATALOG data
│
├── assets/              # Images, icons
├── App.js               # Entry point (navigation + provider setup)
├── package.json         # Dependencies
└── README.md            # Project documentation (this file)

git clone https://github.com/pardhan03/PickSmart
cd PickSmart

npm install

