declare module "fake-useragent" {
  const fakeUa: () => string;
  export default fakeUa;
}

declare module "json-to-pretty-yaml" {
  const jsToYaml: {
    stringify: (obj: any) => string;
  };
  export default jsToYaml;
}

declare module "prompts" {
  type PromptObject = {
    type: string;
    name: string;
    message: string;
    choices?: Array<{ title: string; value: any }>;
  };

  function prompts(prompts: PromptObject[]): Promise<any>;
  export default prompts;
}
