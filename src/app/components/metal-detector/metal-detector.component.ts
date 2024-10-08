import {Component, inject, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import {ListMetalDetector, MetalDetectorDirectory} from "../../models/metaldetector";
import {MetalDetectorFacade} from "../../facades/metal-detector.facade";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {CreateEditMetaldetectorsComponent} from "../create-edit-metaldetectors/create-edit-metaldetectors.component";
import {MetalDetectorDirectoryService} from "../../services/metal-detector-directory.service";
import {LanguageService} from "../../services/language.service";

@Component({
  selector: 'app-metal-detector',
  templateUrl: './metal-detector.component.html',
  styleUrl: './metal-detector.component.scss'
})
export class MetalDetectorComponent implements OnInit {
  public types?: MetalDetectorDirectory[] = [];
  public countries?: MetalDetectorDirectory[] = [];
  public availabilities?: MetalDetectorDirectory[] = [];

  private metalDetectorFacade = inject(MetalDetectorFacade);
  private dialogService = inject(DialogService);
  public ref?: DynamicDialogRef;
  private metalDetectorsDirectoryService: MetalDetectorDirectoryService = inject(MetalDetectorDirectoryService);
  public languageService: LanguageService = inject(LanguageService);

  public metalDetectors$: Observable<ListMetalDetector[]> = this.metalDetectorFacade.metalDetectors$;
  public metalDetectors:ListMetalDetector[] = []
  public filteredDetectors: ListMetalDetector[] = [];
  public allDetectors: ListMetalDetector[] = [];
  public searchTerm: string = '';
  public selectedTypeId: number | null = null;
  public selectedCountryId: number | null = null;
  public selectedAvailabilityId: number | null = null;
  public isLoading = true;


  constructor() {}

  ngOnInit(): void {
    this.metalDetectorFacade.loadMetalDetectors();
    this.loadReferenceData();
    this.metalDetectors$.subscribe(detectors => {
      this.allDetectors = detectors;
      this.filteredDetectors = detectors;
      this.filterDetectors();
    });
  }

  changeLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const language = selectElement.value;
    this.languageService.setLanguage(language);
  }


  loadReferenceData(): void {
    const language = this.languageService.getLanguage();
    this.isLoading = true;
    this.metalDetectorsDirectoryService.getTypesMetalDetectors(language).subscribe((data: any) => {
      this.types = data;
    });
    this.metalDetectorsDirectoryService.getCountriesManufacture(language).subscribe((data: any) => {
      this.countries = data;
    });
    this.metalDetectorsDirectoryService.getAvailabilityStatuses(language).subscribe((data: any) => {
      this.availabilities = data;
    });
  }
  public filterDetectors(): void {
    this.filteredDetectors = this.allDetectors.filter(detector => {
      const matchesCountry = this.selectedCountryId !== null ? detector.countryManufactureId === Number(this.selectedCountryId) : true;
      const matchesType = this.selectedTypeId !== null ? detector.typeMetalDetectorsId === Number(this.selectedTypeId) : true;
      const matchesAvailability = this.selectedAvailabilityId !== null ? detector.availabilityId === Number(this.selectedAvailabilityId) : true;
      const matchesSearchTerm = this.searchTerm ?
        detector.brand.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        detector.typeMetalDetectorsNameRus.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        detector.typeMetalDetectorsNameKaz.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;

      return matchesCountry && matchesType && matchesAvailability && matchesSearchTerm;
    });
  }

  deleteMetalDetector(id: number): void {
    this.metalDetectorFacade.deleteMetalDetector(id);
  }

  openCreateEditDialog(detector?: ListMetalDetector): void {
    this.ref = this.dialogService.open(CreateEditMetaldetectorsComponent, {
      width: '500px',
      height: '650px',
      header: detector ? 'Редактировать металлоискатель' : 'Добавить металлоискатель',
      data: {
        id: detector?.id,
        detector: detector || {},
        types: this.types,
        countries: this.countries,
        availabilities: this.availabilities,
      },
    });

    this.ref.onClose.subscribe((result: ListMetalDetector) => {
      if (result) {
        if (detector) {
          this.metalDetectorFacade.updateMetalDetector(detector.id, result);
          this.metalDetectorFacade.loadMetalDetectors();
        } else {
          this.metalDetectorFacade.addMetalDetector(result);
          this.metalDetectorFacade.loadMetalDetectors();
        }

      }
    });
  }
}
