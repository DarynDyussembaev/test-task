export interface ListMetalDetector {
  id: number;
  count: number;
  typeMetalDetectorsId: number;
  typeMetalDetectorsNameKaz: string;
  typeMetalDetectorsNameRus: string;
  yearIssue: number;
  brand: string;
  countryManufactureId: number;
  countryManufactureNameKaz: string;
  countryManufactureNameRus: string;
  availabilityId: number;
  availabilityNameKaz: string;
  availabilityNameRus: string;
  createdAt: string;
}
export interface MetalDetectorDirectory {
  id: number;
  nameKaz: string;
  nameRus: string;
}
