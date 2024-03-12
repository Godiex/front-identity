import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FtxLayoutPageComponent } from "src/app/ui/shared/components/ftx-layout-page/ftx-layout-page.component";
import { SharedModule } from "src/app/ui/shared/shared.module";

describe("Pruebas unitarias para el componente 'FtxLayoutPageComponent'", () => {
  let component: FtxLayoutPageComponent;
  let fixture: ComponentFixture<FtxLayoutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FtxLayoutPageComponent],
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FtxLayoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Debe de crearse correctamente", () => {
    expect(component).toBeTruthy();
  });
});
