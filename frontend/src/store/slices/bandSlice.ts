import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface BandMember {
  userId: string;
  role: 'leader' | 'admin' | 'member';
  joinedAt: string;
}

interface Band {
  _id: string;
  name: string;
  description: string;
  logo: string;
  createdBy: string;
  members: BandMember[];
  createdAt: string;
  updatedAt: string;
}

interface BandState {
  bands: Band[];
  currentBand: Band | null;
  loading: boolean;
  error: string | null;
}

interface CreateBandData {
  name: string;
  description?: string;
  logo?: string;
}

interface UpdateBandData {
  bandId: string;
  name?: string;
  description?: string;
  logo?: string;
}

// Async thunks
export const fetchBands = createAsyncThunk<Band[]>(
  'bands/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/bands');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || 'Failed to fetch bands');
    }
  }
);

export const fetchBandById = createAsyncThunk<Band, string>(
  'bands/fetchById',
  async (bandId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/bands/${bandId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || 'Failed to fetch band');
    }
  }
);

export const createBand = createAsyncThunk<Band, CreateBandData>(
  'bands/create',
  async (bandData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/bands', bandData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || 'Failed to create band');
    }
  }
);

export const updateBand = createAsyncThunk<Band, UpdateBandData>(
  'bands/update',
  async ({ bandId, ...bandData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/bands/${bandId}`, bandData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || 'Failed to update band');
    }
  }
);

export const deleteBand = createAsyncThunk<string, string>(
  'bands/delete',
  async (bandId, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/bands/${bandId}`);
      return bandId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || 'Failed to delete band');
    }
  }
);

const initialState: BandState = {
  bands: [],
  currentBand: null,
  loading: false,
  error: null,
};

const bandSlice = createSlice({
  name: 'bands',
  initialState,
  reducers: {
    clearBandError: (state) => {
      state.error = null;
    },
    clearCurrentBand: (state) => {
      state.currentBand = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all bands
    builder.addCase(fetchBands.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBands.fulfilled, (state, action: PayloadAction<Band[]>) => {
      state.loading = false;
      state.bands = action.payload;
    });
    builder.addCase(fetchBands.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Fetch band by ID
    builder.addCase(fetchBandById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBandById.fulfilled, (state, action: PayloadAction<Band>) => {
      state.loading = false;
      state.currentBand = action.payload;
    });
    builder.addCase(fetchBandById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Create band
    builder.addCase(createBand.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createBand.fulfilled, (state, action: PayloadAction<Band>) => {
      state.loading = false;
      state.bands.push(action.payload);
    });
    builder.addCase(createBand.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Update band
    builder.addCase(updateBand.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateBand.fulfilled, (state, action: PayloadAction<Band>) => {
      state.loading = false;
      const index = state.bands.findIndex(band => band._id === action.payload._id);
      if (index !== -1) {
        state.bands[index] = action.payload;
      }
      if (state.currentBand && state.currentBand._id === action.payload._id) {
        state.currentBand = action.payload;
      }
    });
    builder.addCase(updateBand.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Delete band
    builder.addCase(deleteBand.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteBand.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.bands = state.bands.filter(band => band._id !== action.payload);
      if (state.currentBand && state.currentBand._id === action.payload) {
        state.currentBand = null;
      }
    });
    builder.addCase(deleteBand.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearBandError, clearCurrentBand } = bandSlice.actions;
export default bandSlice.reducer;