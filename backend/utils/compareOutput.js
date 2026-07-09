export const compareOutput = (
  expectedOutput,
  userOutput
) => {
  const expected = expectedOutput.trim();

  const actual = userOutput.trim();

  return expected === actual;
};