import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatError } from "@angular/material/form-field";
import { FtxSelectComponent } from "src/app/ui/shared/components/ftx-select/ftx-select.component";
import { FtxErrorMessage } from "src/app/ui/shared/utils/ftx-error-messages";

describe('Pruebas unitarias para el componente "FtxSelectComponent"', () => {
  let component: FtxSelectComponent;
  let fixture: ComponentFixture<FtxSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FtxSelectComponent, MatError],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FtxSelectComponent);
    component = fixture.componentInstance;
    component.label = "Lista";
    component.elements = [
      { name: "Option 1", value: "1" },
      { name: "Option 2", value: "2" },
      { name: "Option 3", value: "3" },
    ];

    component.formGroup = new FormGroup({
      selectOption: new FormControl("", [Validators.required]),
    });
    component.controlName = "selectOption";
    fixture.detectChanges();
  });

  it("Debe de crearse correctamente", () => {
    expect(component).toBeTruthy();
  });

  it('Debe tener un label con el texto "Lista"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector(".labelInput")?.textContent).toContain(
      "Lista"
    );
  });

  it("Debe lanzar un error si el FormGroup es null en ngOnChanges", () => {
    component.formGroup = null as any;
    expect(() => component.ngOnChanges(undefined as any)).toThrowError(
      "The control of from be null"
    );
  });

  it("Debe obtener el mensaje de error correspondiente para un control inválido", () => {
    const formControl = component.control;
    formControl.markAsTouched();

    const errorMessage = new FtxErrorMessage(
      formControl,
      component.controlName
    );
    const obtainedErrorMessage = component.getErrorMessage();

    expect(obtainedErrorMessage).toEqual(errorMessage.getErrorMessage());
  });
});
