export enum CodeBaseType {
  NONE = "",
  TERRAFORM = "terraform",
  CLOUDFORMATION = "cloudformation",
  ANGULAR = "angular",
  CSHARP_DOTNET = "csharp_dotnet",
  GO = "go_lang",
  JAVA_KOTLIN = "java_kotlin",
  NODE_JS = "node_js",
}

export type TCodeBase =
  | CodeBaseType.NONE
  | CodeBaseType.TERRAFORM
  | CodeBaseType.CLOUDFORMATION
  | CodeBaseType.ANGULAR
  | CodeBaseType.CSHARP_DOTNET
  | CodeBaseType.GO
  | CodeBaseType.JAVA_KOTLIN
  | CodeBaseType.NODE_JS;
