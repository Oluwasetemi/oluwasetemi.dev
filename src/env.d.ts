/// <reference path="../.astro/types.d.ts" />

declare module "react" {
  export * from "react";
}

declare module "react-dom" {
  export * from "react-dom";
}

declare module "react/jsx-runtime" {
  export * from "react/jsx-dev-runtime";
}

declare module "react/jsx-dev-runtime" {
  export * from "react/jsx-runtime";
}
