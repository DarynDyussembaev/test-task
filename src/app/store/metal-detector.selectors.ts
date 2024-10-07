import { createFeatureSelector, createSelector } from '@ngrx/store';
import {metalDetectorFeatureKey, MetalDetectorState} from './metal-detector.reducers';

export const selectMetalDetectorState = createFeatureSelector<MetalDetectorState>(
  metalDetectorFeatureKey
);

export const selectAllMetalDetectors = createSelector(
  selectMetalDetectorState,
  state => state.metalDetectors
);
