import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Rehearsal {
  _id: string;
  bandId: string;
  title: string;
  description?: string;
  location?: {
    address?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  startTime: string;
  endTime: string;
  isRecurring: boolean;
  recurringPattern?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    interval: number;
    endDate?: string;
  };
  setlist?: {
    songTitle: string;
    duration?: number;
    notes?: string;
  }[];
  attendanceTracking?: {
    userId: string;
    status: 'attending' | 'maybe' | 'declined' | 'no_response';
    updatedAt: string;
  }[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface RehearsalState {
  rehearsals: Rehearsal[];
  currentRehearsal: Rehearsal | null;
  loading: boolean;
  error: string | null;
}

interface CreateRehearsalData {
  bandId: string;
  title: string;
  description?: string;
  location?: {
    address?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  startTime: string;
  endTime: string;
  isRecurring?: boolean;
  recurringPattern?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    interval: number;
    endDate?: string;
  };
  setlist?: {
    songTitle: string;
    duration?: number;
    notes?: string;
  }[];
}

interface UpdateRehearsalData {
  rehearsalId: string;
  title?: string;
  description?: string;
  location?: {
    address?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  startTime?: string;
  endTime?: string;
  isRecurring?: boolean;
  recurringPattern?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    interval: number;
    endDate?: string;
  };
  setlist?: {
    songTitle: string;
    duration?: number;
    notes?: string;
  }[];
}

interface UpdateAttendanceData {
  rehearsalId: string;
  status: 'attending' | 'maybe' | 'declined';
}

// Async thunks
export const fetchRehearsalsByBand = createAsyncThunk<Rehearsal[], string>(
  'rehearsals/fetchByBand',
  async (bandId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/bands/${bandId}/rehearsals`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || 'Failed to fetch rehearsals');
    }
  }
);

export const fetchRehearsalById = createAsyncThunk<Rehearsal, string>(
  'rehearsals/fetchById',
  async (rehearsalId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/rehearsals/${rehearsalId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || 'Failed to fetch rehearsal');
    }
  }
);

export const createRehearsal = createAsyncThunk<Rehearsal, CreateRehearsalData>(
  'rehearsals/create',
  async (rehearsalData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/rehearsals', rehearsalData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || 'Failed to create rehearsal');
    }
  }
);

export const updateRehearsal = createAsyncThunk<Rehearsal, UpdateRehearsalData>(
  'rehearsals/update',
  async ({ rehearsalId, ...rehearsalData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/rehearsals/${rehearsalId}`, rehearsalData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || 'Failed to update rehearsal');
    }
  }
);

export const deleteRehearsal = createAsyncThunk<string, string>(
  'rehearsals/delete',
  async (rehearsalId, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/rehearsals/${rehearsalId}`);
      return rehearsalId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || 'Failed to delete rehearsal');
    }
  }
);

export const updateAttendance = createAsyncThunk<Rehearsal, UpdateAttendanceData>(
  'rehearsals/updateAttendance',
  async ({ rehearsalId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/rehearsals/${rehearsalId}/attendance`, { status });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || 'Failed to update attendance');
    }
  }
);

const initialState: RehearsalState = {
  rehearsals: [],
  currentRehearsal: null,
  loading: false,
  error: null,
};

const rehearsalSlice = createSlice({
  name: 'rehearsals',
  initialState,
  reducers: {
    clearRehearsalError: (state) => {
      state.error = null;
    },
    clearCurrentRehearsal: (state) => {
      state.currentRehearsal = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch rehearsals by band
    builder.addCase(fetchRehearsalsByBand.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchRehearsalsByBand.fulfilled, (state, action: PayloadAction<Rehearsal[]>) => {
      state.loading = false;
      state.rehearsals = action.payload;
    });
    builder.addCase(fetchRehearsalsByBand.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Fetch rehearsal by ID
    builder.addCase(fetchRehearsalById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchRehearsalById.fulfilled, (state, action: PayloadAction<Rehearsal>) => {
      state.loading = false;
      state.currentRehearsal = action.payload;
    });
    builder.addCase(fetchRehearsalById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Create rehearsal
    builder.addCase(createRehearsal.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createRehearsal.fulfilled, (state, action: PayloadAction<Rehearsal>) => {
      state.loading = false;
      state.rehearsals.push(action.payload);
    });
    builder.addCase(createRehearsal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Update rehearsal
    builder.addCase(updateRehearsal.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateRehearsal.fulfilled, (state, action: PayloadAction<Rehearsal>) => {
      state.loading = false;
      const index = state.rehearsals.findIndex(rehearsal => rehearsal._id === action.payload._id);
      if (index !== -1) {
        state.rehearsals[index] = action.payload;
      }
      if (state.currentRehearsal && state.currentRehearsal._id === action.payload._id) {
        state.currentRehearsal = action.payload;
      }
    });
    builder.addCase(updateRehearsal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Delete rehearsal
    builder.addCase(deleteRehearsal.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteRehearsal.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.rehearsals = state.rehearsals.filter(rehearsal => rehearsal._id !== action.payload);
      if (state.currentRehearsal && state.currentRehearsal._id === action.payload) {
        state.currentRehearsal = null;
      }
    });
    builder.addCase(deleteRehearsal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Update attendance
    builder.addCase(updateAttendance.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateAttendance.fulfilled, (state, action: PayloadAction<Rehearsal>) => {
      state.loading = false;
      const index = state.rehearsals.findIndex(rehearsal => rehearsal._id === action.payload._id);
      if (index !== -1) {
        state.rehearsals[index] = action.payload;
      }
      if (state.currentRehearsal && state.currentRehearsal._id === action.payload._id) {
        state.currentRehearsal = action.payload;
      }
    });
    builder.addCase(updateAttendance.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearRehearsalError, clearCurrentRehearsal } = rehearsalSlice.actions;
export default rehearsalSlice.reducer;