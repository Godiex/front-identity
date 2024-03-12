import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CommercialSegmentModule } from "src/app/ui/commercial-segment/commercial-segment.module";
import { CommercialSegmentTableComponent } from "src/app/ui/commercial-segment/components/commercial-segment-table/commercial-segment-table.component";

describe('Pruebas unitarias para el componente "CommercialSegmentTableComponent"', () => {
  let component: CommercialSegmentTableComponent;
  let fixture: ComponentFixture<CommercialSegmentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, CommercialSegmentModule],
      declarations: [CommercialSegmentTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommercialSegmentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Debe de crearse correctamente", () => {
    expect(component).toBeTruthy();
  });
});
