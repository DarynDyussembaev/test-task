import { createAction, props } from '@ngrx/store';
import { ListMetalDetector} from "../models/metaldetector";


export const loadMetalDetectors = createAction(
  '[MetalDetector] Load Metal Detectors'
);

export const loadMetalDetectorsSuccess = createAction(
  '[MetalDetector] Load Metal Detectors Success',
  props<{ metalDetectors: ListMetalDetector[] }>()
);

export const loadMetalDetectorsFailure = createAction(
  '[MetalDetector] Load Metal Detectors Failure',
  props<{ error: string }>()
);

export const addMetalDetectors = createAction(
  '[MetalDetector] Add Metal Detectors',
  props<{ metalDetectors: ListMetalDetector }>()
);

export const addMetalDetectorsSuccess = createAction(
  '[MetalDetector] Add Metal Detectors Success',
  props<{ metalDetectors: ListMetalDetector}>()
);

export const addMetalDetectorsFailure = createAction(
  '[MetalDetector] Add Metal Detectors Failure',
  props<{ error: string }>()
);
export const updateMetalDetector = createAction(
  '[MetalDetector] Update Metal Detector',
  props<{ id: number; metalDetector: ListMetalDetector }>()
);

export const updateMetalDetectorSuccess = createAction(
  '[MetalDetector] Update Metal Detector Success',
  props<{ metalDetector: ListMetalDetector }>()
);

export const updateMetalDetectorFailure = createAction(
  '[MetalDetector] Update Metal Detector Failure',
  props<{ error: any }>()
);

export const deleteMetalDetector = createAction(
  '[MetalDetector] Delete Metal Detector',
  props<{ id: number }>()
);

export const deleteMetalDetectorSuccess = createAction(
  '[MetalDetector] Delete Metal Detector Success',
  props<{ id: number }>()
);

export const deleteMetalDetectorFailure = createAction(
  '[MetalDetector] Delete Metal Detector Failure',
  props<{ error: string }>()
);

