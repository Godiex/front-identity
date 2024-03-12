import { TestBed } from "@angular/core/testing";
import { CommercialSegmentRepository } from "../../../app/infrastructure/repositories/commercial-segment.repository";
import { CreateCommercialSegmentBuilder } from "../../builders/create-commercial-segment-builder";
import { CommercialSegment } from "@core/models/commercial-segment/commercial-segment.model";
import { CommercialSegmentBuilder } from "../../builders/commercial-segment-builder";
import { HttpService } from "@infrastructure/http/http.service";
import { of } from "rxjs";
import { UpdateCommercialSegmentBuilder } from "../../builders/update-commercial-segment-builder";

describe('Pruebas unitarias para el servicio "CommercialSegmentRepository"', () => {
  let repository: CommercialSegmentRepository;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;

  beforeEach(() => {
    httpServiceSpy = jasmine.createSpyObj("HttpService", [
      "doPost",
      "doPut",
      "doGet",
      "doPatch",
      "doDelete",
    ]);
    TestBed.configureTestingModule({
      providers: [
        CommercialSegmentRepository,
        { provide: HttpService, useValue: httpServiceSpy },
      ],
    });

    repository = TestBed.inject(CommercialSegmentRepository);
  });

  it("Debe de crearse correctamente", () => {
    expect(repository).toBeTruthy();
  });

  it("Debe crear un segmento comercial", (done: DoneFn) => {
    const mockCommercialSegmentId = {
      commercialSegmentId: crypto.randomUUID(),
    };
    const mockRequestCommercialSegment =
      new CreateCommercialSegmentBuilder().build();

    httpServiceSpy.doPost.and.returnValue(
      of(mockCommercialSegmentId.commercialSegmentId)
    );
    httpServiceSpy.doPut.and.returnValue(of(null));

    repository.create(mockRequestCommercialSegment).subscribe(() => {
      expect(httpServiceSpy.doPost).toHaveBeenCalled();
      expect(httpServiceSpy.doPut).toHaveBeenCalled();
      done();
    });
  });

  it("Debe actualizar un segmento comercial", (done: DoneFn) => {
    const mockCommercialSegmentId = {
      commercialSegmentId: crypto.randomUUID(),
    };
    const mockRequestCommercialSegment =
      new UpdateCommercialSegmentBuilder().build();

    httpServiceSpy.doPatch.and.returnValue(of(null));

    repository
      .update(
        mockCommercialSegmentId.commercialSegmentId,
        mockRequestCommercialSegment
      )
      .subscribe(() => {
        expect(httpServiceSpy.doPatch).toHaveBeenCalled();
        done();
      });
  });

  it("Debe eliminar un segmento comercial", (done: DoneFn) => {
    const mockCommercialSegmentId = {
      commercialSegmentId: crypto.randomUUID(),
    };

    httpServiceSpy.doDelete.and.returnValue(of(null));

    repository
      .delete(mockCommercialSegmentId.commercialSegmentId)
      .subscribe(() => {
        expect(httpServiceSpy.doDelete).toHaveBeenCalled();
        done();
      });
  });

  it("Debe retornar todos los segmentos commerciales", (done: DoneFn) => {
    const mockReultSegments: CommercialSegment[] = [
      new CommercialSegmentBuilder().build(),
      new CommercialSegmentBuilder().build(),
    ];

    httpServiceSpy.doGet.and.returnValue(of(mockReultSegments));

    repository.getAll().subscribe((res) => {
      expect(res).toEqual(mockReultSegments);
      done();
    });
  });
});
