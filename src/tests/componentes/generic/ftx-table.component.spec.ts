import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FtxTableComponent } from "src/app/ui/shared/components/ftx-table/ftx-table.component";
import { TableColumn } from "src/app/ui/shared/components/ftx-table/models/table-column.model";
import { SharedModule } from "src/app/ui/shared/shared.module";
import { Sort } from "@angular/material/sort";
import { CommercialSegment } from "@core/models/commercial-segment/commercial-segment.model";

describe("Pruebas unitarias para el componente 'FtxTableComponent'", () => {
  let component: FtxTableComponent;
  let fixture: ComponentFixture<FtxTableComponent>;
  const commercialSegmentsMock: CommercialSegment[] = [
    new CommercialSegment("123", "Segmento", "Commercial"),
  ];
  const tableColumnsMock: TableColumn[] = [
    {
      name: "Nombre",
      dataKey: "name",
    },
    {
      name: "Descripcion",
      dataKey: "description",
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FtxTableComponent],
      imports: [SharedModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FtxTableComponent);
    component = fixture.componentInstance;
    component.tableColumns = tableColumnsMock;
    component.tableData = commercialSegmentsMock;
    component.isFilterable = true;

    fixture.detectChanges();
  });

  it("Debe de crearse correctamente", () => {
    expect(component).toBeTruthy();
  });

  it("Debe emitir un evento de ordenamiento con los parámetros adecuados", () => {
    const sortParameters: Sort = { active: "Nombre", direction: "asc" };
    spyOn(component.sort, "emit");

    component.sortTable(sortParameters);

    expect(component.sort.emit).toHaveBeenCalledWith(sortParameters);
  });
});
