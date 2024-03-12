import { AuthorizedAgent } from "@core/models/company/authorized-agent.model";
import { Identity } from "@core/models/company/identity.model";
import { UpdateCompany } from "@core/models/company/update-company.model";

export class UpdateCompanyBuilder {
  private hostname: string = "company.com";
  private commercialSegment: string = "";
  private state: string = "";
  private authorizedAgent: AuthorizedAgent = new AuthorizedAgent(
    "Agent",
    "Agent",
    "agent@gmail.com",
    new Identity("CC", "1066865370")
  );

  withHostname(hostname: string): UpdateCompanyBuilder {
    this.hostname = hostname;
    return this;
  }

  withCommercialSegment(commercialSegment: string): UpdateCompanyBuilder {
    this.commercialSegment = commercialSegment;
    return this;
  }

  withState(state: string): UpdateCompanyBuilder {
    this.state = state;
    return this;
  }

  withAuthorizedAgent(authorizedAgent: AuthorizedAgent): UpdateCompanyBuilder {
    this.authorizedAgent = authorizedAgent;
    return this;
  }

  build(): UpdateCompany {
    return new UpdateCompany(
      this.hostname,
      this.commercialSegment,
      this.state,
      this.authorizedAgent
    );
  }
}
