export interface SerializedFilter {
  id?: number;
  name: string;
  content: { [index: string]: any };
  enabled: boolean;
}
