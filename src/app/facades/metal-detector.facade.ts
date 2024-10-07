import {inject, Injectable} from '@angular/core';
import { Store } from '@ngrx/store';
import {Observable} from 'rxjs';
import * as MetalDetectorActions from '../store/metal-detector.actions';
import { ListMetalDetector } from '../models/metaldetector';
import { selectAllMetalDetectors } from "../store/metal-detector.selectors";

@Injectable({
  providedIn: 'root',
})
export class MetalDetectorFacade {
  private store: Store = inject(Store)
  public metalDetectors$: Observable<ListMetalDetector[]> = this.store.select(selectAllMetalDetectors);

  loadMetalDetectors() {
    this.store.dispatch(MetalDetectorActions.loadMetalDetectors());
  }

  addMetalDetector(metalDetector: ListMetalDetector): void {
    this.store.dispatch(MetalDetectorActions.addMetalDetectors({ metalDetectors: metalDetector }));
  }

  updateMetalDetector(id: number, metalDetector: ListMetalDetector): void {
    this.store.dispatch(MetalDetectorActions.updateMetalDetector({ id, metalDetector }));
  }

  deleteMetalDetector(id: number) {
    if (confirm('Вы уверены, что хотите удалить этот металлоискатель?')) {
      this.store.dispatch(MetalDetectorActions.deleteMetalDetector({ id }));
    }
  }
}
