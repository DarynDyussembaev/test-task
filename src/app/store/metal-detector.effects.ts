import {inject, Injectable} from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as MetalDetectorActions from './metal-detector.actions';
import {catchError, map, mergeMap, switchMap} from 'rxjs';
import { of } from 'rxjs';
import {MetalDetectorApiService} from "../services/metal-detectors-Api.service";
import {loadMetalDetectors} from "./metal-detector.actions";
import {MessageService} from "primeng/api";

@Injectable()
export class MetalDetectorEffects {
  private metalDetectorService:MetalDetectorApiService = inject(MetalDetectorApiService);
  private actions$:Actions = inject(Actions);
  private messageService: MessageService = inject(MessageService)

  loadMetalDetectors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMetalDetectors),
      switchMap(() =>
        this.metalDetectorService.getMetalDetectors().pipe(
          map((metalDetectors) => MetalDetectorActions.loadMetalDetectorsSuccess({ metalDetectors })),
          catchError((error) => of(MetalDetectorActions.loadMetalDetectorsFailure({ error })))
        )
      )
    )
  );
  addMetalDetectors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MetalDetectorActions.addMetalDetectors),
      mergeMap(action =>
        this.metalDetectorService.addMetalDetectors(action.metalDetectors).pipe(
          map((metalDetector) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Успех',
              detail: 'Металлоискатель успешно добавлен.'
            });
            return MetalDetectorActions.addMetalDetectorsSuccess({ metalDetectors: metalDetector });
          }),
          catchError(error => {
            this.messageService.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: 'Ошибка при добавлении металлоискателя.'
            });
            return of(MetalDetectorActions.addMetalDetectorsFailure({ error }));
          })
        )
      )
    )
  );
  updateMetalDetector$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MetalDetectorActions.updateMetalDetector),
      mergeMap(action => {
        return this.metalDetectorService.updateMetalDetector(action.id, action.metalDetector).pipe(
          map((metalDetector) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Успех',
              detail: 'Металлоискатель успешно обновлён.'
            });
            return MetalDetectorActions.updateMetalDetectorSuccess({ metalDetector });
          }),
          catchError(error => {
            this.messageService.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: 'Ошибка при обновлении металлоискателя.'
            });
            return of(MetalDetectorActions.updateMetalDetectorFailure({ error }));
          })
        );
      })
    )
  );

  deleteMetalDetector$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MetalDetectorActions.deleteMetalDetector),
      mergeMap(action =>
        this.metalDetectorService.deleteMetalDetectors(action.id).pipe(
          map(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Успех',
              detail: 'Металлоискатель успешно удалён!'
            });
            return MetalDetectorActions.deleteMetalDetectorSuccess({ id: action.id });
          }),
          catchError(error => {
            this.messageService.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: 'Ошибка при удалении металлоискателя!'
            });
            return of(MetalDetectorActions.deleteMetalDetectorFailure({ error: error.message }));
          })
        )
      )
    )
  );
}
