import { CommercialSegment } from '@core/models/commercial-segment/commercial-segment.model';

export class CommercialSegmentBuilder {
  private id: string = 'd5f088ff-8dc8-454d-abd4-a5afb9ccc574';
  private name: string = 'Colchones';
  private description: string = 'Segmento comercial de colchones';

  withId(id: string): CommercialSegmentBuilder {
    this.id = id;
    return this;
  }

  withName(name: string): CommercialSegmentBuilder {
    this.name = name;
    return this;
  }

  withDescription(description: string): CommercialSegmentBuilder {
    this.description = description;
    return this;
  }

  build(): CommercialSegment {
    return new CommercialSegment(this.id, this.name, this.description);
  }
}
