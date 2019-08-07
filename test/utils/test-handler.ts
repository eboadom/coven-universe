export const testHandler = (
  artifacts: Truffle.Artifacts,
  contract: ContractFunction,
  testExecutor: Function,
) => testExecutor()
