import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FtxCardComponent } from "src/app/ui/shared/components/ftx-card/ftx-card.component";
import { SharedModule } from "src/app/ui/shared/shared.module";

describe("'Pruebas unitarias para el componente FtxCardComponent'", () => {
  let component: FtxCardComponent;
  let fixture: ComponentFixture<FtxCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FtxCardComponent],
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FtxCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Debe de crearse correctamente", () => {
    expect(component).toBeTruthy();
  });
});
