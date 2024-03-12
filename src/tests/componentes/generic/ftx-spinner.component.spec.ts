import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FtxSpinnerComponent } from "src/app/ui/shared/components/ftx-spinner/ftx-spinner.component";
import { SharedModule } from "src/app/ui/shared/shared.module";

describe("Pruebas unitarias para el componente 'FtxSpinnerComponent'", () => {
  let component: FtxSpinnerComponent;
  let fixture: ComponentFixture<FtxSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FtxSpinnerComponent],
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FtxSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Debe de crearse correctamente", () => {
    expect(component).toBeTruthy();
  });
});
