import { CreateCommercialSegment } from '@core/models/commercial-segment/create-commercial-segment.model';
export class CreateCommercialSegmentBuilder {
  private name: string = 'Colchones';
  private description: string = 'Segmento comercial de colchones';

  withName(name: string): CreateCommercialSegmentBuilder {
    this.name = name;
    return this;
  }

  withDescription(description: string): CreateCommercialSegmentBuilder {
    this.description = description;
    return this;
  }

  build(): CreateCommercialSegment {
    return new CreateCommercialSegment(this.name, this.description);
  }
}
