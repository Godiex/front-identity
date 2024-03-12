import { DocumentType } from '@core/models/document-type/document-type.model';

export class DocumentTypeBuilder {
  private id: string = 'd5f088ff-8dc8-454d-abd4-a5afb9ccc574';
  private name: string = 'Cédula de ciudadanía';
  private code: string = 'CC';

  withId(id: string): DocumentTypeBuilder {
    this.id = id;
    return this;
  }

  withName(name: string): DocumentTypeBuilder {
    this.name = name;
    return this;
  }

  withDescription(code: string): DocumentTypeBuilder {
    this.code = code;
    return this;
  }

  build(): DocumentType {
    return new DocumentType(this.id, this.name, this.code);
  }
}
