import { TestBed } from "@angular/core/testing";
import { CompanyRepository } from "@infrastructure/repositories/company.repository";
import { HttpService } from "../../../app/infrastructure/http/http.service";
import { of } from "rxjs";

import { CreateCompanyBuilder } from "../../builders/create-company-builder";
import { UpdateCompanyBuilder } from "../../builders/update-company-builder";
describe('Pruebas unitarias para el servicio "CompanyRepository"', () => {
  let repository: CompanyRepository;
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
        CompanyRepository,
        { provide: HttpService, useValue: httpServiceSpy },
      ],
    });

    repository = TestBed.inject(CompanyRepository);
  });

  it("Debe de crearse correctamente", () => {
    expect(repository).toBeTruthy();
  });

  it("Debe actualizar una compañía", (done: DoneFn) => {
    const mockCompanyId = {
      commercialSegmentId: crypto.randomUUID(),
    };
    const mockRequestCompany = new UpdateCompanyBuilder().build();

    httpServiceSpy.doPatch.and.returnValue(of(null));

    repository
      .updateCompany(mockCompanyId.commercialSegmentId, mockRequestCompany)
      .subscribe(() => {
        expect(httpServiceSpy.doPatch).toHaveBeenCalled();
        done();
      });
  });
  it("Debe obtener todas las compañías paginadas", (done: DoneFn) => {
    const mockCompanies = [
      { id: 1, name: "Company 1" },
      { id: 2, name: "Company 2" },
    ];

    httpServiceSpy.doGet.and.returnValue(of(mockCompanies));

    repository.getAllCompanyPaginated().subscribe((companies) => {
      expect(httpServiceSpy.doGet).toHaveBeenCalledWith(repository.baseUrl);
      expect(companies).toEqual(mockCompanies);
      done();
    });
  });
  it("Debe crear una compañia", (done: DoneFn) => {
    const mockCompanyId = {
      commercialSegmentId: crypto.randomUUID(),
    };
    const mockRequestCommercialSegment = new CreateCompanyBuilder().build();

    httpServiceSpy.doPost.and.returnValue(
      of(mockCompanyId.commercialSegmentId)
    );
    httpServiceSpy.doPut.and.returnValue(of(null));

    repository.createCompany(mockRequestCommercialSegment).subscribe(() => {
      expect(httpServiceSpy.doPost).toHaveBeenCalled();
      expect(httpServiceSpy.doPut).toHaveBeenCalled();
      done();
    });
  });
});
