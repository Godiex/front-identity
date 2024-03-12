import { TestBed } from "@angular/core/testing";
import { DocumentTypeRepository } from "@infrastructure/repositories/document-type.repository";
import { DocumentType } from "@core/models/document-type/document-type.model";
import { HttpService } from "@infrastructure/http/http.service";
import { of } from "rxjs";
import { DocumentTypeBuilder } from "../../builders/document-type-builder";

describe('Pruebas unitarias para el servicio "DocumentTypeRepository"', () => {
  let repository: DocumentTypeRepository;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;
  beforeEach(() => {
    httpServiceSpy = jasmine.createSpyObj("HttpService", ["doGet"]);
    TestBed.configureTestingModule({
      providers: [
        DocumentTypeRepository,
        { provide: HttpService, useValue: httpServiceSpy },
      ],
    });

    repository = TestBed.inject(DocumentTypeRepository);
  });

  it("Debe de crearse correctamente", () => {
    expect(repository).toBeTruthy();
  });

  it("Debe retornar todos los tipos de documentos", (done: DoneFn) => {
    const mockReultDocumentTypes: DocumentType[] = [
      new DocumentTypeBuilder().build(),
      new DocumentTypeBuilder().build(),
    ];

    httpServiceSpy.doGet.and.returnValue(of(mockReultDocumentTypes));

    repository.getAll().subscribe((res) => {
      expect(res).toEqual(mockReultDocumentTypes);
      done();
    });
  });
});
