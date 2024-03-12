import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FtxPaginatorComponent } from "src/app/ui/shared/components/ftx-paginator/ftx-paginator.component";
import { SharedModule } from "src/app/ui/shared/shared.module";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
describe("Pruebas unitarias para el componente 'FtxPaginatorComponent'", () => {
  let component: FtxPaginatorComponent;
  let fixture: ComponentFixture<FtxPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FtxPaginatorComponent],
      imports: [SharedModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FtxPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Debe de crearse correctamente", () => {
    expect(component).toBeTruthy();
  });
  it("Debe llamar y asignar el pageSizeOptions de forma correcta", () => {
    const pageSizeOptionsInput = "10,25,50";

    component.setPageSizeOptions(pageSizeOptionsInput);

    expect(component.pageSizeOptions).toEqual([10, 25, 50]);
  });
});
