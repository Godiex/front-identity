import { CreateCompany } from '@core/models/company/create-company.model';
import { AuthorizedAgent } from '@core/models/company/authorized-agent.model';
import { Identity } from '@core/models/company/identity.model';

export class CreateCompanyBuilder {
  private name: string = 'Company';
  private legalIdentifier: string = 'Company';
  private commercialSegment: string = 'Company';
  private hostname: string = 'Company';
  private authorizedAgent: AuthorizedAgent = new AuthorizedAgent(
    'Agent',
    'Agent',
    'agent@gmail.com',
    new Identity('CC', '1066865370')
  );

  withName(name: string): CreateCompanyBuilder {
    this.name = name;
    return this;
  }

  withLegalIdentifier(legalIdentifier: string): CreateCompanyBuilder {
    this.legalIdentifier = legalIdentifier;
    return this;
  }
  withCommercialSegment(commercialSegment: string): CreateCompanyBuilder {
    this.commercialSegment = commercialSegment;
    return this;
  }
  withHostname(hostname: string): CreateCompanyBuilder {
    this.hostname = hostname;
    return this;
  }
  withAuthorizedAgent(authorizedAgent: AuthorizedAgent): CreateCompanyBuilder {
    this.authorizedAgent = authorizedAgent;
    return this;
  }

  build(): CreateCompany {
    return new CreateCompany(
      this.name,
      this.legalIdentifier,
      this.commercialSegment,
      this.hostname,
      this.authorizedAgent
    );
  }
}
