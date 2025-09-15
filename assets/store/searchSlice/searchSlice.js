// searchSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PRODUCT_DATA } from "../../../utils/constant";
import { GoogleGenAI } from '@google/genai';

export const fetchRecommendations = createAsyncThunk(
  "search/fetchRecommendations",
  async (userQuery, { rejectWithValue }) => {
    try {
      const prompt = `
        You are an AI product advisor. The user will describe their needs.
        Your job is to recommend the most suitable products from the PRODUCT_CATALOG below
        and explain why they are a good match.

        PRODUCT_CATALOG:
        ${PRODUCT_DATA.map(
          (p) =>
            `- ${p.product_name} (${p.category}, ₹${p.price}): ${p.description}`
        ).join("\n")}

        Respond ONLY with a valid JSON array like:
        [
            { "product_name": "Example Product", "reason": "Because ..." }
        ]
        User Query: ${userQuery}
      `;

      const ai = new GoogleGenAI({
        apiKey: "AIzaSyCRWvOLPIwo8yBIUtGf4OOm2ZwdUQ9Qorw",
      });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          thinkingConfig: {
            systemInstruction: prompt,
          },
        },
      });

      let recommendations = recommendations =JSON.parse(response?.candidates?.[0]?.content?.parts?.[0]?.text.replace(/```json|```/g, "").trim());

      return recommendations;
    } catch (error) {
      console.error("Error:", error);
      return rejectWithValue(error?.message || "Failed to fetch recommendations");
    }
  }
);

const searchSlice = createSlice({
    name: "search",
    initialState: {
        query: "",
        recommendations: null,
        loading: false,
        error: null,
    },
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload;
        },
        clearResults: (state) => {
            state.recommendations = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecommendations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecommendations.fulfilled, (state, action) => {
                state.loading = false;
                state.recommendations = action.payload;
            })
            .addCase(fetchRecommendations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setQuery, clearResults } = searchSlice.actions;
export default searchSlice.reducer;
