export interface TestConfig {
  baseURL: string;
  headless: boolean;
  reqResApiKey: string;
}

const environment = (process.env.NODE_ENV || 'alpha').toLowerCase();
export const config: TestConfig = {
  ...require(`./config.${environment}.ts`).config,
};
