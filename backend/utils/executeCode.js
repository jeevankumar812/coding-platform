import { runCode } from "../services/judge0Service.js";

export const executeCode = async (language, code, input = "") => {
  try {
    const result = await runCode(language, code, input);

    return {
      stdout: result.stdout || "",
      stderr: result.stderr || "",
      compileOutput: result.compile_output || "",
      status: result.status?.description || "Unknown",
      time: result.time || "0",
      memory: result.memory || "0",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};