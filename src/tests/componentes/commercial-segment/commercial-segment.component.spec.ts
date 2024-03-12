import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CommercialSegmentComponent } from "../../../app/ui/commercial-segment/commercial-segment.component";
import { CommercialSegmentModule } from "../../../app/ui/commercial-segment/commercial-segment.module";
import { HttpClientModule } from "@angular/common/http";

describe('Pruebas unitarias para el componente "CommercialsegmentComponent"', () => {
  let component: CommercialSegmentComponent;
  let fixture: ComponentFixture<CommercialSegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommercialSegmentModule, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CommercialSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Debe de crearse correctamente", () => {
    expect(component).toBeTruthy();
  });
});
