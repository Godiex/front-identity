import { TestBed } from "@angular/core/testing";

import { ChangeInfoCommercialSegmentService } from "../../../app/ui/commercial-segment/services/change-info-commercial-segment.service";

describe("Pruebas unitarias para el servicio 'ChangeInfoCommercialSegmentService'", () => {
  let service: ChangeInfoCommercialSegmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeInfoCommercialSegmentService);
  });

  it("Debe crearse correctamente", () => {
    expect(service).toBeTruthy();
  });
  it("debe emitir un evento", () => {
    let emittedValue: any;
    service.event.subscribe((value) => {
      emittedValue = value;
    });
    expect(emittedValue).toBeUndefined();
    const testData = true;
    service.emitEvent(testData);
    expect(emittedValue).toEqual(testData);
  });
});
