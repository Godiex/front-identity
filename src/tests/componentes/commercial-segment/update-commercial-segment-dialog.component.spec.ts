import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UpdateCommercialSegmentDialogComponent } from "src/app/ui/commercial-segment/components/update-commercial-segment-dialog/update-commercial-segment-dialog.component";
import { CommercialSegmentModule } from "src/app/ui/commercial-segment/commercial-segment.module";
describe("'Pruebas unitarias para el componente  UpdateCommercialSegmentDialogComponent'", () => {
  let component: UpdateCommercialSegmentDialogComponent;
  let fixture: ComponentFixture<UpdateCommercialSegmentDialogComponent>;
  const dialogRefMock = {
    close: jasmine.createSpy("close"),
  };

  const mockData = {
    commercialSegment: {
      id: 123,
      name: "Segment Name",
      description: "Segment Description",
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommercialSegmentModule, HttpClientModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: mockData },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateCommercialSegmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Debe de crearse correctamente", () => {
    expect(component).toBeTruthy();
  });
});
