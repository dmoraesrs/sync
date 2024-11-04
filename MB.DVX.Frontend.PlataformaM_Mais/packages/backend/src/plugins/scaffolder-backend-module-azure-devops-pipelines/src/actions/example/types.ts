export interface PipelineResponse {
  _links: Links;
  configuration: Configuration;
  url: string;
  id: number;
  revision: number;
  name: string;
  folder: string;
}

export interface Links {
  self: Self;
  web: Web;
}

export interface Self {
  href: string;
}

export interface Web {
  href: string;
}

export interface Configuration {
  path: string;
  repository: Repository;
  type: string;
}

export interface Repository {
  id: string;
  type: string;
}
