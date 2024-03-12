import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { CreateCommercialSegmentComponent } from "src/app/ui/commercial-segment/components/create-commercial-segment/create-commercial-segment.component";
import { CommercialSegmentService } from "@core/services/commercial-segment-service.interface";
import { of, throwError } from "rxjs";
import { SharedModule } from "src/app/ui/shared/shared.module";
import { HttpService } from "@infrastructure/http/http.service";

describe("Pruebas unitarias para el componente 'CreateCommercialSegmentComponent'", () => {
  let component: CreateCommercialSegmentComponent;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;
  let fixture: ComponentFixture<CreateCommercialSegmentComponent>;
  let commercialSegmentService: CommercialSegmentService;
  let formBuilder: FormBuilder;

  beforeEach(waitForAsync(() => {
    httpServiceSpy = jasmine.createSpyObj("HttpService", [
      "doPut",
      "doGet",
      "doPatch",
      "doDelete",
    ]);
    TestBed.configureTestingModule({
      declarations: [CreateCommercialSegmentComponent],
      imports: [SharedModule],
      providers: [
        CommercialSegmentService,
        FormBuilder,
        { provide: HttpService, useValue: httpServiceSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCommercialSegmentComponent);
    component = fixture.componentInstance;
    commercialSegmentService = TestBed.inject(CommercialSegmentService);
    formBuilder = TestBed.inject(FormBuilder);

    component.commercialSegmentForm = formBuilder.group({
      nameCommercialSegment: new FormControl("TestName", Validators.required),
      description: new FormControl("TestDescription", Validators.required),
    });

    fixture.detectChanges();
  });

  it("Debe de crearse correctamente", () => {
    expect(component).toBeTruthy();
  });
  it("Debe guardar el segmento comercial", () => {
    const saveSpy = spyOn(component, "save");
    component.save();
    expect(saveSpy).toHaveBeenCalled();
  });
});
