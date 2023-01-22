interface DynamicQuery {
  Sort?: Sort[];
  Filter?: Filter;
}
export default DynamicQuery;

interface Sort {
  Field: string;
  Dir: string;
}

interface Filter {
  Field: string;
  Operator: string;
  Value?: string;
  Logic?: string;
  Filters?: Filter[];
}
