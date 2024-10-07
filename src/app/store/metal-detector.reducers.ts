import { createReducer, on } from '@ngrx/store';
import * as MetalDetectorActions from './metal-detector.actions';
import { ListMetalDetector} from "../models/metaldetector";

export const metalDetectorFeatureKey = 'metalDetectors';

export interface MetalDetectorState {
  metalDetectors: ListMetalDetector[];
  loading: boolean;
  error: string | null;
}

export const initialState: MetalDetectorState = {
  metalDetectors: [],
  loading: false,
  error: null,
};

export const metalDetectorReducer = createReducer(
  initialState,
  on(MetalDetectorActions.loadMetalDetectors, (state) => ({
    ...state,
    loading: true,
    error: ''
  })),
  on(MetalDetectorActions.loadMetalDetectorsSuccess, (state, { metalDetectors }) => ({
    ...state,
    metalDetectors: [...metalDetectors],
    loading: false,
    error: null,
  })),
  on(MetalDetectorActions.loadMetalDetectorsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(MetalDetectorActions.addMetalDetectors, state => ({
    ...state,
    loading: true,
  })),
  on(MetalDetectorActions.addMetalDetectorsSuccess, (state, { metalDetectors }) => ({
    ...state,
    metalDetectors: [...state.metalDetectors, metalDetectors],
  })),
  on(MetalDetectorActions.addMetalDetectorsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(MetalDetectorActions.deleteMetalDetector, (state) => ({
    ...state,
    loading: true,
  })),
  on(MetalDetectorActions.deleteMetalDetectorSuccess, (state, { id }) => ({
    ...state,
    metalDetectors: state.metalDetectors.filter(detector => detector.id !== id),
    loading: false,
  })),
  on(MetalDetectorActions.deleteMetalDetectorFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(MetalDetectorActions.updateMetalDetector, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MetalDetectorActions.updateMetalDetectorSuccess, (state, { metalDetector }) => {
    const updatedMetalDetectors = state.metalDetectors.map(detector =>
      detector.id === metalDetector.id ? { ...detector, ...metalDetector } : detector
    );

    return {
      ...state,
      metalDetectors: updatedMetalDetectors,
      loading: false,
      error: null,
    };
  }),
  on(MetalDetectorActions.updateMetalDetectorFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))

);

