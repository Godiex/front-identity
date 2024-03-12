import { UpdateCommercialSegment } from '@core/models/commercial-segment/update-commercial-segment.model';

export class UpdateCommercialSegmentBuilder {
  private name: string = 'Colchones';
  private description: string = 'Segmento comercial de colchones';

  withName(name: string): UpdateCommercialSegmentBuilder {
    this.name = name;
    return this;
  }

  withDescription(description: string): UpdateCommercialSegmentBuilder {
    this.description = description;
    return this;
  }

  build(): UpdateCommercialSegment {
    return new UpdateCommercialSegment(this.name, this.description);
  }
}
